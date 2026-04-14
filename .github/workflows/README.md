# 🤖 GitHub Actions 自動化

這個專案包含以下自動化工作流程：

## 📊 資料同步 (`sync-data.yml`)

**觸發時機:**
- 每天 UTC 00:00 (台灣時間 08:00)
- 手動觸發 (workflow_dispatch)

**執行內容:**
1. 更新市場資料 (`update-markets.js`)
2. 更新新聞資料 (`update-news.js`)
3. 自動提交變更到 GitHub

## 🚀 自動部署 (`deploy.yml`)

**觸發時機:**
- 推送到 main 分支
- 手動觸發

**執行內容:**
1. 安裝依賴
2. 建置專案
3. 部署到 Vercel

## 🔧 設定 Secrets

在 GitHub 倉庫設定中新增以下 Secrets：

| Secret | 說明 |
|--------|------|
| `VERCEL_TOKEN` | Vercel 存取權杖 |
| `VERCEL_ORG_ID` | Vercel 組織 ID |
| `VERCEL_PROJECT_ID` | Vercel 專案 ID |

### 取得 Vercel Secrets

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入
vercel login

# 連結專案
vercel link

# 查看設定
cat .vercel/project.json
```
