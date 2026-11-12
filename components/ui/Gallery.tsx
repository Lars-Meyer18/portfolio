'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { ResolvedImage } from '@/content'
import type { UiStrings } from '@/content/schema'
import Media from './Media'

const INTERVAL_MS = 5000

interface Props {
  images: ResolvedImage[]
  ui: UiStrings
  sizes: string
  // Frame for every slide, e.g. 'aspect-[3/2] lg:aspect-[16/9]'
  aspect: string
  rounded?: string
}

const fill = (template: string, n: number, total: number) =>
  template.replace('{n}', String(n)).replace('{total}', String(total))

// One picture at a time. Swiping uses native scroll snapping, so it carries
// the platform's own momentum. Dots and arrow keys jump directly. It advances
// every five seconds, pauses while hovered, focused or off screen, stops for
// good once the reader takes over, and never autoplays with reduced motion.
export default function Gallery({ images, ui, sizes, aspect, rounded = 'rounded-card' }: Props) {
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [held, setHeld] = useState(false)
  const [visible, setVisible] = useState(false)
  const total = images.length

  // The showing slide follows the scroll position, whoever moved it.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setActive(Math.round(track.scrollLeft / track.clientWidth)))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.5 })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      track.scrollTo({ left: index * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
    },
    [reduce],
  )

  const autoplay = playing && !held && visible && !reduce && total > 1

  // One timer per slide, so every picture gets the full five seconds.
  useEffect(() => {
    if (!autoplay) return
    const timer = window.setTimeout(() => goTo((active + 1) % total), INTERVAL_MS)
    return () => window.clearTimeout(timer)
  }, [autoplay, active, total, goTo])

  const takeOver = () => setPlaying(false)

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    takeOver()
    goTo(Math.min(total - 1, Math.max(0, active + (e.key === 'ArrowRight' ? 1 : -1))))
  }

  if (total === 0) return null
  if (total === 1) {
    return <Media image={images[0]} sizes={sizes} quality={85} className={`${aspect} ${rounded}`} />
  }

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={ui.galleryLabel}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false)
      }}
    >
      <div
        ref={trackRef}
        tabIndex={0}
        aria-live={autoplay ? 'off' : 'polite'}
        onPointerDown={takeOver}
        onWheel={(e) => Math.abs(e.deltaX) > Math.abs(e.deltaY) && takeOver()}
        onKeyDown={onKeyDown}
        className={`scrollbar-none flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain ${rounded}`}
      >
        {images.map((img, i) => (
          <div
            key={img.id}
            role="group"
            aria-roledescription="slide"
            aria-label={fill(ui.gallerySlide, i + 1, total)}
            className="w-full shrink-0 snap-center snap-always"
          >
            <Media image={img} sizes={sizes} quality={85} className={aspect} />
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-1">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            aria-label={fill(ui.galleryShow, i + 1, total)}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => {
              takeOver()
              goTo(i)
            }}
            className="press flex h-6 items-center justify-center px-1"
          >
            {/* The active dot stretches into a bar that fills while autoplay runs. */}
            <span
              className={`relative block h-[7px] overflow-hidden rounded-full transition-[width] duration-300 ease-out ${
                i === active ? 'w-6' : 'w-[7px]'
              }`}
            >
              <span className="absolute inset-0 bg-current opacity-25" />
              {i === active && (
                <span
                  key={`${active}-${autoplay}`}
                  className={`absolute inset-0 origin-left bg-current opacity-75 ${autoplay ? 'gallery-progress' : ''}`}
                />
              )}
            </span>
          </button>
        ))}
        {!reduce && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? ui.galleryPause : ui.galleryPlay}
            className="press ml-1 flex h-6 w-6 items-center justify-center rounded-full opacity-70 hover:opacity-100"
          >
            {playing ? (
              <svg aria-hidden width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <rect x="1.5" y="1" width="2.5" height="8" rx="0.8" />
                <rect x="6" y="1" width="2.5" height="8" rx="0.8" />
              </svg>
            ) : (
              <svg aria-hidden width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <path d="M2.5 1.2v7.6a.6.6 0 0 0 .9.5l6-3.8a.6.6 0 0 0 0-1L3.4.7a.6.6 0 0 0-.9.5Z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
