'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Market } from '@/types'

const regions = ['全部地區', '東北', '關東', '中部', '近畿', '中國', '四國', '九州']

export default function MarketsSection() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [activeRegion, setActiveRegion] = useState('全部地區')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    fetch('/data/markets.json')
      .then(res => res.json())
      .then(data => {
        setMarkets(data.markets || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // 篩選市場
  const filteredMarkets = activeRegion === '全部地區'
    ? markets
    : markets.filter(m => m.region === activeRegion)

  // 分頁
  const totalPages = Math.ceil(filteredMarkets.length / itemsPerPage)
  const paginatedMarkets = filteredMarkets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // 切換地區時重置頁碼
  useEffect(() => {
    setCurrentPage(1)
  }, [activeRegion])

  return (
    <section id="markets" className="mb-16 sm:mb-20">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 sm:mb-10">
        <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative pb-3 sm:pb-4">
          全國食肉市場
          <span className="absolute bottom-0 left-0 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
        </h2>
        <div className="text-sm text-warm-gray">
          共 <span className="font-semibold text-primary">{markets.length}</span> 個市場
          {activeRegion !== '全部地區' && (
            <span> · {activeRegion} ({filteredMarkets.length}個)</span>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-card">
        {/* Region Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 pb-4 border-b-2 border-light-gray">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeRegion === region
                  ? 'gradient-meat text-white'
                  : 'text-warm-gray hover:bg-cream hover:text-primary'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Markets Table */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 bg-light-gray rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-light-gray">
                    <th className="text-left py-3 sm:py-4 px-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">市場名稱</th>
                    <th className="text-left py-3 sm:py-4 px-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">所在地</th>
                    <th className="text-left py-3 sm:py-4 px-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">荷受機關</th>
                    <th className="text-left py-3 sm:py-4 px-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">聯絡電話</th>
                    <th className="text-left py-3 sm:py-4 px-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMarkets.map((market, index) => (
                    <motion.tr
                      key={market.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-light-gray hover:bg-cream transition-colors"
                    >
                      <td className="py-4 sm:py-5 px-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-2 py-0.5 text-[10px] bg-cream text-primary rounded">
                            {market.region}
                          </span>
                          <span className="font-semibold text-primary text-sm">{market.name}</span>
                        </div>
                      </td>
                      <td className="py-4 sm:py-5 px-3 text-sm text-warm-gray">{market.address}</td>
                      <td className="py-4 sm:py-5 px-3 text-sm text-warm-gray">{market.organization}</td>
                      <td className="py-4 sm:py-5 px-3 text-sm font-mono">{market.phone}</td>
                      <td className="py-4 sm:py-5 px-3">
                        <a
                          href={market.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary text-sm flex items-center gap-1 hover:underline"
                        >
                          官網 <ExternalLink size={12} />
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8 pt-4 border-t border-light-gray">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-cream disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'gradient-meat text-white'
                          : 'hover:bg-cream text-warm-gray'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-cream disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
