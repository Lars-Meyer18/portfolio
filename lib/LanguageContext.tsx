'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { translations, Lang } from './translations'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: typeof translations['de']
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('de')
  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
