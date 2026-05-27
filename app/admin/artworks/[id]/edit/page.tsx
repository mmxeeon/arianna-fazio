import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ArtworkForm } from '@/components/admin/ArtworkForm'
import type { Artwork } from '@/types'

interface Props {
  params: { id: string }
}

export default async function EditArtworkPage({ params }: Props) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: artwork } = await supabase
    .from('artworks')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!artwork) notFound()

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Link
          href="/admin/artworks"
          className="inline-flex items-center gap-2 font-sans text-xs text-warm-gray-400 hover:text-soft-black transition-colors group mb-4"
        >
          <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />
          Torna alle opere
        </Link>
        <h1 className="font-serif text-3xl text-soft-black">
          Modifica: <span className="text-warm-gray-500">{artwork.title}</span>
        </h1>
      </div>

      <div className="bg-white border border-sand rounded-sm p-6 sm:p-8">
        <ArtworkForm artwork={artwork as Artwork} />
      </div>
    </div>
  )
}
