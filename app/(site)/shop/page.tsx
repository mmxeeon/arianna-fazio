import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { ShopClient } from './ShopClient'
import type { Artwork } from '@/types'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Acquista opere d\'arte originali di Arianna Fazio.',
}

async function getArtworks(): Promise<Artwork[]> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('artworks')
      .select('*')
      .order('created_at', { ascending: false })
    return data ?? []
  } catch {
    return []
  }
}

export default async function ShopPage() {
  const artworks = await getArtworks()
  return <ShopClient artworks={artworks} />
}
