import Link from 'next/link'
import { Instagram, Mail } from 'lucide-react'

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/>
  </svg>
)

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-wine text-rose-100 relative overflow-hidden pb-16 sm:pb-0">
      {/* Decorative flower silhouette right */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden sm:block">
        <svg viewBox="0 0 200 400" className="h-full w-full" fill="none">
          <path d="M150 50 Q170 80 160 110 Q175 130 165 160 Q180 180 170 210 M140 70 Q120 100 130 130 M160 120 Q180 140 175 170" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="155" cy="65" r="12" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="165" cy="115" r="10" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="170" cy="165" r="14" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="section-padding page-max py-16 sm:py-20 relative z-10">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 pb-12 border-b border-rose-100/15">
          {/* Brand */}
          <div>
            <p className="font-serif text-3xl text-cream mb-4">Arianna Fazio</p>
            <p className="font-sans text-sm leading-relaxed text-rose-100/70 max-w-xs">
              Arte originale dipinta a mano.<br />
              Ogni opera racconta una storia.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com/ariannaafazioo/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-rose-100/15 flex items-center justify-center hover:bg-rose-100/25 transition-colors text-cream"
                aria-label="Instagram"
              >
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.tiktok.com/@arianna.fazioo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-rose-100/15 flex items-center justify-center hover:bg-rose-100/25 transition-colors text-cream"
                aria-label="TikTok"
              >
                <TikTokIcon size={14} />
              </a>
              <a
                href="mailto:ari.fazio07@gmail.com"
                className="w-9 h-9 rounded-full bg-rose-100/15 flex items-center justify-center hover:bg-rose-100/25 transition-colors text-cream"
                aria-label="Email"
              >
                <Mail size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="label-caps text-rose-100/50 mb-5">Navigazione</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/shop', label: 'Shop' },
                { href: '/about', label: 'Chi sono' },
                { href: '/contatti', label: 'Contatti' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm text-rose-100/75 hover:text-cream transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <p className="label-caps text-rose-100/50 mb-5">Contatti</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:ari.fazio07@gmail.com"
                className="font-sans text-sm text-rose-100/75 hover:text-cream transition-colors duration-200 flex items-center gap-2"
              >
                <Mail size={14} />
                ari.fazio07@gmail.com
              </a>
              <a
                href="https://www.instagram.com/ariannaafazioo/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-rose-100/75 hover:text-cream transition-colors duration-200 flex items-center gap-2"
              >
                <Instagram size={14} />
                @ariannaafazioo
              </a>
              <a
                href="https://www.tiktok.com/@arianna.fazioo"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-rose-100/75 hover:text-cream transition-colors duration-200 flex items-center gap-2"
              >
                <TikTokIcon size={14} />
                @arianna.fazioo
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-rose-100/40 tracking-wide">
            © {year} Arianna Fazio. Tutti i diritti riservati.
          </p>
          <Link
            href="/admin/login"
            className="font-sans text-xs text-rose-100/30 hover:text-rose-100/60 transition-colors duration-200 tracking-wide"
          >
            Area riservata
          </Link>
        </div>
      </div>
    </footer>
  )
}
