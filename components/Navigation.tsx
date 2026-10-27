'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { Locale, Nav, UiStrings } from '@/content/schema'

const sections = ['about', 'experience', 'projects', 'education', 'skills'] as const
type SectionId = (typeof sections)[number]

interface Props {
  locale: Locale
  nav: Nav
  ui: UiStrings
}

export default function Navigation({ locale, nav, ui }: Props) {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<SectionId | null>(null)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const other: Locale = locale === 'de' ? 'en' : 'de'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollspy: the section crossing the middle of the viewport is active.
  useEffect(() => {
    const visible = new Map<string, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting)
        setActive(sections.find((id) => visible.get(id)) ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  // Mobile menu: lock scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Keep the reader at the same section when switching language.
  const switchLanguage = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    const hash = window.location.hash.startsWith('#project-')
      ? window.location.hash
      : active
        ? `#${active}`
        : ''
    setOpen(false)
    router.push(`/${other}${hash}`, { scroll: false })
  }

  const languageSwitch = (
    <div
      role="group"
      aria-label={ui.languageLabel}
      className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em]"
    >
      {(['de', 'en'] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden className="text-gold">
              |
            </span>
          )}
          {l === locale ? (
            <span aria-current="true" className="text-ink">
              {l.toUpperCase()}
            </span>
          ) : (
            <a
              href={`/${l}`}
              hrefLang={l}
              lang={l}
              onClick={switchLanguage}
              aria-label={ui.switchToLanguage}
              className="text-ink-muted transition-colors hover:text-ink"
            >
              {l.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </div>
  )

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
      >
        {ui.skipToContent}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open
            ? 'border-ink/5 bg-cream/90 backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label={ui.mainNav}
          className="container-page flex h-[var(--header-h)] items-center justify-between"
        >
          <a
            href="#top"
            className="font-serif text-2xl tracking-[0.15em] text-ink transition-colors hover:text-gold-text"
            aria-label="Lars Meyer"
          >
            LM
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {sections.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className={`link-underline py-1 text-xs font-medium uppercase tracking-[0.18em] transition-colors hover:text-ink ${
                    active === id ? 'text-ink' : 'text-ink-muted'
                  }`}
                >
                  {nav[id]}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <div className="hidden md:block">{languageSwitch}</div>
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? ui.menuClose : ui.menuOpen}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
              />
              <span
                className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-cream pt-[var(--header-h)] md:hidden"
      >
        <div className="container-page reveal-in flex min-h-full flex-col justify-between py-12">
          <ul className="space-y-6">
            {sections.map((id, i) => (
              <li key={id}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === id ? 'true' : undefined}
                  className="font-serif text-4xl text-ink"
                >
                  {nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-12 border-t border-gold/40 pt-6">{languageSwitch}</div>
        </div>
      </div>
    </>
  )
}
