import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ArtworksAdminClient } from './ArtworksAdminClient'
import type { Artwork } from '@/types'

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

export default async function ArtworksAdminPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const artworks = await getArtworks()
  return <ArtworksAdminClient artworks={artworks} />
}
