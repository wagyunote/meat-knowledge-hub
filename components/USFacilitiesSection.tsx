'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Building2, MapPin } from 'lucide-react'

interface Facility {
  id: string
  company: string
  est_no: string
  source: string
}

export default function USFacilitiesSection() {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetch(`${process.env.NODE_ENV === 'production' ? '/meat-knowledge-hub' : ''}/data/us-bovine-ev-facilities.json`)
      .then(res => res.json())
      .then(data => {
        setFacilities(data.facilities || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const totalPages = Math.ceil(facilities.length / itemsPerPage)
  const paginatedFacilities = facilities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <section id="us-facilities" className="mb-16 sm:mb-20">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 sm:mb-10">
        <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative pb-3 sm:pb-4">
          美國牛肉出口驗證設施
          <span className="absolute bottom-0 left-0 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
        </h2>
        <div className="text-sm text-warm-gray flex items-center gap-2">
          <Building2 size={16} className="text-primary" />
          共 <span className="font-semibold text-primary">{facilities.length}</span> 間工廠
          <span className="text-xs bg-cream px-2 py-1 rounded-full">2026.4.13 更新</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-card">
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
                    <th className="text-left py-3 sm:py-4 px-3 text-xs font-semibold text-warm-gray uppercase tracking-wider w-16">序號</th>
                    <th className="text-left py-3 sm:py-4 px-3 text-xs font-semibold text-warm-gray uppercase tracking-wider w-24">工廠編號</th>
                    <th className="text-left py-3 sm:py-4 px-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">公司名稱</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedFacilities.map((facility, index) => (
                    <motion.tr
                      key={facility.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className="border-b border-light-gray hover:bg-cream transition-colors"
                    >
                      <td className="py-4 sm:py-5 px-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </span>
                      </td>
                      <td className="py-4 sm:py-5 px-3">
                        <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 font-mono text-sm font-medium">
                          {facility.est_no}
                        </span>
                      </td>
                      <td className="py-4 sm:py-5 px-3 text-sm font-medium text-charcoal leading-relaxed">
                        {facility.company}
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

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
        <strong>資料來源：</strong> 美國農業部（USDA）牛肉出口驗證計畫合格供應商名單，
        最後更新日期 2026 年 4 月 13 日。實際核准狀況請以官方公告為準。
      </div>

      {/* PDF Download */}
      <div className="mt-4 p-4 bg-cream rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-charcoal">完整名單 PDF</h4>
            <p className="text-xs text-warm-gray mt-1">USDA Official Listing · 約 1.3 MB</p>
          </div>
          <a 
            href="./LSOfficialListingEVProgram.pdf" 
            target="_blank"
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            開啟 PDF
          </a>
        </div>
      </div>
    </section>
  )
}
