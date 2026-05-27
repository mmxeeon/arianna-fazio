'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface ImageGalleryProps {
  mainImage: string
  galleryImages?: string[]
  title: string
}

const PLACEHOLDER = 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=80'

export function ImageGallery({ mainImage, galleryImages = [], title }: ImageGalleryProps) {
  const all = [mainImage || PLACEHOLDER, ...galleryImages].filter(Boolean)
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = () => setActive((i) => (i - 1 + all.length) % all.length)
  const next = () => setActive((i) => (i + 1) % all.length)

  return (
    <>
      {/* Main image */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-beige group cursor-zoom-in" onClick={() => setLightbox(true)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={all[active]}
              alt={`${title} — immagine ${active + 1}`}
              fill
              priority={active === 0}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Zoom hint */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-ivory/80 p-2 rounded-full">
            <ZoomIn size={16} className="text-soft-black" />
          </div>
        </div>

        {/* Navigation arrows */}
        {all.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-ivory/80 hover:bg-ivory p-2 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Precedente"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-ivory/80 hover:bg-ivory p-2 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Successiva"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {all.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {all.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-16 h-16 overflow-hidden transition-all duration-200 ${
                i === active ? 'ring-1 ring-soft-black ring-offset-1' : 'opacity-50 hover:opacity-80'
              }`}
            >
              <Image src={src} alt="" width={64} height={64} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-soft-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute top-4 right-4 text-ivory/60 hover:text-ivory"
              onClick={() => setLightbox(false)}
            >
              <X size={24} />
            </button>
            <div className="relative max-w-3xl w-full max-h-[90vh] aspect-[3/4]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={all[active]}
                alt={title}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            {all.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 text-ivory/60 hover:text-ivory">
                  <ChevronLeft size={32} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-4 text-ivory/60 hover:text-ivory">
                  <ChevronRight size={32} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
