'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const standards = [
  {
    flag: '🇯🇵',
    title: '日本和牛分級',
    subtitle: 'JMGA 日本食肉格付協會',
    description: '世界最嚴格的牛肉分級制度，以步留等級(A-C)與肉質等級(1-5)組合成15種等級。A5為最高等級，BMS油花分數可達8-12級。',
    grades: [
      ['步留\\肉質', '5', '4', '3', '2', '1'],
      ['A', 'A5', 'A4', 'A3', 'A2', 'A1'],
      ['B', 'B5', 'B4', 'B3', 'B2', 'B1'],
      ['C', 'C5', 'C4', 'C3', 'C2', 'C1'],
    ],
  },
  {
    flag: '🇺🇸',
    title: '美國牛肉分級',
    subtitle: 'USDA 美國農業部官方分級',
    description: '以成熟度與大理石紋為主要評估依據，共分8級。Prime僅佔總產量2-3%，為最高等級；Choice是CP值最高的選擇。',
    grades: [
      ['等級', 'Prime', 'Choice', 'Select', 'Standard'],
      ['油花', '極豐富', '豐富', '少量', '稀少'],
      ['用途', '牛排', '牛排', '快炒', '燉煮'],
    ],
  },
  {
    flag: '🇦🇺',
    title: '澳洲和牛分級',
    subtitle: 'AUS-MEAT 澳洲肉類規格局',
    description: '以油花分佈決定等級，官方分級M1-M9，市場上有M10-M12。M12約等同日本和牛A5等級。',
    grades: [
      ['等級', 'M4-5', 'M6-7', 'M8-9', 'M10-12'],
      ['油花', '中量', '多量', '極多', '極致'],
      ['日式對應', 'A3', 'A4', 'A5', 'A5頂級'],
    ],
  },
  {
    flag: '🍁',
    title: '加拿大牛肉分級',
    subtitle: 'Canada Beef 加拿大牛肉協會',
    description: '分級制度與美國類似，但只有4個等級。評定標準為油花顏色品質、肉質色澤和結實度。',
    grades: [
      ['等級', 'Prime', 'AAA', 'AA', 'A'],
      ['油花', '極豐富', '豐富', '中量', '少量'],
      ['美國對應', 'Prime', 'Choice', 'Select', 'Standard'],
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
          詳細說明 <ArrowRight size={16} />
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
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-all"
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
              <table className="w-full text-xs sm:text-sm border-collapse min-w-[360px]">
                <tbody>
                  {standard.grades.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`py-2 sm:py-2.5 px-2 sm:px-3 text-center border border-light-gray whitespace-nowrap ${
                            rowIndex === 0 || cellIndex === 0
                              ? 'bg-cream font-semibold'
                              : cell.includes('A5') || cell.includes('Prime') || cell.includes('M10') || cell.includes('M11') || cell.includes('M12')
                              ? 'bg-green-50 text-green-700 font-medium'
                              : cell.includes('M8') || cell.includes('M9')
                              ? 'bg-amber-50 text-amber-700'
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

      {/* 等級對照表 */}
      <div className="mt-8 sm:mt-12 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-card">
        <h3 className="font-serif-tc text-lg sm:text-xl text-charcoal mb-4 sm:mb-6 flex items-center gap-2">
          <span>📊</span> 各國牛肉等級對照參考
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-cream">
                <th className="py-3 px-4 text-left font-semibold">國家</th>
                <th className="py-3 px-4 text-center font-semibold">最高等級</th>
                <th className="py-3 px-4 text-center font-semibold">次高等級</th>
                <th className="py-3 px-4 text-center font-semibold">標準等級</th>
                <th className="py-3 px-4 text-left font-semibold">特色</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-light-gray">
                <td className="py-3 px-4 font-medium">🇯🇵 日本</td>
                <td className="py-3 px-4 text-center"><span className="px-2 py-1 bg-green-100 text-green-700 rounded">A5</span></td>
                <td className="py-3 px-4 text-center"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded">A4</span></td>
                <td className="py-3 px-4 text-center"><span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">A3</span></td>
                <td className="py-3 px-4 text-warm-gray">15級分類，BMS 8-12</td>
              </tr>
              <tr className="border-b border-light-gray">
                <td className="py-3 px-4 font-medium">🇺🇸 美國</td>
                <td className="py-3 px-4 text-center"><span className="px-2 py-1 bg-green-100 text-green-700 rounded">Prime</span></td>
                <td className="py-3 px-4 text-center"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded">Choice</span></td>
                <td className="py-3 px-4 text-center"><span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">Select</span></td>
                <td className="py-3 px-4 text-warm-gray">8級分類，僅2-3%為Prime</td>
              </tr>
              <tr className="border-b border-light-gray">
                <td className="py-3 px-4 font-medium">🇦🇺 澳洲</td>
                <td className="py-3 px-4 text-center"><span className="px-2 py-1 bg-green-100 text-green-700 rounded">M9-12</span></td>
                <td className="py-3 px-4 text-center"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded">M6-8</span></td>
                <td className="py-3 px-4 text-center"><span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">M4-5</span></td>
                <td className="py-3 px-4 text-warm-gray">和牛分級，M12≈A5</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">🍁 加拿大</td>
                <td className="py-3 px-4 text-center"><span className="px-2 py-1 bg-green-100 text-green-700 rounded">Prime</span></td>
                <td className="py-3 px-4 text-center"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded">AAA</span></td>
                <td className="py-3 px-4 text-center"><span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">AA</span></td>
                <td className="py-3 px-4 text-warm-gray">4級分類，類似美國</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-warm-gray">※ 對照表僅供參考，實際等級判定以各國官方標準為準</p>
      </div>

      {/* 小提醒 */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <strong>💡 選購建議：</strong> 
        牛肉等級越高不代表一定越適合您。日本和牛A5油花豐富，但連吃多塊可能會膩；
        澳洲/紐西蘭草飼牛油花較少，風味清香。選擇適合自己口味與烹調方式的等級才是最佳選擇！
      </div>
    </section>
  )
}
