#!/bin/bash
# 資料同步與管理腳本
# 自動化 RSS 抓取、資料更新與備份

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DATA_DIR="$PROJECT_DIR/data"
LOG_FILE="$PROJECT_DIR/sync.log"

echo "🥩 肉品知識庫資料管理系統"
echo "=========================="
echo ""

# 記錄日誌
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# 檢查 Node.js
check_node() {
    if ! command -v node &> /dev/null; then
        echo "❌ 請先安裝 Node.js"
        echo "   下載: https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo "⚠️  Node.js 版本過低，建議使用 v18 或更高版本"
    fi
}

# 安裝依賴
install_deps() {
    echo "📦 檢查依賴..."
    cd "$PROJECT_DIR"
    
    if [ ! -d "node_modules" ]; then
        log "安裝依賴..."
        npm install
    fi
}

# 更新新聞
update_news() {
    log "開始更新新聞資料..."
    
    if [ -f "$PROJECT_DIR/scripts/update-news.js" ]; then
        node "$PROJECT_DIR/scripts/update-news.js"
        log "✅ 新聞更新完成"
    else
        log "⚠️  update-news.js 不存在"
    fi
}

# 更新市場
update_markets() {
    log "開始更新市場資料..."
    
    if [ -f "$PROJECT_DIR/scripts/update-markets.js" ]; then
        node "$PROJECT_DIR/scripts/update-markets.js"
        log "✅ 市場更新完成"
    else
        log "⚠️  update-markets.js 不存在"
    fi
}

# 備份資料
backup_data() {
    BACKUP_DIR="$PROJECT_DIR/backups/$(date '+%Y%m%d_%H%M%S')"
    mkdir -p "$BACKUP_DIR"
    
    if [ -d "$DATA_DIR" ]; then
        cp -r "$DATA_DIR"/* "$BACKUP_DIR"/ 2>/dev/null || true
        log "✅ 資料已備份到: $BACKUP_DIR"
    fi
}

# 清理舊備份
cleanup_backups() {
    BACKUP_DIR="$PROJECT_DIR/backups"
    if [ -d "$BACKUP_DIR" ]; then
        # 保留最近 10 個備份
        ls -t "$BACKUP_DIR" | tail -n +11 | xargs -r rm -rf
        log "🧹 舊備份已清理"
    fi
}

# 顯示資料統計
show_stats() {
    echo ""
    echo "📊 資料統計:"
    echo "------------"
    
    if [ -f "$DATA_DIR/news.json" ]; then
        NEWS_COUNT=$(grep -c '"id"' "$DATA_DIR/news.json" 2>/dev/null || echo "0")
        echo "📰 新聞數量: $NEWS_COUNT 條"
    fi
    
    if [ -f "$DATA_DIR/markets.json" ]; then
        MARKETS_COUNT=$(grep -c '"id"' "$DATA_DIR/markets.json" 2>/dev/null || echo "0")
        echo "🏪 市場數量: $MARKETS_COUNT 個"
    fi
    
    echo ""
}

# 主選單
show_menu() {
    echo ""
    echo "請選擇操作:"
    echo "  1) 更新新聞資料"
    echo "  2) 更新市場資料"
    echo "  3) 同步全部資料"
    echo "  4) 備份資料"
    echo "  5) 顯示統計"
    echo "  6) 開發模式 (npm run dev)"
    echo "  7) 建置專案 (npm run build)"
    echo "  0) 退出"
    echo ""
}

# 處理選擇
handle_choice() {
    case $1 in
        1)
            check_node
            install_deps
            update_news
            show_stats
            ;;
        2)
            check_node
            install_deps
            update_markets
            show_stats
            ;;
        3)
            check_node
            install_deps
            backup_data
            update_news
            update_markets
            cleanup_backups
            show_stats
            log "🎉 全部同步完成!"
            ;;
        4)
            backup_data
            ;;
        5)
            show_stats
            ;;
        6)
            check_node
            install_deps
            echo "🚀 啟動開發伺服器..."
            cd "$PROJECT_DIR" && npm run dev
            ;;
        7)
            check_node
            install_deps
            echo "🔨 建置專案..."
            cd "$PROJECT_DIR" && npm run build
            ;;
        0)
            echo "👋 再見!"
            exit 0
            ;;
        *)
            echo "❌ 無效選擇"
            ;;
    esac
}

# 命令行模式
if [ $# -gt 0 ]; then
    case $1 in
        news)
            check_node
            install_deps
            update_news
            ;;
        markets)
            check_node
            install_deps
            update_markets
            ;;
        sync)
            check_node
            install_deps
            backup_data
            update_news
            update_markets
            cleanup_backups
            ;;
        backup)
            backup_data
            ;;
        stats)
            show_stats
            ;;
        dev)
            check_node
            install_deps
            cd "$PROJECT_DIR" && npm run dev
            ;;
        build)
            check_node
            install_deps
            cd "$PROJECT_DIR" && npm run build
            ;;
        *)
            echo "使用方法:"
            echo "  ./data-manager.sh           - 互動模式"
            echo "  ./data-manager.sh news      - 更新新聞"
            echo "  ./data-manager.sh markets   - 更新市場"
            echo "  ./data-manager.sh sync      - 同步全部"
            echo "  ./data-manager.sh backup    - 備份資料"
            echo "  ./data-manager.sh stats     - 顯示統計"
            echo "  ./data-manager.sh dev       - 開發模式"
            echo "  ./data-manager.sh build     - 建置專案"
            ;;
    esac
    exit 0
fi

# 互動模式
while true; do
    show_menu
    read -p "請輸入選項 (0-7): " choice
    handle_choice "$choice"
    echo ""
    read -p "按 Enter 繼續..."
done
