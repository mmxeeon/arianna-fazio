import type { Metadata } from 'next'
import { SuccessClient } from './SuccessClient'

export const metadata: Metadata = {
  title: 'Acquisto completato',
}

export default function SuccessPage() {
  return <SuccessClient />
}
