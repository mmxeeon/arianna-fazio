'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export function CTA() {
  const { t } = useLanguage()

  return (
    <section className="bg-rose-50">
      <div className="section-padding page-max py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Text */}
          <div>
            <p className="label-caps mb-4">Opere su misura</p>

            <div className="flex items-center gap-3 mb-5">
              <span className="w-1.5 h-1.5 rotate-45 bg-rose-500" />
              <span className="h-px w-12 bg-rose-300" />
            </div>

            <h2 className="heading-lg mb-5 text-balance">{t.home.ctaTitle}</h2>
            <p className="font-sans text-ink-light text-[15px] leading-relaxed mb-8">
              {t.home.ctaText}
            </p>
            <Link href="/shop" className="btn-primary">
              {t.home.ctaButton}
            </Link>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=900&q=80"
              alt="Opere d'arte"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
