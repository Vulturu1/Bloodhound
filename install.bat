@echo off
echo.
echo  ____  _                   _  _                       _
echo ^|  _ \^| ^|                 ^| ^|^| ^|                     ^| ^|
echo ^| ^|_) ^| ^|  ___    ___    __^| ^|^| ^|__    ___   _   _  _ __   __^| ^|
echo ^|  _ ^<^| ^| / _ \  / _ \  / _` ^|^| '_ \  / _ \ ^| ^| ^| ^|^| '_ \ / _` ^|
echo ^| ^|_) ^| ^|^| (_) ^|^| (_) ^|^| (_^| ^|^| ^| ^| ^|^| (_) ^|^| ^|_^| ^|^| ^| ^| ^|^| (_^| ^|
echo ^|____/^|_^| \___/  \___/  \__,_^|^|_^| ^|_^| \___/  \__,_^|^|_^| ^|_^| \__,_^|
echo.
echo  Hunt down forgotten code annotations and technical debt.
echo.

:: Check for admin privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Error: Please run this script as Administrator.
    echo Right-click install.bat and select "Run as administrator".
    pause
    exit /b 1
)

:: Check if binary exists
if not exist "%~dp0bloodhound-win.exe" (
    echo Error: bloodhound-win.exe not found.
    echo Please make sure bloodhound-win.exe is in the same folder as this script.
    pause
    exit /b 1
)

:: Copy binary to a directory on PATH
set "INSTALL_DIR=%ProgramFiles%\Bloodhound"
if not exist "%INSTALL_DIR%" mkdir "%INSTALL_DIR%"
copy /Y "%~dp0bloodhound-win.exe" "%INSTALL_DIR%\bloodhound.exe"

:: Add to PATH if not already there
echo %PATH% | find /i "%INSTALL_DIR%" >nul
if %errorLevel% neq 0 (
    setx /M PATH "%PATH%;%INSTALL_DIR%"
    echo Added Bloodhound to PATH.
)

echo.
echo  Bloodhound installed successfully!
echo  Open a new terminal and run: bloodhound sniff
echo.
pause