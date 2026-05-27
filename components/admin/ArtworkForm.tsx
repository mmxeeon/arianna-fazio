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
import { Button } from '@/components/ui/Button'
import { ImageUploader } from './ImageUploader'
import type { Artwork, ArtworkStatus } from '@/types'
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

const CATEGORIES = ['Paesaggi', 'Ritratti', 'Astratto', 'Nature morte', 'Marino', 'Animali', 'Altro']
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
        toast.success('Opera salvata con successo.')
      } else {
        const { error } = await supabase.from('artworks').insert({ ...payload, created_at: new Date().toISOString() })
        if (error) throw error
        toast.success('Opera aggiunta con successo.')
      }
      router.push('/admin/artworks')
      router.refresh()
    } catch (err) {
      toast.error('Errore nel salvataggio. Riprova.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

        {/* Left: Image */}
        <div>
          <ImageUploader value={mainImage} onChange={setMainImage} label="Immagine principale" />
        </div>

        {/* Right: Fields */}
        <div className="lg:col-span-2 space-y-6">
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

          <div className="grid grid-cols-2 gap-4">
            <Input label="Tecnica" placeholder="Es. Olio su tela" {...register('technique')} />
            <Input label="Dimensioni" placeholder="Es. 60×80 cm" {...register('dimensions')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Anno" type="number" placeholder="2024" {...register('year')} />
            <Input label="Prezzo (€)" type="number" placeholder="850" {...register('price')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block label-caps mb-2">Categoria</label>
              <select
                className="input-field"
                {...register('category')}
              >
                <option value="">— Seleziona —</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block label-caps mb-2">Disponibilità</label>
              <select className="input-field" {...register('status')}>
                {STATUSES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Featured */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-soft-black" {...register('featured')} />
            <span className="font-sans text-sm text-soft-black">Opera in evidenza (homepage)</span>
          </label>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2">
            <Button type="submit" loading={isSubmitting} size="lg">
              {isSubmitting ? 'Salvataggio...' : 'Salva opera'}
            </Button>
            <button
              type="button"
              onClick={() => router.back()}
              className="font-sans text-sm text-warm-gray-500 hover:text-soft-black transition-colors"
            >
              Annulla
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
