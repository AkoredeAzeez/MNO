# =============================================================
#  upload-maritime-gallery.ps1
#  Uploads the Maritime Forum photo set to Strapi and creates
#  the gallery albums + linked event.
#
#  Usage (PowerShell 7+):
#     $env:STRAPI_TOKEN = "<full-access API token>"
#     pwsh -File .\upload-maritime-gallery.ps1
#
#  Optional overrides:
#     -BaseUrl   (default https://mno-production.up.railway.app)
#     -AssetsDir (default <repo>\assets\maritime-forum)
#     -SkipEvent (do not create/link an Event record)
#     -WhatIf    (dry run: list what would be uploaded, no writes)
# =============================================================
[CmdletBinding()]
param(
  [string]$BaseUrl = 'https://mno-production.up.railway.app',
  [string]$AssetsDir = (Join-Path $PSScriptRoot '..\assets\maritime-forum'),
  [string]$Token = $env:STRAPI_TOKEN,
  [switch]$SkipEvent,
  [switch]$WhatIf
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Net.Http

function Write-Step  ($m) { Write-Host "`n==> $m" -ForegroundColor Cyan }
function Write-Ok    ($m) { Write-Host "    [ok] $m" -ForegroundColor Green }
function Write-Warn2 ($m) { Write-Host "    [!!] $m" -ForegroundColor Yellow }

if (-not $Token -and -not $WhatIf) {
  throw "No API token. Set `$env:STRAPI_TOKEN or pass -Token. Create one at $BaseUrl/admin -> Settings -> API Tokens (Full access)."
}

$AssetsDir = (Resolve-Path $AssetsDir).Path
Write-Host "Strapi     : $BaseUrl"
Write-Host "Assets     : $AssetsDir"
Write-Host "Dry run    : $([bool]$WhatIf)"

# ---------- Album definitions ----------
$albums = @(
  @{
    title       = 'Maritime Forum Highlights'
    slug        = 'maritime-forum-highlights'
    description = 'Opening sessions of The Maritime Forum — students receiving the Maritime Club Handbook and meeting the people shaping the sector.'
    folder      = 'Highlights'
    order       = 1
  },
  @{
    title       = 'Maritime Forum — Day 2'
    slug        = 'maritime-forum-day-2'
    description = 'Second day of The Maritime Forum: presentations, panel discussions and Q&A with students on maritime careers.'
    folder      = 'Day_2'
    order       = 2
  }
)

# ---------- HTTP helpers ----------
$client = [System.Net.Http.HttpClient]::new()
$client.Timeout = [TimeSpan]::FromMinutes(10)
$client.DefaultRequestHeaders.Authorization =
  [System.Net.Http.Headers.AuthenticationHeaderValue]::new('Bearer', $Token)

function Invoke-StrapiJson {
  param([string]$Method, [string]$Path, $Body)

  $json = if ($Body) { $Body | ConvertTo-Json -Depth 12 -Compress } else { $null }
  $content = if ($json) {
    [System.Net.Http.StringContent]::new($json, [System.Text.Encoding]::UTF8, 'application/json')
  } else { $null }

  $req = [System.Net.Http.HttpRequestMessage]::new(
    [System.Net.Http.HttpMethod]::new($Method), "$BaseUrl$Path")
  if ($content) { $req.Content = $content }

  $res = $client.SendAsync($req).GetAwaiter().GetResult()
  $text = $res.Content.ReadAsStringAsync().GetAwaiter().GetResult()

  if (-not $res.IsSuccessStatusCode) {
    throw "HTTP $([int]$res.StatusCode) on $Method $Path`n$text"
  }
  if ([string]::IsNullOrWhiteSpace($text)) { return $null }
  return $text | ConvertFrom-Json
}

function Send-Media {
  param([string]$FilePath)

  $bytes = [System.IO.File]::ReadAllBytes($FilePath)
  $fileContent = [System.Net.Http.ByteArrayContent]::new($bytes)
  $fileContent.Headers.ContentType =
    [System.Net.Http.Headers.MediaTypeHeaderValue]::new('image/jpeg')

  $form = [System.Net.Http.MultipartFormDataContent]::new()
  $form.Add($fileContent, 'files', [System.IO.Path]::GetFileName($FilePath))

  $req = [System.Net.Http.HttpRequestMessage]::new(
    [System.Net.Http.HttpMethod]::Post, "$BaseUrl/api/upload")
  $req.Content = $form

  $res  = $client.SendAsync($req).GetAwaiter().GetResult()
  $text = $res.Content.ReadAsStringAsync().GetAwaiter().GetResult()
  $form.Dispose()

  if (-not $res.IsSuccessStatusCode) {
    throw "Upload failed for $FilePath — HTTP $([int]$res.StatusCode)`n$text"
  }
  return ($text | ConvertFrom-Json)[0]
}

# ---------- 1. Locate a Maritime Forum event ----------
$eventId = $null
if (-not $SkipEvent -and -not $WhatIf) {
  Write-Step 'Locating or creating the Maritime Forum event'
  $found = Invoke-StrapiJson -Method GET `
    -Path '/api/events?filters[title][$eq]=Maritime%20Forum&pagination[limit]=1'
  if ($found.data.Count -gt 0) {
    $eventId = $found.data[0].id
    Write-Ok "Using existing event id $eventId"
  } else {
    $created = Invoke-StrapiJson -Method POST -Path '/api/events' -Body @{
      data = @{
        title       = 'Maritime Forum'
        start       = '2025-01-01T09:00:00.000Z'
        description = 'The Maritime Forum brought students together with maritime professionals to explore careers, mentorship and opportunity across the sector.'
        rsvpEnabled = $false
        publishedAt = (Get-Date).ToUniversalTime().ToString('o')
      }
    }
    $eventId = $created.data.id
    Write-Ok "Created event id $eventId"
  }
} elseif ($SkipEvent) {
  Write-Warn2 'Skipping event creation (-SkipEvent)'
}

# ---------- 2. Upload photos per album ----------
$albumPayloads = @()

foreach ($album in $albums) {
  $dir = Join-Path $AssetsDir $album.folder
  if (-not (Test-Path $dir)) { throw "Missing folder: $dir" }

  $files = Get-ChildItem $dir -File -Filter *.jpg | Sort-Object Name
  Write-Step "$($album.title) — $($files.Count) photos"

  if ($WhatIf) {
    $files | ForEach-Object { Write-Host "    would upload $($_.Name)" }
    continue
  }

  $mediaIds = @()
  $coverId  = $null
  $n = 0

  foreach ($file in $files) {
    $n++
    try {
      $media = Send-Media -FilePath $file.FullName
      $mediaIds += $media.id
      if (-not $coverId) { $coverId = $media.id }
      Write-Host ("    [{0}/{1}] {2} -> id {3}" -f $n, $files.Count, $file.Name, $media.id)
    } catch {
      Write-Warn2 "Failed: $($file.Name) — $($_.Exception.Message)"
    }
  }

  Write-Ok "Uploaded $($mediaIds.Count)/$($files.Count) for $($album.title)"
  $albumPayloads += @{ album = $album; mediaIds = $mediaIds; coverId = $coverId }
}

if ($WhatIf) {
  Write-Host "`nDry run complete. No writes were made." -ForegroundColor Cyan
  $client.Dispose()
  return
}

# ---------- 3. Create albums and attach media ----------
Write-Step 'Creating gallery albums'

foreach ($entry in $albumPayloads) {
  $album = $entry.album
  $existing = Invoke-StrapiJson -Method GET `
    -Path "/api/gallery-albums?filters[slug][`$eq]=$($album.slug)&pagination[limit]=1"

  $data = @{
    title       = $album.title
    slug        = $album.slug
    description = $album.description
    photographer = 'BoluwatifeTega Production'
    order       = $album.order
    photos      = $entry.mediaIds
    coverImage  = $entry.coverId
    publishedAt = (Get-Date).ToUniversalTime().ToString('o')
  }
  if ($eventId) { $data.event = $eventId }

  if ($existing.data.Count -gt 0) {
    $id = $existing.data[0].id
    Invoke-StrapiJson -Method PUT -Path "/api/gallery-albums/$id" -Body @{ data = $data } | Out-Null
    Write-Ok "Updated album '$($album.title)' (id $id) with $($entry.mediaIds.Count) photos"
  } else {
    $created = Invoke-StrapiJson -Method POST -Path '/api/gallery-albums' -Body @{ data = $data }
    Write-Ok "Created album '$($album.title)' (id $($created.data.id)) with $($entry.mediaIds.Count) photos"
  }
}

# ---------- 4. Verify ----------
Write-Step 'Verifying public API response'
try {
  $public = Invoke-RestMethod "$BaseUrl/api/gallery-albums?populate[photos]=true&populate[coverImage]=true"
  foreach ($a in $public.data) {
    Write-Ok "$($a.title) -> $($a.photos.Count) photos"
  }
} catch {
  Write-Warn2 "Public verification failed (check Public role permissions): $($_.Exception.Message)"
}

$client.Dispose()
Write-Host "`nDone." -ForegroundColor Green
