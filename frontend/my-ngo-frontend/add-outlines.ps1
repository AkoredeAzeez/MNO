$file = 'C:\Users\akore\TRI\frontend\my-ngo-frontend\src\app\component.css'
$content = [System.IO.File]::ReadAllText($file)

# Add outlines to cards and buttons by modifying border/no-border rules
# For white/light elements: black outline
# For blue elements: navy outline

# Pattern 1: Add outline to existing border statements for white elements
$content = $content -replace '(\s+background:\s*#ffffff;)', "`$1`n  outline: 2px solid #000000;`n  outline-offset: -2px;"
$content = $content -replace '(\s+background:\s*#FFFFFF;)', "`$1`n  outline: 2px solid #000000;`n  outline-offset: -2px;"

# Pattern 2: Add outline to button elements
$content = $content -replace '(\..*-btn\s*\{[^}]*background:\s*linear-gradient)', "`$1"

# Pattern 3: Cards with background white or light blue
$content = $content -replace '(\..*-card\s*\{[^}]*background:\s*[^;]*white[^;]*;)', "`$1`n  outline: 2px solid #000000;`n  outline-offset: -2px;"

# Write back
[System.IO.File]::WriteAllText($file, $content)
Write-Host "Added outlines to component.css"
