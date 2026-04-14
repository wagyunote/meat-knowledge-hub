import type { Metadata } from 'next'
import { Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google'
import './globals.css'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans-tc',
  display: 'swap',
})

const notoSerifTC = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif-tc',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '肉品知識庫 | Meat Knowledge Hub',
  description: '整合日本官方肉品分級標準、全國食肉市場資訊、產業動態與專業知識，為您提供即時、準確的肉品產業資訊平台',
  keywords: '肉品, 牛肉, 和牛, 食肉市場, JMGA, 肉品分級, 產業新聞',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" className={`${notoSansTC.variable} ${notoSerifTC.variable}`}>
      <body className="font-sans-tc antialiased">{children}</body>
    </html>
  )
}
