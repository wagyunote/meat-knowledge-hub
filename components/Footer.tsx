import { Github, Twitter, Mail } from 'lucide-react'

const footerLinks = {
  quickLinks: [
    { label: '我的和牛筆記', href: 'https://www.facebook.com/groups/mywagyunotes', external: true },
    { label: '靠北和牛', href: 'https://www.facebook.com/groups/damnitwagyu', external: true },
    { label: '市場資訊', href: '#markets' },
    { label: '分級標準', href: '#standards' },
  ],
  sources: [
    { label: '食肉市場卸売協會', href: 'https://mmb.jmma.or.jp/' },
    { label: '食肉通信社', href: 'https://www.shokuniku.co.jp/' },
    { label: '食肉格付協會', href: 'https://www.jmga.or.jp/' },
    { label: '家畜改良中心', href: 'https://www.id.nlbc.go.jp/' },
    { label: '美國肉類出口協會', href: 'https://usmef.org.tw/' },
    { label: '澳洲和牛協會', href: 'https://www.wagyu.org.au/' },
  ],
  about: [
    { label: '平台介紹', href: '#' },
    { label: '使用說明', href: '#' },
    { label: '聯絡我們', href: 'https://line.me/ti/p/@273roowq' },
    { label: '隱私政策', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-12 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-serif-tc text-xl sm:text-2xl mb-4">🥩 肉品知識庫</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              整合日本官方肉品分級標準、全國食肉市場資訊、產業動態與專業知識，為肉品產業從業人員與愛好者提供即時、準確的資訊平台。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-semibold mb-5 uppercase tracking-wider">快速連結</h5>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="text-sm text-white/60 hover:text-secondary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sources */}
          <div>
            <h5 className="text-sm font-semibold mb-5 uppercase tracking-wider">資料來源</h5>
            <ul className="space-y-3">
              {footerLinks.sources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-secondary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h5 className="text-sm font-semibold mb-5 uppercase tracking-wider">關於我們</h5>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-secondary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50">
            © 2026 肉品知識庫 Meat Knowledge Hub. All Rights Reserved.
          </p>
          <p className="text-xs text-white/50">
            資料僅供參考，正式規格請以官方網站為準
          </p>
        </div>
      </div>
    </footer>
  )
}
