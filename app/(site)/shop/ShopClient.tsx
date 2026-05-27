'use client'

import { useState, useMemo } from 'react'
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
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-28">
      <div className="section-padding page-max">

        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <p className="label-caps mb-3">{t.shop.subtitle}</p>
          <h1 className="heading-xl">{t.shop.title}</h1>
        </div>

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
            <p className="font-serif text-2xl text-warm-gray-400 mb-3">{t.shop.noResults}</p>
            <p className="font-sans text-sm text-warm-gray-400">{t.shop.noResultsText}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8 lg:gap-10">
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
      </div>
    </div>
  )
}
