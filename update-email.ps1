$files = Get-ChildItem -Path "c:\SOLAR SHARE" -Filter "*.html"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $content = $content -replace 'info@solarshare\.uz', 'muzagame034@gmail.com'
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
}
Write-Host "Email updated in all HTML files"
