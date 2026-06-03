import type { Metadata } from 'next'
import { ContattiClient } from './ContattiClient'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contatta Arianna Fazio per informazioni, acquisti o commissioni personalizzate.',
}

export default function ContattiPage() {
  return <ContattiClient />
}
