'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'

const faqs = [
  {
    question: '什麼是檢定安格斯牛肉(CAB)？',
    answer: '檢定安格斯牛肉(Certified Angus Beef)是美國安格斯肉牛協會(AAA)註冊商標，1978年成立專案計畫。僅約50頭牛中有1頭能符合CAB嚴格標準，需具備黑色血統特徵並通過10項品質標準檢驗，與一般泛稱的「安格斯牛肉」有顯著差異。',
  },
  {
    question: 'CL是什麼意思？',
    answer: 'CL是Chemical Lean(化學瘦肉率)的縮寫，表示瘦肉的比例。例如90CL代表90%是瘦肉、10%是脂肪。這是肉品工業常用的規格標示方式。',
  },
  {
    question: '牛肉熟度如何區分？',
    answer: '牛排熟度大致分為：1-2分(Rare/生)、3-4分(Medium Rare/三分熟)、5-6分(Medium/五分熟)、7-8分(Medium Well/七分熟)、Well Done(全熟)。好的牛排建議越生越好，能保留更多肉汁與風味。',
  },
  {
    question: '穀物飼養與草料飼養有什麼差別？',
    answer: '穀物飼養(Grain Feed)以玉米、小麥等五穀人工飼育，肉色櫻紅、油花均勻、肉質柔嫩；草料飼養(Grass Feed)以天然放牧，瘦肉較多、脂肪較少、低膽固醇。美國牛多為穀物飼養，澳洲牛則兩者皆有。',
  },
  {
    question: '真空包裝的牛肉為什麼呈暗紫色？',
    answer: '這是正常現象！真空包裝隔絕氧氣，牛肉中的肌紅蛋白處於缺氧狀態呈現暗紫色。拆封後接觸空氣約15-30分鐘會「紅潤化」(bloom)成鮮櫻桃紅色，代表牛肉新鮮。若變成暗褐色則表示放置過久。',
  },
]

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="faq" className="mb-16 sm:mb-20">
      <div className="flex justify-between items-end mb-6 sm:mb-10">
        <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative pb-3 sm:pb-4">
          常見問題 Q&A
          <span className="absolute bottom-0 left-0 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
        </h2>
        <a href="#" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
          查看全部 20+ 問答 <ArrowRight size={16} />
        </a>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-card">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border-b border-light-gray last:border-b-0 ${
              index === 0 ? '' : ''
            }`}
          >
            <button
              onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
              className="w-full py-5 sm:py-6 flex justify-between items-center text-left group"
            >
              <span className={`font-serif-tc text-base sm:text-lg font-semibold transition-colors ${
                activeIndex === index ? 'text-primary' : 'text-charcoal group-hover:text-primary'
              }`}>
                {faq.question}
              </span>
              <motion.span
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-colors ${
                  activeIndex === index ? 'bg-primary text-white' : 'bg-cream text-charcoal'
                }`}
              >
                <Plus size={18} />
              </motion.span>
            </button>
            
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 sm:pb-6 text-sm text-warm-gray leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
