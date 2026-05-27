'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'
import { SlidersHorizontal, X } from 'lucide-react'

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

export function ArtworkFilters({ categories, filters, onChange, total }: ArtworkFiltersProps) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  const hasActive = filters.category !== '' || filters.status !== ''

  const reset = () => onChange({ category: '', status: '', sort: filters.sort })

  return (
    <div className="mb-10 sm:mb-12">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="font-sans text-sm text-warm-gray-500">
          {total} {t.shop.showing}
        </p>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <select
            value={filters.sort}
            onChange={(e) => onChange({ ...filters, sort: e.target.value as FilterState['sort'] })}
            className="font-sans text-xs tracking-wide text-warm-gray-600 bg-transparent border-0 focus:outline-none cursor-pointer hover:text-soft-black transition-colors"
          >
            <option value="newest">{t.shop.sortNewest}</option>
            <option value="price_asc">{t.shop.sortPriceAsc}</option>
            <option value="price_desc">{t.shop.sortPriceDesc}</option>
          </select>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              'flex items-center gap-2 font-sans text-xs tracking-wide uppercase transition-colors duration-200 sm:hidden',
              open || hasActive ? 'text-soft-black' : 'text-warm-gray-500 hover:text-soft-black'
            )}
          >
            <SlidersHorizontal size={14} />
            {t.shop.filters}
            {hasActive && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
          </button>
        </div>
      </div>

      {/* Filter chips (desktop always visible, mobile collapsible) */}
      <div className={cn('flex flex-wrap items-center gap-3', !open && 'hidden sm:flex')}>
        {/* Category */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onChange({ ...filters, category: '' })}
            className={cn(
              'px-4 py-1.5 font-sans text-xs tracking-wide border transition-all duration-200',
              filters.category === ''
                ? 'border-soft-black bg-soft-black text-ivory'
                : 'border-sand text-warm-gray-600 hover:border-warm-gray-400'
            )}
          >
            {t.shop.filterAll}
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange({ ...filters, category: cat })}
              className={cn(
                'px-4 py-1.5 font-sans text-xs tracking-wide border transition-all duration-200',
                filters.category === cat
                  ? 'border-soft-black bg-soft-black text-ivory'
                  : 'border-sand text-warm-gray-600 hover:border-warm-gray-400'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-4 bg-sand mx-1" />

        {/* Availability */}
        {[
          { value: 'available', label: t.artwork.available },
          { value: 'sold', label: t.artwork.sold },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onChange({ ...filters, status: filters.status === value ? '' : value })}
            className={cn(
              'px-4 py-1.5 font-sans text-xs tracking-wide border transition-all duration-200',
              filters.status === value
                ? 'border-soft-black bg-soft-black text-ivory'
                : 'border-sand text-warm-gray-600 hover:border-warm-gray-400'
            )}
          >
            {label}
          </button>
        ))}

        {/* Clear */}
        {hasActive && (
          <button
            onClick={reset}
            className="flex items-center gap-1 font-sans text-xs text-warm-gray-400 hover:text-soft-black transition-colors ml-2"
          >
            <X size={12} />
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
