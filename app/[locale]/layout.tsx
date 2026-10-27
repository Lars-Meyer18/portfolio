import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import '../globals.css'
import { serif, serifItalic, sans } from '../fonts'
import { getContent, isLocale, locales } from '@/content'
import { SITE_URL } from '@/content/flags'
import MotionProvider from '@/components/MotionProvider'

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: '#FAF8F5',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { meta } = getContent(locale)
  const other = locales.find((l) => l !== locale)!

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    authors: [{ name: 'Lars Meyer' }],
    alternates: {
      canonical: `/${locale}`,
      languages: { de: '/de', en: '/en', 'x-default': '/' },
    },
    openGraph: {
      type: 'profile',
      firstName: 'Lars',
      lastName: 'Meyer',
      siteName: 'Lars Meyer',
      title: meta.title,
      description: meta.description,
      url: `/${locale}`,
      locale: meta.ogLocale,
      alternateLocale: [getContent(other).meta.ogLocale],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html
      lang={locale}
      className={`${serif.variable} ${serifItalic.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
