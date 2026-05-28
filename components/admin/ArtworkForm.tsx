'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ImageUploader } from './ImageUploader'
import type { Artwork, ArtworkStatus } from '@/types'
import { Save } from 'lucide-react'
import toast from 'react-hot-toast'

const schema = z.object({
  title: z.string().min(1, 'Il titolo è obbligatorio'),
  description: z.string().optional(),
  technique: z.string().optional(),
  dimensions: z.string().optional(),
  year: z.coerce.number().int().min(1900).max(2100).optional().or(z.literal('')),
  price: z.coerce.number().min(0).optional().or(z.literal('')),
  category: z.string().optional(),
  status: z.enum(['available', 'sold', 'unavailable']),
  featured: z.boolean(),
})
type FormData = z.infer<typeof schema>

interface ArtworkFormProps {
  artwork?: Artwork
}

const CATEGORIES = ['Paesaggi', 'Ritratti', 'Astratto', 'Natura morta', 'Animali', 'Figure', 'Marino', 'Altro']
const STATUSES: { value: ArtworkStatus; label: string }[] = [
  { value: 'available', label: 'Disponibile' },
  { value: 'sold', label: 'Venduto' },
  { value: 'unavailable', label: 'Non disponibile' },
]

export function ArtworkForm({ artwork }: ArtworkFormProps) {
  const router = useRouter()
  const isEdit = !!artwork

  const [mainImage, setMainImage] = useState(artwork?.image_url ?? '')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: artwork?.title ?? '',
      description: artwork?.description ?? '',
      technique: artwork?.technique ?? '',
      dimensions: artwork?.dimensions ?? '',
      year: artwork?.year ?? '',
      price: artwork?.price ?? '',
      category: artwork?.category ?? '',
      status: artwork?.status ?? 'available',
      featured: artwork?.featured ?? false,
    },
  })

  const onSubmit = async (data: FormData) => {
    const supabase = createClient()

    const payload = {
      ...data,
      year: data.year === '' ? null : Number(data.year),
      price: data.price === '' ? null : Number(data.price),
      image_url: mainImage || null,
      slug: artwork?.slug ?? slugify(data.title),
      updated_at: new Date().toISOString(),
    }

    try {
      if (isEdit) {
        const { error } = await supabase.from('artworks').update(payload).eq('id', artwork.id)
        if (error) throw error
        toast.success('Opera salvata.')
      } else {
        const { error } = await supabase.from('artworks').insert({ ...payload, created_at: new Date().toISOString() })
        if (error) throw error
        toast.success('Opera aggiunta.')
      }
      router.push('/admin/artworks')
      router.refresh()
    } catch (err: any) {
      console.error('Save artwork error:', err)
      toast.error(err?.message || 'Errore nel salvataggio.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-24 sm:pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">

        {/* Image upload */}
        <div className="lg:col-span-1">
          <ImageUploader value={mainImage} onChange={setMainImage} label="Immagine principale" />
        </div>

        {/* Fields */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
          <Input
            label="Titolo *"
            placeholder="Es. Luce del mattino"
            error={errors.title?.message}
            {...register('title')}
          />

          <Textarea
            label="Descrizione"
            placeholder="Descrivi l'opera, l'ispirazione, il processo..."
            rows={4}
            {...register('description')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Tecnica" placeholder="Es. Olio su tela" {...register('technique')} />
            <Input label="Dimensioni" placeholder="Es. 60×80 cm" {...register('dimensions')} />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Input label="Anno" type="number" inputMode="numeric" placeholder="2024" {...register('year')} />
            <Input label="Prezzo (€)" type="number" inputMode="decimal" placeholder="850" {...register('price')} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block label-caps mb-2">Categoria</label>
              <select className="input-field min-h-[44px]" {...register('category')}>
                <option value="">— Seleziona —</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block label-caps mb-2">Disponibilità</label>
              <select className="input-field min-h-[44px]" {...register('status')}>
                {STATUSES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer py-2 min-h-[44px]">
            <input type="checkbox" className="w-5 h-5 accent-wine" {...register('featured')} />
            <span className="font-sans text-sm text-ink">Opera in evidenza (homepage)</span>
          </label>

          {/* Desktop actions */}
          <div className="hidden sm:flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 min-h-[48px]"
            >
              <Save size={14} />
              {isSubmitting ? 'Salvataggio...' : 'Salva opera'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="font-sans text-sm text-ink-light hover:text-wine transition-colors min-h-[44px]"
            >
              Annulla
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sticky save bar */}
      <div className="sm:hidden fixed bottom-16 inset-x-0 z-20 bg-cream/95 backdrop-blur-sm border-t border-rose-200 p-3 safe-bottom">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-shrink-0 px-5 h-12 border border-rose-200 text-ink-light font-sans text-xs tracking-widest uppercase rounded-sm"
          >
            Annulla
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 h-12 bg-wine text-cream font-sans text-xs tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-3 h-3 border border-cream border-t-transparent rounded-full animate-spin" />
                Salvataggio
              </>
            ) : (
              <>
                <Save size={14} />
                Salva opera
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
