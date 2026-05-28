'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { useLanguage } from '@/contexts/LanguageContext'
import { MobileMenu } from './MobileMenu'
import { cn } from '@/lib/utils'
import type { Language } from '@/types'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [pulse, setPulse] = useState(false)
  const pathname = usePathname()
  const cartCount = useCartStore((s) => s.count())
  const { t, language, setLanguage } = useLanguage()
  const prevCount = useRef(cartCount)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (cartCount > prevCount.current) {
      setPulse(true)
      const t = setTimeout(() => setPulse(false), 600)
      return () => clearTimeout(t)
    }
    prevCount.current = cartCount
  }, [cartCount])

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

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-serif text-base transition-colors duration-200 min-h-[44px] flex items-center',
                    pathname.startsWith(link.href)
                      ? 'text-wine'
                      : 'text-ink/80 hover:text-wine'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link
              href="/"
              className="font-serif text-xl sm:text-2xl lg:text-3xl text-wine tracking-wide absolute left-1/2 -translate-x-1/2"
            >
              Arianna Fazio
            </Link>

            {/* Right: Lang + Cart + Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              {/* Desktop language toggle */}
              <div className="hidden lg:flex items-center gap-2.5 mr-2">
                {(['it', 'en'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      'font-sans text-xs tracking-widest uppercase transition-colors duration-200 min-h-[44px] flex items-center px-1',
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
                className="relative text-wine hover:text-wine-dark transition-colors duration-200 w-11 h-11 flex items-center justify-center"
              >
                <motion.div
                  animate={pulse ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ShoppingBag size={20} strokeWidth={1.5} />
                </motion.div>
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-1 right-1 w-4 h-4 bg-wine text-cream rounded-full text-[10px] flex items-center justify-center font-sans"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label={t.nav.menu}
                className="lg:hidden text-wine hover:text-wine-dark transition-colors duration-200 w-11 h-11 flex items-center justify-center"
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
