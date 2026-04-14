@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

set "REPO_DIR=%USERPROFILE%\.qclaw\workspace\meat-knowledge-hub"
set "GH=%ProgramFiles%\GitHub CLI\gh.exe"
set "GIT=%ProgramFiles%\Git\cmd\git.exe"
set "PATH_UPDATED=0"

:: Refresh PATH to find newly installed tools
for /f "delims=" %%p in ('powershell -NoProfile -Command "[System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')"') do set "PATH=%%p"
set "PATH_UPDATED=1"

cd /d "%REPO_DIR%" || (echo ERROR: Cannot find repo dir & exit /b 1)

echo === Meat Knowledge Hub Auto Deploy ===
echo %date% %time%
echo.

:: Step 1: Update data
echo [1/4] Updating news data...
call npm run update-news
if errorlevel 1 echo WARN: News update failed, continuing...

echo.
echo [2/4] Updating markets data...
call npm run update-markets
if errorlevel 1 echo WARN: Markets update failed, continuing...

:: Step 2: Copy data to public for static serving
echo.
echo [3/4] Copying data to public...
if not exist "public\data" mkdir "public\data"
copy /y "data\news.json" "public\data\" >nul 2>&1
copy /y "data\markets.json" "public\data\" >nul 2>&1

:: Step 3: Git commit and push
echo.
echo [4/4] Git commit and push...
"%GIT%" add -A
"%GIT%" diff --staged --quiet
if errorlevel 1 (
    for /f "delims=" %%t in ('powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd HH:mm'"') do set "TIMESTAMP=%%t"
    "%GIT%" commit -m "🔄 Auto-sync data: !TIMESTAMP!"
    if errorlevel 1 (
        echo ERROR: Git commit failed
        exit /b 1
    )
    "%GIT%" push origin main
    if errorlevel 1 (
        echo ERROR: Git push failed
        exit /b 1
    )
    echo SUCCESS: Pushed to GitHub, Pages will auto-deploy
) else (
    echo INFO: No changes to commit
)

echo.
echo === Done ===
