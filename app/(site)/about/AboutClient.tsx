'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowRight } from 'lucide-react'

export function AboutClient() {
  const { t } = useLanguage()

  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-28">
      <div className="section-padding page-max">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-20 max-w-2xl"
        >
          <p className="label-caps mb-4">{t.about.title}</p>
          <h1 className="heading-xl mb-4">Arianna Fazio</h1>
          <p className="font-serif text-xl sm:text-2xl text-warm-gray-500 font-light italic">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">

          {/* Text: 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3 order-2 lg:order-1"
          >
            <div className="space-y-6">
              {[t.about.text1, t.about.text2, t.about.text3].map((text, i) => (
                <p key={i} className="font-sans text-[15px] sm:text-base text-warm-gray-700 leading-relaxed">
                  {text}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-10 border-t border-sand">
              <p className="font-serif text-lg text-warm-gray-600 mb-6 italic">{t.about.contact}</p>
              <Link href="/contatti" className="btn-outline">
                {t.about.contactCta}
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Image: 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-2 order-1 lg:order-2"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80"
                alt="Arianna Fazio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
            </div>

            {/* Quote */}
            <div className="mt-6 pl-5 border-l-2 border-gold">
              <p className="font-serif text-lg italic text-warm-gray-600 leading-relaxed">
                "Ogni opera è una conversazione silenziosa tra me e il mondo."
              </p>
              <p className="mt-2 font-sans text-xs text-warm-gray-400 tracking-wide">— Arianna Fazio</p>
            </div>
          </motion.div>
        </div>

        {/* Gallery strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 sm:mt-28"
        >
          <div className="divider" />
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0">
            {[
              'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=75',
              'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=75',
              'https://images.unsplash.com/photo-1493655430869-70bfaa8a3ab9?w=400&q=75',
              'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400&q=75',
            ].map((src, i) => (
              <div key={i} className="flex-shrink-0 w-44 sm:w-56 aspect-[3/4] overflow-hidden">
                <Image
                  src={src}
                  alt={`Studio Arianna Fazio ${i + 1}`}
                  width={224}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
