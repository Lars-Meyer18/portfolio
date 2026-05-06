'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'

const nameWords = ['Lars', 'Meyer']

export default function Hero() {
  const { t } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-cream"
      aria-label="Hero"
    >
      {/* Background grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[80vh]">

          {/* Left: Text */}
          <motion.div
            style={prefersReducedMotion ? {} : { y: textY, opacity }}
            className="order-2 lg:order-1 flex flex-col justify-center"
          >
            {/* Label */}
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-8"
            >
              Portfolio
            </motion.p>

            {/* Name */}
            <h1 className="font-serif font-light leading-none mb-8 overflow-hidden">
              {nameWords.map((word, wi) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={prefersReducedMotion ? {} : { y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: 0.5 + wi * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      fontSize: 'clamp(4rem, 8vw, 8rem)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Gold divider */}
            <motion.div
              initial={prefersReducedMotion ? {} : { scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="h-px bg-gold mb-8 w-20"
            />

            {/* Tagline */}
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="font-sans font-light text-ink-light tracking-wide leading-relaxed max-w-sm"
              style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}
            >
              {t.hero.tagline}
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="mt-20 flex items-center gap-4"
            >
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
              </motion.div>
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-muted">
                {t.hero.scroll}
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            style={prefersReducedMotion ? {} : { y: imageY }}
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative mx-auto lg:ml-auto" style={{ maxWidth: '480px' }}>
              {/* Decorative gold frame offset */}
              <div
                className="absolute -bottom-4 -right-4 border border-gold/30 rounded-sm pointer-events-none z-0"
                style={{ inset: undefined, top: '24px', left: '24px', right: '-16px', bottom: '-16px' }}
              />

              {/* Photo container */}
              <div className="relative z-10 overflow-hidden rounded-sm" style={{ aspectRatio: '3/4' }}>
                <Image
                  src="/profile.jpg"
                  alt="Lars Meyer"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/10 to-transparent pointer-events-none" />
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.7 }}
                className="absolute -left-8 bottom-16 bg-cream border border-gold-light/50 px-6 py-4 shadow-sm z-20"
              >
                <p className="font-serif text-2xl font-light text-gold leading-none">5.00</p>
                <p className="font-sans text-xs text-muted mt-1 tracking-wide">GPA · FHNW</p>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.7 }}
                className="absolute -right-4 top-12 bg-ink px-6 py-4 shadow-sm z-20"
              >
                <p className="font-serif text-2xl font-light text-gold-light leading-none">220+</p>
                <p className="font-sans text-xs text-gold-light/60 mt-1 tracking-wide">Liegenschaften</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
