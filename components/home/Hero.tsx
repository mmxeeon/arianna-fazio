'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[60vh] sm:min-h-[72vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-10 sm:pb-12">

      {/* Background floral image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          quality={75}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/40 via-cream/15 to-cream/40 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-12 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="label-caps text-wine-light mb-4 sm:mb-5"
        >
          Arte Originale
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center justify-center gap-2.5 mb-5 sm:mb-6"
        >
          <span className="h-px w-6 sm:w-8 bg-rose-500" />
          <span className="w-1.5 h-1.5 rotate-45 bg-rose-500" />
          <span className="h-px w-6 sm:w-8 bg-rose-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight text-wine mb-5 sm:mb-7"
        >
          {t.home.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-serif text-base sm:text-xl text-ink/85 font-light leading-relaxed mb-8 sm:mb-10 whitespace-pre-line px-4"
        >
          {t.home.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 border border-wine text-wine font-sans text-[11px] sm:text-xs tracking-[0.2em] uppercase hover:bg-wine hover:text-cream transition-all duration-300 rounded-sm min-h-[44px]"
          >
            {t.home.heroCta}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
