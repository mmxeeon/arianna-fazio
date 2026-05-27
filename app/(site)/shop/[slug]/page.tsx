import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ArtworkDetailClient } from './ArtworkDetailClient'
import type { Artwork } from '@/types'

interface Props {
  params: { slug: string }
}

async function getArtwork(slug: string): Promise<Artwork | null> {
  const supabase = createClient()
  const { data } = await supabase
    .from('artworks')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

async function getRelated(artwork: Artwork): Promise<Artwork[]> {
  const supabase = createClient()
  const query = supabase
    .from('artworks')
    .select('*')
    .neq('id', artwork.id)
    .limit(3)
  if (artwork.category) {
    query.eq('category', artwork.category)
  }
  const { data } = await query
  return data ?? []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artwork = await getArtwork(params.slug)
  if (!artwork) return {}
  return {
    title: artwork.title,
    description: artwork.description ?? `${artwork.title} — opera originale di Arianna Fazio`,
    openGraph: {
      title: artwork.title,
      images: artwork.image_url ? [artwork.image_url] : [],
    },
  }
}

export default async function ArtworkPage({ params }: Props) {
  const artwork = await getArtwork(params.slug)
  if (!artwork) notFound()

  const related = await getRelated(artwork)

  return <ArtworkDetailClient artwork={artwork} related={related} />
}
