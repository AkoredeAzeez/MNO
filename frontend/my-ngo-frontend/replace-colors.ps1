$file = 'C:\Users\akore\TRI\frontend\my-ngo-frontend\src\app\component.css'
$content = [System.IO.File]::ReadAllText($file)

# Replace green rgba with blue rgba (139, 195, 74 -> 137, 169, 238)
$content = $content.Replace('rgba(139, 195, 74', 'rgba(137, 169, 238')

# Replace dark green rgba with navy rgba (27, 94, 32 -> 15, 15, 43)
$content = $content.Replace('rgba(27, 94, 32', 'rgba(15, 15, 43')

# Write back
[System.IO.File]::WriteAllText($file, $content)
Write-Host "Colors updated to Mix 1"
