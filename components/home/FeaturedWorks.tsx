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
    <section className="section-padding page-max py-20 sm:py-28">
      {/* Header centered */}
      <div className="text-center mb-14 sm:mb-16">
        <p className="label-caps mb-4">{t.home.featuredSubtitle}</p>

        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-12 bg-rose-300" />
          <span className="w-1.5 h-1.5 rotate-45 bg-rose-500" />
          <span className="h-px w-12 bg-rose-300" />
        </div>

        <h2 className="heading-lg mb-4">{t.home.featuredTitle}</h2>
        <p className="font-sans text-sm text-ink-light max-w-md mx-auto">
          Scopri una selezione di opere originali, dipinte a mano con passione e dedizione.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
        {artworks.slice(0, 4).map((artwork, i) => (
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <ArtworkCard artwork={artwork} />
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-14">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-wine hover:text-wine-dark transition-colors duration-200 group"
        >
          {t.home.featuredCta}
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
