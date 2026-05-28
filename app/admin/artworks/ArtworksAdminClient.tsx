'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, AlertTriangle, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { StatusBadge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import type { Artwork } from '@/types'
import toast from 'react-hot-toast'

export function ArtworksAdminClient({ artworks: initial }: { artworks: Artwork[] }) {
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
      toast.error("Errore nell'eliminazione.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <div className="max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <p className="label-caps mb-1">Gestione</p>
            <h1 className="font-serif text-2xl sm:text-3xl text-wine">Le tue opere</h1>
          </div>
          <Link
            href="/admin/artworks/new"
            className="hidden sm:flex items-center gap-2 bg-wine text-cream px-5 py-3 font-sans text-xs tracking-widest uppercase hover:bg-wine-dark transition-colors min-h-[44px] rounded-sm"
          >
            <Plus size={14} />
            Nuova opera
          </Link>
        </div>

        {artworks.length === 0 ? (
          <div className="bg-white border border-rose-100 p-12 sm:p-16 text-center rounded-sm">
            <p className="font-sans text-sm text-ink-light mb-4">Non hai ancora caricato opere.</p>
            <Link href="/admin/artworks/new" className="btn-primary inline-flex">
              <Plus size={14} />
              Aggiungi la prima
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block bg-white border border-rose-100 rounded-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-rose-100">
                    <th className="text-left p-4 label-caps font-normal">Immagine</th>
                    <th className="text-left p-4 label-caps font-normal">Titolo</th>
                    <th className="text-left p-4 label-caps font-normal">Prezzo</th>
                    <th className="text-left p-4 label-caps font-normal">Stato</th>
                    <th className="text-right p-4 label-caps font-normal">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-100">
                  {artworks.map((artwork) => (
                    <tr key={artwork.id} className="hover:bg-rose-50 transition-colors">
                      <td className="p-4">
                        <div className="w-12 h-14 bg-rose-100 overflow-hidden rounded-sm">
                          {artwork.image_url && (
                            <Image src={artwork.image_url} alt={artwork.title} width={48} height={56} className="w-full h-full object-cover" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-serif text-base text-wine">{artwork.title}</p>
                        {artwork.technique && <p className="font-sans text-xs text-ink-light">{artwork.technique}</p>}
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
                          <Link href={`/admin/artworks/${artwork.id}/edit`} className="w-9 h-9 flex items-center justify-center text-ink-light hover:text-wine transition-colors rounded-sm">
                            <Pencil size={15} />
                          </Link>
                          <button onClick={() => setDeleteId(artwork.id)} className="w-9 h-9 flex items-center justify-center text-rose-300 hover:text-red-500 transition-colors rounded-sm">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden space-y-3">
              {artworks.map((artwork) => (
                <div key={artwork.id} className="bg-white border border-rose-100 rounded-sm overflow-hidden">
                  <Link href={`/admin/artworks/${artwork.id}/edit`} className="flex gap-3 p-3 hover:bg-rose-50 transition-colors">
                    <div className="w-20 h-24 flex-shrink-0 bg-rose-100 overflow-hidden rounded-sm">
                      {artwork.image_url && (
                        <Image src={artwork.image_url} alt={artwork.title} width={80} height={96} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <p className="font-serif text-lg text-wine leading-tight mb-1">{artwork.title}</p>
                      {artwork.technique && <p className="font-sans text-xs text-ink-light mb-1.5">{artwork.technique}</p>}
                      <div className="flex items-center justify-between mt-auto">
                        <p className="font-sans text-sm text-wine">{artwork.price ? formatPrice(artwork.price) : '—'}</p>
                        <StatusBadge status={artwork.status} labelAvailable="Disp." labelSold="Vend." labelUnavailable="No" />
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-rose-300 flex-shrink-0 self-center" />
                  </Link>
                  <div className="flex border-t border-rose-100">
                    <Link
                      href={`/admin/artworks/${artwork.id}/edit`}
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-wine text-xs font-sans tracking-wider uppercase hover:bg-rose-50 transition-colors min-h-[44px]"
                    >
                      <Pencil size={13} />
                      Modifica
                    </Link>
                    <button
                      onClick={() => setDeleteId(artwork.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-red-500 text-xs font-sans tracking-wider uppercase border-l border-rose-100 hover:bg-red-50 transition-colors min-h-[44px]"
                    >
                      <Trash2 size={13} />
                      Elimina
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-wine/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'tween', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-sm p-6 sm:p-8 rounded-t-2xl sm:rounded-sm shadow-xl safe-bottom"
            >
              <div className="flex items-start gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                  <AlertTriangle className="text-amber-500" size={20} />
                </div>
                <div>
                  <p className="font-serif text-lg text-wine mb-1">Eliminare l'opera?</p>
                  <p className="font-sans text-sm text-ink-light leading-relaxed">L'azione non può essere annullata.</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="w-full bg-red-500 text-white py-3.5 font-sans text-sm tracking-wide hover:bg-red-600 transition-colors disabled:opacity-50 min-h-[48px] rounded-sm"
                >
                  {deleting ? 'Eliminazione...' : 'Sì, elimina'}
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="w-full border border-rose-200 py-3.5 font-sans text-sm text-ink-light hover:bg-rose-50 transition-colors min-h-[48px] rounded-sm"
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
