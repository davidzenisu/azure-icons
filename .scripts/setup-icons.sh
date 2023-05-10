#!/bin/bash

downloadDirectory='./temp'
productionDirectory='./public/icons'
azureIconsDirectory="$productionDirectory/Azure_Public_Service_Icons"
downloadFile="$downloadDirectory/AzureIcons.zip"

rm -r $azureIconsDirectory 
wget "https://arch-center.azureedge.net/icons/Azure_Public_Service_Icons_V14.zip" -O $downloadFile
unzip -d $productionDirectory $downloadFile
rm $downloadFile