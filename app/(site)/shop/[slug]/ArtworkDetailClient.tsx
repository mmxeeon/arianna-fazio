'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingBag, Check, CreditCard, Lock } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCartStore } from '@/store/cartStore'
import { ImageGallery } from '@/components/artwork/ImageGallery'
import { ArtworkCard } from '@/components/artwork/ArtworkCard'
import { StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import type { Artwork } from '@/types'
import toast from 'react-hot-toast'

interface Props {
  artwork: Artwork
  related: Artwork[]
}

export function ArtworkDetailClient({ artwork, related }: Props) {
  const { t, language } = useLanguage()
  const { addItem, items } = useCartStore()
  const [checkingOut, setCheckingOut] = useState(false)

  const inCart = items.some((i) => i.artwork.id === artwork.id)
  const isAvailable = artwork.status === 'available'

  const handleAddToCart = () => {
    addItem(artwork)
    toast.success(`"${artwork.title}" aggiunto al carrello`)
  }

  const handleBuyNow = async () => {
    setCheckingOut(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artworkIds: [artwork.id] }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      window.location.href = data.url
    } catch (err: any) {
      toast.error(err.message || 'Errore nel pagamento. Riprova.')
      setCheckingOut(false)
    }
  }

  const details = [
    { label: t.artwork.technique, value: artwork.technique },
    { label: t.artwork.dimensions, value: artwork.dimensions },
    { label: t.artwork.year, value: artwork.year?.toString() },
    { label: t.artwork.category, value: artwork.category },
  ].filter((d) => d.value)

  return (
    <div className="pt-20 sm:pt-24 pb-24 sm:pb-28">
      <div className="section-padding page-max">

        <div className="mb-6 sm:mb-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-warm-gray-500 hover:text-soft-black transition-colors group min-h-[40px]"
          >
            <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
            {t.artwork.backToShop}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ImageGallery
              mainImage={artwork.image_url ?? ''}
              galleryImages={artwork.gallery_images ?? []}
              title={artwork.title}
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <StatusBadge
              status={artwork.status}
              labelAvailable={t.artwork.available}
              labelSold={t.artwork.sold}
              labelUnavailable={t.artwork.unavailable}
              className="mb-3"
            />

            <h1 className="font-serif text-2xl sm:text-4xl text-wine mb-3 leading-tight">{artwork.title}</h1>

            {artwork.price && (
              <p className="font-serif text-2xl sm:text-4xl text-wine mb-5">
                {formatPrice(artwork.price, language)}
              </p>
            )}

            {artwork.description && (
              <p className="font-sans text-[15px] text-warm-gray-600 leading-relaxed mb-6 sm:mb-8">
                {artwork.description}
              </p>
            )}

            {details.length > 0 && (
              <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-6 sm:mb-8 py-5 border-y border-sand">
                {details.map(({ label, value }) => (
                  <div key={label}>
                    <p className="label-caps mb-1">{label}</p>
                    <p className="font-sans text-sm text-soft-black">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Desktop actions (hidden on mobile, sticky bar shown instead) */}
            {isAvailable && (
              <div className="hidden sm:flex flex-col gap-3 mt-auto">
                <Button onClick={handleBuyNow} loading={checkingOut} size="lg" className="w-full">
                  <CreditCard size={15} />
                  {checkingOut ? t.checkout.processing : t.checkout.buyNow}
                </Button>

                <div className="flex items-center justify-center gap-2 py-1">
                  <Lock size={11} className="text-warm-gray-300" />
                  <span className="font-sans text-xs text-warm-gray-400">{t.checkout.paymentMethods}</span>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant={inCart ? 'ghost' : 'outline'}
                  className="w-full border-sand"
                >
                  {inCart ? <><Check size={14} />{t.artwork.alreadyInCart}</> : <><ShoppingBag size={14} />{t.artwork.addToCart}</>}
                </Button>
              </div>
            )}

            {!isAvailable && (
              <div className="mt-4 py-4 text-center border border-sand">
                <p className="font-sans text-sm text-warm-gray-400">
                  {artwork.status === 'sold' ? "Quest'opera è stata venduta." : "Quest'opera non è al momento disponibile."}
                </p>
                <Link href="/contatti" className="mt-3 inline-block font-sans text-xs underline text-warm-gray-500 hover:text-soft-black transition-colors">
                  Richiedi un'opera simile →
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-16 sm:mt-28">
            <div className="divider" />
            <h2 className="heading-sm mb-8 sm:mb-10">{t.artwork.relatedTitle}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-8">
              {related.map((r) => (
                <ArtworkCard key={r.id} artwork={r} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MOBILE STICKY BOTTOM BAR */}
      {isAvailable && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-cream/95 backdrop-blur-sm border-t border-rose-200 px-4 py-3 safe-bottom"
        >
          <div className="flex items-center gap-3 max-w-md mx-auto">
            <div className="flex-1 min-w-0">
              <p className="font-sans text-[10px] text-warm-gray-500 uppercase tracking-widest">{artwork.title}</p>
              {artwork.price && (
                <p className="font-serif text-xl text-wine leading-tight">{formatPrice(artwork.price, language)}</p>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-shrink-0 w-12 h-12 border border-wine text-wine rounded-sm flex items-center justify-center hover:bg-wine hover:text-cream transition-colors"
              aria-label="Aggiungi al carrello"
            >
              {inCart ? <Check size={16} /> : <ShoppingBag size={16} />}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={checkingOut}
              className="flex-shrink-0 px-5 h-12 bg-wine text-cream font-sans text-xs tracking-widest uppercase rounded-sm flex items-center gap-1.5 hover:bg-wine-dark transition-colors disabled:opacity-60"
            >
              {checkingOut ? (
                <span className="inline-block w-3 h-3 border border-cream border-t-transparent rounded-full animate-spin" />
              ) : (
                <CreditCard size={14} />
              )}
              {checkingOut ? '...' : 'Acquista'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
