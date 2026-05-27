'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { StatusBadge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import type { Artwork } from '@/types'
import toast from 'react-hot-toast'

export function ArtworksAdminClient({ artworks: initial }: { artworks: Artwork[] }) {
  const router = useRouter()
  const [artworks, setArtworks] = useState(initial)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const confirmDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from('artworks').delete().eq('id', deleteId)
      if (error) throw error
      setArtworks((prev) => prev.filter((a) => a.id !== deleteId))
      toast.success('Opera eliminata.')
      setDeleteId(null)
    } catch {
      toast.error('Errore nell\'eliminazione.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <div className="max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl text-soft-black">Le tue opere</h1>
          <Link
            href="/admin/artworks/new"
            className="flex items-center gap-2 bg-soft-black text-ivory px-5 py-2.5 font-sans text-xs tracking-widest uppercase hover:bg-warm-gray-800 transition-colors"
          >
            <Plus size={14} />
            Nuova opera
          </Link>
        </div>

        {/* Table */}
        {artworks.length === 0 ? (
          <div className="bg-white border border-sand p-16 text-center rounded-sm">
            <p className="font-sans text-sm text-warm-gray-400 mb-4">Non hai ancora caricato opere.</p>
            <Link href="/admin/artworks/new" className="btn-primary">
              <Plus size={14} />
              Aggiungi la prima
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-sand rounded-sm overflow-hidden">
            {/* Desktop table */}
            <table className="hidden sm:table w-full">
              <thead>
                <tr className="border-b border-sand">
                  <th className="text-left p-4 label-caps text-warm-gray-400 font-normal">Immagine</th>
                  <th className="text-left p-4 label-caps text-warm-gray-400 font-normal">Titolo</th>
                  <th className="text-left p-4 label-caps text-warm-gray-400 font-normal">Prezzo</th>
                  <th className="text-left p-4 label-caps text-warm-gray-400 font-normal">Stato</th>
                  <th className="text-right p-4 label-caps text-warm-gray-400 font-normal">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                {artworks.map((artwork) => (
                  <tr key={artwork.id} className="hover:bg-ivory transition-colors">
                    <td className="p-4">
                      <div className="w-12 h-14 bg-beige overflow-hidden">
                        {artwork.image_url && (
                          <Image src={artwork.image_url} alt={artwork.title} width={48} height={56} className="w-full h-full object-cover" />
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-serif text-base">{artwork.title}</p>
                      {artwork.technique && <p className="font-sans text-xs text-warm-gray-400">{artwork.technique}</p>}
                    </td>
                    <td className="p-4 font-sans text-sm">
                      {artwork.price ? formatPrice(artwork.price) : '—'}
                    </td>
                    <td className="p-4">
                      <StatusBadge
                        status={artwork.status}
                        labelAvailable="Disponibile"
                        labelSold="Venduto"
                        labelUnavailable="Non disponibile"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/artworks/${artwork.id}/edit`}
                          className="p-1.5 text-warm-gray-400 hover:text-soft-black transition-colors"
                        >
                          <Pencil size={15} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(artwork.id)}
                          className="p-1.5 text-warm-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile list */}
            <div className="sm:hidden divide-y divide-sand">
              {artworks.map((artwork) => (
                <div key={artwork.id} className="flex items-center gap-4 p-4">
                  <div className="w-12 h-14 flex-shrink-0 bg-beige overflow-hidden">
                    {artwork.image_url && (
                      <Image src={artwork.image_url} alt={artwork.title} width={48} height={56} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-base truncate">{artwork.title}</p>
                    <StatusBadge status={artwork.status} labelAvailable="Disponibile" labelSold="Venduto" labelUnavailable="Non disp." className="mt-1" />
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link href={`/admin/artworks/${artwork.id}/edit`} className="p-2 text-warm-gray-400 hover:text-soft-black">
                      <Pencil size={14} />
                    </Link>
                    <button onClick={() => setDeleteId(artwork.id)} className="p-2 text-warm-gray-300 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-soft-black/50 z-50 flex items-center justify-center p-5"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-sm w-full p-8 shadow-xl"
            >
              <div className="flex items-start gap-4 mb-6">
                <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="font-sans text-sm text-warm-gray-700 leading-relaxed">
                  Sei sicura di voler eliminare questa opera? L'azione è irreversibile.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="flex-1 bg-red-500 text-white py-2.5 font-sans text-sm tracking-wide hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {deleting ? 'Eliminazione...' : 'Elimina'}
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 border border-sand py-2.5 font-sans text-sm text-warm-gray-600 hover:bg-ivory transition-colors"
                >
                  Annulla
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
