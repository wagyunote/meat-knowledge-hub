import Header from '@/components/Header'
import Hero from '@/components/Hero'
import NewsSection from '@/components/NewsSection'
import KnowledgeSection from '@/components/KnowledgeSection'
import MarketsSection from '@/components/MarketsSection'
import StandardsSection from '@/components/StandardsSection'
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
      <main className="max-w-[1400px] mx-auto px-6 sm:px-10 py-16">
        <NewsSection />
        <KnowledgeSection />
        <MarketsSection />
        <StandardsSection />
        <USFacilitiesSection />
        <FAQSection />
        <AUFactorySection />
        <DataSourcesSection />
      </main>
      <Footer />
    </>
  )
}
