@echo off
chcp 65001 >nul
echo 🥩 肉品知識庫 - 一鍵安裝 (Windows)
echo =================================
echo.

REM 檢查 Node.js
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ 請先安裝 Node.js: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js 已安裝

REM 檢查 Git
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 請先安裝 Git: https://git-scm.com/
    pause
    exit /b 1
)
echo ✅ Git 已安裝

echo.
echo 📦 安裝專案依賴...
call npm install
echo ✅ 依賴安裝完成

echo.
echo 📁 建立資料目錄...
if not exist "data" mkdir data
echo ✅ 資料目錄已建立

echo.
echo 🏪 初始化市場資料...
node scripts\update-markets.js
echo ✅ 市場資料已初始化

echo.
echo 📰 初始化新聞資料...
node scripts\update-news.js
echo ✅ 新聞資料已初始化

echo.
echo 🔧 設定 Git...
if not exist ".git" (
    git init
    echo ✅ Git 倉庫已初始化
)

echo.
echo 💾 建立首次提交...
git add .
git commit -m "🎉 Initial commit: Meat Knowledge Hub v1.0"

echo.
echo 📤 GitHub 設定
echo ===============
echo.
echo 請手動設定 GitHub:
echo   1. 在 GitHub 建立新倉庫: https://github.com/new
echo   2. 執行: git remote add origin https://github.com/YOUR_USERNAME/meat-knowledge-hub.git
echo   3. 執行: git push -u origin main
echo.

echo.
echo 🎉 安裝完成!
echo ============
echo.
echo 快速開始:
echo   start.bat               # 啟動開發伺服器
echo.
echo 常用指令:
echo   npm run dev             # 開發模式
echo   npm run build           # 建置專案
echo   npm run sync-all        # 同步全部資料
echo.
pause
