'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

export interface FilterState {
  category: string
  status: string
  sort: 'newest' | 'price_asc' | 'price_desc'
}

interface ArtworkFiltersProps {
  categories: string[]
  filters: FilterState
  onChange: (filters: FilterState) => void
  total: number
}

export function ArtworkFilters({ categories, filters, onChange }: ArtworkFiltersProps) {
  const { t } = useLanguage()

  return (
    <div className="mb-12 sm:mb-14">
      {/* Filter pills row */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
        {/* All */}
        <button
          onClick={() => onChange({ ...filters, category: '', status: '' })}
          className={cn(
            'filter-pill',
            filters.category === '' && filters.status === '' && 'filter-pill-active'
          )}
        >
          {t.shop.filterAll}
        </button>

        {/* Categories */}
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange({ ...filters, category: cat, status: '' })}
            className={cn(
              'filter-pill',
              filters.category === cat && 'filter-pill-active'
            )}
          >
            {cat}
          </button>
        ))}

        {/* Available */}
        <button
          onClick={() => onChange({ ...filters, status: filters.status === 'available' ? '' : 'available', category: '' })}
          className={cn(
            'filter-pill',
            filters.status === 'available' && 'filter-pill-active'
          )}
        >
          {t.artwork.available}
        </button>

        {/* Sold */}
        <button
          onClick={() => onChange({ ...filters, status: filters.status === 'sold' ? '' : 'sold', category: '' })}
          className={cn(
            'filter-pill',
            filters.status === 'sold' && 'filter-pill-active'
          )}
        >
          {t.artwork.sold}
        </button>
      </div>

      {/* Sort */}
      <div className="flex justify-end">
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value as FilterState['sort'] })}
          className="font-sans text-xs tracking-wide text-ink-light bg-transparent border-0 focus:outline-none cursor-pointer hover:text-wine transition-colors"
        >
          <option value="newest">{t.shop.sortNewest}</option>
          <option value="price_asc">{t.shop.sortPriceAsc}</option>
          <option value="price_desc">{t.shop.sortPriceDesc}</option>
        </select>
      </div>
    </div>
  )
}
