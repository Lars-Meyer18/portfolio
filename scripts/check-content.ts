// Runs before every build (npm "prebuild"). Fails the build when the German and
// English content drift apart or break the writing rules in the briefing.
import { de } from '../content/de'
import { en } from '../content/en'
import { colors, contrastPairs } from '../design/tokens'

type Json = unknown
const errors: string[] = []
const warnings: string[] = []

// ---------------------------------------------------------------- structure
function compare(a: Json, b: Json, path: string) {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      errors.push(`${path}: array in one language only`)
      return
    }
    if (a.length !== b.length) errors.push(`${path}: ${a.length} items in DE, ${b.length} in EN`)
    a.forEach((item, i) => b[i] !== undefined && compare(item, b[i], `${path}[${i}]`))
    return
  }
  if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object') {
      errors.push(`${path}: object in DE only`)
      return
    }
    const ka = Object.keys(a).sort()
    const kb = Object.keys(b).sort()
    for (const k of ka) if (!kb.includes(k)) errors.push(`${path}.${k}: missing in EN`)
    for (const k of kb) if (!ka.includes(k)) errors.push(`${path}.${k}: missing in DE`)
    for (const k of ka) {
      if (!kb.includes(k)) continue
      const va = (a as Record<string, Json>)[k]
      const vb = (b as Record<string, Json>)[k]
      const languageNeutral = ['id', 'featured', 'level', 'decimals', 'image', 'projectId']
      const neutral =
        languageNeutral.includes(k) ||
        (k === 'value' && typeof va === 'number') ||
        (k === 'status' && (va === 'live' || va === 'draft'))
      if (neutral && va !== vb) {
        errors.push(`${path}.${k}: "${String(va)}" in DE vs "${String(vb)}" in EN`)
      }
      compare(va, vb, `${path}.${k}`)
    }
    return
  }
  if (typeof a !== typeof b) errors.push(`${path}: type differs between DE and EN`)
}

// ---------------------------------------------------------------- text rules
const floskeln = [
  'nahtlos',
  'massgeschneidert',
  'leidenschaft für',
  'schnelllebig',
  'seamless',
  'leverage',
  'passionate about',
  'drive impact',
  'cutting-edge',
  'synergie',
]

function checkText(text: string, path: string, lang: 'de' | 'en', draft: boolean) {
  if (text.includes('—')) errors.push(`${path}: em dash "—"`)
  for (const m of text.matchAll(/–/g)) {
    const before = text.slice(0, m.index).trimEnd().slice(-1)
    const after = text.slice((m.index ?? 0) + 1).trimStart().charAt(0)
    if (!/\d/.test(before) || !/\d/.test(after)) {
      errors.push(`${path}: en dash outside a number range in "${text.slice(0, 60)}…"`)
    }
  }
  if (/\s-\s/.test(text)) errors.push(`${path}: hyphen used as a dash`)
  if (lang === 'de' && text.includes('ß')) errors.push(`${path}: "ß" in Swiss German text`)
  if (text.includes(';')) errors.push(`${path}: semicolon`)
  if (/:\s/.test(text)) errors.push(`${path}: colon introducing a statement`)
  for (const f of floskeln) {
    if (text.toLowerCase().includes(f)) errors.push(`${path}: phrase "${f}"`)
  }
  if (!draft && text.includes('[LARS:')) errors.push(`${path}: open [LARS: …] in live content`)
  for (const sentence of text.split(/(?<=[.!?])\s+/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length
    if (words >= 30) warnings.push(`${path}: sentence with ${words} words`)
  }
}

function walk(node: Json, path: string, lang: 'de' | 'en', draft = false) {
  if (typeof node === 'string') return checkText(node, path, lang, draft)
  if (Array.isArray(node)) return node.forEach((n, i) => walk(n, `${path}[${i}]`, lang, draft))
  if (node && typeof node === 'object') {
    const isDraft = draft || (node as { status?: string }).status === 'draft'
    for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`, lang, isDraft)
  }
}

// ---------------------------------------------------------------- metadata
function checkMeta(lang: 'de' | 'en', description: string) {
  if (description.length > 155) {
    errors.push(`${lang}.meta.description: ${description.length} characters (max 155)`)
  }
}

// ---------------------------------------------------------------- contrast
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(fg: string, bg: string) {
  const [l1, l2] = [luminance(fg), luminance(bg)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

const contrastReport: string[] = []
for (const [fg, bg] of contrastPairs) {
  const ratio = contrast(colors[fg], colors[bg])
  contrastReport.push(`${fg} on ${bg}: ${ratio.toFixed(2)}:1`)
  if (ratio < 4.5) errors.push(`contrast ${fg} on ${bg} is ${ratio.toFixed(2)}:1 (needs 4.5:1)`)
}

// ---------------------------------------------------------------- run
compare(de, en, 'content')
walk(de, 'de', 'de')
walk(en, 'en', 'en')
checkMeta('de', de.meta.description)
checkMeta('en', en.meta.description)

if (process.argv.includes('--verbose')) console.log(contrastReport.join('\n'))
for (const w of warnings) console.warn(`warn  ${w}`)
if (errors.length) {
  for (const e of errors) console.error(`error ${e}`)
  console.error(`\ncheck-content failed with ${errors.length} error(s).`)
  process.exit(1)
}
console.log(`check-content passed (${warnings.length} warning(s)).`)
