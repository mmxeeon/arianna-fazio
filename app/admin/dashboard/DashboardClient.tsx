'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Plus, ArrowRight, Image as ImageIcon, ShoppingBag, TrendingUp, MessageSquare } from 'lucide-react'
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
    { label: 'Opere totali', value: stats.total, icon: ImageIcon, color: 'bg-beige' },
    { label: 'Disponibili', value: stats.available, icon: ShoppingBag, color: 'bg-emerald-50' },
    { label: 'Vendute', value: stats.sold, icon: TrendingUp, color: 'bg-amber-50' },
    { label: 'Messaggi', value: stats.messages, icon: MessageSquare, color: 'bg-blue-50' },
  ]

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <div>
          <h1 className="font-serif text-3xl text-soft-black">Dashboard</h1>
          <p className="font-sans text-sm text-warm-gray-500 mt-1">Benvenuta, Arianna</p>
        </div>
        <Link
          href="/admin/artworks/new"
          className="flex items-center gap-2 bg-soft-black text-ivory px-5 py-2.5 font-sans text-xs tracking-widest uppercase hover:bg-warm-gray-800 transition-colors"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Nuova opera</span>
          <span className="sm:hidden">Aggiungi</span>
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(({ label, value, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`${color} p-5 sm:p-6 rounded-sm`}
          >
            <Icon size={18} className="text-warm-gray-400 mb-3" />
            <p className="font-serif text-3xl sm:text-4xl text-soft-black">{value}</p>
            <p className="font-sans text-xs text-warm-gray-500 mt-1">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent artworks */}
      <div className="bg-white border border-sand rounded-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-sand">
          <h2 className="font-serif text-xl">Opere recenti</h2>
          <Link
            href="/admin/artworks"
            className="flex items-center gap-1.5 font-sans text-xs text-warm-gray-500 hover:text-soft-black transition-colors group"
          >
            Vedi tutte
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {stats.recent.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-sans text-sm text-warm-gray-400">Nessuna opera caricata.</p>
            <Link href="/admin/artworks/new" className="inline-block mt-4 font-sans text-xs underline text-warm-gray-500 hover:text-soft-black">
              Aggiungi la prima opera →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-sand">
            {stats.recent.map((artwork) => (
              <div key={artwork.id} className="flex items-center gap-4 p-4 sm:p-5 hover:bg-ivory transition-colors">
                <div className="w-12 h-14 flex-shrink-0 bg-beige overflow-hidden">
                  {artwork.image_url && (
                    <Image src={artwork.image_url} alt={artwork.title} width={48} height={56} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base truncate">{artwork.title}</p>
                  <p className="font-sans text-xs text-warm-gray-400">{artwork.price ? formatPrice(artwork.price) : '—'}</p>
                </div>
                <span className={`font-sans text-xs px-2.5 py-1 flex-shrink-0 ${
                  artwork.status === 'available' ? 'bg-emerald-50 text-emerald-700' :
                  artwork.status === 'sold' ? 'bg-amber-50 text-amber-700' :
                  'bg-warm-gray-100 text-warm-gray-500'
                }`}>
                  {artwork.status === 'available' ? 'Disponibile' : artwork.status === 'sold' ? 'Venduto' : 'Non disp.'}
                </span>
                <Link href={`/admin/artworks/${artwork.id}/edit`} className="font-sans text-xs text-warm-gray-400 hover:text-soft-black transition-colors flex-shrink-0">
                  Modifica
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
