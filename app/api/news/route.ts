import { NextResponse } from 'next/server'
import Parser from 'rss-parser'
import { NewsItem } from '@/types'

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
]

export async function GET() {
  try {
    const allNews: NewsItem[] = []
    
    for (const source of RSS_SOURCES) {
      if (!source.enabled) continue
      
      try {
        const feed = await parser.parseURL(source.url)
        
        feed.items.forEach((item, index) => {
          allNews.push({
            id: `${source.name}-${index}`,
            title: item.title || '無標題',
            link: item.link || '#',
            pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
            content: item['content:encoded'] || item.content || item.description || '',
          })
        })
      } catch (error) {
        console.error(`Failed to fetch RSS from ${source.name}:`, error)
      }
    }
    
    // 按日期排序，最新的在前
    allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    
    return NextResponse.json({ 
      news: allNews.slice(0, 10),
      lastUpdate: new Date().toISOString(),
    })
  } catch (error) {
    console.error('News API error:', error)
    return NextResponse.json(
      { news: [], error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}
