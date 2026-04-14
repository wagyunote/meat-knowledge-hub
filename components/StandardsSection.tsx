'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const standards = [
  {
    flag: '🇯🇵',
    title: '日本 JMGA 標準',
    subtitle: '日本食肉格付協會 · 牛枝肉取引規格',
    description: '日本官方肉品分級制度，以步留等級(A-C)與肉質等級(1-5)組合，共15種等級。評估項目包含脂肪交雜(BMS)、肉色澤(BCS)、肉緊實度與脂肪色澤(BFS)。',
    grades: [
      ['步留\\肉質', '5', '4', '3', '2', '1'],
      ['A', 'A5', 'A4', 'A3', 'A2', 'A1'],
      ['B', 'B5', 'B4', 'B3', 'B2', 'B1'],
      ['C', 'C5', 'C4', 'C3', 'C2', 'C1'],
    ],
  },
  {
    flag: '🇺🇸',
    title: '美國 CAB 標準',
    subtitle: 'Certified Angus Beef · 安格斯牛肉認證',
    description: '美國安格斯肉牛協會(AAA)於1978年設立的認證標準，僅有約2%的牛肉能通過CAB嚴格標準。評估項目包含大理石紋脂肪、成熟度、肉色與脂肪色等10項標準。',
    grades: [
      ['USDA 等級', 'Prime', 'Choice', 'Select'],
      ['中文', '極佳級', '特選級', '可選級'],
      ['特色', '最高品質', '高品質', '標準品質'],
    ],
  },
]

export default function StandardsSection() {
  return (
    <section id="standards" className="mb-16 sm:mb-20">
      <div className="flex justify-between items-end mb-6 sm:mb-10">
        <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative pb-3 sm:pb-4">
          肉品分級標準
          <span className="absolute bottom-0 left-0 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
        </h2>
        <a href="#" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
          詳細規格說明 <ArrowRight size={16} />
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {standards.map((standard, index) => (
          <motion.div
            key={standard.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-9 shadow-card hover:shadow-card-hover transition-all"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cream rounded-full flex items-center justify-center text-xl sm:text-2xl">
                {standard.flag}
              </div>
              <div>
                <h3 className="font-serif-tc text-lg sm:text-xl font-semibold">{standard.title}</h3>
                <p className="text-xs sm:text-sm text-warm-gray">{standard.subtitle}</p>
              </div>
            </div>
            
            <p className="text-sm text-warm-gray leading-relaxed mb-4 sm:mb-6">
              {standard.description}
            </p>

            <table className="w-full text-xs sm:text-sm border-collapse">
              <tbody>
                {standard.grades.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`py-2 sm:py-2.5 px-2 sm:px-3 text-center border border-light-gray ${
                          rowIndex === 0 || cellIndex === 0
                            ? 'bg-cream font-semibold'
                            : cell.startsWith('A')
                            ? 'grade-a'
                            : cell.startsWith('B')
                            ? 'grade-b'
                            : cell.startsWith('C')
                            ? 'grade-c'
                            : ''
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
