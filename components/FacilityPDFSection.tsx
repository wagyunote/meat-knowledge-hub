'use client'

import { motion } from 'framer-motion'
import { FileText, Download, Eye, Building2 } from 'lucide-react'

interface FacilityPDF {
  title: string
  title_en: string
  file: string
  count: number
  update: string
  color: string
  icon: string
}

const facilityPDFs: FacilityPDF[] = [
  {
    title: '日本牛肉核准輸入設施',
    title_en: 'Japan Beef Import Facilities',
    file: './日本牛肉核准輸入設施.pdf',
    count: 37,
    update: '2026.3.10',
    color: 'from-red-500 to-red-700',
    icon: '🇯🇵'
  },
  {
    title: '美國牛肉出口驗證設施',
    title_en: 'US Beef EV Facilities',
    file: './美國牛肉出口驗證設施.pdf',
    count: 114,
    update: '2026.4.13',
    color: 'from-blue-500 to-blue-700',
    icon: '🇺🇸'
  },
  {
    title: '澳洲肉品工廠查詢',
    title_en: 'Australian Meat Factories',
    file: './澳洲肉品工廠查詢.pdf',
    count: 20,
    update: '2026.2.6',
    color: 'from-green-500 to-green-700',
    icon: '🇦🇺'
  },
]

export default function FacilityPDFSection() {
  return (
    <section id="facility-pdfs" className="mb-16 sm:mb-20">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 sm:mb-10">
        <div>
          <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative pb-3 sm:pb-4">
            合格輸入設施查詢
            <span className="absolute bottom-0 left-0 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
          </h2>
          <p className="text-warm-gray text-sm mt-2">
            日本、美國、澳洲核准設施名單 · 可線上觀看或下載 PDF
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-warm-gray">
          <Building2 className="w-4 h-4" />
          <span>共 {facilityPDFs.reduce((sum, f) => sum + f.count, 0)} 間工廠</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        {facilityPDFs.map((pdf, index) => (
          <motion.div
            key={pdf.file}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-all"
          >
            {/* 圖示與標題 */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${pdf.color} rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg`}>
                {pdf.icon}
              </div>
              <div className="flex gap-2">
                <a
                  href={pdf.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-cream text-warm-gray hover:bg-primary hover:text-white transition-all"
                  title="線上觀看"
                >
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href={pdf.file}
                  download
                  className="p-2 rounded-lg bg-primary text-white hover:opacity-90 transition-all"
                  title="下載檔案"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* 標題 */}
            <h3 className="font-serif-tc text-lg sm:text-xl font-semibold text-charcoal mb-2 group-hover:text-primary transition-colors">
              {pdf.title}
            </h3>
            <p className="text-sm text-warm-gray mb-4">{pdf.title_en}</p>

            {/* 資訊 */}
            <div className="flex items-center justify-between text-xs text-warm-gray">
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {pdf.count} 間工廠
              </span>
              <span className="bg-cream px-2 py-1 rounded-full">
                {pdf.update} 更新
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 說明 */}
      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <strong>💡 使用說明：</strong>
        點擊眼睛 icon 👁 可在新視窗預覽 PDF，
        點擊下載 icon ⬇ 可儲存檔案至本機。
        實際核准狀況請以各國官方公告為準。
      </div>
    </section>
  )
}
