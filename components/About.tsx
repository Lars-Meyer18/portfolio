'use client'

import { useLanguage } from '@/lib/LanguageContext'
import AnimatedSection from './AnimatedSection'
import { motion } from 'framer-motion'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left column: heading */}
          <div className="lg:col-span-4">
            <AnimatedSection delay={0}>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-6 gold-line">
                {t.about.label}
              </p>
              <h2
                className="font-serif font-light text-ink leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                {t.about.title.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>
            </AnimatedSection>

            {/* Tags */}
            <AnimatedSection delay={0.2} className="mt-12 flex flex-wrap gap-3">
              {[t.about.tag1, t.about.tag2, t.about.tag3].map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-xs tracking-wider px-4 py-2 border border-gold/40 text-gold-dark"
                >
                  {tag}
                </span>
              ))}
            </AnimatedSection>
          </div>

          {/* Right column: text */}
          <div className="lg:col-span-8 space-y-8">
            {[t.about.p1, t.about.p2, t.about.p3].map((para, i) => (
              <AnimatedSection key={i} delay={0.1 + i * 0.1}>
                <p className="font-sans font-light text-ink-light leading-relaxed" style={{ fontSize: '1.0625rem' }}>
                  {para}
                </p>
              </AnimatedSection>
            ))}

            {/* Decorative quote line */}
            <AnimatedSection delay={0.4}>
              <div className="mt-12 pl-6 border-l-2 border-gold">
                <p className="font-serif italic text-xl font-light text-muted leading-relaxed">
                  {t.about.label === 'Über mich'
                    ? '«Diese Webseite habe ich selbst gebaut – das zeigt, wer ich bin.»'
                    : '"I built this website myself — that says something about who I am."'}
                </p>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  )
}
