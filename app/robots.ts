import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/content/flags'

export default function robots(): MetadataRoute.Robots {
  // Preview deployments should not be indexed.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
