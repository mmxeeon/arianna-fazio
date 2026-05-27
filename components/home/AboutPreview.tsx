'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowRight } from 'lucide-react'

export function AboutPreview() {
  const { t } = useLanguage()

  return (
    <section className="bg-beige">
      <div className="section-padding page-max py-20 sm:py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80"
                alt="Arianna Fazio nel suo studio"
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
            className="order-1 lg:order-2"
          >
            <p className="label-caps mb-5">{t.home.aboutTitle}</p>
            <h2 className="heading-lg mb-6 text-balance">Arianna Fazio</h2>
            <p className="font-sans text-warm-gray-600 leading-relaxed mb-8 text-[15px]">
              {t.home.aboutText}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-soft-black hover:text-warm-gray-600 transition-colors duration-200 group"
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
