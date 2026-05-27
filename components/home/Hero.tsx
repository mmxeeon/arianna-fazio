'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowDown } from 'lucide-react'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1600&q=80"
          alt="Opera di Arianna Fazio"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-soft-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-soft-black/20 via-transparent to-soft-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-12 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="label-caps text-ivory/60 mb-6 tracking-[0.25em]"
        >
          Arte Originale
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="heading-display text-ivory mb-6"
        >
          {t.home.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-serif text-lg sm:text-xl lg:text-2xl text-ivory/75 font-light leading-relaxed mb-10 whitespace-pre-line"
        >
          {t.home.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-10 py-4 border border-ivory text-ivory font-sans text-xs tracking-[0.2em] uppercase hover:bg-ivory hover:text-soft-black transition-all duration-400"
          >
            {t.home.heroCta}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/40"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  )
}
