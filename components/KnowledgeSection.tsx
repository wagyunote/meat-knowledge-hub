'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Beef, Thermometer, Wheat, Package, Award, ChefHat, Search, Factory } from 'lucide-react'

const knowledgeItems = [
  { icon: Beef, title: '牛肉部位', desc: '肩胛、肋脊、腰脊、後腿等七大部位特性與適合料理方式' },
  { icon: Thermometer, title: '熟度指南', desc: '從一分熟到全熟，掌握專業牛排熟度判斷技巧' },
  { icon: Wheat, title: '飼育方式', desc: '穀物飼養與草料飼養的差異與肉質特色比較' },
  { icon: Package, title: '保存訣竅', desc: '真空包裝原理與牛肉保鮮的最佳實務方法' },
  { icon: Award, title: '分級標準', desc: '日本JMGA、美國CAB等國際肉品分級制度解析' },
  { icon: ChefHat, title: '料理技巧', desc: '煎牛排要點、退冰方法與肉質軟化秘訣' },
  { icon: Search, title: '品質判斷', desc: '如何辨識新鮮牛肉與避免變質肉品' },
  { icon: Factory, title: '廠號查詢', desc: '澳洲、美國肉品工廠代號識別與產地追蹤' },
]

export default function KnowledgeSection() {
  return (
    <section id="knowledge" className="mb-16 sm:mb-20">
      <div className="flex justify-between items-end mb-6 sm:mb-10">
        <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative pb-3 sm:pb-4">
          肉品知識百科
          <span className="absolute bottom-0 left-0 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
        </h2>
        <a href="#" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
          查看全部 <ArrowRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {knowledgeItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -5, borderColor: '#D4A574' }}
            className="bg-white rounded-2xl p-5 sm:p-7 text-center shadow-card hover:shadow-card-hover transition-all cursor-pointer border-2 border-transparent"
          >
            <motion.div
              whileHover={{ scale: 1.1, backgroundColor: '#8B2635' }}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-5 transition-colors group"
            >
              <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:text-white transition-colors" />
            </motion.div>
            <h3 className="font-serif-tc text-base sm:text-lg font-semibold text-charcoal mb-2">{item.title}</h3>
            <p className="text-xs sm:text-sm text-warm-gray leading-relaxed line-clamp-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
