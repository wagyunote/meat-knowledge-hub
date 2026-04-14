// 資料管理模組
// 負責資料的載入、快取、查詢與更新

const DataManager = {
  // 資料快取
  cache: {},
  
  // 資料結構定義
  schemas: {
    news: {
      id: 'string',
      title: 'string',
      description: 'string',
      link: 'string',
      pubDate: 'string',
      category: 'string',
      source: 'string',
      syncedAt: 'number'
    },
    markets: {
      id: 'string',
      name: 'string',
      region: 'string',
      address: 'string',
      operator: 'string',
      phone: 'string',
      website: 'string',
      updatedAt: 'number'
    },
    knowledge: {
      id: 'string',
      category: 'string',
      title: 'string',
      content: 'string',
      tags: 'array',
      updatedAt: 'number'
    },
    standards: {
      id: 'string',
      country: 'string',
      grade: 'string',
      description: 'string',
      criteria: 'object',
      updatedAt: 'number'
    }
  },
  
  // 初始化
  init() {
    this.loadAllData();
    this.setupEventListeners();
  },
  
  // 載入所有資料
  loadAllData() {
    const categories = ['news', 'markets', 'knowledge', 'standards'];
    categories.forEach(category => {
      this.loadData(category);
    });
  },
  
  // 載入特定類別資料
  loadData(category) {
    try {
      // 從 localStorage 載入
      const saved = localStorage.getItem(`data_${category}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.cache[category] = parsed.data || [];
        return this.cache[category];
      }
      
      // 若無快取，載入預設資料
      this.cache[category] = this.getDefaultData(category);
      return this.cache[category];
      
    } catch (error) {
      console.error(`Failed to load ${category} data:`, error);
      return this.getDefaultData(category);
    }
  },
  
  // 取得預設資料
  getDefaultData(category) {
    const defaults = {
      news: this.getDefaultNews(),
      markets: this.getDefaultMarkets(),
      knowledge: this.getDefaultKnowledge(),
      standards: this.getDefaultStandards()
    };
    return defaults[category] || [];
  },
  
  // 預設新聞資料
  getDefaultNews() {
    return [
      {
        id: 'news-001',
        title: '銘柄豬肉好感度競賽結果公布：國產「高座豚」、進口「みらいそだち 三元豚」獲選',
        description: '在東京Big Sight舉辦的第50回食肉產業展中，國產部門由(株)セントラルフーズ的「高座豚」、進口部門由伊藤ハム的「みらいそだち 三元豚」獲得最高評價。',
        link: 'https://www.shokuniku.co.jp/14294',
        pubDate: '2026-03-16T00:00:00Z',
        category: '品牌競賽',
        source: '食肉通信社',
        syncedAt: Date.now()
      },
      {
        id: 'news-002',
        title: '第50回食肉產業展2026 在東京Big Sight盛大開幕',
        description: '「第50回食肉產業展2026」於3月10日至13日在東京Big Sight東7廳舉辦，59社174攤位參展，與「FOODEX JAPAN」同時舉辦。',
        link: 'https://www.shokuniku.co.jp/14284',
        pubDate: '2026-03-11T00:00:00Z',
        category: '展會活動',
        source: '食肉通信社',
        syncedAt: Date.now()
      },
      {
        id: 'news-003',
        title: '近江肉牛協會舉辦「近江牛BBQ祭in築地」推廣活動',
        description: '近江肉牛協會於3月7日在築地魚河岸舉辦BBQ活動，推廣滋賀縣產近江牛，獲得廣大迴響。',
        link: 'https://www.shokuniku.co.jp/14279',
        pubDate: '2026-03-10T00:00:00Z',
        category: '生產資訊',
        source: '食肉通信社',
        syncedAt: Date.now()
      }
    ];
  },
  
  // 預設市場資料
  getDefaultMarkets() {
    return [
      {
        id: 'market-001',
        name: '仙台市中央卸売市場食肉市場',
        region: '東北',
        address: '仙台市宮城野区扇町6丁目3番6號',
        operator: '仙台中央食肉卸売市場株式會社',
        phone: '022-258-6011',
        website: 'https://mmb.jmma.or.jp/member/sendai/',
        updatedAt: Date.now()
      },
      {
        id: 'market-002',
        name: '東京都中央卸売市場食肉市場',
        region: '關東',
        address: '東京都港區港南2丁目7番19號',
        operator: '東京食肉市場株式會社',
        phone: '03-3740-3111',
        website: 'https://mmb.jmma.or.jp/member/tokyo/',
        updatedAt: Date.now()
      },
      {
        id: 'market-003',
        name: '大阪中央卸売市場 南港市場',
        region: '近畿',
        address: '大阪市住之江區南港南5丁目2番48號',
        operator: '大阪市食肉市場株式會社',
        phone: '06-6675-2110',
        website: 'https://mmb.jmma.or.jp/member/osaka/',
        updatedAt: Date.now()
      },
      {
        id: 'market-004',
        name: '名古屋市中央卸売市場南部市場',
        region: '中部',
        address: '名古屋市港區船見町1番地之39',
        operator: '名古屋食肉市場株式會社',
        phone: '052-614-1129',
        website: 'https://mmb.jmma.or.jp/member/nagoya/',
        updatedAt: Date.now()
      }
    ];
  },
  
  // 預設知識資料
  getDefaultKnowledge() {
    return [
      {
        id: 'knowledge-001',
        category: 'beef-cuts',
        title: '牛肉部位指南',
        content: '牛肉主要分為七大部位：肩胛部(CHUCK)、肋脊部(RIB)、前腰脊部(SHORT LOIN)、後腰脊部(SIRLOIN)、後腿部(ROUND)、胸腹部(SHORT PLATE)、牛小排(SHORT RIB)。',
        tags: ['部位', '牛肉', '基礎知識'],
        updatedAt: Date.now()
      },
      {
        id: 'knowledge-002',
        category: 'cooking',
        title: '牛排熟度判斷',
        content: '1-2分(Rare)：中心血紅；3-4分(Medium Rare)：中心粉紅；5-6分(Medium)：中心淡粉；7-8分(Medium Well)：中心微粉；Well Done：全熟無粉紅。',
        tags: ['熟度', '牛排', '料理'],
        updatedAt: Date.now()
      },
      {
        id: 'knowledge-003',
        category: 'feeding',
        title: '穀物飼養 vs 草料飼養',
        content: '穀物飼養：肉色櫻紅、油花均勻、肉質柔嫩；草料飼養：瘦肉較多、脂肪較少、低膽固醇。',
        tags: ['飼育', '穀物', '草料'],
        updatedAt: Date.now()
      }
    ];
  },
  
  // 預設標準資料
  getDefaultStandards() {
    return {
      jmga: {
        country: '日本',
        organization: 'JMGA 食肉格付協會',
        yieldGrades: ['A', 'B', 'C'],
        meatGrades: [5, 4, 3, 2, 1],
        criteria: ['脂肪交雜', '肉色澤', '肉緊實度', '脂肪色澤'],
        description: '步留等級(A-C) × 肉質等級(1-5) = 15種組合'
      },
      usda: {
        country: '美國',
        organization: 'USDA',
        grades: ['Prime', 'Choice', 'Select'],
        cab: {
          name: 'Certified Angus Beef',
          acceptance: '約2%',
          criteria: ['大理石紋', '成熟度', '肉色', '脂肪色']
        }
      }
    };
  },
  
  // 查詢資料
  query(category, filters = {}) {
    let data = this.cache[category] || [];
    
    // 套用篩選條件
    if (filters.region) {
      data = data.filter(item => item.region === filters.region);
    }
    if (filters.category) {
      data = data.filter(item => item.category === filters.category);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      data = data.filter(item => 
        item.title?.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // 排序
    if (filters.sortBy) {
      data.sort((a, b) => {
        if (filters.sortOrder === 'asc') {
          return a[filters.sortBy] > b[filters.sortBy] ? 1 : -1;
        }
        return a[filters.sortBy] < b[filters.sortBy] ? 1 : -1;
      });
    }
    
    // 分頁
    if (filters.limit) {
      const start = filters.offset || 0;
      data = data.slice(start, start + filters.limit);
    }
    
    return data;
  },
  
  // 取得單一項目
  getById(category, id) {
    const data = this.cache[category] || [];
    return data.find(item => item.id === id);
  },
  
  // 更新資料
  update(category, id, updates) {
    const data = this.cache[category] || [];
    const index = data.findIndex(item => item.id === id);
    
    if (index !== -1) {
      data[index] = { ...data[index], ...updates, updatedAt: Date.now() };
      this.saveData(category);
      return data[index];
    }
    return null;
  },
  
  // 新增資料
  add(category, item) {
    if (!item.id) {
      item.id = this.generateId();
    }
    item.createdAt = Date.now();
    item.updatedAt = Date.now();
    
    if (!this.cache[category]) {
      this.cache[category] = [];
    }
    this.cache[category].push(item);
    this.saveData(category);
    return item;
  },
  
  // 刪除資料
  delete(category, id) {
    const data = this.cache[category] || [];
    const index = data.findIndex(item => item.id === id);
    
    if (index !== -1) {
      const deleted = data.splice(index, 1)[0];
      this.saveData(category);
      return deleted;
    }
    return null;
  },
  
  // 儲存資料
  saveData(category) {
    try {
      localStorage.setItem(`data_${category}`, JSON.stringify({
        data: this.cache[category],
        updatedAt: Date.now()
      }));
    } catch (error) {
      console.error(`Failed to save ${category} data:`, error);
    }
  },
  
  // 設定事件監聽
  setupEventListeners() {
    // 監聽資料更新事件
    window.addEventListener('dataUpdated', (event) => {
      const { category, data } = event.detail;
      this.cache[category] = data;
      this.renderCategory(category);
    });
  },
  
  // 渲染類別資料
  renderCategory(category) {
    // 觸發渲染事件，由 UI 模組處理
    window.dispatchEvent(new CustomEvent('renderData', {
      detail: { category, data: this.cache[category] }
    }));
  },
  
  // 生成唯一 ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  },
  
  // 取得統計資訊
  getStats() {
    return {
      news: (this.cache.news || []).length,
      markets: (this.cache.markets || []).length,
      knowledge: (this.cache.knowledge || []).length,
      lastUpdate: this.getLastUpdateTime()
    };
  },
  
  // 取得最後更新時間
  getLastUpdateTime() {
    const timestamps = [];
    ['news', 'markets', 'knowledge', 'standards'].forEach(category => {
      const saved = localStorage.getItem(`data_${category}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.updatedAt) timestamps.push(parsed.updatedAt);
      }
    });
    
    if (timestamps.length === 0) return null;
    return Math.max(...timestamps);
  },
  
  // 匯出資料
  exportData() {
    return {
      news: this.cache.news,
      markets: this.cache.markets,
      knowledge: this.cache.knowledge,
      standards: this.cache.standards,
      exportedAt: Date.now()
    };
  },
  
  // 匯入資料
  importData(data) {
    if (data.news) {
      this.cache.news = data.news;
      this.saveData('news');
    }
    if (data.markets) {
      this.cache.markets = data.markets;
      this.saveData('markets');
    }
    if (data.knowledge) {
      this.cache.knowledge = data.knowledge;
      this.saveData('knowledge');
    }
    if (data.standards) {
      this.cache.standards = data.standards;
      this.saveData('standards');
    }
    return true;
  },
  
  // 清除所有資料
  clearAll() {
    ['news', 'markets', 'knowledge', 'standards'].forEach(category => {
      localStorage.removeItem(`data_${category}`);
      this.cache[category] = [];
    });
  }
};

// 初始化
if (typeof window !== 'undefined') {
  window.DataManager = DataManager;
  DataManager.init();
}

// 匯出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataManager;
}
