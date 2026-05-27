import type { Metadata } from 'next'
import { CarrelloClient } from './CarrelloClient'

export const metadata: Metadata = {
  title: 'Carrello',
}

export default function CarrelloPage() {
  return <CarrelloClient />
}
