@echo off
echo.
echo  ____  _                   _  _                       _
echo ^|  _ \^| ^|                 ^| ^|^| ^|                     ^| ^|
echo ^| ^|_) ^| ^|  ___    ___    __^| ^|^| ^|__    ___   _   _  _ __   __^| ^|
echo ^|  _ ^<^| ^| / _ \  / _ \  / _` ^|^| '_ \  / _ \ ^| ^| ^| ^|^| '_ \ / _` ^|
echo ^| ^|_) ^| ^|^| (_) ^|^| (_) ^|^| (_^| ^|^| ^| ^| ^|^| (_) ^|^| ^|_^| ^|^| ^| ^| ^|^| (_^| ^|
echo ^|____/^|_^| \___/  \___/  \__,_^|^|_^| ^|_^| \___/  \__,_^|^|_^| ^|_^| \__,_^|
echo.
echo  Uninstalling Bloodhound...
echo.

:: Check for admin privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Error: Please run this script as Administrator.
    echo Right-click uninstall.bat and select "Run as administrator".
    pause
    exit /b 1
)

:: Check if Bloodhound is installed
set "INSTALL_DIR=%ProgramFiles%\Bloodhound"
if not exist "%INSTALL_DIR%" (
    echo Bloodhound does not appear to be installed.
    pause
    exit /b 0
)

:: Remove the installation folder
rmdir /S /Q "%INSTALL_DIR%"
echo Removed installation folder.

:: Safely remove Bloodhound from PATH using PowerShell array splitting
%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe -Command ^
    "$installDir = '%INSTALL_DIR%';" ^
    "$currentPath = [Environment]::GetEnvironmentVariable('Path', 'Machine');" ^
    "$entries = $currentPath -split ';';" ^
    "$newPath = ($entries | Where-Object { $_ -ne $installDir }) -join ';';" ^
    "[Environment]::SetEnvironmentVariable('Path', $newPath, 'Machine')"
echo Removed Bloodhound from PATH.

echo.
echo  Bloodhound has been successfully uninstalled.
echo.
pause