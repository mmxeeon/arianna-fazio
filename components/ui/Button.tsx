'use client'

import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-sans tracking-widest uppercase transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-soft-black text-ivory hover:bg-warm-gray-800',
    outline: 'border border-soft-black text-soft-black hover:bg-soft-black hover:text-ivory',
    ghost: 'text-warm-gray-600 hover:text-soft-black',
  }

  const sizes = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-8 py-3.5 text-sm',
    lg: 'px-10 py-4 text-sm',
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="inline-block w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
          <span>{children}</span>
        </>
      ) : children}
    </button>
  )
}
