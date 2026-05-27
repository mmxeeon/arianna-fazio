export type ArtworkStatus = 'available' | 'sold' | 'unavailable'

export interface Artwork {
  id: string
  title: string
  slug: string
  description: string | null
  technique: string | null
  dimensions: string | null
  year: number | null
  price: number | null
  category: string | null
  image_url: string | null
  gallery_images: string[] | null
  status: ArtworkStatus
  featured: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  artwork: Artwork
  quantity: number
}

export interface ContactMessage {
  name: string
  email: string
  phone?: string
  message: string
  artwork_id?: string
}

export interface Profile {
  id: string
  name: string | null
  email: string
  role: 'admin' | 'user'
  created_at: string
}

export interface ArtworkFormData {
  title: string
  description: string
  technique: string
  dimensions: string
  year: number | ''
  price: number | ''
  category: string
  status: ArtworkStatus
  featured: boolean
}

export type Language = 'it' | 'en'
