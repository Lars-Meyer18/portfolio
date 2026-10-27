import { NextResponse, type NextRequest } from 'next/server'

const supported = ['de', 'en'] as const
const fallback = 'de'

// Picks the best supported language from an Accept-Language header,
// e.g. "en-GB,en;q=0.9,de;q=0.8" -> "en".
function pickLocale(header: string | null): string {
  if (!header) return fallback
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)
  return ranked.find((r) => (supported as readonly string[]).includes(r.lang))?.lang ?? fallback
}

export function proxy(request: NextRequest) {
  const locale = pickLocale(request.headers.get('accept-language'))
  const response = NextResponse.redirect(new URL(`/${locale}`, request.url))
  response.headers.set('Vary', 'Accept-Language')
  return response
}

export const config = {
  matcher: '/',
}
