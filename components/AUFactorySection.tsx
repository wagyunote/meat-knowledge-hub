'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, FileText, ExternalLink, Factory } from 'lucide-react'

// 澳洲肉品工廠資料（從 PDF 提取的範例資料）
const auFactories = [
  { code: '291', name: 'Australian Lamb Company', location: 'Victoria', type: '羊肉/牛肉' },
  { code: '292', name: 'JBS Australia (Brooklyn)', location: 'Victoria', type: '牛肉' },
  { code: '294', name: 'JBS Australia (Longford)', location: 'Tasmania', type: '牛肉/羊肉' },
  { code: '296', name: 'Teys Australia (Naracoorte)', location: 'South Australia', type: '牛肉' },
  { code: '298', name: 'Teys Australia (Wagga)', location: 'New South Wales', type: '牛肉' },
  { code: '299', name: 'Ralphs Meat Company', location: 'Victoria', type: '羊肉/牛肉' },
  { code: '301', name: 'Thomas Foods International', location: 'South Australia', type: '羊肉/牛肉' },
  { code: '302', name: 'Teys Australia (Biloela)', location: 'Queensland', type: '牛肉' },
  { code: '303', name: 'JBS Australia (Dinmore)', location: 'Queensland', type: '牛肉' },
  { code: '304', name: 'JBS Australia (Toowoomba)', location: 'Queensland', type: '牛肉' },
  { code: '305', name: 'Teys Australia (Rockhampton)', location: 'Queensland', type: '牛肉' },
  { code: '306', name: 'Nippon Meat Packers (Aus)', location: 'Queensland', type: '牛肉' },
  { code: '307', name: 'Stanbroke Beef', location: 'Queensland', type: '牛肉' },
  { code: '308', name: 'Swift Australia (Yanco)', location: 'New South Wales', type: '牛肉/羊肉' },
  { code: '309', name: 'Fletcher International Exports', location: 'New South Wales', type: '羊肉' },
  { code: '310', name: 'Dinmore Meat Processors', location: 'Queensland', type: '牛肉' },
  { code: '311', name: 'Australian Country Choice', location: 'Queensland', type: '牛肉' },
  { code: '312', name: 'Meramist Pty Ltd', location: 'Queensland', type: '牛肉' },
  { code: '313', name: 'John Dee Warwick', location: 'Queensland', type: '牛肉/羊肉' },
  { code: '314', name: 'Nolan Meats', location: 'Queensland', type: '牛肉' },
]

export default function AUFactorySection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('全部')

  const types = ['全部', '牛肉', '羊肉', '羊肉/牛肉']

  const filteredFactories = auFactories.filter(factory => {
    const matchesSearch = factory.code.includes(searchTerm) || 
                         factory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         factory.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === '全部' || factory.type.includes(selectedType)
    return matchesSearch && matchesType
  })

  return (
    <section id="au-factories" className="mb-16 sm:mb-20">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 sm:mb-10">
        <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative pb-3 sm:pb-4">
          🦘 澳洲肉品工廠查詢
          <span className="absolute bottom-0 left-0 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
        </h2>
        <a 
          href="./AU-經我國核准之澳洲肉品工廠名單-系統認證-6-Feb-2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
        >
          <FileText size={16} />
          查看完整 PDF <ExternalLink size={14} />
        </a>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-card">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" size={20} />
            <input
              type="text"
              placeholder="搜尋廠號、工廠名稱或地區..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-light-gray focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedType === type
                    ? 'gradient-meat text-white'
                    : 'bg-cream text-warm-gray hover:text-primary'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-warm-gray">
          找到 <span className="font-semibold text-primary">{filteredFactories.length}</span> 個工廠
        </div>

        {/* Factory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFactories.map((factory, index) => (
            <motion.div
              key={factory.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-cream rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Factory className="text-primary" size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-warm-gray">廠號</span>
                    <div className="font-serif-tc text-xl font-bold text-primary">{factory.code}</div>
                  </div>
                </div>
                <span className="px-2 py-1 bg-white rounded-full text-xs text-warm-gray">
                  {factory.type}
                </span>
              </div>
              <h3 className="font-semibold text-charcoal mb-1">{factory.name}</h3>
              <p className="text-sm text-warm-gray">📍 {factory.location}</p>
            </motion.div>
          ))}
        </div>

        {/* PDF Download */}
        <div className="mt-8 p-6 bg-gradient-to-r from-cream to-white rounded-xl border-2 border-dashed border-light-gray">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="text-red-500" size={32} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-charcoal mb-1">完整工廠名單 PDF</h3>
              <p className="text-sm text-warm-gray mb-2">
                經我國核准之澳洲肉品工廠名單（系統認證）- 2026年2月6日更新
              </p>
              <p className="text-xs text-warm-gray">
                檔案大小：約 930 KB · 格式：PDF
              </p>
            </div>
            <a
              href="./AU-經我國核准之澳洲肉品工廠名單-系統認證-6-Feb-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full gradient-meat text-white font-medium hover:shadow-lg transition-all flex items-center gap-2"
            >
              <ExternalLink size={18} />
              開啟 PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
