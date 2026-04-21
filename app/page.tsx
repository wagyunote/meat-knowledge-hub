import Header from '@/components/Header'
import Hero from '@/components/Hero'
import HandbookSection from '@/components/HandbookSection'
import StandardsSection from '@/components/StandardsSection'
import MarketsSection from '@/components/MarketsSection'
import FacilityPDFSection from '@/components/FacilityPDFSection'
import FAQSection from '@/components/FAQSection'
import DataSourcesSection from '@/components/DataSourcesSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main className="max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* 屠宰手冊下載 */}
        <HandbookSection />
        
        {/* 分級標準 */}
        <StandardsSection />

        {/* 日本設施表格 */}
        <section id="japan-facilities" className="mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 sm:mb-10">
            <div>
              <h2 className="font-serif-tc text-2xl sm:text-3xl text-charcoal relative pb-3 sm:pb-4">
                日本牛肉核准輸入設施
                <span className="absolute bottom-0 left-0 w-14 sm:w-16 h-1 gradient-meat rounded-full"></span>
              </h2>
              <p className="text-warm-gray text-sm mt-2">
                🇯🇵 台灣輸入查驗用 · 最後更新：2026 年 3 月 10 日
              </p>
            </div>
          </div>
          <MarketsSection />
        </section>

        {/* 美國/澳洲設施 PDF */}
        <FacilityPDFSection />
        
        {/* 常見問題 */}
        <FAQSection />
        
        {/* 資料來源 */}
        <DataSourcesSection />
      </main>
      <Footer />
    </>
  )
}
