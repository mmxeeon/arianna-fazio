'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArtworkCard } from '@/components/artwork/ArtworkCard'
import type { Artwork } from '@/types'
import { ArrowRight } from 'lucide-react'

interface FeaturedWorksProps {
  artworks: Artwork[]
}

export function FeaturedWorks({ artworks }: FeaturedWorksProps) {
  const { t } = useLanguage()

  if (artworks.length === 0) return null

  return (
    <section className="section-padding page-max py-20 sm:py-28 lg:py-36">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <p className="label-caps mb-3">{t.home.featuredSubtitle}</p>
          <h2 className="heading-lg">{t.home.featuredTitle}</h2>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-warm-gray-600 hover:text-soft-black transition-colors duration-200 group"
        >
          {t.home.featuredCta}
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {artworks.slice(0, 3).map((artwork, i) => (
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            <ArtworkCard artwork={artwork} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
