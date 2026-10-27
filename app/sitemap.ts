import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/content/flags'

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { de: `${SITE_URL}/de`, en: `${SITE_URL}/en` }
  return (['de', 'en'] as const).map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === 'de' ? 1 : 0.9,
    alternates: { languages },
  }))
}
