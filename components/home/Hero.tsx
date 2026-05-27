'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-floral-hero pt-20 pb-16">

      {/* Floral decorative images — sides */}
      <div className="absolute inset-y-0 left-0 w-1/3 sm:w-1/4 opacity-90 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1486520299386-6d106b22014b?w=800&q=80"
          alt=""
          fill
          priority
          className="object-cover object-right"
          sizes="33vw"
          style={{ maskImage: 'linear-gradient(to right, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 30%, transparent 100%)' }}
        />
      </div>
      <div className="absolute inset-y-0 right-0 w-1/3 sm:w-1/4 opacity-90 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80"
          alt=""
          fill
          priority
          className="object-cover object-left"
          sizes="33vw"
          style={{ maskImage: 'linear-gradient(to left, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, black 30%, transparent 100%)' }}
        />
      </div>

      {/* Soft overlay */}
      <div className="absolute inset-0 bg-cream/30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-12 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="label-caps text-wine-light mb-6"
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
          <span className="h-px w-16 bg-rose-300" />
          <span className="w-1.5 h-1.5 rotate-45 bg-rose-500" />
          <span className="h-px w-16 bg-rose-300" />
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
          className="font-serif text-lg sm:text-xl lg:text-2xl text-ink/80 font-light leading-relaxed mb-12 whitespace-pre-line italic"
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
