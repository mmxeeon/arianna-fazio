'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { StatusBadge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import type { Artwork } from '@/types'

interface ArtworkCardProps {
  artwork: Artwork
}

const PLACEHOLDER = 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=75'

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const { t, language } = useLanguage()

  const isSold = artwork.status === 'sold'

  const statusLabels = {
    available: t.artwork.available,
    sold: t.artwork.sold,
    unavailable: t.artwork.unavailable,
  }

  return (
    <Link href={`/shop/${artwork.slug}`} className="artwork-card block group">
      {/* Image */}
      <div className="artwork-card-image relative">
        <Image
          src={artwork.image_url || PLACEHOLDER}
          alt={artwork.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Sold overlay */}
        {isSold && (
          <div className="absolute inset-0 bg-soft-black/30 flex items-center justify-center">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-ivory/90 border border-ivory/50 px-4 py-2">
              {t.artwork.sold}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        {!isSold && (
          <div className="absolute inset-0 bg-soft-black/0 group-hover:bg-soft-black/10 transition-colors duration-500" />
        )}
      </div>

      {/* Info */}
      <div className="pt-4 pb-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-serif text-lg leading-snug text-soft-black group-hover:text-warm-gray-700 transition-colors duration-200 flex-1">
            {artwork.title}
          </h3>
          {artwork.price && (
            <span className="font-sans text-sm text-soft-black flex-shrink-0">
              {formatPrice(artwork.price, language)}
            </span>
          )}
        </div>

        {artwork.technique && (
          <p className="font-sans text-xs text-warm-gray-500 mb-2">{artwork.technique}</p>
        )}

        <StatusBadge
          status={artwork.status}
          labelAvailable={statusLabels.available}
          labelSold={statusLabels.sold}
          labelUnavailable={statusLabels.unavailable}
        />
      </div>
    </Link>
  )
}
