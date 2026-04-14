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
    flag: '🇦🇺',
    title: '澳洲 AUS-MEAT 標準',
    subtitle: '澳洲肉類規格管理局 · 牛肉分級系統',
    description: '澳洲統一肉品分級制度，以0-9級評估大理石紋脂肪分布。等級越高代表脂肪交雜越均勻細緻。另有MSA指數(33-81+)評估食用品質。',
    grades: [
      ['等級', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      ['大理石紋', '微量', '微量', '少量', '少量', '中量', '中量', '中量', '多量', '多量', '極多'],
      ['特點', '精瘦', '精瘦', '基本', '基本', '風味', '風味', '風味', '多汁', '多汁', '極致'],
    ],
  },
  {
    flag: '🥩',
    title: '澳洲和牛分級標準',
    subtitle: 'Australian Wagyu · 澳洲和牛協會',
    description: '澳洲和牛專屬分級，結合AUS-MEAT與日本BMS評分。大理石紋評分從4到12級，對應日本JMGA的BMS 3-12級。澳洲和牛以穀飼天數與大理石紀錄雙重認證。',
    grades: [
      ['澳洲和牛', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
      ['日式BMS', '3', '4', '5', '6', '7', '8', '9', '10', '11-12'],
      ['油花密度', '中下', '中等', '中上', '多量', '多量', '極多', '極多', '極致', '極致'],
    ],
  },
  {
    flag: '🇺🇸',
    title: '美國 USDA 標準',
    subtitle: '美國農業部 · 牛肉品質等級',
    description: '美國官方牛肉分級制度，以成熟度與大理石紋為主要評估依據。Prime等級僅占約2%，為最高品質；另有CAB(Certified Angus Beef)安格斯牛肉認證標準。',
    grades: [
      ['USDA等級', 'Prime', 'Choice', 'Select', 'Standard'],
      ['中文', '極佳級', '特選級', '可選級', '標準級'],
      ['特色', '最高品質', '高品質', '標準品質', '基本品質'],
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

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm border-collapse min-w-[400px]">
                <tbody>
                  {standard.grades.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`py-2 sm:py-2.5 px-2 sm:px-3 text-center border border-light-gray whitespace-nowrap ${
                            rowIndex === 0 || cellIndex === 0
                              ? 'bg-cream font-semibold'
                              : cell.includes('A') || cell.includes('Prime')
                              ? 'bg-green-50 text-green-700 font-medium'
                              : cell.includes('M4') || cell.includes('M5') || cell.includes('M6')
                              ? 'bg-amber-50 text-amber-700'
                              : cell.includes('M9') || cell.includes('M10') || cell.includes('M11') || cell.includes('M12')
                              ? 'bg-red-50 text-red-700 font-medium'
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
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
