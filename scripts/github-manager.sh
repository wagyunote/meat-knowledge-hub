#!/bin/bash
# GitHub 倉庫管理腳本
# 用於肉品知識庫專案的 GitHub 操作

set -e

REPO_URL=""
PROJECT_NAME="meat-knowledge-hub"

echo "🥩 肉品知識庫 GitHub 管理腳本"
echo "=============================="

# 檢查參數
if [ $# -eq 0 ]; then
    echo ""
    echo "使用方法:"
    echo "  ./github-manager.sh init <your-username>    - 初始化 GitHub 倉庫"
    echo "  ./github-manager.sh push                    - 推送更新到 GitHub"
    echo "  ./github-manager.sh pull                    - 從 GitHub 拉取更新"
    echo "  ./github-manager.sh sync                    - 同步資料並推送"
    echo "  ./github-manager.sh deploy                  - 部署到 Vercel/Netlify"
    echo "  ./github-manager.sh status                  - 查看倉庫狀態"
    echo ""
    exit 0
fi

COMMAND=$1

case $COMMAND in
    init)
        USERNAME=${2:-"your-username"}
        echo "🔧 初始化 GitHub 倉庫..."
        
        # 檢查 git
        if ! command -v git &> /dev/null; then
            echo "❌ 請先安裝 git"
            exit 1
        fi
        
        # 檢查 gh CLI
        if ! command -v gh &> /dev/null; then
            echo "⚠️  建議安裝 GitHub CLI (gh) 以獲得更好的體驗"
            echo "   安裝方式: https://cli.github.com/"
        fi
        
        # 初始化 git
        if [ ! -d ".git" ]; then
            git init
            echo "✅ Git 倉庫已初始化"
        fi
        
        # 建立 .gitignore
        cat > .gitignore << 'EOF'
node_modules/
.next/
out/
data/*.json
*.log
.env
.env.local
.DS_Store
EOF
        
        # 添加所有檔案
        git add .
        git commit -m "Initial commit: Meat Knowledge Hub v1.0" || echo "已提交"
        
        echo ""
        echo "📋 下一步："
        echo "  1. 在 GitHub 建立新倉庫: https://github.com/new"
        echo "  2. 倉庫名稱: $PROJECT_NAME"
        echo "  3. 執行: git remote add origin https://github.com/$USERNAME/$PROJECT_NAME.git"
        echo "  4. 執行: git push -u origin main"
        echo ""
        ;;
        
    push)
        echo "📤 推送更新到 GitHub..."
        
        # 檢查是否有變更
        if git diff --quiet && git diff --staged --quiet; then
            echo "ℹ️  沒有變更需要推送"
        else
            git add .
            git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"
            git push
            echo "✅ 已推送到 GitHub"
        fi
        ;;
        
    pull)
        echo "📥 從 GitHub 拉取更新..."
        git pull origin main
        echo "✅ 已拉取最新更新"
        ;;
        
    sync)
        echo "🔄 同步資料並推送..."
        
        # 更新資料
        if [ -f "scripts/update-news.js" ]; then
            echo "📰 更新新聞資料..."
            node scripts/update-news.js || echo "⚠️ 新聞更新失敗"
        fi
        
        if [ -f "scripts/update-markets.js" ]; then
            echo "🏪 更新市場資料..."
            node scripts/update-markets.js || echo "⚠️ 市場更新失敗"
        fi
        
        # 推送
        git add .
        git commit -m "Data sync: $(date '+%Y-%m-%d %H:%M:%S')" || echo "沒有變更"
        git push
        echo "✅ 同步完成"
        ;;
        
    deploy)
        echo "🚀 部署選項:"
        echo ""
        echo "1. Vercel (推薦)"
        echo "   - 連結: https://vercel.com/new"
        echo "   - 導入 GitHub 倉庫即可自動部署"
        echo ""
        echo "2. Netlify"
        echo "   - 連結: https://app.netlify.com/start"
        echo "   - 選擇 GitHub 倉庫部署"
        echo ""
        echo "3. GitHub Pages"
        echo "   - 設定: Settings > Pages"
        echo "   - 選擇 Branch: main / Folder: /docs"
        echo ""
        ;;
        
    status)
        echo "📊 倉庫狀態:"
        echo ""
        git status
        echo ""
        echo "📈 最近提交:"
        git log --oneline -5
        ;;
        
    *)
        echo "❌ 未知命令: $COMMAND"
        echo "使用: ./github-manager.sh (無參數查看幫助)"
        exit 1
        ;;
esac
