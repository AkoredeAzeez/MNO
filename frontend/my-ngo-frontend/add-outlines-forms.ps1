$files = @(
    'C:\Users\akore\TRI\frontend\my-ngo-frontend\src\app\donate\donate.css',
    'C:\Users\akore\TRI\frontend\my-ngo-frontend\src\app\contact\contact.css',
    'C:\Users\akore\TRI\frontend\my-ngo-frontend\src\app\volunteer\volunteer.css',
    'C:\Users\akore\TRI\frontend\my-ngo-frontend\src\app\program-detail.css'
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file)
        
        # Add outline to donate/form-card patterns
        $content = $content -replace '(\..*-form-card\s*\{[^}]*background:\s*#[a-fA-F0-9]{6};)', "`$1`n  outline: 2px solid #000000;`n  outline-offset: -2px;"
        
        # Add outline to card patterns
        $content = $content -replace '(\..*-card\s*\{[^}]*background:\s*#FFFFFF;)', "`$1`n  outline: 2px solid #000000;`n  outline-offset: -2px;"
        
        [System.IO.File]::WriteAllText($file, $content)
        Write-Host "Processed: $file"
    }
}

Write-Host "Added outlines to all CSS files"
