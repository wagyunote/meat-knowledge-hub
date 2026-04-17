'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ExternalLink, Award, Droplets, Globe, Filter } from 'lucide-react'

// 澳洲和牛品牌資料
const auWagyuBrands = [
  // 全血品牌
  {
    name: 'Blackmore',
    category: '全血品牌',
    categoryEn: 'Full-Blood',
    description: '維多利亞州傳奇全血和牛牧場，以細膩大理石紋著稱。',
    website: 'https://www.blackmorewagyu.com.au',
    established: '1990s',
    region: 'Victoria',
    grade: 'M9+',
  },
  {
    name: 'Stone Axe',
    category: '全血品牌',
    categoryEn: 'Full-Blood',
    description: '維多利亞州精品全血和牛，嚴格控制血統與飼養環境。',
    website: 'https://www.stoneaxe.com.au',
    established: '2000s',
    region: 'Victoria',
    grade: 'M9+',
  },
  {
    name: 'Mayura',
    category: '全血品牌',
    categoryEn: 'Full-Blood',
    description: '南澳精品全血和牛牧場，以 M9+ 等級聞名，出口全球頂級餐廳。',
    website: 'https://www.mayurasation.com.au',
    established: '2005',
    region: 'South Australia',
    grade: 'M9+',
  },
  {
    name: 'JADE',
    category: '全血品牌',
    categoryEn: 'Full-Blood',
    description: '澳洲高端全血和牛品牌，油花細膩、肉質軟嫩。',
    website: 'https://www.jadewagyu.com.au',
    established: '2010s',
    region: 'Australia',
    grade: 'M9-M12',
  },
  {
    name: 'Sherwagyu',
    category: '全血品牌',
    categoryEn: 'Full-Blood',
    description: '新南威爾斯州精品和牛牧場，專注於純血和牛養殖與育種。',
    website: 'https://www.sherwagyu.com.au',
    established: '2010s',
    region: 'New South Wales',
    grade: 'M9+',
  },
  {
    name: 'SIR HARRY',
    category: '全血品牌',
    categoryEn: 'Full-Blood',
    description: '維多利亞州老牌全血和牛品牌，傳承家族養殖經驗。',
    website: 'https://www.sirharry.com.au',
    established: '1990s',
    region: 'Victoria',
    grade: 'M9',
  },
  {
    name: 'Southern Highlands',
    category: '全血品牌',
    categoryEn: 'Full-Blood',
    description: '新南威爾斯州高地精品和牛，環境優美、飼養嚴謹。',
    website: 'https://www.southernhighlandswagyu.com.au',
    established: '2000s',
    region: 'New South Wales',
    grade: 'M8-M9',
  },
  {
    name: 'Cloverlea',
    category: '全血品牌',
    categoryEn: 'Full-Blood',
    description: '維多利亞州傳統全血和牛牧場，專注高品質血統培育。',
    website: 'https://www.cloverlea.com.au',
    established: '1990s',
    region: 'Victoria',
    grade: 'M8-M9',
  },
  {
    name: 'RakuWagyu',
    category: '全血品牌',
    categoryEn: 'Full-Blood',
    description: '精品全血和牛品牌，以日本和牛直系血統聞名。',
    website: 'https://www.rakuwagyu.com.au',
    established: '2010s',
    region: 'Australia',
    grade: 'M9+',
  },
  {
    name: '金鳳凰',
    category: '全血品牌',
    categoryEn: 'Full-Blood',
    description: '華人養殖者創辦的全血和牛品牌，專注亞洲市場高端需求。',
    website: 'https://www.goldenphoenixwagyu.com.au',
    established: '2010s',
    region: 'Australia',
    grade: 'M9-M12',
  },
  // 純血品牌
  {
    name: 'Stanbroke',
    category: '純血品牌',
    categoryEn: 'Pure-Blood',
    description: '昆士蘭州老牌純血和牛牧場，擁有完整和牛血統譜系。',
    website: 'https://www.stanbroke.com.au',
    established: '1970s',
    region: 'Queensland',
    grade: 'M8-M9',
  },
  {
    name: 'Sanchoku',
    category: '純血品牌',
    categoryEn: 'Pure-Blood',
    description: '精選純血和牛品牌，專注於和牛遺傳育種與品質控制。',
    website: 'https://www.sanchoku.com.au',
    established: '2000s',
    region: 'Australia',
    grade: 'M8-M9',
  },
  {
    name: '紅鳳凰',
    category: '純血品牌',
    categoryEn: 'Pure-Blood',
    description: '澳洲純血和牛品牌，以細膩油花與穩定品質著稱。',
    website: 'https://www.redphoenixwagyu.com.au',
    established: '2010s',
    region: 'Australia',
    grade: 'M8-M9',
  },
  {
    name: 'Roam',
    category: '純血品牌',
    categoryEn: 'Pure-Blood',
    description: '昆士蘭州精品純血和牛，採用自然放牧與穀飼結合方式養殖。',
    website: 'https://www.roamwagyu.com.au',
    established: '2010s',
    region: 'Queensland',
    grade: 'M8-M9',
  },
  {
    name: 'ALegacy',
    category: '純血品牌',
    categoryEn: 'Pure-Blood',
    description: '傳承澳洲和牛養殖傳統的純血品牌，專注品質與口感。',
    website: 'https://www.alegacywagyu.com.au',
    established: '2000s',
    region: 'Australia',
    grade: 'M8-M9',
  },
  {
    name: '日冕',
    category: '純血品牌',
    categoryEn: 'Pure-Blood',
    description: '命名取自日冕（Corona）的精品純血和牛，蘊含和牛養殖的璀璨傳承。',
    website: 'https://www.coronawagyu.com.au',
    established: '2010s',
    region: 'Australia',
    grade: 'M9',
  },
  {
    name: 'True North',
    category: '純血品牌',
    categoryEn: 'Pure-Blood',
    description: '北領地精品和牛品牌，以純淨環境與傳統養殖聞名。',
    website: 'https://www.truenorthwagyu.com.au',
    established: '2010s',
    region: 'Northern Territory',
    grade: 'M8-M9',
  },
  {
    name: 'PINNACLE',
    category: '純血品牌',
    categoryEn: 'Pure-Blood',
    description: '澳洲頂級純血和牛品牌，定位高端餐飲與零售市場。',
    website: 'https://www.pinnaclewagyu.com.au',
    established: '2010s',
    region: 'Australia',
    grade: 'M9-M12',
  },
  {
    name: "Jack's CREEK",
    category: '純血品牌',
    categoryEn: 'Pure-Blood',
    description: '新南威爾斯州傳奇純血和牛，連續多年獲獎的頂級品牌。',
    website: 'https://www.jackscreek.com.au',
    established: '1990s',
    region: 'New South Wales',
    grade: 'M9+',
  },
  {
    name: '2GR',
    category: '純血品牌',
    categoryEn: 'Pure-Blood',
    description: '專注純血和牛育種與高端肉品供應的精品品牌。',
    website: 'https://www.2gr.com.au',
    established: '2000s',
    region: 'Australia',
    grade: 'M8-M9',
  },
  // 混血品牌
  {
    name: 'Global Meat',
    category: '混血品牌',
    categoryEn: 'Cross-Bred',
    description: '澳洲和牛混血品牌，專注批發與出口市場供應。',
    website: 'https://www.globalmeat.com.au',
    established: '1990s',
    region: 'Australia',
    grade: 'M5-M9',
  },
  {
    name: 'Margaret River',
    category: '混血品牌',
    categoryEn: 'Cross-Bred',
    description: '西澳瑪格麗特河區精品和牛，結合當地純淨環境養殖。',
    website: 'https://www.margaretriverwagyu.com.au',
    established: '2000s',
    region: 'Western Australia',
    grade: 'M7-M9',
  },
  {
    name: 'Westholme',
    category: '混血品牌',
    categoryEn: 'Cross-Bred',
    description: '昆士蘭州歷史悠久的和牛養殖家族，以穩定品質著稱。',
    website: 'https://www.westholmewagyu.com.au',
    established: '1960s',
    region: 'Queensland',
    grade: 'M7-M9',
  },
  {
    name: 'CARRARA',
    category: '混血品牌',
    categoryEn: 'Cross-Bred',
    description: '命名取自昆士蘭 Carrara 地區的和牛品牌，專注中高端市場。',
    website: 'https://www.carrarawagyu.com.au',
    established: '2000s',
    region: 'Queensland',
    grade: 'M7-M9',
  },
  {
    name: 'Kiwami',
    category: '混血品牌',
    categoryEn: 'Cross-Bred',
    description: '日文「極」之意，定位精品混血和牛市場。',
    website: 'https://www.kiwamiwagyu.com.au',
    established: '2010s',
    region: 'Australia',
    grade: 'M7-M9',
  },
  {
    name: 'Stockyard',
    category: '混血品牌',
    categoryEn: 'Cross-Bred',
    description: '維多利亞州大型和牛養殖品牌，規模化養殖與品質兼顧。',
    website: 'https://www.stockyardmeat.com.au',
    established: '1990s',
    region: 'Victoria',
    grade: 'M5-M9',
  },
  {
    name: 'Security Foods',
    category: '混血品牌',
    categoryEn: 'Cross-Bred',
    description: '維多利亞州精品和牛品牌，專注食品安全與品質監控。',
    website: 'https://www.securityfoods.com.au',
    established: '1990s',
    region: 'Victoria',
    grade: 'M5-M9',
  },
  {
    name: 'SHIMO',
    category: '混血品牌',
    categoryEn: 'Cross-Bred',
    description: '精品和牛混血品牌，命名取自日文「霜」之意，象徵頂級油花。',
    website: 'https://www.shimowagyu.com.au',
    established: '2010s',
    region: 'Australia',
    grade: 'M7-M9',
  },
  {
    name: 'SK Security',
    category: '混血品牌',
    categoryEn: 'Cross-Bred',
    description: '注重食品安全與和牛品質穩定的混血品牌。',
    website: 'https://www.sksecurity.com.au',
    established: '2000s',
    region: 'Australia',
    grade: 'M5-M8',
  },
  {
    name: 'Tamji',
    category: '混血品牌',
    categoryEn: 'Cross-Bred',
    description: '澳洲和牛混血品牌，專注亞洲市場出口供應。',
    website: 'https://www.tamjiwagyu.com.au',
    established: '2010s',
    region: 'Australia',
    grade: 'M5-M9',
  },
  {
    name: 'I con',
    category: '混血品牌',
    categoryEn: 'Cross-Bred',
    description: '精品和牛混血品牌，以現代化品牌形象供應高端餐飲。',
    website: 'https://www.iconwagyu.com.au',
    established: '2010s',
    region: 'Australia',
    grade: 'M7-M9',
  },
  {
    name: 'Omino',
    category: '混血品牌',
    categoryEn: 'Cross-Bred',
    description: '澳洲精品和牛品牌，專注於和牛品質與永續養殖。',
    website: 'https://www.ominowagyu.com.au',
    established: '2010s',
    region: 'Australia',
    grade: 'M7-M9',
  },
  {
    name: 'PureBlack',
    category: '混血品牌',
    categoryEn: 'Cross-Bred',
    description: '以「PureBlack」為品牌的澳洲和牛混血肉品，品質穩定。',
    website: 'https://www.pureblackmeat.com.au',
    established: '2000s',
    region: 'Australia',
    grade: 'M5-M9',
  },
]

