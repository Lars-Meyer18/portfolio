// Single source for colour tokens. Used by tailwind.config.ts and checked
// for contrast by scripts/check-content.ts.
export const colors = {
  cream: '#FAF8F5',
  sand: '#F2EDE6',
  ink: '#0A0A0A',
  'ink-muted': '#4A4744',
  gold: '#C9A96E',
  // Briefing suggested #8A6A3B (4.7:1 on cream), but that drops to 4.3:1 on
  // sand. This slightly darker value passes AA on both.
  'gold-text': '#7D5F33',
} as const

// Pairs of [text, background] that small text uses on the page.
export const contrastPairs: Array<[keyof typeof colors, keyof typeof colors]> = [
  ['ink', 'cream'],
  ['ink', 'sand'],
  ['ink-muted', 'cream'],
  ['ink-muted', 'sand'],
  ['gold-text', 'cream'],
  ['gold-text', 'sand'],
  ['cream', 'ink'],
  ['gold', 'ink'],
]
