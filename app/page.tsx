import Header from '@/components/Header'
import Hero from '@/components/Hero'
import NewsSection from '@/components/NewsSection'
import StandardsSection from '@/components/StandardsSection'
import MarketsSection from '@/components/MarketsSection'
import USFacilitiesSection from '@/components/USFacilitiesSection'
import FAQSection from '@/components/FAQSection'
import AUFactorySection from '@/components/AUFactorySection'
import DataSourcesSection from '@/components/DataSourcesSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main className="max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* 最新動態 - 讓用戶第一時間看到產業資訊 */}
        <NewsSection />
        
        {/* 分級標準 - 核心知識區塊 */}
        <StandardsSection />
        
        {/* 設施查詢區域 - 統一的查詢入口 */}
        <section className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative inline-block pb-3 sm:pb-4">
              合格輸入設施查詢
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
            </h2>
            <p className="text-warm-gray mt-4 text-sm sm:text-base">
              查詢各國核准輸入的牛肉生產設施名單
            </p>
          </div>
          
          {/* 日本設施 */}
          <MarketsSection />
          
          {/* 美國設施 */}
          <USFacilitiesSection />
        </section>
        
        {/* 常見問題 */}
        <FAQSection />
        
        {/* 澳洲工廠 PDF 查詢 */}
        <AUFactorySection />
        
        {/* 資料來源 */}
        <DataSourcesSection />
      </main>
      <Footer />
    </>
  )
}
