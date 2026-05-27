import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: {
    default: 'Arianna Fazio — Arte Originale',
    template: '%s | Arianna Fazio',
  },
  description: 'Opere d\'arte originali dipinte a mano da Arianna Fazio. Acquista quadri unici di pittura contemporanea italiana.',
  keywords: ['arte', 'quadri', 'pittura', 'opere originali', 'Arianna Fazio', 'artista italiana'],
  authors: [{ name: 'Arianna Fazio' }],
  openGraph: {
    title: 'Arianna Fazio — Arte Originale',
    description: 'Opere d\'arte originali dipinte a mano da Arianna Fazio.',
    url: 'https://ariannafazio.it',
    siteName: 'Arianna Fazio',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arianna Fazio — Arte Originale',
    description: 'Opere d\'arte originali dipinte a mano da Arianna Fazio.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#FAFAF8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <LanguageProvider>
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#1C1C1A',
                color: '#FAFAF8',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.875rem',
                borderRadius: '2px',
                padding: '12px 20px',
              },
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  )
}
