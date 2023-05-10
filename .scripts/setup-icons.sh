#!/bin/bash

downloadDirectory='./temp'
productionDirectory='./public/icons'
azureIconsDirectory="$productionDirectory/Azure_Public_Service_Icons"
downloadFile="$downloadDirectory/AzureIcons.zip"

mkdir $downloadDirectory
mkdir $productionDirectory
rm -rf $azureIconsDirectory 
curl -o $downloadFile "https://arch-center.azureedge.net/icons/Azure_Public_Service_Icons_V14.zip" 
unzip -d $productionDirectory $downloadFile
rm $downloadFile