'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { formatPrice } from '@/lib/utils'
import type { Artwork } from '@/types'

interface ArtworkCardProps {
  artwork: Artwork
}

const PLACEHOLDER = 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=75'

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const { t, language } = useLanguage()

  const isSold = artwork.status === 'sold'

  return (
    <Link href={`/shop/${artwork.slug}`} className="artwork-card block group">
      {/* Image */}
      <div className="artwork-card-image relative">
        <Image
          src={artwork.image_url || PLACEHOLDER}
          alt={artwork.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />

        {/* Sold overlay */}
        {isSold && (
          <div className="absolute inset-0 bg-wine/30 flex items-center justify-center">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-cream border border-cream/60 px-4 py-2 bg-wine/40">
              {t.artwork.sold}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pt-5 text-center">
        <h3 className="font-serif text-xl text-wine mb-1 group-hover:text-wine-light transition-colors duration-200">
          {artwork.title}
        </h3>

        {artwork.category && (
          <p className="label-caps text-rose-500 mb-2 text-[10px]">{artwork.category}</p>
        )}

        {artwork.price && (
          <p className="font-serif text-lg text-wine">
            {formatPrice(artwork.price, language)}
          </p>
        )}

        {/* Status dot */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <span className={`w-1.5 h-1.5 rounded-full ${
            artwork.status === 'available' ? 'bg-emerald-500' :
            artwork.status === 'sold' ? 'bg-rose-500' : 'bg-rose-300'
          }`} />
          <span className={`font-sans text-xs ${
            artwork.status === 'available' ? 'text-emerald-700' :
            artwork.status === 'sold' ? 'text-rose-500' : 'text-rose-300'
          }`}>
            {artwork.status === 'available' ? t.artwork.available : artwork.status === 'sold' ? t.artwork.sold : t.artwork.unavailable}
          </span>
        </div>
      </div>
    </Link>
  )
}
