$files = @(
    'C:\Users\akore\TRI\frontend\my-ngo-frontend\src\app\component.css',
    'C:\Users\akore\TRI\frontend\my-ngo-frontend\src\app\globals.css',
    'C:\Users\akore\TRI\frontend\my-ngo-frontend\src\app\donate\donate.css',
    'C:\Users\akore\TRI\frontend\my-ngo-frontend\src\app\contact\contact.css',
    'C:\Users\akore\TRI\frontend\my-ngo-frontend\src\app\volunteer\volunteer.css',
    'C:\Users\akore\TRI\frontend\my-ngo-frontend\src\app\program-detail.css'
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file)
        
        # Replace red hex with blue
        $content = $content.Replace('#F62F2F', '#89A9EE')
        
        # Replace coral hex with white
        $content = $content.Replace('#EC6666', '#FFFFFF')
        
        # Replace red rgba with blue rgba
        $content = $content.Replace('rgba(246, 47, 47', 'rgba(137, 169, 238')
        
        # Replace coral rgba with white rgba
        $content = $content.Replace('rgba(236, 102, 102', 'rgba(255, 255, 255')
        
        # Replace old gradient references
        $content = $content.Replace('var(--maritime-red)', 'var(--maritime-blue)')
        $content = $content.Replace('var(--coral-red)', 'var(--white)')
        
        [System.IO.File]::WriteAllText($file, $content)
        Write-Host "Updated: $file"
    }
}

Write-Host "All red and coral colors replaced with blue and white"
