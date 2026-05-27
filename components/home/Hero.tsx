'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-20 pb-16">

      {/* Background floral image (full width) */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Soft cream overlay per leggibilità testo */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream/30 via-cream/10 to-cream/30 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-12 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="label-caps text-wine-light mb-5"
        >
          Arte Originale
        </motion.p>

        {/* Ornament line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="h-px w-12 bg-rose-500" />
          <span className="w-1.5 h-1.5 rotate-45 bg-rose-500" />
          <span className="h-px w-12 bg-rose-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="heading-display mb-8"
        >
          {t.home.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-serif text-lg sm:text-xl text-ink/85 font-light leading-relaxed mb-12 whitespace-pre-line"
        >
          {t.home.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <Link href="/shop" className="btn-outline">
            {t.home.heroCta}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
