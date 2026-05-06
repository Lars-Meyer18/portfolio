'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import AnimatedSection from './AnimatedSection'

export default function Experience() {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState<number | null>(0)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="experience" className="section-padding bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <AnimatedSection>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-6 gold-line">
            {t.experience.label}
          </p>
          <h2
            className="font-serif font-light text-ink mb-20"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            {t.experience.title}
          </h2>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gold/20 hidden md:block" />

          <div className="space-y-0">
            {t.experience.entries.map((entry, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="relative md:pl-12">
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-0 top-6 w-2 h-2 rounded-full border border-gold bg-cream hidden md:block"
                    style={{ transform: 'translateX(-3.5px)' }}
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 + 0.2 }}
                  />

                  {/* Entry card */}
                  <button
                    className="w-full text-left py-8 border-b border-gold/15 group"
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    style={{ cursor: 'none' }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-serif text-xl font-light text-ink group-hover:text-gold transition-colors duration-300">
                            {entry.role}
                          </h3>
                          {i === 0 && (
                            <span className="font-sans text-xs tracking-wider px-2 py-0.5 bg-gold/10 text-gold border border-gold/20">
                              {t.experience.label === 'Berufserfahrung' ? 'Aktuell' : 'Current'}
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-sm text-muted">
                          {entry.company} · {entry.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-sans text-xs tracking-wider text-muted whitespace-nowrap">
                          {entry.period}
                        </span>
                        <motion.span
                          animate={{ rotate: expanded === i ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-gold text-lg leading-none font-light flex-shrink-0"
                        >
                          +
                        </motion.span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expanded === i && (
                        <motion.div
                          initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="font-sans font-light text-ink-light leading-relaxed mt-4 max-w-2xl text-sm">
                            {entry.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
