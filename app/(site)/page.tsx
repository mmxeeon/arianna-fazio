import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Hero } from '@/components/home/Hero'
import { FeaturedWorks } from '@/components/home/FeaturedWorks'
import { AboutPreview } from '@/components/home/AboutPreview'
import { CTA } from '@/components/home/CTA'
import type { Artwork } from '@/types'

export const metadata: Metadata = {
  title: 'Arianna Fazio — Arte Originale',
  description: 'Opere d\'arte originali dipinte a mano da Arianna Fazio, artista italiana.',
}

async function getFeaturedArtworks(): Promise<Artwork[]> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('artworks')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(3)
    return data ?? []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const featured = await getFeaturedArtworks()

  return (
    <>
      <Hero />
      <FeaturedWorks artworks={featured} />
      <AboutPreview />
      <CTA />
    </>
  )
}
