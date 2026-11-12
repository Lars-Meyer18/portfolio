'use client'

import { useEffect, useState, type ReactNode } from 'react'
import type { UiStrings } from '@/content/schema'
import { palettes } from '@/design/tokens'

type Theme = 'light' | 'dark'

function resolvedTheme(): Theme {
  const chosen = document.documentElement.dataset.theme
  if (chosen === 'light' || chosen === 'dark') return chosen
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Browser chrome (Safari's toolbar, Android's status bar) follows the choice.
function syncThemeColor(theme: Theme) {
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute('content', palettes[theme].cream))
}

// Light/dark segmented control. Until the visitor picks one, the system
// setting applies; a pick is stored and wins on later visits.
export default function ThemeToggle({ ui }: { ui: UiStrings }) {
  // Unknown on the server, so nothing is highlighted until mount.
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(resolvedTheme())
    if (document.documentElement.dataset.theme) syncThemeColor(resolvedTheme())
    const media = matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = () => {
      if (!document.documentElement.dataset.theme) setTheme(resolvedTheme())
    }
    media.addEventListener('change', onSystemChange)
    return () => media.removeEventListener('change', onSystemChange)
  }, [])

  const choose = (next: Theme) => {
    const root = document.documentElement
    // Ease every surface into the new palette instead of snapping.
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('theme-transition')
      window.setTimeout(() => root.classList.remove('theme-transition'), 400)
    }
    root.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Private mode: the choice still applies for this visit.
    }
    setTheme(next)
    syncThemeColor(next)
  }

  const options: Array<{ value: Theme; label: string; icon: ReactNode }> = [
    { value: 'light', label: ui.themeLight, icon: <SunIcon /> },
    { value: 'dark', label: ui.themeDark, icon: <MoonIcon /> },
  ]

  return (
    <div role="group" aria-label={ui.themeLabel} className="flex items-center rounded-full bg-ink/[0.06] p-[3px]">
      {options.map(({ value, label, icon }) => {
        const active = theme === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => choose(value)}
            aria-pressed={theme ? active : undefined}
            title={label}
            className={`press flex h-6 w-8 items-center justify-center rounded-full transition-colors ${
              active
                ? 'bg-cream text-ink shadow-[0_1px_3px_rgba(0,0,0,0.14)] dark:bg-ink/[0.2]'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            {icon}
            <span className="sr-only">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

function SunIcon() {
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 1.5v2.5M12 20v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M1.5 12H4M20 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg aria-hidden width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.7 14.6A9 9 0 0 1 9.4 3.3a.6.6 0 0 0-.8-.7A10 10 0 1 0 21.4 15.4a.6.6 0 0 0-.7-.8Z" />
    </svg>
  )
}
