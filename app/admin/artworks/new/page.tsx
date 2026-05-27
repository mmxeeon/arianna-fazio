import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ArtworkForm } from '@/components/admin/ArtworkForm'

export default async function NewArtworkPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

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
        <h1 className="font-serif text-3xl text-soft-black">Nuova opera</h1>
      </div>

      <div className="bg-white border border-sand rounded-sm p-6 sm:p-8">
        <ArtworkForm />
      </div>
    </div>
  )
}
