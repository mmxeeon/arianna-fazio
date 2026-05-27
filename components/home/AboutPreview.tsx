'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowRight } from 'lucide-react'

export function AboutPreview() {
  const { t } = useLanguage()

  return (
    <section className="bg-rose-100 relative overflow-hidden">
      {/* Decorative line drawing right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 sm:w-1/4 opacity-25 pointer-events-none hidden sm:block">
        <svg viewBox="0 0 200 400" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.8" style={{ color: '#7D4858' }}>
          <path d="M100 60 Q120 90 110 130 Q140 140 130 180 Q150 210 140 250 Q120 290 130 330" />
          <circle cx="105" cy="80" r="14" />
          <path d="M91 80 Q105 65 119 80 Q105 95 91 80" />
          <circle cx="125" cy="135" r="11" />
          <path d="M115 135 Q125 122 135 135 Q125 148 115 135" />
          <circle cx="135" cy="195" r="13" />
          <path d="M122 195 Q135 180 148 195 Q135 210 122 195" />
          <path d="M70 110 L90 105 M75 170 L95 165 M80 240 L100 235" />
        </svg>
      </div>

      <div className="section-padding page-max py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[5/4] max-w-xl mx-auto lg:max-w-none overflow-hidden rounded-sm">
              <Image
                src="/images/atelier.jpg"
                alt="Atelier di Arianna Fazio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="label-caps mb-4">L'artista</p>
            <h2 className="heading-lg mb-3 text-balance">Arianna Fazio</h2>
            <p className="font-serif italic text-xl text-rose-500 mb-6">
              Artista, pittrice, creatrice di emozioni.
            </p>
            <p className="font-sans text-ink-light leading-relaxed mb-8 text-[15px]">
              Le mie opere nascono da un dialogo costante con la luce, la materia e il colore.
              Ogni quadro è un'emozione cristallizzata nel tempo che aspetta di trovare la sua casa.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-wine hover:text-wine-dark transition-colors duration-200 group"
            >
              Chi sono
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
