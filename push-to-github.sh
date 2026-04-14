#!/bin/bash
# 推送到 GitHub 腳本

echo "🚀 推送到 GitHub"
echo "==============="
echo ""

# 檢查 git
if ! command -v git &> /dev/null; then
    echo "❌ 請先安裝 Git"
    exit 1
fi

# 檢查是否有變更
if git diff --quiet && git diff --staged --quiet; then
    echo "ℹ️  沒有變更需要提交"
else
    echo "💾 提交變更..."
    git add .
    git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi

# 檢查遠端
if ! git remote get-url origin >/dev/null 2>&1; then
    echo ""
    echo "⚠️  尚未設定遠端倉庫"
    echo ""
    read -p "請輸入 GitHub 使用者名稱: " username
    read -p "請輸入倉庫名稱 (預設: meat-knowledge-hub): " repo_name
    repo_name=${repo_name:-meat-knowledge-hub}
    
    git remote add origin "https://github.com/$username/$repo_name.git"
    echo "✅ 遠端倉庫已設定"
fi

# 推送
echo ""
echo "📤 推送到 GitHub..."
git push -u origin main || git push -u origin master

echo ""
echo "✅ 推送完成!"
echo ""
echo "GitHub 倉庫: $(git remote get-url origin)"
