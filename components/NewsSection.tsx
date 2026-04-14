'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Newspaper } from 'lucide-react'
import type { NewsItem } from '@/types'

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

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

  return (
    <section id="news" className="mb-16 sm:mb-20">
      <div className="flex justify-between items-end mb-6 sm:mb-10">
        <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative pb-3 sm:pb-4">
          最新產業動態
          <span className="absolute bottom-0 left-0 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
        </h2>
        <a href="#" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
          查看全部 <ArrowRight size={16} />
        </a>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card animate-pulse">
              <div className="h-40 sm:h-44 bg-light-gray"></div>
              <div className="p-5 sm:p-6 space-y-3">
                <div className="h-5 w-20 bg-light-gray rounded"></div>
                <div className="h-6 bg-light-gray rounded"></div>
                <div className="h-4 w-3/4 bg-light-gray rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 6).map((item, index) => {
            const category = getCategory(item.title)
            const emoji = getEmoji(category)
            
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
              >
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <div className="h-40 sm:h-44 gradient-meat flex items-center justify-center text-4xl sm:text-5xl group-hover:scale-105 transition-transform">
                    {emoji}
                  </div>
                  <div className="p-5 sm:p-6">
                    <span className="inline-block px-3 py-1 bg-cream text-primary text-xs font-medium rounded-full mb-3">
                      {category}
                    </span>
                    <h3 className="font-serif-tc text-base sm:text-lg font-semibold text-charcoal leading-relaxed line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex justify-between items-center text-xs text-warm-gray">
                      <span className="flex items-center gap-1.5">
                        <Newspaper size={12} />
                        食肉通信社
                      </span>
                      <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        即時同步
                      </span>
                    </div>
                  </div>
                </a>
              </motion.article>
            )
          })}
        </div>
      )}
    </section>
  )
}
