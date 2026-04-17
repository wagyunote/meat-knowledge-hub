import Header from '@/components/Header'
import Hero from '@/components/Hero'
import HandbookSection from '@/components/HandbookSection'
import StandardsSection from '@/components/StandardsSection'
import MarketsSection from '@/components/MarketsSection'
import AUWagyuBrandsSection from '@/components/AUWagyuBrandsSection'
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
        {/* 屠宰手冊下載 - 新區塊 */}
        <HandbookSection />
        
        {/* 分級標準 */}
        <StandardsSection />

        {/* 澳洲和牛品牌 */}
        <AUWagyuBrandsSection />
        
        {/* 設施查詢 */}
        <section className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative inline-block pb-3 sm:pb-4">
              合格輸入設施查詢
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
            </h2>
          </div>
          <MarketsSection />
          <USFacilitiesSection />
        </section>
        
        {/* 常見問題 */}
        <FAQSection />
        
        {/* 澳洲工廠 */}
        <AUFactorySection />
        
        {/* 資料來源 */}
        <DataSourcesSection />
      </main>
      <Footer />
    </>
  )
}
