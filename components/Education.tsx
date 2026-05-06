'use client'

import { useLanguage } from '@/lib/LanguageContext'
import AnimatedSection from './AnimatedSection'
import { motion } from 'framer-motion'

export default function Education() {
  const { t } = useLanguage()

  return (
    <section id="education" className="section-padding bg-ink">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <AnimatedSection>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-6" style={{ borderTop: '1px solid rgba(201,169,110,0.3)', paddingTop: '1.5rem' }}>
            {t.education.label}
          </p>
          <h2
            className="font-serif font-light text-cream mb-20"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            {t.education.title}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.education.entries.map((entry, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ borderColor: 'rgba(201,169,110,0.5)' }}
                transition={{ duration: 0.3 }}
                className="border border-white/10 p-8 flex flex-col h-full"
              >
                {/* Period */}
                <p className="font-sans text-xs tracking-wider text-gold/70 mb-6 uppercase">
                  {entry.period}
                </p>

                {/* Degree */}
                <h3 className="font-serif text-2xl font-light text-cream leading-tight mb-2">
                  {entry.degree}
                </h3>

                {/* Institution */}
                <p className="font-sans text-sm text-white/50 mb-6">
                  {entry.institution} · {entry.location}
                </p>

                {/* Description */}
                <p className="font-sans text-sm font-light text-white/60 leading-relaxed flex-1 mb-6">
                  {entry.description}
                </p>

                {/* Highlight badge */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-1 h-8 bg-gold/60 flex-shrink-0" />
                  <span className="font-sans text-xs tracking-wider text-gold/80 uppercase">
                    {entry.highlight}
                  </span>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  )
}
