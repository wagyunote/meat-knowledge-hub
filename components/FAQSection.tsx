'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'

const faqs = [
  {
    question: '什麼是澳洲和牛的血統分級？',
    answer: `澳洲和牛產業根據日本和牛基因比例，建立一套血統分級系統，也是影響牛肉價值的關鍵，分為三大類型：

• 全血和牛（Fullblood）：基因 100% 可追溯至日本原生血統，且從未與其他品種雜交的牛隻。血統最統最純、價值最高，產量極為稀少，占澳洲和牛總產量不到 5%。

• 純種和牛（Purebred）：透過多代配種，基因達 93.75% 以上和牛血統。多數為 F4 代，接近全血和牛的油花與風味表現，是擴展和牛族群的重要基礎。

• 混血和牛（Crossbred）：與其他牛種（如安格斯牛）雜交而來的後代。只要和牛基因超過 50%，依世代分為 F1 至 F4，代數越高，和牛特徵越明顯。`,
  },
  {
    question: '什麼是 F1～F4 和牛血統？',
    answer: `F1～F4 代表不同的和牛血統比例，代數越高，和牛特徵越明顯：

• F1（50% 和牛血統）：公式：（全血 100% + 其他品種 0%）／2 = F1。結合和牛的油花基因與安格斯牛的體型適應性，是市面上最常見的澳洲和牛等級。

• F2（75% 和牛血統）：公式：（全血 100% + F1 母牛 50%）／2 = F2。和牛特徵更明顯，牛肉品質和風味更高。

• F3（87.5% 和牛血統）：公式：（全血 100% + F2 母牛 75%）／2 = F3。油花分布與牛肉品質接近純種和牛。

• F4（93.75% 和牛血統）：公式：（全血 100% + F3 母牛 87.5%）／2 = F4。可被澳洲和牛協會登記為「純種和牛」。`,
  },
  {
    question: '澳洲和牛和日本和牛有什麼差異？',
    answer: `雖然澳洲和牛和日本和牛源自相同的基因，但兩者差異明顯：

【飼養方式與環境】
• 穀飼期：日本和牛通常超過 600 天，澳洲和牛約 350 至 500 天
• 飼料：日本和牛以稻草、玉米、麥子等精心調配；澳洲多採用「草飼轉穀飼」方式，以大麥和小麥為主
• 環境：日本以人工化養育；澳洲以開放式牧場進行，牛隻有更多戶外放牧時間

【風味與口感】
• 日本和牛：油花豐富均勻，脂肪熔點低，入口即化，吃起來纖細，風味似奶油與椰子
• 澳洲和牛：油花分布均勻但不那麼密集，紅肉與脂肪比例更均衡，口感軟嫩有嚼勁，展現更純粹的牛肉風味`,
  },
  {
    question: '澳洲和牛的特色是什麼？',
    answer: `澳洲和牛有以下三大特色：

【特色一：油花分布】
澳洲和牛最吸引人的特色是分布均勻的大理石油紋油花。雖然油花較少，但分布更加均勻，不會集中在特定部位。這種分布方式讓肉質保有清爽不膩的特色，每一口都能感受到油花帶來的柔嫩口感。

【特色二：肉質】
澳洲和牛兼具日本和牛與安格斯牛的特色。肌肉纖維紮實，擁有明顯的彈性與層次感，也更適合多樣化的烹調方式（如炭烤、煎烤），展現不同的肉質表現。

【特色三：口感】
肌肉纖維紮實，口感更有嚼勁，自然分布的油花散發淡淡奶香與油花香甜，吃起來溫潤卻不膩口。比起入口即化的日本和牛，澳洲和牛更注重油花與肉感之間的平衡。`,
  },
  {
    question: '澳洲和牛如何選購？',
    answer: `掌握以下 4 大選購重點：

【重點一：確認肉品來源】
選擇有信譽、知名度高的進口商或肉品品牌。這些品牌通常對品質有嚴格控管，能提供來源穩定、處理流程符合衛生標準的產品。應注意包裝上的日期標示，確保肉品新鮮度。

【重點二：觀察油花分布與肉色】
• 油花：頂級澳洲和牛，油花需均勻滲透在肌肉纖維之間，越細密均勻代表口感越軟嫩。脂肪應為乳白色或純白色，若顏色黯淡代表牛隻年齡較大，肉質韌度較高
• 肉色：新鮮牛肉呈櫻桃紅色且有光澤。真空包裝因缺氧呈紫紅色，拆封接觸空氣約 15-30 分鐘後會逐漸變回鮮紅色。若肉色暗沉、出現灰綠色且伴隨異味，代表肉品已變質

【重點三：肉的香氣】
新鮮牛肉帶有清新的肉香味或無異味。若聞到腐敗的腥臭味或化學藥劑味，代表肉品不新鮮或保存不當，不建議購買。

【重點四：等級標示】
• AUS-MEAT Marbling Scale（大理石紋評分）：範圍 M1 至 M9，數字越高油花越豐富，高品質澳洲和牛大多落在 M6 至 M9 等級
• MSA（澳洲肉類標準評分）：綜合評估油花、肉色、脂肪顏色、成熟度等指標，分數範圍 100 至 1190，分數越高品質越好`,
  },
  {
    question: '什麼是檢定安格斯牛肉(CAB)？',
    answer: '檢定安格斯牛肉（Certified Angus Beef）是美國安格斯肉牛協會（AAA）註冊商標，1978 年成立專案計畫。僅約 50 頭牛中有 1 頭能符合 CAB 嚴格標準，需具備黑色血統特徵並通過 10 項品質標準檢驗，與一般泛稱的「安格斯牛肉」有顯著差異。',
  },
  {
    question: 'CL 是什麼意思？',
    answer: 'CL 是 Chemical Lean（化學瘦肉率）的縮寫，表示瘦肉的比例。例如 90CL 代表 90% 是瘦肉、10% 是脂肪。這是肉品工業常用的規格標示方式。',
  },
  {
    question: '牛肉熟度如何區分？',
    answer: '牛排熟度大致分為：1-2 分（Rare／生）、3-4 分（Medium Rare／三分熟）、5-6 分（Medium／五分熟）、7-8 分（Medium Well／七分熟）、Well Done（全熟）。好的牛排建議越生越好，能保留更多肉汁與風味。',
  },
  {
    question: '穀物飼養與草料飼養有什麼差別？',
    answer: '穀物飼養（Grain Feed）以玉米、小麥等五穀人工育肥，肉色櫻紅、油花均勻、肉質柔嫩；草料飼養（Grass Feed）以天然放牧，瘦肉較多、脂肪較少、低膽固醇。美國牛多為穀物飼養，澳洲牛則兩者皆有。',
  },
  {
    question: '真空包裝的牛肉為什麼呈暗紫色？',
    answer: '這是正常現象！真空包裝隔絕氧氣，牛肉中的肌紅蛋白處於缺氧狀態呈現暗紫色。拆封後接觸空氣約 15-30 分鐘會「紅潤化」（bloom）成鮮櫻桃紅色，代表牛肉新鮮。若變成暗褐色則表示放置過久。',
  },
]

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="mb-16 sm:mb-20">
      <div className="flex justify-between items-end mb-6 sm:mb-10">
        <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative pb-3 sm:pb-4">
          常見問題 Q&A
          <span className="absolute bottom-0 left-0 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
        </h2>
        <a href="#" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
          查看全部 <ArrowRight size={16} />
        </a>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-card">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-light-gray last:border-b-0">
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
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
                  <p className="pb-5 sm:pb-6 text-sm text-warm-gray leading-relaxed whitespace-pre-line">
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
