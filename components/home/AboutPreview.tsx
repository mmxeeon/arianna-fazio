'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowRight } from 'lucide-react'

export function AboutPreview() {
  const { t } = useLanguage()

  return (
    <section className="bg-rose-100">
      <div className="section-padding page-max py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1582482851-5d4bd2c4d111?w=900&q=80"
                alt="Atelier di Arianna Fazio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="label-caps mb-5">{t.home.aboutTitle}</p>
            <h2 className="heading-lg mb-3 text-balance">Arianna Fazio</h2>
            <p className="font-serif italic text-xl text-rose-500 mb-7">
              Artista, pittrice, creatrice di emozioni.
            </p>
            <p className="font-sans text-ink-light leading-relaxed mb-8 text-[15px]">
              {t.home.aboutText}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-wine hover:text-wine-dark transition-colors duration-200 group"
            >
              {t.home.aboutCta}
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
