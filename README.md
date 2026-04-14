# 肉品知識庫 - Meat Knowledge Hub

整合日本官方肉品分級標準、全國食肉市場資訊、產業動態與專業知識的即時資訊平台。

## 🚀 快速開始

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 建置生產版本
npm run build

# 啟動生產伺服器
npm start
```

## 📡 RSS 自動同步

### 手動更新

```bash
# 更新新聞
npm run update-news

# 更新市場資料
npm run update-markets

# 同步全部
npm run sync-all
```

### 自動排程（推薦）

使用 cron 設定自動更新：

```bash
# 每小時更新新聞
0 * * * * cd /path/to/meat-knowledge-hub && npm run update-news

# 每日更新市場資料
0 0 * * * cd /path/to/meat-knowledge-hub && npm run update-markets
```

## 📁 專案結構

```
meat-knowledge-hub/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   ├── news/         # 新聞 API
│   │   ├── markets/      # 市場 API
│   │   └── last-update/  # 更新時間 API
│   ├── layout.tsx        # 根佈局
│   ├── page.tsx          # 首頁
│   └── globals.css       # 全域樣式
├── components/            # React 組件
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── NewsSection.tsx
│   ├── KnowledgeSection.tsx
│   ├── MarketsSection.tsx
│   ├── StandardsSection.tsx
│   ├── FAQSection.tsx
│   ├── DataSourcesSection.tsx
│   └── Footer.tsx
├── scripts/              # 資料更新腳本
│   ├── update-news.js    # RSS 抓取腳本
│   └── update-markets.js # 市場資料腳本
├── data/                 # 本地資料（自動生成）
│   ├── news.json
│   └── markets.json
├── types/                # TypeScript 型別
│   └── index.ts
├── public/               # 靜態資源
├── tailwind.config.js    # Tailwind 設定
└── next.config.js        # Next.js 設定
```

## 🌐 資料來源

| 來源 | 網址 | 更新頻率 |
|------|------|---------|
| 日本食肉市場卸売協會 | https://mmb.jmma.or.jp/ | 每日 |
| 食肉通信社 | https://www.shokuniku.co.jp/ | 每小時 |
| JMGA 食肉格付協會 | https://www.jmga.or.jp/ | 每日 |
| 日本家畜改良中心 | https://www.id.nlbc.go.jp/ | 每日 |

## 🛠️ 技術棧

- **框架**: Next.js 14 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **動畫**: Framer Motion
- **圖示**: Lucide React
- **RSS 解析**: rss-parser
- **字型**: Noto Sans TC, Noto Serif TC

## 📝 授權

資料僅供參考，正式規格請以官方網站為準。

© 2026 肉品知識庫 Meat Knowledge Hub
