// Single source for colour tokens. tailwind.config.ts turns each palette into
// CSS variables (light by default, dark under prefers-color-scheme), and
// scripts/check-content.ts checks contrast for both.
const light = {
  cream: '#FAF8F5', // page background
  sand: '#F2EDE6', // secondary surface, tiles
  ink: '#0A0A0A', // primary text
  'ink-muted': '#4A4744', // secondary text
  gold: '#C9A96E', // lines, dots, accents (never small text)
  // Briefing suggested #8A6A3B (4.7:1 on cream), but that drops to 4.3:1 on
  // sand. This slightly darker value passes AA on both.
  'gold-text': '#7D5F33',
  feature: '#0A0A0A', // the one dark surface (featured project)
  'on-feature': '#FAF8F5',
}

// Warm near-blacks instead of pure black, so the palette keeps its character.
const dark: typeof light = {
  cream: '#100F0E',
  sand: '#1D1B19',
  ink: '#F3EFE9',
  'ink-muted': '#B3ACA3',
  gold: '#C9A96E',
  'gold-text': '#D2B27A',
  feature: '#1F1C19',
  'on-feature': '#F3EFE9',
}

export const palettes = { light, dark }
export type ColorToken = keyof typeof light

// Fixed light values, for places without CSS such as the OG image.
export const colors = light

// Pairs of [text, background] that small text uses on the page.
export const contrastPairs: Array<[ColorToken, ColorToken]> = [
  ['ink', 'cream'],
  ['ink', 'sand'],
  ['ink-muted', 'cream'],
  ['ink-muted', 'sand'],
  ['gold-text', 'cream'],
  ['gold-text', 'sand'],
  ['on-feature', 'feature'],
  ['gold', 'feature'],
]

// "#C9A96E" -> "201 169 110", the format Tailwind's <alpha-value> needs.
export function toChannels(hex: string) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(' ')
}
