'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Image as ImageIcon, LogOut, Menu, Plus, Home } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/artworks', label: 'Opere', icon: ImageIcon },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Login page renders without admin shell
  if (pathname === '/admin/login') return <>{children}</>

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-rose-100/20">
        <Link href="/" className="font-serif text-xl text-cream">
          Arianna Fazio
        </Link>
        <p className="font-sans text-xs text-cream/50 mt-1 tracking-wide">Area Riservata</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setSidebarOpen(false)}
            className={cn(
              'flex items-center gap-3 px-4 py-3.5 font-sans text-sm transition-colors duration-200 rounded-sm min-h-[48px]',
              pathname.startsWith(href)
                ? 'bg-cream/10 text-cream'
                : 'text-cream/60 hover:text-cream hover:bg-cream/5'
            )}
          >
            <Icon size={16} strokeWidth={1.5} />
            {label}
          </Link>
        ))}

        <Link
          href="/"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-3 px-4 py-3.5 font-sans text-sm text-cream/40 hover:text-cream/70 transition-colors duration-200 min-h-[48px] mt-4"
        >
          <Home size={16} strokeWidth={1.5} />
          Vedi il sito
        </Link>
      </nav>

      <div className="p-4 border-t border-rose-100/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3.5 w-full font-sans text-sm text-cream/60 hover:text-cream transition-colors duration-200 min-h-[48px]"
        >
          <LogOut size={16} strokeWidth={1.5} />
          Esci
        </button>
      </div>
    </div>
  )

  const bottomNavItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Home' },
    { href: '/admin/artworks', icon: ImageIcon, label: 'Opere' },
    { href: '/admin/artworks/new', icon: Plus, label: 'Aggiungi', primary: true },
    { href: '/', icon: Home, label: 'Sito' },
  ]

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-wine flex-shrink-0 fixed top-0 left-0 h-full z-20">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-wine/50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-72 max-w-[80%] bg-wine z-40 lg:hidden flex flex-col"
            >
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 lg:ml-60 pb-20 lg:pb-0">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-cream/95 backdrop-blur-sm border-b border-rose-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-11 h-11 flex items-center justify-center text-wine"
            aria-label="Menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
          <span className="font-serif text-lg text-wine">Arianna Fazio</span>
          <button
            onClick={handleLogout}
            className="w-11 h-11 flex items-center justify-center text-wine"
            aria-label="Esci"
          >
            <LogOut size={18} strokeWidth={1.5} />
          </button>
        </div>

        <main className="p-4 sm:p-6 lg:p-10">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-20 bg-cream/95 backdrop-blur-sm border-t border-rose-200 safe-bottom">
        <div className="grid grid-cols-4 max-w-md mx-auto">
          {bottomNavItems.map(({ href, icon: Icon, label, primary }) => {
            const active = href === '/admin/dashboard' ? pathname === '/admin/dashboard' : pathname.startsWith(href) && href !== '/'
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 py-2.5 min-h-[60px] transition-colors',
                  primary
                    ? 'text-wine'
                    : active
                      ? 'text-wine'
                      : 'text-ink-light hover:text-wine'
                )}
              >
                {primary ? (
                  <div className="w-10 h-10 rounded-full bg-wine text-cream flex items-center justify-center -mt-1">
                    <Icon size={18} strokeWidth={2} />
                  </div>
                ) : (
                  <Icon size={20} strokeWidth={1.5} />
                )}
                <span className="font-sans text-[10px] tracking-wide">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
