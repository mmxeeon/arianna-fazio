'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, ShoppingBag, MessageCircle, Mail, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'

export function CarrelloClient() {
  const { t, language } = useLanguage()
  const { items, removeItem, total } = useCartStore()

  const whatsappItems = items
    .map((i) => `• ${i.artwork.title} — ${formatPrice(i.artwork.price ?? 0, language)}`)
    .join('\n')
  const whatsappMessage = encodeURIComponent(
    `Ciao Arianna! Vorrei acquistare le seguenti opere:\n${whatsappItems}\n\nTotale: ${formatPrice(total(), language)}`
  )
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${whatsappMessage}`

  const emailSubject = encodeURIComponent('Acquisto opere')
  const emailBody = encodeURIComponent(
    `Ciao Arianna,\n\nVorrei acquistare:\n${whatsappItems}\n\nTotale: ${formatPrice(total(), language)}\n\nAttendo tue indicazioni per procedere.`
  )
  const emailUrl = `mailto:info@ariannafazio.it?subject=${emailSubject}&body=${emailBody}`

  if (items.length === 0) {
    return (
      <div className="pt-24 sm:pt-32 pb-20 min-h-screen flex flex-col">
        <div className="section-padding page-max flex-1 flex flex-col items-center justify-center text-center py-20">
          <ShoppingBag size={48} strokeWidth={1} className="text-warm-gray-200 mb-6" />
          <h1 className="heading-md mb-3 text-warm-gray-400">{t.cart.empty}</h1>
          <p className="font-sans text-sm text-warm-gray-400 mb-8">{t.cart.emptyText}</p>
          <Link href="/shop" className="btn-outline">
            <ArrowLeft size={14} />
            {t.cart.continueShopping}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-28">
      <div className="section-padding page-max">

        <div className="mb-10 sm:mb-14">
          <h1 className="heading-xl">{t.cart.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

          {/* Items */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.artwork.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex gap-5 sm:gap-6 py-6 border-b border-sand"
                >
                  {/* Thumbnail */}
                  <Link href={`/shop/${item.artwork.slug}`} className="flex-shrink-0">
                    <div className="w-24 h-32 sm:w-28 sm:h-36 overflow-hidden bg-beige">
                      <Image
                        src={item.artwork.image_url ?? ''}
                        alt={item.artwork.title}
                        width={112}
                        height={144}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/shop/${item.artwork.slug}`}>
                        <h3 className="font-serif text-lg hover:text-warm-gray-600 transition-colors">
                          {item.artwork.title}
                        </h3>
                      </Link>
                      {item.artwork.technique && (
                        <p className="font-sans text-xs text-warm-gray-400 mt-1">{item.artwork.technique}</p>
                      )}
                      {item.artwork.dimensions && (
                        <p className="font-sans text-xs text-warm-gray-400">{item.artwork.dimensions}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-base text-soft-black">
                        {item.artwork.price ? formatPrice(item.artwork.price, language) : '—'}
                      </span>
                      <button
                        onClick={() => removeItem(item.artwork.id)}
                        className="text-warm-gray-300 hover:text-soft-black transition-colors p-1"
                        aria-label={t.cart.remove}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-beige p-6 sm:p-8 sticky top-24">
              <h2 className="font-serif text-xl mb-6">{t.cart.total}</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-sand">
                {items.map((item) => (
                  <div key={item.artwork.id} className="flex justify-between gap-4">
                    <span className="font-sans text-xs text-warm-gray-600 truncate">{item.artwork.title}</span>
                    <span className="font-sans text-xs text-soft-black flex-shrink-0">
                      {item.artwork.price ? formatPrice(item.artwork.price, language) : '—'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mb-8">
                <span className="font-sans text-sm font-medium">{t.cart.total}</span>
                <span className="font-serif text-xl">{formatPrice(total(), language)}</span>
              </div>

              <p className="font-sans text-xs text-warm-gray-500 mb-4">{t.cart.checkoutNote}</p>

              <div className="flex flex-col gap-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">
                  <MessageCircle size={15} />
                  {t.cart.checkoutWhatsApp}
                </a>
                <a href={emailUrl} className="btn-outline justify-center">
                  <Mail size={15} />
                  {t.cart.checkoutEmail}
                </a>
              </div>

              <p className="mt-5 font-sans text-xs text-warm-gray-400 leading-relaxed">
                {t.cart.paymentNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
