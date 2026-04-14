// 資料同步服務
// 負責從各個來源抓取最新資料並更新本地資料檔案

const SYNC_SOURCES = {
  // 食肉通信社 - 產業新聞
  shokuniku: {
    name: '食肉通信社',
    url: 'https://www.shokuniku.co.jp/',
    rssUrl: 'https://www.shokuniku.co.jp/feed/',
    type: 'rss',
    category: 'news',
    updateInterval: 60 * 60 * 1000, // 1小時
    enabled: true
  },
  
  // 日本食肉市場卸売協會
  jmma: {
    name: '食肉市場卸売協會',
    url: 'https://mmb.jmma.or.jp/member/',
    type: 'crawl',
    category: 'markets',
    updateInterval: 24 * 60 * 60 * 1000, // 24小時
    enabled: true
  },
  
  // 日本食肉格付協會
  jmga: {
    name: 'JMGA 食肉格付協會',
    url: 'https://www.jmga.or.jp/standard/beef/',
    type: 'crawl',
    category: 'standards',
    updateInterval: 7 * 24 * 60 * 60 * 1000, // 7天
    enabled: true
  },
  
  // 家畜改良中心
  nlbc: {
    name: '家畜改良中心',
    url: 'https://www.id.nlbc.go.jp/',
    type: 'api',
    category: 'livestock',
    updateInterval: 7 * 24 * 60 * 60 * 1000, // 7天
    enabled: true
  }
};

// 同步狀態管理
class SyncManager {
  constructor() {
    this.lastSync = {};
    this.syncStatus = {};
    this.loadSyncState();
  }
  
  // 載入上次同步狀態
  loadSyncState() {
    const saved = localStorage.getItem('syncState');
    if (saved) {
      const state = JSON.parse(saved);
      this.lastSync = state.lastSync || {};
      this.syncStatus = state.syncStatus || {};
    }
  }
  
  // 儲存同步狀態
  saveSyncState() {
    localStorage.setItem('syncState', JSON.stringify({
      lastSync: this.lastSync,
      syncStatus: this.syncStatus
    }));
  }
  
  // 檢查是否需要同步
  shouldSync(sourceKey) {
    const source = SYNC_SOURCES[sourceKey];
    if (!source || !source.enabled) return false;
    
    const lastSyncTime = this.lastSync[sourceKey] || 0;
    const now = Date.now();
    return (now - lastSyncTime) > source.updateInterval;
  }
  
  // 執行同步
  async sync(sourceKey) {
    const source = SYNC_SOURCES[sourceKey];
    if (!source) {
      console.error(`Unknown source: ${sourceKey}`);
      return null;
    }
    
    this.syncStatus[sourceKey] = 'syncing';
    this.updateUIStatus(sourceKey, 'syncing');
    
    try {
      let data;
      
      switch (source.type) {
        case 'rss':
          data = await this.fetchRSS(source.rssUrl);
          break;
        case 'crawl':
          data = await this.crawlWebsite(source.url);
          break;
        case 'api':
          data = await this.fetchAPI(source.url);
          break;
        default:
          throw new Error(`Unknown sync type: ${source.type}`);
      }
      
      // 處理並儲存資料
      await this.processAndSaveData(sourceKey, data);
      
      this.lastSync[sourceKey] = Date.now();
      this.syncStatus[sourceKey] = 'success';
      this.saveSyncState();
      this.updateUIStatus(sourceKey, 'success');
      
      console.log(`✅ Synced ${source.name} successfully`);
      return data;
      
    } catch (error) {
      console.error(`❌ Failed to sync ${source.name}:`, error);
      this.syncStatus[sourceKey] = 'error';
      this.updateUIStatus(sourceKey, 'error');
      return null;
    }
  }
  
  // 抓取 RSS
  async fetchRSS(url) {
    // 使用 RSS-to-JSON 服務或自建 API
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    return await response.json();
  }
  
