$downloadDirectory = './temp'
$productionDirectory = './public/icons'
$azureIconsDirectory = Join-Path $productionDirectory 'Azure_Public_Service_Icons'
$downloadFile = Join-Path $downloadDirectory AzureIcons.zip

Remove-Item -Recurse -Force $azureIconsDirectory 
New-Item -ItemType Directory -Force -Path $downloadDirectory
New-Item -ItemType Directory -Force -Path $productionDirectory
Invoke-WebRequest https://arch-center.azureedge.net/icons/Azure_Public_Service_Icons_V14.zip -OutFile $downloadFile
Expand-Archive $downloadFile -DestinationPath $productionDirectory
Remove-Item $downloadFile