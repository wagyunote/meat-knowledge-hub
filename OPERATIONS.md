# 🥩 肉品知識庫操作指南

## 快速開始

### 1. 一鍵啟動 (推薦)

**Mac/Linux:**
```bash
./start.sh
```

**Windows:**
```cmd
start.bat
```

### 2. 資料管理

**互動模式:**
```bash
./scripts/data-manager.sh
```

**命令列模式:**
```bash
# 更新新聞
./scripts/data-manager.sh news

# 更新市場
./scripts/data-manager.sh markets

# 同步全部
./scripts/data-manager.sh sync

# 開發模式
./scripts/data-manager.sh dev

# 建置專案
./scripts/data-manager.sh build
```

### 3. GitHub 管理

```bash
# 初始化倉庫
./scripts/github-manager.sh init <your-username>

# 推送更新
./scripts/github-manager.sh push

# 拉取更新
./scripts/github-manager.sh pull

# 同步並推送
./scripts/github-manager.sh sync

# 查看狀態
./scripts/github-manager.sh status
```

## 專案結構

```
meat-knowledge-hub/
├── 📁 app/              # Next.js 應用程式
├── 📁 components/       # React 組件
├── 📁 scripts/          # 管理腳本
│   ├── data-manager.sh    # 資料管理
│   ├── github-manager.sh  # GitHub 管理
│   ├── update-news.js     # RSS 更新
│   └── update-markets.js  # 市場更新
├── 📁 data/             # 資料檔案 (自動生成)
├── 📁 .github/          # GitHub Actions
│   └── workflows/
│       ├── sync-data.yml   # 自動同步
│       └── deploy.yml      # 自動部署
├── start.sh             # 快速啟動 (Mac/Linux)
├── start.bat            # 快速啟動 (Windows)
└── package.json         # 專案設定
```

## 自動化功能

### 本地自動化
- ⏰ 每小時自動同步新聞 (Cron)
- 📅 每日自動同步市場資料 (Cron)

### GitHub Actions
- 🔄 每日 UTC 00:00 自動同步資料
- 🚀 推送到 main 自動部署到 Vercel

## 常用指令

```bash
# 開發模式
npm run dev

# 建置
npm run build

# 更新資料
npm run update-news
npm run update-markets
npm run sync-all

# 安裝依賴
npm install
```

## 資料來源

| 來源 | 網址 | 更新頻率 |
|------|------|---------|
| 食肉市場卸売協會 | https://mmb.jmma.or.jp/ | 每日 |
| 食肉通信社 RSS | https://www.shokuniku.co.jp/feed/ | 每小時 |
| JMGA 格付協會 | https://www.jmga.or.jp/ | 每日 |

## 部署

### Vercel (推薦)
1. 連結 GitHub 倉庫
2. 自動部署

### Netlify
1. 導入 GitHub 倉庫
2. 設定建置指令: `npm run build`
3. 設定輸出目錄: `out`

## 支援

有問題？請參考：
- [Next.js 文件](https://nextjs.org/docs)
- [Tailwind CSS 文件](https://tailwindcss.com/docs)
- [GitHub Actions 文件](https://docs.github.com/actions)
