'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Plus, ArrowRight, Image as ImageIcon, ShoppingBag, TrendingUp, MessageSquare, ChevronRight } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface Stats {
  total: number
  available: number
  sold: number
  messages: number
  recent: Array<{ id: string; title: string; image_url: string | null; price: number | null; status: string }>
}

export function DashboardClient({ stats }: { stats: Stats }) {
  const cards = [
    { label: 'Totali', value: stats.total, icon: ImageIcon, color: 'bg-rose-100', text: 'text-wine' },
    { label: 'Disponibili', value: stats.available, icon: ShoppingBag, color: 'bg-emerald-50', text: 'text-emerald-700' },
    { label: 'Vendute', value: stats.sold, icon: TrendingUp, color: 'bg-amber-50', text: 'text-amber-700' },
    { label: 'Messaggi', value: stats.messages, icon: MessageSquare, color: 'bg-blue-50', text: 'text-blue-700' },
  ]

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-6 sm:mb-10">
        <p className="label-caps mb-2">Area Riservata</p>
        <h1 className="font-serif text-2xl sm:text-3xl text-wine">Benvenuta, Arianna</h1>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, color, text }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`${color} p-4 sm:p-5 rounded-sm`}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <Icon size={16} className={text} strokeWidth={1.5} />
            </div>
            <p className={`font-serif text-3xl sm:text-4xl ${text}`}>{value}</p>
            <p className="font-sans text-xs text-ink-light mt-0.5">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick action */}
      <Link
        href="/admin/artworks/new"
        className="flex items-center justify-between bg-wine text-cream px-5 py-4 rounded-sm mb-8 hover:bg-wine-dark transition-colors min-h-[60px] active:scale-[0.99] lg:hidden"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-cream/20 flex items-center justify-center">
            <Plus size={16} />
          </div>
          <span className="font-sans text-sm tracking-wide">Aggiungi nuova opera</span>
        </div>
        <ChevronRight size={18} />
      </Link>

      {/* Recent artworks */}
      <div className="bg-white border border-rose-100 rounded-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-rose-100">
          <h2 className="font-serif text-lg sm:text-xl text-wine">Opere recenti</h2>
          <Link
            href="/admin/artworks"
            className="flex items-center gap-1.5 font-sans text-xs text-wine hover:text-wine-dark transition-colors group min-h-[36px]"
          >
            Vedi tutte
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {stats.recent.length === 0 ? (
          <div className="p-8 text-center">
            <p className="font-sans text-sm text-ink-light mb-4">Nessuna opera caricata.</p>
            <Link href="/admin/artworks/new" className="btn-primary inline-flex">
              <Plus size={14} />
              Aggiungi la prima
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-rose-100">
            {stats.recent.map((artwork) => (
              <Link
                key={artwork.id}
                href={`/admin/artworks/${artwork.id}/edit`}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-rose-50 transition-colors min-h-[72px]"
              >
                <div className="w-14 h-16 sm:w-12 sm:h-14 flex-shrink-0 bg-rose-100 overflow-hidden rounded-sm">
                  {artwork.image_url && (
                    <Image src={artwork.image_url} alt={artwork.title} width={56} height={64} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base sm:text-lg text-wine truncate">{artwork.title}</p>
                  <p className="font-sans text-xs text-ink-light">{artwork.price ? formatPrice(artwork.price) : '—'}</p>
                </div>
                <span className={`font-sans text-[10px] uppercase tracking-wider px-2.5 py-1 flex-shrink-0 rounded-sm ${
                  artwork.status === 'available' ? 'bg-emerald-50 text-emerald-700' :
                  artwork.status === 'sold' ? 'bg-amber-50 text-amber-700' :
                  'bg-rose-100 text-ink-light'
                }`}>
                  {artwork.status === 'available' ? 'Disp.' : artwork.status === 'sold' ? 'Vend.' : 'No'}
                </span>
                <ChevronRight size={16} className="text-rose-300 flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
