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
    <div className="mb-10 sm:mb-14">
      {/* Filter pills — horizontal scroll on mobile */}
      <div className="relative -mx-5 sm:mx-0 mb-6">
        <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <div className="flex items-center gap-2.5 px-5 sm:justify-center sm:flex-wrap sm:px-0 pb-1">
            {/* All */}
            <button
              onClick={() => onChange({ ...filters, category: '', status: '' })}
              className={cn(
                'snap-start flex-shrink-0 px-5 py-2.5 font-sans text-xs tracking-wide border rounded-sm transition-all duration-200 min-h-[40px]',
                filters.category === '' && filters.status === ''
                  ? 'bg-wine text-cream border-wine'
                  : 'bg-cream-light text-ink border-rose-200 hover:border-rose-500'
              )}
            >
              {t.shop.filterAll}
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onChange({ ...filters, category: cat, status: '' })}
                className={cn(
                  'snap-start flex-shrink-0 px-5 py-2.5 font-sans text-xs tracking-wide border rounded-sm transition-all duration-200 min-h-[40px]',
                  filters.category === cat
                    ? 'bg-wine text-cream border-wine'
                    : 'bg-cream-light text-ink border-rose-200 hover:border-rose-500'
                )}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={() => onChange({ ...filters, status: filters.status === 'available' ? '' : 'available', category: '' })}
              className={cn(
                'snap-start flex-shrink-0 px-5 py-2.5 font-sans text-xs tracking-wide border rounded-sm transition-all duration-200 min-h-[40px]',
                filters.status === 'available'
                  ? 'bg-wine text-cream border-wine'
                  : 'bg-cream-light text-ink border-rose-200 hover:border-rose-500'
              )}
            >
              {t.artwork.available}
            </button>

            <button
              onClick={() => onChange({ ...filters, status: filters.status === 'sold' ? '' : 'sold', category: '' })}
              className={cn(
                'snap-start flex-shrink-0 px-5 py-2.5 font-sans text-xs tracking-wide border rounded-sm transition-all duration-200 min-h-[40px]',
                filters.status === 'sold'
                  ? 'bg-wine text-cream border-wine'
                  : 'bg-cream-light text-ink border-rose-200 hover:border-rose-500'
              )}
            >
              {t.artwork.sold}
            </button>
          </div>
        </div>
      </div>

      {/* Sort */}
      <div className="flex justify-end px-5 sm:px-0">
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value as FilterState['sort'] })}
          className="font-sans text-xs tracking-wide text-ink-light bg-transparent border-0 focus:outline-none cursor-pointer hover:text-wine transition-colors min-h-[40px]"
        >
          <option value="newest">{t.shop.sortNewest}</option>
          <option value="price_asc">{t.shop.sortPriceAsc}</option>
          <option value="price_desc">{t.shop.sortPriceDesc}</option>
        </select>
      </div>
    </div>
  )
}
