'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Language } from '@/types'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t, language, setLanguage } = useLanguage()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { href: '/shop', label: t.nav.shop },
    { href: '/about', label: t.nav.about },
    { href: '/contatti', label: t.nav.contact },
    { href: '/carrello', label: t.nav.cart },
  ]

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-soft-black/40 z-40 lg:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
            className="fixed top-0 right-0 h-full w-80 max-w-full bg-ivory z-50 flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-sand">
              <span className="font-serif text-lg">Menu</span>
              <button
                onClick={onClose}
                className="p-1 text-warm-gray-600 hover:text-soft-black transition-colors"
                aria-label={t.nav.close}
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-4 font-serif text-3xl text-soft-black hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="p-8 border-t border-sand">
              <div className="flex items-center gap-4">
                <span className="label-caps">Lingua</span>
                {(['it', 'en'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`font-sans text-sm uppercase tracking-widest transition-colors ${
                      language === lang
                        ? 'text-soft-black font-medium'
                        : 'text-warm-gray-400 hover:text-soft-black'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
