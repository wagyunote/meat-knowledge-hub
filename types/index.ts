export interface NewsItem {
  id: string
  title: string
  link: string
  pubDate: string
  content?: string
  category?: string
}

export interface Market {
  id: string
  name: string
  region: string
  address: string
  organization: string
  phone: string
  website: string
}

export interface KnowledgeItem {
  id: string
  icon: string
  title: string
  description: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface DataSource {
  id: string
  name: string
  url: string
  icon: string
  status: 'active' | 'inactive' | 'error'
  lastSync: string
}
