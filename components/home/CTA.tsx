'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export function CTA() {
  const { t } = useLanguage()

  return (
    <section className="section-padding page-max py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="label-caps mb-5">{t.home.featuredSubtitle}</p>
        <h2 className="heading-lg mb-5 text-balance">{t.home.ctaTitle}</h2>
        <p className="font-sans text-warm-gray-600 text-[15px] leading-relaxed mb-10">
          {t.home.ctaText}
        </p>
        <Link href="/shop" className="btn-primary">
          {t.home.ctaButton}
        </Link>
      </motion.div>
    </section>
  )
}
