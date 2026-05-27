import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-soft-black text-ivory/70">
      <div className="section-padding page-max py-16 sm:py-20">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 pb-12 border-b border-ivory/10">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl text-ivory mb-4">Arianna Fazio</p>
            <p className="font-sans text-sm leading-relaxed text-ivory/50 max-w-xs">
              Arte originale dipinta a mano.<br />
              Ogni opera racconta una storia.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="label-caps text-ivory/40 mb-5">Navigazione</p>
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
                  className="font-sans text-sm text-ivory/60 hover:text-ivory transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & Contacts */}
          <div>
            <p className="label-caps text-ivory/40 mb-5">Contatti</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:ari.fazio07@gmail.com"
                className="font-sans text-sm text-ivory/60 hover:text-ivory transition-colors duration-200"
              >
                ari.fazio07@gmail.com
              </a>
              <a
                href="https://www.instagram.com/ariannaafazioo/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-ivory/60 hover:text-ivory transition-colors duration-200"
              >
                Instagram — @ariannaafazioo
              </a>
              <a
                href="https://www.tiktok.com/@arianna.fazioo"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-ivory/60 hover:text-ivory transition-colors duration-200"
              >
                TikTok — @arianna.fazioo
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-ivory/30 tracking-wide">
            © {year} Arianna Fazio. Tutti i diritti riservati.
          </p>
          <Link
            href="/admin/login"
            className="font-sans text-xs text-ivory/20 hover:text-ivory/40 transition-colors duration-200 tracking-wide"
          >
            Area riservata
          </Link>
        </div>
      </div>
    </footer>
  )
}
