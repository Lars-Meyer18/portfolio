import { de } from './de'
import { en } from './en'
import { flags } from './flags'
import { media, type MediaAsset } from './media'
import {
  locales,
  type ImageRef,
  type Locale,
  type Project,
  type SiteContent,
  type Testimonial,
} from './schema'

const dictionaries: Record<Locale, SiteContent> = { de, en }

export { locales, type Locale }

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale]
}

export type ResolvedImage = MediaAsset & { id: string; alt: string }

// Looks up picture data and drops photos of people unless they are approved
// for publishing or explicitly enabled for a local preview.
export function resolveImages(refs: ImageRef[] = []): ResolvedImage[] {
  return refs
    .map((ref) => ({ ...media[ref.id], id: ref.id, alt: ref.alt }))
    .filter((img) => {
      if (img.kind !== 'photo' || !('people' in img) || !img.people) return true
      return flags.peoplePhotosApproved || flags.showPeoplePhotosLocally
    })
}

export type ResolvedProject = Omit<Project, 'images'> & {
  slug: string
  clientDisplay?: string
  images: ResolvedImage[]
}

// Applies the draft, client-disclosure and photo flags on the server, so
// client components never need to read flags or environment variables.
export function resolveProjects(items: Project[]): ResolvedProject[] {
  return items
    .filter((p) => p.status === 'live' || flags.showDraftProjects)
    .map((p) => ({
      ...p,
      slug: p.id.replace(/^proj-/, ''),
      clientDisplay: clientName(p),
      images: resolveImages(p.images),
    }))
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
