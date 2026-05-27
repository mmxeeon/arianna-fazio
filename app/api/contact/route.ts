import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  artwork_id: z.string().uuid().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    const supabase = createClient()
    const { error } = await supabase.from('messages').insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      message: data.message,
      artwork_id: data.artwork_id ?? null,
      created_at: new Date().toISOString(),
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dati non validi', details: err.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Errore del server' }, { status: 500 })
  }
}
