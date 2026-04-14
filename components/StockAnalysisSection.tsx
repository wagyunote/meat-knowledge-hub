'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, RefreshCw, Activity, BarChart3, Users, DollarSign } from 'lucide-react'

interface StockData {
  code: string
  name: string
  price?: number
  chg_pct?: number
  ma5?: number
  ma10?: number
  ma20?: number
  rsi?: number
  k?: number
  d?: number
  bias5?: number
  signal?: string
  ma_position?: string
  error?: string
}

interface ChipData {
  name: string
  foreign_buy?: number
  foreign_hold?: number
  invest_buy?: number
  dealer_buy?: number
  error?: string
}

export default function StockAnalysisSection() {
  const [stocks, setStocks] = useState<StockData[]>([])
  const [chips, setChips] = useState<Record<string, ChipData>>({})
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async () => {
    setRefreshing(true)
    try {
      const basePath = process.env.NODE_ENV === 'production' ? '/meat-knowledge-hub' : ''
      
      // 技術分析
      const techRes = await fetch(`${basePath}/data/stock_analysis.json`)
      const techData = await techRes.json()
      
      // 籌碼分析
      const chipRes = await fetch(`${basePath}/data/chip_analysis.json`)
      const chipData = await chipRes.json()
      
      if (techData.stocks) setStocks(techData.stocks)
      if (chipData.data) setChips(chipData.data)
      if (techData.timestamp) setLastUpdate(techData.timestamp)
    } catch (e) {
      console.error('Failed to fetch stock data:', e)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
    // 每5分鐘自動更新
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getChangeIcon = (chg: number | undefined) => {
    if (!chg) return <Minus className="w-4 h-4" />
    if (chg > 0) return <TrendingUp className="w-4 h-4 text-green-500" />
    return <TrendingDown className="w-4 h-4 text-red-500" />
  }

  const getRSIColor = (rsi: number | undefined) => {
    if (!rsi) return 'text-gray-400'
    if (rsi > 70) return 'text-red-500 font-bold'
    if (rsi < 30) return 'text-green-500 font-bold'
    return 'text-gray-700'
  }

  const getKDColor = (k: number | undefined, d: number | undefined) => {
    if (!k || !d) return 'text-gray-400'
    if (k > 80 && d > 80) return 'text-red-500'
    if (k < 20 && d < 20) return 'text-green-500'
    return 'text-gray-700'
  }

  return (
    <section id="stocks" className="mb-16 sm:mb-20">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 sm:mb-10">
        <div>
          <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative pb-3 sm:pb-4">
            📊 台股技術分析
            <span className="absolute bottom-0 left-0 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
          </h2>
          <p className="text-warm-gray text-sm mt-2">追蹤 13 檔持股 · 技術指標 + 籌碼分析</p>
        </div>
        <button
          onClick={fetchData}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-light-gray hover:border-primary hover:text-primary transition-colors text-sm font-medium disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? '更新中...' : '重新整理'}
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl p-5 animate-pulse">
              <div className="h-6 bg-light-gray rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-light-gray rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* 總覽統計 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-card">
              <div className="flex items-center gap-2 text-warm-gray text-sm mb-1">
                <Activity className="w-4 h-4" />
                追蹤數量
              </div>
              <div className="font-serif-tc text-2xl font-bold text-charcoal">{stocks.length}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-card">
              <div className="flex items-center gap-2 text-warm-gray text-sm mb-1">
                <BarChart3 className="w-4 h-4" />
                資料日期
              </div>
              <div className="font-serif-tc text-lg font-bold text-charcoal">{lastUpdate || '-'}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-card">
              <div className="flex items-center gap-2 text-warm-gray text-sm mb-1">
                <Users className="w-4 h-4" />
                外資偏多
              </div>
              <div className="font-serif-tc text-2xl font-bold text-green-600">
                {Object.values(chips).filter(c => (c.foreign_buy || 0) > 0).length}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-card">
              <div className="flex items-center gap-2 text-warm-gray text-sm mb-1">
                <DollarSign className="w-4 h-4" />
                外資偏空
              </div>
              <div className="font-serif-tc text-2xl font-bold text-red-600">
                {Object.values(chips).filter(c => (c.foreign_buy || 0) < 0).length}
              </div>
            </div>
          </div>

          {/* 股票列表 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {stocks.map((stock, index) => {
              const chip = chips[stock.code] || {}
              const chgIcon = getChangeIcon(stock.chg_pct)
              
              return (
                <motion.div
                  key={stock.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow"
                >
                  {/* 標題行 */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center text-primary font-bold text-sm">
                        {stock.code}
                      </div>
                      <div>
                        <div className="font-semibold text-charcoal">{stock.name}</div>
                        <div className="text-xs text-warm-gray">{stock.signal || '分析中'}</div>
                      </div>
                    </div>
                    {chgIcon}
                  </div>

                  {/* 價格 */}
                  {stock.price && (
                    <div className="mb-4">
                      <span className="font-serif-tc text-2xl font-bold text-charcoal">
                        {stock.price.toFixed(2)}
                      </span>
                      <span className={`ml-2 text-sm font-medium ${
                        (stock.chg_pct || 0) > 0 ? 'text-green-600' : 
                        (stock.chg_pct || 0) < 0 ? 'text-red-600' : 'text-gray-500'
                      }`}>
                        {(stock.chg_pct || 0) > 0 ? '+' : ''}{stock.chg_pct?.toFixed(2)}%
                      </span>
                    </div>
                  )}

                  {/* 技術指標 */}
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <span className="text-warm-gray">MA位置：</span>
                      <span className="font-medium text-charcoal">{stock.ma_position || '-'}</span>
                    </div>
                    <div>
                      <span className="text-warm-gray">RSI：</span>
                      <span className={`font-medium ${getRSIColor(stock.rsi)}`}>
                        {stock.rsi?.toFixed(1) || '-'}
                      </span>
                    </div>
                    <div>
                      <span className="text-warm-gray">K/D：</span>
                      <span className={`font-medium ${getKDColor(stock.k, stock.d)}`}>
                        {stock.k?.toFixed(1) || '-'}/{stock.d?.toFixed(1) || '-'}
                      </span>
                    </div>
                    <div>
                      <span className="text-warm-gray">Bias5：</span>
                      <span className={`font-medium ${
                        Math.abs(stock.bias5 || 0) > 5 ? 'text-amber-600' : 'text-charcoal'
                      }`}>
                        {stock.bias5?.toFixed(2) || '-'}%
                      </span>
                    </div>
                  </div>

                  {/* 籌碼 */}
                  {chip.foreign_buy !== undefined && (
                    <div className="pt-3 border-t border-light-gray">
                      <div className="text-xs text-warm-gray mb-2">籌碼</div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-warm-gray">外資：</span>
                          <span className={`font-medium ${
                            (chip.foreign_buy || 0) > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {(chip.foreign_buy || 0) > 0 ? '+' : ''}{(chip.foreign_buy || 0).toLocaleString()}張
                          </span>
                        </div>
                        <div>
                          <span className="text-warm-gray">投信：</span>
                          <span className={`font-medium ${
                            (chip.invest_buy || 0) > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {(chip.invest_buy || 0) > 0 ? '+' : ''}{(chip.invest_buy || 0).toLocaleString()}張
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {stock.error && (
                    <div className="text-xs text-red-500 mt-2">{stock.error}</div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* 更新時間 */}
          <div className="mt-6 text-center text-xs text-warm-gray flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            自動更新 · 每5分鐘刷新
          </div>
        </>
      )}
    </section>
  )
}
