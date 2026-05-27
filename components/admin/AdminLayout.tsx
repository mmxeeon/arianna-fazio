'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Image, LogOut, X, Menu } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/artworks', label: 'Opere', icon: Image },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Login page renders without the admin shell
  if (pathname === '/admin/login') return <>{children}</>

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-warm-gray-700">
        <Link href="/" className="font-serif text-xl text-ivory">
          Arianna Fazio
        </Link>
        <p className="font-sans text-xs text-ivory/40 mt-1 tracking-wide">Area Riservata</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setSidebarOpen(false)}
            className={cn(
              'flex items-center gap-3 px-4 py-3 font-sans text-sm transition-colors duration-200 rounded-sm',
              pathname.startsWith(href)
                ? 'bg-ivory/10 text-ivory'
                : 'text-ivory/50 hover:text-ivory hover:bg-ivory/5'
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-warm-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full font-sans text-sm text-ivory/50 hover:text-ivory transition-colors duration-200"
        >
          <LogOut size={16} />
          Esci
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-warm-gray-100 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-soft-black flex-shrink-0 fixed top-0 left-0 h-full z-20">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-soft-black/50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-56 bg-soft-black z-40 lg:hidden"
            >
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 lg:ml-56">
        {/* Top bar (mobile) */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 bg-white border-b border-sand">
          <button onClick={() => setSidebarOpen(true)} className="text-warm-gray-600">
            <Menu size={22} />
          </button>
          <span className="font-serif text-lg">Arianna Fazio</span>
          <div className="w-6" />
        </div>

        <main className="p-5 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
