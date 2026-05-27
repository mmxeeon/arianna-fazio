import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardClient } from './DashboardClient'

async function getStats() {
  try {
    const supabase = createClient()
    const { data: artworks } = await supabase.from('artworks').select('id, status, featured, created_at, title, image_url, price')
    const { data: messages } = await supabase.from('messages').select('id')
    return {
      total: artworks?.length ?? 0,
      available: artworks?.filter((a) => a.status === 'available').length ?? 0,
      sold: artworks?.filter((a) => a.status === 'sold').length ?? 0,
      messages: messages?.length ?? 0,
      recent: artworks?.slice(0, 4) ?? [],
    }
  } catch {
    return { total: 0, available: 0, sold: 0, messages: 0, recent: [] }
  }
}

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const stats = await getStats()
  return <DashboardClient stats={stats} />
}
