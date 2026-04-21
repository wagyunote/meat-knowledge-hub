import Header from '@/components/Header'
import Hero from '@/components/Hero'
import HandbookSection from '@/components/HandbookSection'
import StandardsSection from '@/components/StandardsSection'
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

        {/* 設施查詢 PDF */}
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
