'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArtworkCard } from '@/components/artwork/ArtworkCard'
import { ArtworkFilters, type FilterState } from '@/components/artwork/ArtworkFilters'
import type { Artwork } from '@/types'

interface ShopClientProps {
  artworks: Artwork[]
}

export function ShopClient({ artworks }: ShopClientProps) {
  const { t } = useLanguage()
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    status: '',
    sort: 'newest',
  })

  const categories = useMemo(() => {
    const cats = artworks
      .map((a) => a.category)
      .filter((c): c is string => Boolean(c))
    return Array.from(new Set(cats)).sort()
  }, [artworks])

  const filtered = useMemo(() => {
    let list = [...artworks]

    if (filters.category) {
      list = list.filter((a) => a.category === filters.category)
    }
    if (filters.status) {
      list = list.filter((a) => a.status === filters.status)
    }

    if (filters.sort === 'price_asc') {
      list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
    } else if (filters.sort === 'price_desc') {
      list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    }

    return list
  }, [artworks, filters])

  return (
    <div className="pt-24 sm:pt-28 pb-20 sm:pb-28">

      {/* Hero strip */}
      <div className="relative overflow-hidden bg-floral-hero py-16 sm:py-20 mb-12 sm:mb-16">
        <div className="section-padding page-max text-center relative z-10">
          <p className="label-caps mb-4">{t.shop.subtitle}</p>

          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-12 bg-rose-300" />
            <span className="w-1.5 h-1.5 rotate-45 bg-rose-500" />
            <span className="h-px w-12 bg-rose-300" />
          </div>

          <h1 className="heading-xl mb-4">{t.shop.title}</h1>
          <p className="font-sans text-sm text-ink-light max-w-lg mx-auto">
            Scopri opere originali dipinte a mano con passione e dedizione,
            <br className="hidden sm:block" />
            creazioni uniche che raccontano emozioni e bellezza.
          </p>
        </div>
      </div>

      <div className="section-padding page-max">
        {/* Filters */}
        <ArtworkFilters
          categories={categories}
          filters={filters}
          onChange={setFilters}
          total={filtered.length}
        />

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-rose-300 mb-3">{t.shop.noResults}</p>
            <p className="font-sans text-sm text-ink-light">{t.shop.noResultsText}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-7 lg:gap-8">
            {filtered.map((artwork, i) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.4) }}
              >
                <ArtworkCard artwork={artwork} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Commissions CTA */}
        <div className="mt-20 sm:mt-24 bg-rose-100 p-8 sm:p-14 text-center rounded-sm">
          <p className="label-caps mb-4">Opere su misura</p>
          <h2 className="heading-md mb-3">Un'opera creata per te</h2>
          <p className="font-sans text-sm text-ink-light max-w-lg mx-auto mb-7 leading-relaxed">
            Hai in mente un'idea speciale? Raccontami la tua storia, i tuoi colori, le tue emozioni.
            Creerò un'opera originale e unica, dipinta a mano per te.
          </p>
          <Link href="/contatti" className="btn-primary">
            Richiedi un'opera su misura
          </Link>
        </div>
      </div>
    </div>
  )
}
