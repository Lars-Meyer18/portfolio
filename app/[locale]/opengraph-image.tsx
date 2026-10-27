import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getContent, isLocale } from '@/content'
import { colors } from '@/design/tokens'

export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

export function generateImageMetadata({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : 'de'
  return [{ id: 'og', alt: getContent(locale).meta.ogAlt, size, contentType }]
}

const fontDir = join(process.cwd(), 'node_modules', '@fontsource')

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : 'de'
  const { hero } = getContent(locale)

  const [serif, sans, portrait] = await Promise.all([
    readFile(join(fontDir, 'cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff')),
    readFile(join(fontDir, 'dm-sans/files/dm-sans-latin-500-normal.woff')),
    readFile(join(process.cwd(), 'public/images/portrait.jpg')),
  ])
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: colors.cream,
          fontFamily: 'DM Sans',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 72px',
          }}
        >
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: colors['gold-text'],
            }}
          >
            {hero.eyebrow}
          </div>
          <div
            style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: 112,
              lineHeight: 1,
              color: colors.ink,
              marginTop: 28,
            }}
          >
            Lars Meyer
          </div>
          <div style={{ width: 96, height: 2, background: colors.gold, marginTop: 36 }} />
          <div
            style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: 44,
              lineHeight: 1.2,
              color: colors['ink-muted'],
              marginTop: 32,
              maxWidth: 640,
            }}
          >
            {hero.hook}
          </div>
        </div>
        <div style={{ width: 400, height: '100%', display: 'flex', position: 'relative' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portraitSrc}
            alt=""
            width={400}
            height={630}
            style={{ width: 400, height: 630, objectFit: 'cover', objectPosition: 'top' }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              background: colors.gold,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Cormorant Garamond', data: serif, weight: 500, style: 'normal' },
        { name: 'DM Sans', data: sans, weight: 500, style: 'normal' },
      ],
    },
  )
}
