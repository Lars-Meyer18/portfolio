import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lars Meyer – Wirtschaftsingenieur',
  description: 'Persönliche Portfolio-Webseite von Lars Meyer – Wirtschaftsingenieur, Prozessdenker, lösungsorientiert.',
  keywords: ['Lars Meyer', 'Wirtschaftsingenieur', 'FHNW', 'Portfolio', 'Immobilien', 'Prozessoptimierung'],
  authors: [{ name: 'Lars Meyer' }],
  openGraph: {
    title: 'Lars Meyer – Wirtschaftsingenieur',
    description: 'Persönliche Portfolio-Webseite von Lars Meyer',
    type: 'website',
    locale: 'de_CH',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lars Meyer – Wirtschaftsingenieur',
    description: 'Persönliche Portfolio-Webseite von Lars Meyer',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
