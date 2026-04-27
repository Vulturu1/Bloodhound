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

:: Create install directory
set "INSTALL_DIR=%ProgramFiles%\Bloodhound"
if not exist "%INSTALL_DIR%" mkdir "%INSTALL_DIR%"

:: Copy binary
copy /Y "%~dp0bloodhound-win.exe" "%INSTALL_DIR%\bloodhound.exe"
echo Copied bloodhound.exe to %INSTALL_DIR%

:: Safely add literal install path to PATH using PowerShell array splitting
:: This avoids corrupting existing PATH entries
%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe -Command ^
    "$installDir = '%INSTALL_DIR%';" ^
    "$currentPath = [Environment]::GetEnvironmentVariable('Path', 'Machine');" ^
    "$entries = $currentPath -split ';';" ^
    "if ($entries -notcontains $installDir) {" ^
    "    $newPath = ($entries + $installDir) -join ';';" ^
    "    [Environment]::SetEnvironmentVariable('Path', $newPath, 'Machine')" ^
    "}"
echo Added Bloodhound to system PATH.

echo.
echo  Bloodhound installed successfully!
echo  Open a new terminal and run: bloodhound sniff
echo.
pause