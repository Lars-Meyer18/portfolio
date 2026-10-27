import type { Metadata } from 'next'
import './globals.css'
import { serif, sans } from './fonts'

export const metadata: Metadata = {
  title: '404 · Lars Meyer',
}

export default function GlobalNotFound() {
  return (
    <html lang="de" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <main className="min-h-[100svh] flex items-center justify-center px-6 text-center">
          <div>
            <p className="font-serif text-8xl text-gold">404</p>
            <p className="mt-4 text-ink-muted">
              Diese Seite gibt es nicht. <span lang="en">This page does not exist.</span>
            </p>
            <p className="mt-8 flex justify-center gap-6 eyebrow">
              <a href="/de" className="link-underline">Zur Startseite</a>
              <a href="/en" lang="en" className="link-underline">Back home</a>
            </p>
          </div>
        </main>
      </body>
    </html>
  )
}
