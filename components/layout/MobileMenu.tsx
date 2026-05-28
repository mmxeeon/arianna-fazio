'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { createClient } from '@/lib/supabase/client'
import type { Language, Artwork } from '@/types'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t, language, setLanguage } = useLanguage()
  const [previewArtworks, setPreviewArtworks] = useState<Artwork[]>([])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (open && previewArtworks.length === 0) {
      const supabase = createClient()
      supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2)
        .then(({ data }) => setPreviewArtworks(data ?? []))
    }
  }, [open, previewArtworks.length])

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
            className="fixed inset-0 bg-wine/40 z-40 lg:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
            className="fixed top-0 right-0 h-full w-[88%] max-w-sm bg-cream z-50 flex flex-col lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5 border-b border-rose-200">
              <span className="font-serif text-xl text-wine">Menu</span>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-wine hover:text-wine-dark transition-colors"
                aria-label={t.nav.close}
              >
                <X size={22} />
              </button>
            </div>

            <nav className="px-6 py-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-4 font-serif text-2xl text-wine hover:text-rose-500 transition-colors duration-200 border-b border-rose-100 last:border-b-0"
                  >
                    {link.label}
                    <ArrowRight size={18} className="text-rose-400" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Preview opere recenti */}
            {previewArtworks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="px-6 mt-4"
              >
                <p className="label-caps text-wine-light mb-3">Opere recenti</p>
                <div className="grid grid-cols-2 gap-3">
                  {previewArtworks.map((a) => (
                    <Link
                      key={a.id}
                      href={`/shop/${a.slug}`}
                      onClick={onClose}
                      className="group block"
                    >
                      <div className="aspect-square overflow-hidden bg-rose-100 rounded-sm mb-1.5 relative">
                        {a.image_url && (
                          <Image
                            src={a.image_url}
                            alt={a.title}
                            fill
                            sizes="200px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <p className="font-serif text-sm text-wine truncate">{a.title}</p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="mt-auto p-6 border-t border-rose-200">
              <div className="flex items-center gap-4">
                <span className="label-caps">Lingua</span>
                <div className="flex gap-1">
                  {(['it', 'en'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-2 font-sans text-sm uppercase tracking-widest transition-colors min-w-[44px] ${
                        language === lang ? 'text-wine font-medium' : 'text-ink-light hover:text-wine'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
