'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { m } from 'framer-motion'
import type { Locale, Nav, UiStrings } from '@/content/schema'

const sections = ['about', 'experience', 'projects', 'education', 'skills'] as const
type SectionId = (typeof sections)[number]

// Critically damped: the indicator glides to the new link without overshoot.
const indicatorSpring = { type: 'spring', bounce: 0, duration: 0.4 } as const

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
    const onScroll = () => setScrolled(window.scrollY > 8)
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

  // A segmented control, like the ones in iOS settings.
  const languageSwitch = (
    <div
      role="group"
      aria-label={ui.languageLabel}
      className="flex items-center rounded-full bg-ink/[0.06] p-[3px] text-xs font-semibold"
    >
      {(['de', 'en'] as const).map((l) =>
        l === locale ? (
          <span
            key={l}
            aria-current="true"
            className="rounded-full bg-cream px-2.5 py-1 text-ink shadow-[0_1px_3px_rgba(0,0,0,0.14)] dark:bg-ink/[0.2]"
          >
            {l.toUpperCase()}
          </span>
        ) : (
          <a
            key={l}
            href={`/${l}`}
            hrefLang={l}
            onClick={switchLanguage}
            className="press rounded-full px-2.5 py-1 text-ink-muted hover:text-ink"
          >
            <span lang={l}>{l.toUpperCase()}</span>
            <span className="sr-only">, {ui.switchToLanguage}</span>
          </a>
        ),
      )}
    </div>
  )

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
      >
        {ui.skipToContent}
      </a>
      <header
        data-scrolled={scrolled || open}
        className="scroll-edge material fixed inset-x-0 top-0 z-50"
      >
        <nav
          aria-label={ui.mainNav}
          className="container-page flex h-[var(--header-h)] items-center justify-between"
        >
          <a href="#top" className="press font-serif text-[1.375rem] tracking-[0.12em] text-ink">
            <span aria-hidden>LM</span>
            <span className="sr-only">Lars Meyer</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {sections.map((id) => (
              <li key={id} className="relative">
                {active === id && (
                  <m.span
                    layoutId="nav-indicator"
                    transition={indicatorSpring}
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-ink/[0.06]"
                  />
                )}
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className={`press relative block rounded-full px-3.5 py-1.5 text-[0.8125rem] transition-colors ${
                    active === id ? 'text-ink' : 'text-ink/70 hover:text-ink'
                  }`}
                >
                  {nav[id]}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">{languageSwitch}</div>
            <button
              ref={toggleRef}
              type="button"
              className="press -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? ui.menuClose : ui.menuOpen}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`block h-[1.5px] w-5 rounded-full bg-ink transition-transform duration-300 ${open ? 'translate-y-[3.75px] rotate-45' : ''}`}
              />
              <span
                className={`block h-[1.5px] w-5 rounded-full bg-ink transition-transform duration-300 ${open ? '-translate-y-[3.75px] -rotate-45' : ''}`}
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
        <div className="container-page reveal-in flex min-h-full flex-col justify-between py-10">
          <ul className="space-y-1">
            {sections.map((id, i) => (
              <li key={id}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === id ? 'true' : undefined}
                  className="press block py-2 text-[1.75rem] font-semibold tracking-[-0.02em] text-ink"
                >
                  {nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex">{languageSwitch}</div>
        </div>
      </div>
    </>
  )
}
