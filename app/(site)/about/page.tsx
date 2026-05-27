import type { Metadata } from 'next'
import { AboutClient } from './AboutClient'

export const metadata: Metadata = {
  title: 'Chi sono',
  description: 'Scopri la storia di Arianna Fazio, artista italiana e pittrice.',
}

export default function AboutPage() {
  return <AboutClient />
}
