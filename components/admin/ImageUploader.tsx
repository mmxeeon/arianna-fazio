'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, Camera } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
  bucket?: string
  folder?: string
}

export function ImageUploader({
  value,
  onChange,
  label = 'Immagine principale',
  bucket = 'artworks',
  folder = 'main',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const upload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return

    setUploading(true)
    try {
      const supabase = createClient()
      const ext = file.name.split('.').pop()
      const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { data, error } = await supabase.storage.from(bucket).upload(filename, file, {
        cacheControl: '3600',
        upsert: false,
      })

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(data.path)
      onChange(publicUrl)
    } catch (err) {
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }, [bucket, folder, onChange])

  const handleFiles = (files: FileList | null) => {
    if (files?.[0]) upload(files[0])
  }

  return (
    <div>
      {label && <p className="label-caps mb-3">{label}</p>}

      {value ? (
        <div className="relative group">
          <div className="relative w-full aspect-[3/4] max-w-xs overflow-hidden bg-rose-100 rounded-sm">
            <Image src={value} alt="Preview" fill className="object-cover" sizes="320px" />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex-1 px-4 py-3 border border-rose-200 text-wine font-sans text-xs tracking-widest uppercase rounded-sm hover:bg-rose-50 transition-colors min-h-[44px]"
            >
              Cambia
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="w-12 h-12 border border-rose-200 text-red-500 flex items-center justify-center rounded-sm hover:bg-red-50 transition-colors"
              aria-label="Rimuovi"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'w-full aspect-[3/4] max-w-xs border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 rounded-sm',
            dragOver ? 'border-wine bg-wine/5' : 'border-rose-200 hover:border-wine bg-rose-50/30'
          )}
        >
          {uploading ? (
            <>
              <Loader2 size={28} className="animate-spin text-wine" />
              <p className="font-sans text-xs text-ink-light">Caricamento...</p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center">
                <Camera size={22} className="text-wine" strokeWidth={1.5} />
              </div>
              <p className="font-sans text-sm text-wine text-center px-4 leading-relaxed">
                <span className="underline underline-offset-2">Tocca per caricare</span>
                <span className="hidden sm:inline"><br />o trascina l'immagine</span>
              </p>
              <p className="font-sans text-[10px] text-ink-light">JPG, PNG, WEBP</p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
