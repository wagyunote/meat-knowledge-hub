'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  const stats = [
    { number: '28', label: '食肉市場' },
    { number: '15', label: '等級標準' },
    { number: '50+', label: '知識文章' },
  ]

  const grades = [
    { label: 'A5', desc: '最高等級', className: 'bg-gradient-to-br from-primary to-primary-light' },
    { label: 'A4', desc: '極上等級', className: 'bg-gradient-to-br from-primary-light to-[#C44B5C]' },
    { label: 'A3', desc: '上等級', className: 'bg-gradient-to-br from-[#C44B5C] to-[#D66878]' },
  ]

  return (
    <section className="mt-[104px] sm:mt-[120px] bg-gradient-to-br from-cream to-[#F5EDE5] py-16 sm:py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button className="px-6 sm:px-9 py-3 sm:py-4 rounded-full gradient-gold text-charcoal font-medium text-base hover:shadow-lg hover:-translate-y-1 transition-all">
              開始探索
            </button>
            
            {/* Stats */}
            <div className="flex gap-8 sm:gap-10 mt-8 sm:mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="font-serif-tc text-2xl sm:text-4xl font-bold text-primary">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-warm-gray mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Grade Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="font-serif-tc text-lg sm:text-xl text-primary mb-4 sm:mb-6 flex items-center gap-2">
                <span>🎌</span> 日本和牛等級速查
              </h3>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {grades.map((grade) => (
                  <motion.div
                    key={grade.label}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`${grade.className} rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center text-white cursor-pointer transition-shadow hover:shadow-lg`}
                  >
                    <div className="font-serif-tc text-2xl sm:text-3xl font-bold">{grade.label}</div>
                    <div className="text-xs sm:text-sm mt-1 opacity-90">{grade.desc}</div>
                  </motion.div>
                ))}
              </div>
              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-warm-gray">
                步留等級(A-C) × 肉質等級(1-5) = 15種組合
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
