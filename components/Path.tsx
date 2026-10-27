'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll } from 'framer-motion'
import type { About, ChapterImage } from '@/content/schema'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import NextLink from './ui/NextLink'

const images: Record<ChapterImage, string> = {
  craft: '/images/path-craft.jpg',
  switch: '/images/path-switch.jpg',
  portrait: '/images/portrait.jpg',
  studies: '/images/path-studies.jpg',
}

// "Mein Weg": the year and picture stay pinned on the left while the four
// chapters scroll past on the right. On mobile the chapters simply stack.
export default function Path({ about }: { about: About }) {
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start center', 'end center'] })

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>('[data-chapter]')
    if (!items) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.chapter))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const activeImage = about.chapters[active].image
  const uniqueImages = Array.from(new Set(about.chapters.map((c) => c.image)))

  return (
    <section id="about" aria-labelledby="about-title" className="section bg-sand">
      <div className="container-page">
        <SectionHeader id="about-title" eyebrow={about.eyebrow} title={about.title} lead={about.lead} />

        <div className="mt-16 grid gap-x-16 lg:mt-24 lg:grid-cols-12">
          {/* Pinned year and picture, desktop only */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-h)+2.5rem)]">
              {/* Odometer: the old year slides out while the new one slides in. */}
              <div aria-hidden className="relative h-[7.5rem] overflow-hidden">
                {about.chapters.map((c, i) => (
                  <span
                    key={c.id}
                    className={`absolute inset-0 font-serif text-[7.5rem] leading-none transition-[transform,opacity] duration-700 ease-out ${
                      i === active ? 'translate-y-0 opacity-100' : i < active ? '-translate-y-full opacity-0' : 'translate-y-full opacity-0'
                    }`}
                  >
                    {c.year}
                  </span>
                ))}
              </div>
              <div className="relative mt-8 aspect-[4/5] max-h-[calc(100vh-var(--header-h)-14rem)] overflow-hidden bg-cream">
                {uniqueImages.map((key) => {
                  const chapter = about.chapters.find((c) => c.image === key)!
                  const shown = key === activeImage
                  return (
                    <div
                      key={key}
                      aria-hidden={!shown}
                      className={`absolute inset-0 transition-opacity duration-700 ease-out ${shown ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <Image
                        src={images[key]}
                        alt={shown ? chapter.imageAlt : ''}
                        fill
                        sizes="(min-width: 1280px) 30rem, 36vw"
                        className={`object-cover ${key === 'portrait' ? 'object-top' : 'object-center'}`}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <ol ref={listRef} className="relative lg:col-span-7">
            <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-gold/30" />
            <motion.span
              aria-hidden
              style={{ scaleY: reduce ? 1 : scrollYProgress }}
              className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gold"
            />
            {about.chapters.map((c, i) => (
              <li
                key={c.id}
                data-chapter={i}
                className="relative py-10 pl-8 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:pl-14"
              >
                <span
                  aria-hidden
                  className={`absolute -left-[5px] top-[3.15rem] h-[11px] w-[11px] rounded-full border border-gold transition-colors duration-500 lg:top-1/2 lg:-translate-y-1/2 ${
                    i <= active ? 'bg-gold' : 'bg-sand'
                  }`}
                />
                <Reveal>
                  {c.image !== 'portrait' && (
                    <div className="relative mb-8 aspect-[4/3] overflow-hidden lg:hidden">
                      <Image
                        src={images[c.image]}
                        alt={c.imageAlt}
                        fill
                        sizes="(min-width: 768px) 42rem, 92vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="eyebrow">{c.period}</p>
                  <h3 className="mt-3 text-[clamp(1.875rem,3.2vw,2.75rem)]">{c.title}</h3>
                  <p className="mt-5 max-w-measure text-ink-muted">{c.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal>
          <p className="mt-20 max-w-[42ch] border-l-2 border-gold pl-6 font-serif text-[clamp(1.5rem,2.6vw,2.125rem)] italic leading-snug">
            {about.closing}
          </p>
        </Reveal>

        <NextLink href="#experience" label={about.next} />
      </div>
    </section>
  )
}
