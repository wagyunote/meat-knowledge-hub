'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Newspaper, Search, X, TrendingUp, Calendar } from 'lucide-react'
import type { NewsItem } from '@/types'

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('全部')

  useEffect(() => {
    fetch(`${process.env.NODE_ENV === 'production' ? '/meat-knowledge-hub' : ''}/data/news.json`)
      .then(res => res.json())
      .then(data => {
        setNews(data.news || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const getCategory = (title: string): string => {
    if (title.includes('競賽') || title.includes('品牌')) return '品牌競賽'
    if (title.includes('展') || title.includes('會')) return '展會活動'
    if (title.includes('生產') || title.includes('養殖')) return '生產資訊'
    if (title.includes('價格') || title.includes('市場')) return '市場行情'
    return '產業動態'
  }

  const getEmoji = (category: string): string => {
    const map: Record<string, string> = {
      '品牌競賽': '🏆',
      '展會活動': '🎪',
      '生產資訊': '🐄',
      '市場行情': '📊',
      '產業動態': '📰',
    }
    return map[category] || '📰'
  }

  const categories = ['全部', '品牌競賽', '展會活動', '生產資訊', '市場行情', '產業動態']

  const filteredNews = news.filter(item => {
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const category = getCategory(item.title)
    const matchesCategory = activeCategory === '全部' || category === activeCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString('zh-TW', { month: 'short', day: 'numeric' })
    } catch {
      return ''
    }
  }

  return (
    <section id="news" className="mb-16 sm:mb-20">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 sm:mb-10">
        <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative pb-3 sm:pb-4">
          最新產業動態
          <span className="absolute bottom-0 left-0 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-warm-gray text-sm">
            {news.length} 則新聞
          </span>
          <TrendingUp className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 sm:mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray" />
          <input
            type="text"
            placeholder="搜尋新聞..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3 sm:py-4 bg-white rounded-xl sm:rounded-2xl border border-light-gray focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray hover:text-charcoal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => {
            const count = cat === '全部' 
              ? news.length 
              : news.filter(n => getCategory(n.title) === cat).length
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                  activeCategory === cat
                    ? 'gradient-meat text-white shadow-md'
                    : 'bg-white text-warm-gray hover:bg-cream hover:text-primary border border-light-gray'
                }`}
              >
                <span>{getEmoji(cat)}</span>
                {cat}
                <span className="text-xs opacity-70">({count})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* News Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-5 animate-pulse">
              <div className="h-4 bg-light-gray rounded w-1/4 mb-3"></div>
              <div className="h-6 bg-light-gray rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-light-gray rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {filteredNews.slice(0, 6).map((item, index) => {
                const category = getCategory(item.title)
                const emoji = getEmoji(category)
                
                return (
                  <motion.a
                    key={item.link}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
                    className="block bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all group cursor-pointer"
                  >
                    {/* Category Tag */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-cream text-primary font-medium">
                        {emoji} {category}
                      </span>
                      <span className="text-xs text-warm-gray flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.pubDate)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-medium text-charcoal text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors mb-2">
                      {item.title}
                    </h3>

                    {/* Source */}
                    <div className="text-xs text-warm-gray flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Newspaper className="w-3 h-3" />
                        食肉通信社
                      </span>
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.a>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {filteredNews.length === 0 && (
            <div className="text-center py-12 text-warm-gray">
              <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>沒有找到相關新聞</p>
            </div>
          )}

          {filteredNews.length > 6 && (
            <div className="text-center mt-8">
              <button className="px-6 py-3 rounded-full bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-all font-medium text-sm">
                查看更多新聞 ({filteredNews.length - 6} 則)
              </button>
            </div>
          )}
        </>
      )}

      {/* Real-time Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-warm-gray">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        即時更新 · 來自食肉通信社 RSS
      </div>
    </section>
  )
}
