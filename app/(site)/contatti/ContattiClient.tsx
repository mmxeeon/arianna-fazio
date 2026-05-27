'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Instagram, Mail, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/>
  </svg>
)

const schema = z.object({
  name: z.string().min(2, 'Nome troppo corto'),
  email: z.string().email('Email non valida'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Scrivi un messaggio più lungo'),
})
type FormData = z.infer<typeof schema>

export function ContattiClient() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      reset()
      toast.success(t.contact.success)
    } catch {
      toast.error(t.contact.error)
    }
  }

  return (
    <div className="pt-24 sm:pt-28 pb-20 sm:pb-28">

      {/* Hero strip */}
      <div className="relative overflow-hidden py-20 sm:py-24 mb-16 sm:mb-20">
        <div className="absolute inset-0">
          <img src="/images/section-bg.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-cream/40" />
        </div>
        <div className="section-padding page-max text-center relative z-10">
          <p className="label-caps mb-4">Contatti</p>

          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-12 bg-rose-500" />
            <span className="w-1.5 h-1.5 rotate-45 bg-rose-500" />
            <span className="h-px w-12 bg-rose-500" />
          </div>

          <h1 className="heading-xl mb-4">Sono qui per risponderti.</h1>
          <p className="font-sans text-sm text-ink-light max-w-lg mx-auto">
            Scrivimi per richieste, informazioni o per raccontarmi la tua idea.
            <br className="hidden sm:block" />
            Sarà un piacere risponderti al più presto.
          </p>
        </div>
      </div>

      <div className="section-padding page-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center"
              >
                <p className="font-serif text-3xl mb-3 text-wine">Grazie!</p>
                <p className="font-sans text-ink-light">{t.contact.success}</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-xs underline underline-offset-4 text-wine hover:text-wine-dark"
                >
                  Invia un altro messaggio
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                <Input
                  label="Il tuo nome"
                  placeholder={t.contact.namePlaceholder}
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Input
                  label="La tua email"
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Input
                  label="Telefono (opzionale)"
                  type="tel"
                  placeholder={t.contact.phonePlaceholder}
                  {...register('phone')}
                />
                <Textarea
                  label="Scrivi il tuo messaggio"
                  placeholder={t.contact.messagePlaceholder}
                  rows={5}
                  error={errors.message?.message}
                  {...register('message')}
                />
                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="bg-wine text-cream hover:bg-wine-dark"
                >
                  {isSubmitting ? t.contact.submitting : 'Invia messaggio'}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-10"
          >
            {/* Direct contacts */}
            <div>
              <p className="label-caps mb-5">Contatti diretti</p>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:ari.fazio07@gmail.com"
                  className="flex items-center gap-3 font-sans text-sm text-ink hover:text-wine transition-colors group"
                >
                  <Mail size={16} className="text-rose-500 group-hover:text-wine transition-colors flex-shrink-0" />
                  ari.fazio07@gmail.com
                </a>
                <a
                  href="https://www.instagram.com/ariannaafazioo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-sans text-sm text-ink hover:text-wine transition-colors group"
                >
                  <Instagram size={16} className="text-rose-500 group-hover:text-wine transition-colors flex-shrink-0" />
                  @ariannaafazioo
                </a>
                <a
                  href="https://www.tiktok.com/@arianna.fazioo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-sans text-sm text-ink hover:text-wine transition-colors group"
                >
                  <span className="text-rose-500 group-hover:text-wine transition-colors flex-shrink-0">
                    <TikTokIcon />
                  </span>
                  @arianna.fazioo
                </a>
              </div>
            </div>

            {/* Custom commissions */}
            <div>
              <p className="label-caps mb-3">Commissioni personalizzate</p>
              <p className="font-sans text-[15px] text-ink-light leading-relaxed">
                Hai in mente un'opera specifica? Posso realizzare quadri su commissione
                dipinti a mano, pensati su misura per te e per il tuo spazio.
                Raccontami la tua idea, insieme troveremo la soluzione perfetta.
              </p>
            </div>

            {/* Response time box */}
            <div className="pink-box flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center">
                <Clock size={18} className="text-wine" strokeWidth={1.5} />
              </div>
              <div>
                <p className="label-caps text-wine mb-1">Tempi di risposta</p>
                <p className="font-sans text-sm text-ink-light leading-relaxed">
                  Rispondo generalmente entro 24/48 ore<br />
                  nei giorni lavorativi.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Commissions banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 sm:mt-28 bg-rose-100 rounded-sm overflow-hidden grid grid-cols-1 sm:grid-cols-2 items-center"
        >
          <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-[280px]">
            <Image
              src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&q=80"
              alt="Opere su misura"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <div className="p-8 sm:p-12">
            <p className="label-caps mb-3">Un'opera su misura per te</p>
            <h3 className="heading-md mb-3">Raccontami la tua idea.</h3>
            <p className="font-sans text-sm text-ink-light mb-7 leading-relaxed">
              Ogni storia merita di essere dipinta. Insieme daremo vita a un'opera unica,
              pensata per emozionarti ogni giorno.
            </p>
            <Link href="#" className="btn-primary">
              Raccontami la tua idea
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
