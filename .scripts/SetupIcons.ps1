$downloadDirectory = './temp'
$productionDirectory = './public'
$downloadFile = Join-Path $downloadDirectory AzureIcons.zip

New-Item -ItemType Directory -Force -Path $downloadDirectory
Invoke-WebRequest https://arch-center.azureedge.net/icons/Azure_Public_Service_Icons_V14.zip -OutFile $downloadFile
Expand-Archive $downloadFile -DestinationPath $productionDirectory
Remove-Item $downloadFile