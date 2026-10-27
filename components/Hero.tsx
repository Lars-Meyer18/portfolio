'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
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
      <div className="container-page grid min-h-[100svh] items-center gap-x-12 gap-y-12 pb-16 pt-[calc(var(--header-h)+2rem)] lg:grid-cols-12 lg:pb-12">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <p className="eyebrow hero-fade" style={delay(0.1)}>
            {hero.eyebrow}
          </p>

          <h1 className="mt-5 text-[clamp(3.5rem,min(8vw,13vh),7rem)] leading-[0.95] tracking-[-0.02em]">
            {['Lars', 'Meyer'].map((word, i) => (
              <span key={word} className="block overflow-hidden pb-[0.08em]">
                <span className="hero-word" style={delay(0.2 + i * 0.12)}>
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <span aria-hidden className="hero-line mt-5 block h-px w-20 bg-gold" style={delay(0.5)} />

          <p
            className="hero-fade mt-6 max-w-[26ch] font-serif text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.2]"
            style={delay(0.6)}
          >
            {hero.hook}
          </p>

          <p className="hero-fade mt-5 max-w-measure text-ink-muted" style={delay(0.72)}>
            {hero.subtitle}
          </p>

          <div className="hero-fade mt-10 flex flex-wrap items-center gap-x-10 gap-y-4" style={delay(0.9)}>
            {showStatus && (
              <p className="inline-flex items-center gap-3 text-sm text-ink-muted">
                <span aria-hidden className="h-2 w-2 rounded-full bg-gold" />
                {hero.status}
              </p>
            )}
            <a href="#about" className="eyebrow hidden items-center gap-3 lg:inline-flex">
              <span aria-hidden className="scroll-nudge block h-8 w-px bg-gold" />
              {hero.scroll}
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-[22rem] lg:ml-auto lg:max-w-[min(100%,calc((100svh-var(--header-h)-6rem)*0.8))]">
            <motion.div style={reduce ? undefined : { y: photoY }} className="relative">
              <span
                aria-hidden
                className="absolute inset-0 translate-x-3 translate-y-3 border border-gold/60 lg:translate-x-5 lg:translate-y-5"
              />
              <div className="hero-photo relative aspect-[4/5] overflow-hidden bg-sand" style={delay(0.2)}>
                <Image
                  src="/images/portrait.jpg"
                  alt={hero.portraitAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 24rem, 20rem"
                  className="object-cover object-top"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
