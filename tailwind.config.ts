import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { palettes, toChannels, type ColorToken } from './design/tokens'

const tokens = Object.keys(palettes.light) as ColorToken[]

// Every colour reads from a CSS variable, so opacity modifiers like
// `bg-ink/10` keep working and the whole palette can switch with the system.
const colors = Object.fromEntries(tokens.map((t) => [t, `rgb(var(--${t}) / <alpha-value>)`]))

const vars = (palette: Record<ColorToken, string>) =>
  Object.fromEntries(tokens.map((t) => [`--${t}`, toChannels(palette[t])]))

const config: Config = {
  // Dark mode follows the system setting unless the visitor picked a theme,
  // which the toggle stores as data-theme on <html>.
  darkMode: [
    'variant',
    [
      '@media (prefers-color-scheme: dark) { &:is(:root:not([data-theme="light"]) *) }',
      '&:is([data-theme="dark"] *)',
    ],
  ],
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        'serif-italic': ['var(--font-cormorant-italic)', 'Georgia', 'serif'],
        sans: ['var(--font-system)'],
      },
      borderRadius: {
        tile: 'var(--radius-tile)',
        card: 'var(--radius-card)',
      },
      maxWidth: {
        measure: '68ch',
        page: '76rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': vars(palettes.light),
        '@media (prefers-color-scheme: dark)': { ':root:not([data-theme="light"])': vars(palettes.dark) },
        ':root[data-theme="dark"]': vars(palettes.dark),
      })
    }),
  ],
}

export default config
