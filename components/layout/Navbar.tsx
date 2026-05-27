'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Menu } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useLanguage } from '@/contexts/LanguageContext'
import { MobileMenu } from './MobileMenu'
import { cn } from '@/lib/utils'
import type { Language } from '@/types'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const cartCount = useCartStore((s) => s.count())
  const { t, language, setLanguage } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/shop', label: t.nav.shop },
    { href: '/about', label: t.nav.about },
    { href: '/contatti', label: t.nav.contact },
  ]

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-30 transition-all duration-500',
          scrolled
            ? 'bg-cream/95 backdrop-blur-sm shadow-sm'
            : 'bg-cream/80 backdrop-blur-sm'
        )}
      >
        <div className="section-padding page-max">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Left: Nav links (desktop) */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-serif text-base transition-colors duration-200',
                    pathname.startsWith(link.href)
                      ? 'text-wine'
                      : 'text-ink/80 hover:text-wine'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Center: Logo */}
            <Link
              href="/"
              className="font-serif text-2xl sm:text-3xl text-wine tracking-wide absolute left-1/2 -translate-x-1/2"
            >
              Arianna Fazio
            </Link>

            {/* Right: Lang + Cart + Hamburger */}
            <div className="flex items-center gap-4 sm:gap-5 ml-auto">
              {/* Language toggle (desktop) */}
              <div className="hidden lg:flex items-center gap-2.5">
                {(['it', 'en'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      'font-sans text-xs tracking-widest uppercase transition-colors duration-200',
                      language === lang
                        ? 'text-wine font-medium'
                        : 'text-ink-light hover:text-wine'
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Cart */}
              <Link
                href="/carrello"
                aria-label={t.nav.cart}
                className="relative text-wine hover:text-wine-dark transition-colors duration-200"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-wine text-cream rounded-full text-[10px] flex items-center justify-center font-sans">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Hamburger (mobile) */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label={t.nav.menu}
                className="lg:hidden text-wine hover:text-wine-dark transition-colors duration-200"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
