#!/bin/bash

echo ""
echo " ____  _                   _  _                       _"
echo "|  _ \| |                 | || |                     | |"
echo "| |_) | |  ___    ___    __| || |__    ___   _   _  _ __   __| |"
echo "|  _ <| | / _ \  / _ \  / _\` || '_ \  / _ \ | | | || '_ \ / _\` |"
echo "| |_) | || (_) || (_) || (_| || | | || (_) || |_| || | | || (_| |"
echo "|____/|_| \___/  \___/  \__,_||_| |_| \___/  \__,_||_| |_| \__,_|"
echo ""
echo " Uninstalling Bloodhound..."
echo ""

# Check for sudo
if [ "$EUID" -ne 0 ]; then
    echo "Error: Please run this script with sudo."
    echo "Usage: sudo ./uninstall.sh"
    exit 1
fi

# Check if Bloodhound is installed
if [ ! -f "/usr/local/bin/bloodhound" ]; then
    echo "Bloodhound does not appear to be installed."
    exit 0
fi

# Remove the binary
rm /usr/local/bin/bloodhound

echo ""
echo " Bloodhound has been successfully uninstalled."
echo ""