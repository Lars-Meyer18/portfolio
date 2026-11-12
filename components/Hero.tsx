'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { Hero as HeroContent } from '@/content/schema'

interface Props {
  hero: HeroContent
  showStatus: boolean
}

const delay = (s: number) => ({ animationDelay: `${s}s` })

export default function Hero({ hero, showStatus }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section id="top" ref={ref} aria-label="Lars Meyer" className="relative bg-cream">
      <div className="container-page grid min-h-[100svh] items-center gap-x-12 gap-y-10 pb-16 pt-[calc(var(--header-h)+2rem)] lg:grid-cols-12 lg:pb-12">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <p className="eyebrow hero-fade" style={delay(0.1)}>
            {hero.eyebrow}
          </p>

          <h1 className="mt-4 text-[clamp(3.75rem,min(8.5vw,14vh),7.5rem)] leading-[0.92] tracking-[-0.03em]">
            {['Lars', 'Meyer'].map((word, i) => (
              <span key={word} className="block pb-[0.06em]">
                <span className="hero-word" style={delay(i * 0.12)}>
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="hero-fade mt-7 max-w-[24ch] font-serif text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.15] tracking-[-0.015em]"
            style={delay(0.5)}
          >
            {hero.hook}
          </p>

          <p className="hero-fade mt-5 max-w-[56ch] text-ink-muted" style={delay(0.62)}>
            {hero.subtitle}
          </p>

          {showStatus && (
            <p
              className="hero-fade mt-8 inline-flex items-center gap-2.5 rounded-full bg-sand py-2 pl-3 pr-4 text-sm text-ink-muted"
              style={delay(0.78)}
            >
              <span aria-hidden className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-gold" />
              </span>
              {hero.status}
            </p>
          )}
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-[22rem] lg:ml-auto lg:max-w-[min(100%,calc((100svh-var(--header-h)-6rem)*0.8))]">
            <m.div style={reduce ? undefined : { y: photoY }}>
              <div
                className="hero-photo relative aspect-[4/5] overflow-hidden rounded-tile bg-sand shadow-[0_40px_80px_-40px_rgba(10,10,10,0.45)]"
                style={delay(0.15)}
              >
                <Image
                  src="/images/hero-2026.jpg"
                  alt={hero.portraitAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 22rem, 17rem"
                  // The photo has a lot of headroom; this keeps the face in the upper third.
                  className="object-cover object-[center_62%]"
                />
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  )
}
