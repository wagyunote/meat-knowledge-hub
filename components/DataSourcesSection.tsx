'use client'

import { motion } from 'framer-motion'

const sources = [
  { icon: '🏪', name: '食肉市場協會', status: '同步中', url: 'https://mmb.jmma.or.jp/' },
  { icon: '📰', name: '食肉通信社', status: '同步中', url: 'https://www.shokuniku.co.jp/' },
  { icon: '📋', name: 'JMGA 格付協會', status: '同步中', url: 'https://www.jmga.or.jp/' },
  { icon: '🧬', name: '家畜改良中心', status: '同步中', url: 'https://www.id.nlbc.go.jp/' },
  { icon: '🇺🇸', name: '美國肉類出口協會', status: '同步中', url: 'https://usmef.org.tw/' },
  { icon: '🦘', name: '澳洲和牛協會', status: '同步中', url: 'https://www.wagyu.org.au/' },
]

export default function DataSourcesSection() {
  return (
    <section className="bg-gradient-to-br from-charcoal to-[#1a1a1a] rounded-2xl sm:rounded-3xl p-6 sm:p-12 mb-16 sm:mb-20">
      <div className="text-center mb-8 sm:mb-10">
        <h3 className="font-serif-tc text-2xl sm:text-3xl text-white mb-2">🔄 即時同步資料來源</h3>
        <p className="text-white/60 text-sm">本平台自動同步以下官方網站最新資訊</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 sm:gap-5">
        {sources.map((source, index) => (
          <motion.a
            key={source.name}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }}
            className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6 text-center transition-all cursor-pointer"
          >
            <div className="text-3xl sm:text-4xl mb-3">{source.icon}</div>
            <div className="text-white text-sm font-medium mb-2">{source.name}</div>
            <div className="text-xs text-green-400 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              {source.status}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
