'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Beef, Award, Globe2, TrendingUp } from 'lucide-react'

export default function Hero() {
  const features = [
    { icon: Award, label: '官方認證', desc: '日本 JMGA 標準', color: 'from-red-500 to-red-600' },
    { icon: Globe2, label: '全球設施', desc: '150+ 合格工廠', color: 'from-amber-500 to-amber-600' },
    { icon: TrendingUp, label: '即時更新', desc: '每小時同步', color: 'from-green-500 to-green-600' },
  ]

  const grades = ['A5', 'A4', 'A3', 'B5', 'B4']

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* 動態背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-[#F5EDE5] to-cream"></div>
      <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-amber-200/30 rounded-full blur-3xl"></div>
      
      {/* 浮動等級標籤 */}
      {grades.map((grade, i) => (
        <motion.div
          key={grade}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
          className="absolute text-6xl sm:text-8xl font-serif-tc font-bold text-primary/20 select-none"
          style={{
            top: `${15 + i * 18}%`,
            right: `${5 + (i % 3) * 10}%`,
          }}
        >
          {grade}
        </motion.div>
      ))}
      
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 py-12 sm:py-16 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* 左側內容 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            {/* YouTube 影片 */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-charcoal">
              <div className="aspect-video">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/_a29l6b3qMg"
                  title="和牛高效分切技巧"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            
            {/* 牛肉分切圖片 */}
            <div className="mt-4 relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/premium-meat-cuts.png"
                alt="優質牛肉分切部位圖"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* 說明 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-center"
            >
              <h2 className="font-serif-tc text-2xl sm:text-3xl font-bold text-charcoal mb-2">
                🎬 和牛高效分切技巧 + 牛肉分切部位指南
              </h2>
              <p className="text-warm-gray text-sm">
                專業分切技巧影片 + 各部位名稱與烹飪方式
              </p>
            </motion.div>
          </motion.div>
          
          {/* 右側功能卡 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 w-full max-w-md"
          >
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-charcoal text-lg">{feature.label}</div>
                      <div className="text-warm-gray text-sm">{feature.desc}</div>
                    </div>
                    <div className="text-3xl">🥩</div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* 統計數據 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-6 p-5 bg-primary/5 rounded-2xl border border-primary/10"
            >
              <div className="flex justify-around text-center">
                <div>
                  <div className="font-serif-tc text-3xl sm:text-4xl font-bold text-primary">151</div>
                  <div className="text-xs text-warm-gray mt-1">合格設施</div>
                </div>
                <div className="w-px bg-primary/20"></div>
                <div>
                  <div className="font-serif-tc text-3xl sm:text-4xl font-bold text-primary">4</div>
                  <div className="text-xs text-warm-gray mt-1">國家標準</div>
                </div>
                <div className="w-px bg-primary/20"></div>
                <div>
                  <div className="font-serif-tc text-3xl sm:text-4xl font-bold text-primary">24h</div>
                  <div className="text-xs text-warm-gray mt-1">自動更新</div>
                </div>
              </div>
            </motion.div>
            
            {/* CTA 按鈕 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#standards"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 rounded-full gradient-meat text-white font-medium text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                查看分級標準
              </motion.a>
              <motion.a
                href="#markets"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 rounded-full bg-white text-primary font-medium text-center shadow-md hover:shadow-lg transition-shadow border border-primary/20"
              >
                查詢合格設施
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* 滾動提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#handbooks"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-primary/60 hover:text-primary transition-colors"
          >
            <span className="text-xs mb-2">向下探索</span>
            <ChevronDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}