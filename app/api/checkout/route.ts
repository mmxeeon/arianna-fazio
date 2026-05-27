import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const schema = z.object({
  artworkIds: z.array(z.string().uuid()).min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { artworkIds } = schema.parse(body)

    const supabase = createClient()
    const { data: artworks, error } = await supabase
      .from('artworks')
      .select('id, title, price, image_url, slug, status')
      .in('id', artworkIds)

    if (error || !artworks?.length) {
      return NextResponse.json({ error: 'Opere non trovate' }, { status: 404 })
    }

    // Verifica disponibilità
    const unavailable = artworks.filter((a) => a.status !== 'available')
    if (unavailable.length > 0) {
      return NextResponse.json({
        error: `Opera non disponibile: ${unavailable.map((a) => a.title).join(', ')}`,
      }, { status: 400 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = artworks.map((artwork) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: artwork.title,
          images: artwork.image_url ? [artwork.image_url] : [],
          metadata: { artwork_id: artwork.id, slug: artwork.slug },
        },
        unit_amount: Math.round((artwork.price ?? 0) * 100),
      },
      quantity: 1,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      line_items,
      mode: 'payment',
      success_url: `${siteUrl}/checkout/successo?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: artworkIds.length === 1
        ? `${siteUrl}/shop/${artworks[0].slug}?cancelled=true`
        : `${siteUrl}/carrello?cancelled=true`,
      payment_intent_data: {
        metadata: {
          artwork_ids: artworkIds.join(','),
        },
      },
      custom_text: {
        submit: { message: 'Arianna ti contatterà per organizzare la spedizione.' },
      },
      locale: 'it',
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dati non validi' }, { status: 400 })
    }
    console.error('Stripe error:', err)
    return NextResponse.json({ error: 'Errore del server' }, { status: 500 })
  }
}
