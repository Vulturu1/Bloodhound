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

:: Remove from PATH
set "NEW_PATH="
for %%i in ("%PATH:;=" "%") do (
    if /I not "%%~i"=="%INSTALL_DIR%" (
        if defined NEW_PATH (
            set "NEW_PATH=%NEW_PATH%;%%~i"
        ) else (
            set "NEW_PATH=%%~i"
        )
    )
)
setx /M PATH "%NEW_PATH%"
echo Removed Bloodhound from PATH.

echo.
echo  Bloodhound has been successfully uninstalled.
echo.
pause