'use client'

import { useLanguage } from '@/lib/LanguageContext'
import AnimatedSection from './AnimatedSection'
import { motion } from 'framer-motion'

const projectColors = [
  { bg: 'bg-ink', text: 'text-cream', accent: 'text-gold-light', border: 'border-ink' },
  { bg: 'bg-cream-dark', text: 'text-ink', accent: 'text-gold-dark', border: 'border-gold/20' },
  { bg: 'bg-cream', text: 'text-ink', accent: 'text-gold-dark', border: 'border-gold/20' },
]

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <AnimatedSection>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-6 gold-line">
            {t.projects.label}
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
            <h2
              className="font-serif font-light text-ink"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              {t.projects.title}
            </h2>
            <p className="font-sans text-sm text-muted max-w-xs leading-relaxed">
              {t.projects.subtitle}
            </p>
          </div>
        </AnimatedSection>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.entries.map((project, i) => {
            const colors = projectColors[i % projectColors.length]
            return (
              <AnimatedSection key={project.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`${colors.bg} border ${colors.border} p-8 flex flex-col h-full min-h-[360px] group`}
                  style={{ cursor: 'none' }}
                >
                  {/* Number */}
                  <span className={`font-serif text-6xl font-light ${colors.accent} opacity-30 leading-none mb-6`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Context */}
                  <p className={`font-sans text-xs tracking-wider uppercase ${colors.accent} opacity-70 mb-3`}>
                    {project.context}
                  </p>

                  {/* Title */}
                  <h3 className={`font-serif text-xl font-light ${colors.text} leading-tight mb-4 flex-1`}>
                    {project.title}
                  </h3>

                  {/* Description */}
                  <div className="mb-6 flex flex-col gap-3">
                    {project.description.split('\n\n').map((para, pi) => (
                      <p key={pi} className={`font-sans text-sm font-light leading-relaxed text-justify ${colors.text} opacity-70`}>
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`font-sans text-xs px-3 py-1 border ${colors.accent} opacity-70 border-current/30`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            )
          })}

          {/* Placeholder cards */}
          {t.projects.placeholders.map((placeholder, i) => (
            <AnimatedSection key={`placeholder-${i}`} delay={(t.projects.entries.length + i) * 0.1}>
              <div className="border border-dashed border-gold/30 p-8 flex flex-col items-center justify-center min-h-[360px] text-center">
                <div className="w-8 h-8 border border-gold/30 rotate-45 mb-6 flex items-center justify-center">
                  <span className="text-gold/40 text-lg font-light -rotate-45">+</span>
                </div>
                <p className="font-serif text-lg font-light text-muted mb-2">{placeholder.title}</p>
                <p className="font-sans text-xs text-muted/60 tracking-wider uppercase">
                  {placeholder.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  )
}
