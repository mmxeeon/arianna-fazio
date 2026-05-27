'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2 } from 'lucide-react'
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
          <div className="relative w-full aspect-[3/4] max-w-xs overflow-hidden bg-beige">
            <Image src={value} alt="Preview" fill className="object-cover" sizes="320px" />
            <div className="absolute inset-0 bg-soft-black/0 group-hover:bg-soft-black/30 transition-colors duration-200 flex items-center justify-center">
              <button
                type="button"
                onClick={() => onChange('')}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-ivory rounded-full p-2 shadow"
              >
                <X size={16} className="text-soft-black" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'w-full aspect-[3/4] max-w-xs border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200',
            dragOver ? 'border-gold bg-gold/5' : 'border-sand hover:border-warm-gray-400 bg-beige/30'
          )}
        >
          {uploading ? (
            <Loader2 size={24} className="animate-spin text-warm-gray-400" />
          ) : (
            <>
              <Upload size={22} className="text-warm-gray-400" />
              <p className="font-sans text-xs text-warm-gray-500 text-center px-4 leading-relaxed">
                Trascina qui l'immagine<br />o <span className="underline">clicca per selezionarla</span>
              </p>
              <p className="font-sans text-[10px] text-warm-gray-300">JPG, PNG, WEBP — max 10 MB</p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
