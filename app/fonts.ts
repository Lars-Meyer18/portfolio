import { Cormorant_Garamond } from 'next/font/google'

// Display serif for headlines. Body and UI text use the platform's system
// font (SF Pro on Apple devices, Segoe UI on Windows), see globals.css.
export const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-cormorant',
  display: 'swap',
})

// Only used below the fold (quotes), so it is not preloaded.
export const serifItalic = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-cormorant-italic',
  display: 'swap',
  preload: false,
})
