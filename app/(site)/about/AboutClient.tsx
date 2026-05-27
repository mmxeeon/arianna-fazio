'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export function AboutClient() {
  const { t } = useLanguage()

  const highlights = [
    {
      title: 'Opere originali',
      text: 'Ogni dipinto è unico, realizzato a mano con passione e dedizione.',
    },
    {
      title: 'Commissioni su misura',
      text: "Creiamo insieme l'opera perfetta per i tuoi spazi e le tue emozioni.",
    },
    {
      title: 'Tecnica tradizionale',
      text: 'Lavoro principalmente con olio su tela, con cura e matericità.',
    },
  ]

  return (
    <div className="pt-20 sm:pt-24">

      {/* Hero / Painting + intro */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square lg:aspect-auto lg:min-h-[600px]"
        >
          <Image
            src="/images/atelier.jpg"
            alt="Atelier di Arianna Fazio"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        {/* Right: text */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="bg-cream-light px-6 sm:px-12 lg:px-16 xl:px-20 py-14 lg:py-20 flex flex-col justify-center"
        >
          <p className="label-caps mb-5">{t.about.title}</p>
          <h1 className="heading-xl mb-4">Arianna Fazio</h1>
          <p className="font-serif italic text-xl text-rose-500 mb-8">
            {t.about.subtitle}
          </p>

          <div className="space-y-5">
            <p className="font-sans text-[15px] text-ink leading-relaxed">{t.about.text1}</p>
            <p className="font-sans text-[15px] text-ink leading-relaxed">{t.about.text2}</p>
            <p className="font-sans text-[15px] text-ink leading-relaxed">{t.about.text3}</p>
          </div>

          {/* Quote box */}
          <div className="mt-10 pink-box">
            <p className="font-serif italic text-lg text-wine leading-relaxed">
              "Ogni opera è una conversazione silenziosa tra me e il mondo."
            </p>
            <p className="mt-3 font-sans text-xs text-wine-light tracking-wide">— Arianna Fazio</p>
          </div>
        </motion.div>
      </section>

      {/* CTA banner */}
      <section className="bg-rose-100">
        <div className="section-padding page-max py-14 sm:py-16 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <p className="label-caps mb-2">Hai una domanda o vuoi commissionare un'opera?</p>
          </div>
          <div className="sm:text-right">
            <Link href="/contatti" className="btn-primary">
              Scrivimi
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-rose-50">
        <div className="section-padding page-max py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                {/* Decorative icon */}
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-wine">
                      <circle cx="12" cy="8" r="3" />
                      <path d="M12 11 L12 20 M8 14 L12 11 L16 14 M9 17 L12 15 L15 17" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-serif text-lg text-wine mb-2">{h.title}</h3>
                <p className="font-sans text-sm text-ink-light leading-relaxed">{h.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
