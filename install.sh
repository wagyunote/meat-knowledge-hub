#!/bin/bash
# 肉品知識庫 - 一鍵安裝腳本
# 自動化環境設定與 GitHub 上傳

set -e

echo "🥩 肉品知識庫 - 一鍵安裝"
echo "========================"
echo ""

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 檢查命令
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 錯誤處理
error_exit() {
    echo -e "${RED}❌ 錯誤: $1${NC}" >&2
    exit 1
}

# 成功訊息
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# 警告訊息
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 檢查系統
success "檢查系統環境..."

# 檢查 Node.js
if command_exists node; then
    NODE_VERSION=$(node -v | cut -d'v' -f2)
    success "Node.js 已安裝: $NODE_VERSION"
else
    error_exit "請先安裝 Node.js: https://nodejs.org/"
fi

# 檢查 Git
if command_exists git; then
    success "Git 已安裝: $(git --version | cut -d' ' -f3)"
else
    error_exit "請先安裝 Git: https://git-scm.com/"
fi

# 檢查 GitHub CLI (可選)
if command_exists gh; then
    success "GitHub CLI 已安裝"
    GH_INSTALLED=true
else
    warning "GitHub CLI 未安裝 (可選但推薦)"
    GH_INSTALLED=false
fi

echo ""
success "環境檢查完成!"
echo ""

# 安裝依賴
echo "📦 安裝專案依賴..."
npm install
success "依賴安裝完成"

# 建立資料目錄
echo ""
echo "📁 建立資料目錄..."
mkdir -p data
success "資料目錄已建立"

# 初始化資料
echo ""
echo "🏪 初始化市場資料..."
node scripts/update-markets.js
success "市場資料已初始化"

echo ""
echo "📰 初始化新聞資料..."
node scripts/update-news.js || warning "新聞資料初始化失敗 (可能無 RSS 來源)"

# 設定 Git
echo ""
echo "🔧 設定 Git..."

if [ ! -d ".git" ]; then
    git init
    success "Git 倉庫已初始化"
fi

# 設定 .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml

# Next.js
.next/
out/
dist/

# Data (自動生成)
data/*.json
!data/.gitkeep

# Logs
*.log
logs/

# Environment
.env
.env.local
.env.*.local

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Backup
backups/
EOF

success ".gitignore 已設定"

# 首次提交
echo ""
echo "💾 建立首次提交..."
git add .
git commit -m "🎉 Initial commit: Meat Knowledge Hub v1.0" || warning "提交可能已存在"

# GitHub 設定
echo ""
echo "📤 GitHub 設定"
echo "==============="
echo ""

if [ "$GH_INSTALLED" = true ]; then
    # 檢查是否已登入
    if gh auth status >/dev/null 2>&1; then
        success "已登入 GitHub"
        
        # 檢查是否已有遠端
        if ! git remote get-url origin >/dev/null 2>&1; then
            echo ""
            read -p "要建立新的 GitHub 倉庫嗎? (y/n): " create_repo
            
            if [ "$create_repo" = "y" ] || [ "$create_repo" = "Y" ]; then
                read -p "請輸入倉庫名稱 (預設: meat-knowledge-hub): " repo_name
                repo_name=${repo_name:-meat-knowledge-hub}
                
                read -p "要設為私有倉庫嗎? (y/n, 預設: n): " private_repo
                
                if [ "$private_repo" = "y" ] || [ "$private_repo" = "Y" ]; then
                    gh repo create "$repo_name" --private --source=. --remote=origin --push
                else
                    gh repo create "$repo_name" --public --source=. --remote=origin --push
                fi
                
                success "GitHub 倉庫已建立並推送!"
            fi
        else
            success "遠端倉庫已設定"
        fi
    else
        warning "請先執行 'gh auth login' 登入 GitHub"
    fi
else
    echo "手動設定 GitHub:"
    echo "  1. 在 GitHub 建立新倉庫: https://github.com/new"
    echo "  2. 執行: git remote add origin https://github.com/YOUR_USERNAME/meat-knowledge-hub.git"
    echo "  3. 執行: git push -u origin main"
fi

# 完成
echo ""
echo "🎉 安裝完成!"
echo "============"
echo ""
echo "快速開始:"
echo "  ./start.sh              # 啟動開發伺服器"
echo "  ./scripts/data-manager.sh   # 資料管理"
echo ""
echo "常用指令:"
echo "  npm run dev             # 開發模式"
echo "  npm run build           # 建置專案"
echo "  npm run sync-all        # 同步全部資料"
echo ""
echo "文件:"
echo "  OPERATIONS.md           # 操作指南"
echo "  README.md               # 專案說明"
echo ""
