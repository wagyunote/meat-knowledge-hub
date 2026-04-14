@echo off
chcp 65001 >nul
echo 🚀 推送到 GitHub
echo ===============
echo.

echo 💾 提交變更...
git add .
git commit -m "Update: %date% %time%"

echo.
echo 📤 推送到 GitHub...
git push -u origin main
git push -u origin master

echo.
echo ✅ 推送完成!
pause