const categories = ['全部', '全血品牌', '純血品牌', '混血品牌']

const categoryColors: Record<string, string> = {
  '全血品牌': 'bg-red-50 border-red-200 text-red-700',
  '純血品牌': 'bg-amber-50 border-amber-200 text-amber-700',
  '混血品牌': 'bg-emerald-50 border-emerald-200 text-emerald-700',
}

const categoryBadgeColors: Record<string, string> = {
  '全血品牌': 'from-red-500 to-rose-600',
  '純血品牌': 'from-amber-500 to-orange-600',
  '混血品牌': 'from-emerald-500 to-teal-600',
}

export default function AUWagyuBrandsSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const filteredBrands = auWagyuBrands.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.region.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === '全部' || brand.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const groupedBrands = filteredBrands.reduce(
    (acc, brand) => {
      if (!acc[brand.category]) acc[brand.category] = []
      acc[brand.category].push(brand)
      return acc
    },
    {} as Record<string, typeof auWagyuBrands>
  )

  const counts = {
    全部: auWagyuBrands.length,
    全血品牌: auWagyuBrands.filter((b) => b.category === '全血品牌').length,
    純血品牌: auWagyuBrands.filter((b) => b.category === '純血品牌').length,
    混血品牌: auWagyuBrands.filter((b) => b.category === '混血品牌').length,
  }

  return (
    <section id="au-wagyu-brands" className="mb-16 sm:mb-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 sm:mb-10">
        <div>
          <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative pb-3 sm:pb-4">
            🦘 澳洲和牛品牌總覽
            <span className="absolute bottom-0 left-0 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
          </h2>
          <p className="text-warm-gray mt-2 text-sm">
            收錄全血 / 純血 / 混血三大類型共 {auWagyuBrands.length} 個澳洲和牛品牌
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'gradient-meat text-white'
                  : 'bg-cream text-warm-gray hover:text-primary'
              }`}
            >
              {cat} ({counts[cat as keyof typeof counts]})
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" size={20} />
        <input
          type="text"
          placeholder="搜尋品牌名稱、產地或描述..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-light-gray focus:border-primary focus:outline-none transition-colors bg-white"
        />
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center gap-3 flex-wrap">
        <span className="text-sm text-warm-gray">
          找到{' '}
          <span className="font-semibold text-primary">{filteredBrands.length}</span>{' '}
          個品牌
        </span>
        {selectedCategory !== '全部' && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[selectedCategory]}`}>
            {selectedCategory}
          </span>
        )}
      </div>

      {/* Category Legend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Award className="text-red-500" size={20} />
          </div>
          <div>
            <div className="font-semibold text-red-700">全血品牌</div>
            <div className="text-xs text-red-600 mt-0.5">100% 純血統日本和牛後代</div>
            <div className="text-xs text-red-400 mt-0.5">共 {counts['全血品牌']} 個品牌</div>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Droplets className="text-amber-500" size={20} />
          </div>
          <div>
            <div className="font-semibold text-amber-700">純血品牌</div>
            <div className="text-xs text-amber-600 mt-0.5">嚴格血統管理，近全血標準</div>
            <div className="text-xs text-amber-400 mt-0.5">共 {counts['純血品牌']} 個品牌</div>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Globe className="text-emerald-500" size={20} />
          </div>
          <div>
            <div className="font-semibold text-emerald-700">混血品牌</div>
            <div className="text-xs text-emerald-600 mt-0.5">日本和牛 × 當地肉牛配種</div>
            <div className="text-xs text-emerald-400 mt-0.5">共 {counts['混血品牌']} 個品牌</div>
          </div>
        </div>
      </div>

      {/* Brand Cards by Category */}
      {Object.entries(groupedBrands).map(([category, brands]) => (
        <div key={category} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h3 className={`font-serif-tc text-xl font-bold bg-gradient-to-r ${categoryBadgeColors[category]} bg-clip-text text-transparent`}>
              {category}
            </h3>
            <div className="flex-1 h-px bg-light-gray"></div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[category]}`}>
              {brands.length} 個品牌
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-xl p-5 border-2 border-light-gray hover:border-primary hover:shadow-lg transition-all group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${categoryBadgeColors[category]}`}>
                      <span className="text-white font-bold text-sm">
                        {brand.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal leading-tight">{brand.name}</h4>
                      <span className="text-xs text-warm-gray">📍 {brand.region}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${categoryBadgeColors[category]} text-white`}>
                    {brand.established}
                  </span>
                </div>

                <p className="text-sm text-warm-gray mb-3 leading-relaxed">
                  {brand.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-cream rounded-full text-warm-gray">
                      等級：<span className="font-semibold text-primary">{brand.grade}</span>
                    </span>
                  </div>
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:text-red-600 transition-colors"
                  >
                    官網 <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Empty State */}
      {filteredBrands.length === 0 && (
        <div className="text-center py-16 bg-cream rounded-2xl">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="font-serif-tc text-xl text-charcoal mb-2">找不到符合條件的品牌</h3>
          <p className="text-warm-gray text-sm">嘗試調整搜尋關鍵字或選擇不同分類</p>
        </div>
      )}

      {/* Data Source Note */}
      <div className="mt-8 p-4 bg-cream/50 rounded-xl border border-dashed border-light-gray">
        <p className="text-xs text-warm-gray text-center">
          💡 資料來源：Australian Wagyu Association 及各品牌官方網站 | 官網連結已整合可直接點擊訪問
        </p>
      </div>
    </section>
  )
}
