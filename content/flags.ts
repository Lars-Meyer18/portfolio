// Language-independent switches. Change a value here, push, done.
export type Disclosure = 'named' | 'anonymized'

export const flags = {
  // Lars approved naming both clients on 27.10.2026.
  clientDisclosure: {
    'proj-p4': 'named',
    'proj-p2': 'named',
  } as Record<string, Disclosure>,
  // Lars confirmed that quoting the reference letter and work certificates is approved.
  showTestimonials: true,
  // Semester line in the hero. Update the text in content/de.ts and content/en.ts each semester.
  showStatus: true,
  // Draft projects only appear in Vercel preview builds and local development.
  showDraftProjects:
    process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development',
}

export const LINKEDIN_URL = 'https://www.linkedin.com/in/lars-meyer-18022002lm/'
export const SITE_URL = 'https://lars-meyer.vercel.app'
