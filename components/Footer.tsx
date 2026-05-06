'use client'

import { useLanguage } from '@/lib/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-ink py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-serif text-sm font-light text-white/40 tracking-wider">
          {t.footer.copy}
        </span>

        <div className="w-20 h-px bg-gold/20" />

        <a
          href="https://www.linkedin.com/in/lars-meyer-18022002lm/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-xs tracking-[0.2em] uppercase text-white/30 hover:text-gold transition-colors duration-300"
          style={{ cursor: 'none' }}
        >
          {t.footer.linkedin}
        </a>
      </div>
    </footer>
  )
}
