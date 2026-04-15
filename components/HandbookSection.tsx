'use client'

import { motion } from 'framer-motion'
import { FileText, Download, Eye, BookOpen } from 'lucide-react'

interface Handbook {
  title: string
  title_en: string
  file: string
  size: string
  pages?: string
}

const handbooks: Handbook[] = [
  {
    title: '中文日本和牛拆解',
    title_en: 'Japanese Wagyu Butchery Guide',
    file: './中文日本和牛拆解.pdf',
    size: '29 MB',
    pages: '150+ 頁'
  },
  {
    title: '美國牛肉屠宰指南',
    title_en: 'US Beef Slaughter Guide',
    file: './美國牛肉屠宰指南.pdf',
    size: '2.1 MB',
    pages: '80+ 頁'
  },
  {
    title: '中文澳洲肉品手冊 7th',
    title_en: 'Australian Meat Manual 7th Ed.',
    file: './中文澳洲肉品手冊 7th.pdf',
    size: '45 MB',
    pages: '200+ 頁'
  },
  {
    title: 'Handbook of Australian Meat 7th Ed.',
    title_en: 'English Version',
    file: './Handbook_of_Australian_Meat_7th_Edition-English.pdf',
    size: '6.5 MB',
    pages: '180+ 頁'
  },
]

export default function HandbookSection() {
  return (
    <section id="handbooks" className="mb-16 sm:mb-20">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 sm:mb-10">
        <div>
          <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative pb-3 sm:pb-4">
            屠宰手冊下載
            <span className="absolute bottom-0 left-0 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
          </h2>
          <p className="text-warm-gray text-sm mt-2">
            專業肉品從業人員必備手冊 · 可線上觀看也可下載
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-warm-gray">
          <BookOpen className="w-4 h-4" />
          <span>共 {handbooks.length} 份手冊</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {handbooks.map((book, index) => (
          <motion.a
            key={book.file}
            href={book.file}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group block bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-all"
          >
            {/* 圖示 */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-cream rounded-2xl flex items-center justify-center text-2xl sm:text-3xl">
                📖
              </div>
              <div className="flex gap-2">
                <a
                  href={book.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                  title="線上觀看"
                >
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href={book.file}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg bg-primary text-white hover:opacity-90 transition-all"
                  title="下載檔案"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* 標題 */}
            <h3 className="font-serif-tc text-lg sm:text-xl font-semibold text-charcoal mb-2 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-warm-gray mb-4">{book.title_en}</p>

            {/* 資訊 */}
            <div className="flex items-center gap-4 text-xs text-warm-gray">
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                {book.size}
              </span>
              <span>·</span>
              <span>{book.pages}</span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* 說明 */}
      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <strong>💡 使用說明：</strong>
        點擊眼睛 icon 👁 可在新視窗預覽PDF，
        點擊下載 icon ⬇ 可儲存檔案至本機。
        專業肉品知識建議使用電腦或平板查看效果最佳。
      </div>
    </section>
  )
}