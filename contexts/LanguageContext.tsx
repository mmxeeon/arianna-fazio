'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { it, type Translations } from '@/locales/it'
import { en } from '@/locales/en'
import type { Language } from '@/types'

const translations: Record<Language, Translations> = { it, en }

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'it',
  setLanguage: () => {},
  t: it,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('it')

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
