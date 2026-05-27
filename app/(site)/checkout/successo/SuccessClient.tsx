'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCartStore } from '@/store/cartStore'

export function SuccessClient() {
  const { t } = useLanguage()
  const clearCart = useCartStore((s) => s.clearCart)

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          className="flex justify-center mb-8"
        >
          <CheckCircle size={56} strokeWidth={1.5} className="text-emerald-500" />
        </motion.div>

        <h1 className="heading-md mb-4">{t.checkout.successTitle}</h1>
        <p className="font-sans text-[15px] text-warm-gray-600 leading-relaxed mb-10">
          {t.checkout.successText}
        </p>

        <Link href="/shop" className="btn-primary">
          {t.checkout.successBack}
        </Link>
      </motion.div>
    </div>
  )
}
