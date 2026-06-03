import type { Metadata } from 'next'
import { ContattiClient } from './ContattiClient'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contatta Arianna Fazio per informazioni, acquisti o commissioni personalizzate.',
}

export default function ContattiPage() {
  return (
    <>
      {/* Static form for Netlify Forms detection at build time */}
      <form name="contatti" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value="contatti" />
        <input name="bot-field" />
        <input name="name" />
        <input name="email" type="email" />
        <input name="phone" type="tel" />
        <textarea name="message" />
      </form>

      <ContattiClient />
    </>
  )
}
