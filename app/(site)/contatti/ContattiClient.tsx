'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { MessageCircle, Instagram, Mail } from 'lucide-react'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
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
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-28">
      <div className="section-padding page-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="label-caps mb-4">{t.contact.title}</p>
            <h1 className="heading-lg mb-4">{t.contact.subtitle}</h1>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 py-12 text-center"
              >
                <p className="font-serif text-2xl mb-3 text-soft-black">Grazie!</p>
                <p className="font-sans text-warm-gray-600">{t.contact.success}</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 btn-ghost text-xs underline underline-offset-4"
                >
                  Invia un altro messaggio
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                <Input
                  label={t.contact.namePlaceholder}
                  placeholder={t.contact.namePlaceholder}
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Input
                  label={t.contact.emailPlaceholder}
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Input
                  label={t.contact.phonePlaceholder}
                  type="tel"
                  placeholder={t.contact.phonePlaceholder}
                  {...register('phone')}
                />
                <Textarea
                  label={t.contact.messagePlaceholder}
                  placeholder={t.contact.messagePlaceholder}
                  rows={5}
                  error={errors.message?.message}
                  {...register('message')}
                />
                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? t.contact.submitting : t.contact.submit}
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
            <div>
              <p className="label-caps mb-5">{t.contact.infoTitle}</p>
              <div className="space-y-4">
                <a
                  href="mailto:info@ariannafazio.it"
                  className="flex items-center gap-3 font-sans text-sm text-warm-gray-700 hover:text-soft-black transition-colors group"
                >
                  <Mail size={16} className="text-warm-gray-400 group-hover:text-gold transition-colors" />
                  info@ariannafazio.it
                </a>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-sans text-sm text-warm-gray-700 hover:text-soft-black transition-colors group"
                >
                  <MessageCircle size={16} className="text-warm-gray-400 group-hover:text-gold transition-colors" />
                  {t.contact.whatsappText}
                </a>
                <a
                  href="https://instagram.com/ariannafazio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-sans text-sm text-warm-gray-700 hover:text-soft-black transition-colors group"
                >
                  <Instagram size={16} className="text-warm-gray-400 group-hover:text-gold transition-colors" />
                  @ariannafazio
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-sand">
              <p className="label-caps mb-3">{t.contact.commissionsTitle}</p>
              <p className="font-sans text-[15px] text-warm-gray-600 leading-relaxed">
                {t.contact.commissionsText}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
