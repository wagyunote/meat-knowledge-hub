const Parser = require('rss-parser')
const fs = require('fs')
const path = require('path')

const parser = new Parser({
  customFields: {
    item: ['content', 'content:encoded', 'description'],
  },
})

// RSS 來源配置
const RSS_SOURCES = [
  {
    name: '食肉通信社',
    url: 'https://www.shokuniku.co.jp/feed/',
    enabled: true,
  },
  // 可擴充更多 RSS 來源
  // {
  //   name: '其他新聞源',
  //   url: 'https://example.com/feed/',
  //   enabled: false,
  // },
]

async function fetchNews() {
  const allNews = []
  
  for (const source of RSS_SOURCES) {
    if (!source.enabled) continue
    
    try {
      console.log(`Fetching RSS from ${source.name}...`)
      const feed = await parser.parseURL(source.url)
      
      feed.items.forEach((item, index) => {
        allNews.push({
          id: `${source.name}-${index}-${Date.now()}`,
          title: item.title || '無標題',
          link: item.link || '#',
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          content: item['content:encoded'] || item.content || item.description || '',
          source: source.name,
        })
      })
      
      console.log(`✓ Fetched ${feed.items.length} items from ${source.name}`)
    } catch (error) {
      console.error(`✗ Failed to fetch RSS from ${source.name}:`, error.message)
    }
  }
  
  // 按日期排序
  allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
  
  return allNews.slice(0, 20) // 只保留最新的 20 條
}

async function updateNews() {
  try {
    const news = await fetchNews()
    
    // 確保資料目錄存在
    const dataDir = path.join(__dirname, '..', 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    // 寫入 JSON 檔案
    const outputPath = path.join(dataDir, 'news.json')
    const data = {
      news,
      lastUpdate: new Date().toISOString(),
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8')
    
    console.log(`\n✓ News updated successfully!`)
    console.log(`  Total items: ${news.length}`)
    console.log(`  Saved to: ${outputPath}`)
    console.log(`  Last update: ${data.lastUpdate}`)
    
    return data
  } catch (error) {
    console.error('Failed to update news:', error)
    process.exit(1)
  }
}

// 執行更新
updateNews()
