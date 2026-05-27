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
    <section className="section-padding page-max py-20 sm:py-24">
      {/* Header centered */}
      <div className="text-center mb-12 sm:mb-14">
        <p className="label-caps mb-4">Opere selezionate</p>

        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-12 bg-rose-300" />
          <span className="w-1.5 h-1.5 rotate-45 bg-rose-500" />
          <span className="h-px w-12 bg-rose-300" />
        </div>

        <h2 className="heading-lg mb-3">Ogni opera è unica</h2>
        <p className="font-sans text-sm text-ink-light max-w-xl mx-auto">
          Scopri una selezione di opere originali, dipinte a mano con passione e dedizione.
        </p>
      </div>

      {/* Grid 4 col */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-7">
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
      <div className="text-center mt-12">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-wine hover:text-wine-dark transition-colors duration-200 group"
        >
          Visita lo shop
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