  // 爬取網站 (需要後端支援)
  async crawlWebsite(url) {
    // 這裡需要後端服務來處理爬蟲
    // 前端僅能透過 CORS proxy 或自建 API
    const proxyUrl = `/api/crawl?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    return await response.json();
  }
  
  // 呼叫 API
  async fetchAPI(url) {
    const response = await fetch(url);
    return await response.json();
  }
  
  // 處理並儲存資料
  async processAndSaveData(sourceKey, data) {
    const source = SYNC_SOURCES[sourceKey];
    const processedData = this.transformData(sourceKey, data);
    
    // 儲存到 localStorage (開發階段)
    localStorage.setItem(`data_${source.category}`, JSON.stringify({
      data: processedData,
      updatedAt: Date.now(),
      source: source.name
    }));
    
    // 觸發資料更新事件
    window.dispatchEvent(new CustomEvent('dataUpdated', {
      detail: { category: source.category, data: processedData }
    }));
  }
  
  // 資料轉換
  transformData(sourceKey, rawData) {
    switch (sourceKey) {
      case 'shokuniku':
        return this.transformNewsData(rawData);
      case 'jmma':
        return this.transformMarketsData(rawData);
      case 'jmga':
        return this.transformStandardsData(rawData);
      default:
        return rawData;
    }
  }
  
  // 轉換新聞資料
  transformNewsData(rssData) {
    if (!rssData.items) return [];
    
    return rssData.items.map(item => ({
      id: this.generateId(),
      title: item.title,
      description: item.description,
      link: item.link,
      pubDate: new Date(item.pubDate).toISOString(),
      category: this.categorizeNews(item.title),
      source: '食肉通信社',
      syncedAt: Date.now()
    }));
  }
  
  // 轉換市場資料
  transformMarketsData(crawlData) {
    // 根據爬蟲結果轉換
    return crawlData.markets || [];
  }
  
  // 轉換標準資料
  transformStandardsData(crawlData) {
    // 根據爬蟲結果轉換
    return crawlData.standards || [];
  }
  
  // 新聞分類
  categorizeNews(title) {
    const categories = {
      '競賽': '品牌競賽',
      '展': '展會活動',
      '祭': '展會活動',
      '生產': '生產資訊',
      '企業': '企業動態',
      '外食': '外食產業',
      '輸入': '進出口'
    };
    
    for (const [keyword, category] of Object.entries(categories)) {
      if (title.includes(keyword)) return category;
    }
    return '產業新聞';
  }
  
  // 生成唯一 ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  // 更新 UI 狀態
  updateUIStatus(sourceKey, status) {
    const indicator = document.querySelector(`[data-sync-source="${sourceKey}"]`);
    if (indicator) {
      indicator.className = `sync-indicator ${status}`;
      indicator.title = this.getStatusText(status);
    }
    
    // 更新全局同步狀態
    this.updateGlobalSyncStatus();
  }
  
  // 取得狀態文字
  getStatusText(status) {
    const texts = {
      'syncing': '同步中...',
      'success': '同步成功',
      'error': '同步失敗',
      'idle': '等待同步'
    };
    return texts[status] || status;
  }
  
  // 更新全局同步狀態
  updateGlobalSyncStatus() {
    const allStatus = Object.values(this.syncStatus);
    const hasError = allStatus.includes('error');
    const isSyncing = allStatus.includes('syncing');
    
    const globalIndicator = document.querySelector('.sync-status-global');
    if (globalIndicator) {
      if (isSyncing) {
        globalIndicator.className = 'sync-status-global syncing';
        globalIndicator.textContent = '同步更新中...';
      } else if (hasError) {
        globalIndicator.className = 'sync-status-global error';
        globalIndicator.textContent = '部分同步失敗';
      } else {
        globalIndicator.className = 'sync-status-global success';
        const lastUpdate = this.getLastUpdateTime();
        globalIndicator.textContent = `最後更新：${lastUpdate}`;
      }
    }
  }
  
  // 取得最後更新時間
  getLastUpdateTime() {
    const times = Object.values(this.lastSync);
    if (times.length === 0) return '尚未更新';
    
    const latest = Math.max(...times);
    return new Date(latest).toLocaleString('zh-TW');
  }
  
  // 啟動自動同步
  startAutoSync() {
    // 立即檢查並同步
    this.checkAndSyncAll();
    
    // 每5分鐘檢查一次
    setInterval(() => {
      this.checkAndSyncAll();
    }, 5 * 60 * 1000);
  }
  
  // 檢查並同步所有來源
  async checkAndSyncAll() {
    for (const [key, source] of Object.entries(SYNC_SOURCES)) {
      if (this.shouldSync(key)) {
        await this.sync(key);
      }
    }
  }
  
  // 手動同步特定來源
  async manualSync(sourceKey) {
    return await this.sync(sourceKey);
  }
  
  // 取得同步狀態報告
  getSyncReport() {
    return Object.entries(SYNC_SOURCES).map(([key, source]) => ({
      key,
      name: source.name,
      lastSync: this.lastSync[key] ? new Date(this.lastSync[key]).toLocaleString('zh-TW') : '從未同步',
      status: this.syncStatus[key] || 'idle',
      nextSync: this.lastSync[key] 
        ? new Date(this.lastSync[key] + source.updateInterval).toLocaleString('zh-TW')
        : '立即'
    }));
  }
}

// 建立全域實例
const syncManager = new SyncManager();

// 匯出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SyncManager, syncManager, SYNC_SOURCES };
}
