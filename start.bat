@echo off
chcp 65001 >nul
echo 🥩 肉品知識庫 - 快速啟動 (Windows)
echo ================================
echo.

REM 檢查 Node.js
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ 請先安裝 Node.js: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js 版本: 
node -v

REM 安裝依賴（如果沒有）
if not exist "node_modules" (
    echo 📦 首次安裝依賴...
    call npm install
)

REM 確保資料目錄存在
if not exist "data" mkdir data

REM 檢查資料檔案
if not exist "data\markets.json" (
    echo 🏪 初始化市場資料...
    node scripts\update-markets.js
)

echo.
echo 🚀 啟動開發伺服器...
echo    網址: http://localhost:3000
echo.
call npm run dev
