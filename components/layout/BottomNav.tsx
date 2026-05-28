'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ShoppingBag, User, Mail } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  // Hide on admin pages and artwork detail (which has its own sticky bar)
  if (pathname.startsWith('/admin') || pathname.startsWith('/shop/') && pathname !== '/shop') {
    return null
  }

  const items = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/shop', icon: ShoppingBag, label: t.nav.shop },
    { href: '/about', icon: User, label: t.nav.about },
    { href: '/contatti', icon: Mail, label: t.nav.contact },
  ]

  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-20 bg-cream/95 backdrop-blur-sm border-t border-rose-200 safe-bottom">
      <div className="grid grid-cols-4 max-w-md mx-auto">
        {items.map(({ href, icon: Icon, label }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 py-2.5 min-h-[60px] transition-colors',
                active ? 'text-wine' : 'text-ink-light hover:text-wine'
              )}
            >
              <Icon size={20} strokeWidth={1.5} />
              <span className="font-sans text-[10px] tracking-wide">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
