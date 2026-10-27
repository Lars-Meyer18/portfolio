export const locales = ['de', 'en'] as const
export type Locale = (typeof locales)[number]

export interface Meta {
  title: string
  description: string
  ogLocale: string
  ogAlt: string
}

export interface UiStrings {
  mainNav: string
  skipToContent: string
  menuOpen: string
  menuClose: string
  languageLabel: string
  switchToLanguage: string
  details: string
  hideDetails: string
  close: string
}

export interface Nav {
  about: string
  experience: string
  projects: string
  education: string
  skills: string
}

export interface Hero {
  eyebrow: string
  hook: string
  subtitle: string
  status: string
  scroll: string
  portraitAlt: string
}

export type ChapterImage = 'craft' | 'switch' | 'portrait' | 'studies'

export interface Chapter {
  id: string
  year: string
  period: string
  title: string
  text: string
  image: ChapterImage
  imageAlt: string
}

export interface About {
  eyebrow: string
  title: string
  lead: string
  chapters: Chapter[]
  closing: string
  next: string
}

export interface ExperienceEntry {
  id: string
  title: string
  company: string
  location: string
  period: string
  summary: string
  details: string[]
}

export interface ExperienceGroup {
  id: string
  title: string
  entries: ExperienceEntry[]
}

export interface Experience {
  eyebrow: string
  title: string
  lead: string
  groups: ExperienceGroup[]
  next: string
}

export interface Project {
  id: string
  status: 'live' | 'draft'
  featured?: boolean
  eyebrow: string
  title: string
  client?: { named: string; anonymized: string }
  role?: string
  summary: string
  situation?: string
  contribution?: string
  approach?: string
  result?: string
  text?: string
  tags: string[]
}

export interface Projects {
  eyebrow: string
  title: string
  lead: string
  labels: {
    client: string
    role: string
    situation: string
    contribution: string
    approach: string
    result: string
    more: string
  }
  items: Project[]
  outlook: string
  next: string
}

export interface Highlight {
  id: string
  value: number
  decimals: number
  suffix: string
  label: string
}

export interface EducationEntry {
  id: string
  title: string
  institution: string
  period: string
  text: string
  modulesLabel?: string
  modules?: string[]
  focusLabel?: string
  focus?: string[]
}

export interface Education {
  eyebrow: string
  title: string
  lead: string
  highlights: Highlight[]
  entries: EducationEntry[]
  next: string
}

export interface SkillItem {
  label: string
  // 1 basic, 2 proficient, 3 advanced, 4 native
  level?: 1 | 2 | 3 | 4
  levelText?: string
}

export interface SkillGroup {
  id: string
  title: string
  items: SkillItem[]
}

export interface Skills {
  eyebrow: string
  title: string
  lead: string
  levelScale: string
  groups: SkillGroup[]
  next: string
}

export interface Beyond {
  eyebrow: string
  title: string
  lead: string
  role: string
  organisation: string
  period: string
  text: string
  interestsLabel: string
  interests: string
}

export interface Testimonial {
  id: string
  // Optional link to a project id whose client disclosure decides the source line
  projectId?: string
  quote: string
  source: string
  sourceNamed?: string
}

export interface References {
  eyebrow: string
  title: string
  lead: string
  items: Testimonial[]
}

export interface Closing {
  sentence: string
  button: string
  footer: string
}

export interface SiteContent {
  meta: Meta
  ui: UiStrings
  nav: Nav
  hero: Hero
  about: About
  experience: Experience
  projects: Projects
  education: Education
  skills: Skills
  beyond: Beyond
  references: References
  closing: Closing
}
