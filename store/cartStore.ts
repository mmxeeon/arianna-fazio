'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Artwork, CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (artwork: Artwork) => void
  removeItem: (artworkId: string) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (artwork) => {
        const existing = get().items.find((i) => i.artwork.id === artwork.id)
        if (existing) return
        set((state) => ({ items: [...state.items, { artwork, quantity: 1 }] }))
      },

      removeItem: (artworkId) => {
        set((state) => ({
          items: state.items.filter((i) => i.artwork.id !== artworkId),
        }))
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce((sum, item) => sum + (item.artwork.price ?? 0), 0),

      count: () => get().items.length,
    }),
    { name: 'arianna-fazio-cart' }
  )
)
