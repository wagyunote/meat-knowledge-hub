'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lastUpdate, setLastUpdate] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    
    // 載入最後更新時間
    fetch(`${process.env.NODE_ENV === 'production' ? '/meat-knowledge-hub' : ''}/data/news.json`)
      .then(res => res.json())
      .then(data => {
        const ts = data.lastUpdate || data.updatedAt
        if (ts) {
          const d = new Date(ts)
          setLastUpdate(`${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`)
        }
      })
      .catch(() => setLastUpdate('2026/04/14 23:00'))
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: '產業新聞', href: '#news' },
    { label: '知識百科', href: '#knowledge' },
    { label: '日本牛肉設施', href: '#markets' },
    { label: '分級標準', href: '#standards' },
    { label: '常見問題', href: '#faq' },
    { label: '澳洲工廠', href: '#au-factories' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-header' : ''
    }`}>
      {/* Top Bar */}
      <div className="bg-black/15 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-2 flex justify-between items-center text-xs text-white/85">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-dot"></span>
            <span>即時同步更新中 · 最後更新：{lastUpdate}</span>
          </div>
          <div className="hidden sm:block">
            資料來源：日本食肉市場卸売協會 · 食肉通信社 · JMGA · 日本家畜改良中心
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="gradient-meat">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-4 sm:py-5">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-gold rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg">
                🥩
              </div>
              <div className="text-white">
                <h1 className="font-serif-tc text-lg sm:text-2xl font-bold tracking-wider">肉品知識庫</h1>
                <span className="text-[10px] sm:text-xs opacity-80 tracking-[3px] hidden sm:block">MEAT KNOWLEDGE HUB</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:block">
              <ul className="flex gap-8 xl:gap-10">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-white text-sm font-medium relative py-1 hover:text-secondary transition-colors group"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="hidden sm:flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-white/40 text-white text-sm font-medium hover:bg-white/10 transition-all">
                <Search size={16} />
                <span className="hidden md:inline">搜尋</span>
              </button>
              <button className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full gradient-gold text-charcoal text-sm font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all">
                訂閱更新
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden gradient-meat border-t border-white/20"
          >
            <nav className="max-w-[1400px] mx-auto px-6 py-4">
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-white text-base font-medium py-2 block w-full text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
