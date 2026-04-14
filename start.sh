#!/bin/bash
# 快速啟動腳本
# 一鍵啟動開發環境

echo "🥩 肉品知識庫 - 快速啟動"
echo "======================="
echo ""

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

# 檢查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 請先安裝 Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"

# 安裝依賴（如果沒有）
if [ ! -d "node_modules" ]; then
    echo "📦 首次安裝依賴..."
    npm install
fi

# 確保資料目錄存在
mkdir -p data

# 檢查資料檔案
if [ ! -f "data/markets.json" ]; then
    echo "🏪 初始化市場資料..."
    node scripts/update-markets.js
fi

# 啟動開發伺服器
echo ""
echo "🚀 啟動開發伺服器..."
echo "   網址: http://localhost:3000"
echo ""
npm run dev
