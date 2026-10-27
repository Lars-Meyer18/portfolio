import { de } from './de'
import { en } from './en'
import { flags } from './flags'
import { locales, type Locale, type Project, type SiteContent, type Testimonial } from './schema'

const dictionaries: Record<Locale, SiteContent> = { de, en }

export { locales, type Locale }

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale]
}

export type ResolvedProject = Project & { slug: string; clientDisplay?: string }

// Applies the draft and client-disclosure flags on the server, so client
// components never need to read flags or environment variables.
export function resolveProjects(items: Project[]): ResolvedProject[] {
  return items
    .filter((p) => p.status === 'live' || flags.showDraftProjects)
    .map((p) => ({ ...p, slug: p.id.replace(/^proj-/, ''), clientDisplay: clientName(p) }))
}

export function clientName(project: Project): string | undefined {
  if (!project.client) return undefined
  return flags.clientDisclosure[project.id] === 'named'
    ? project.client.named
    : project.client.anonymized
}

export function testimonialSource(item: Testimonial): string {
  if (item.projectId && item.sourceNamed && flags.clientDisclosure[item.projectId] === 'named') {
    return item.sourceNamed
  }
  return item.source
}
