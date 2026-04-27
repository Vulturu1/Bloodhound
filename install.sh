#!/bin/bash

echo ""
echo " ____  _                   _  _                       _"
echo "|  _ \| |                 | || |                     | |"
echo "| |_) | |  ___    ___    __| || |__    ___   _   _  _ __   __| |"
echo "|  _ <| | / _ \  / _ \  / _\` || '_ \  / _ \ | | | || '_ \ / _\` |"
echo "| |_) | || (_) || (_) || (_| || | | || (_) || |_| || | | || (_| |"
echo "|____/|_| \___/  \___/  \__,_||_| |_| \___/  \__,_||_| |_| \__,_|"
echo ""
echo " Hunt down forgotten code annotations and technical debt."
echo ""

# Detect platform
PLATFORM="$(uname -s)"
if [ "$PLATFORM" = "Darwin" ]; then
    BINARY="bloodhound-macos"
else
    BINARY="bloodhound-linux"
fi

# Check if binary exists
if [ ! -f "$(dirname "$0")/$BINARY" ]; then
    echo "Error: $BINARY not found."
    echo "Please make sure $BINARY is in the same folder as this script."
    exit 1
fi

# Check for sudo
if [ "$EUID" -ne 0 ]; then
    echo "Error: Please run this script with sudo."
    echo "Usage: sudo ./install.sh"
    exit 1
fi

# Copy binary to /usr/local/bin
cp "$(dirname "$0")/$BINARY" /usr/local/bin/bloodhound
chmod +x /usr/local/bin/bloodhound

echo ""
echo " Bloodhound installed successfully!"
echo " Run: bloodhound sniff"
echo ""