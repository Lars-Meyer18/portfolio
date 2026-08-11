'use client'

import { useLanguage } from '@/lib/LanguageContext'
import AnimatedSection from './AnimatedSection'

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="section-padding bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <AnimatedSection>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-6 gold-line">
            {t.skills.label}
          </p>
          <h2
            className="font-serif font-light text-ink mb-20"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            {t.skills.title}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {t.skills.categories.map((category, ci) => (
            <AnimatedSection key={category.name} delay={ci * 0.1}>
              <div>
                <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-gold mb-8 pb-4 border-b border-gold/20">
                  {category.name}
                </h3>
                <ul className="space-y-4">
                  {category.items.map((item, ii) => (
                    <li key={item.label} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-sm text-ink font-light">{item.label}</span>
                        {item.level && (
                          <span className="font-sans text-xs text-muted">{item.level}</span>
                        )}
                      </div>
                      {!item.level && (
                        <div className="h-px bg-gold/20 w-full mt-1" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom statement */}
        <AnimatedSection delay={0.4} className="mt-24 pt-12 border-t border-gold/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <p
              className="font-serif font-light text-ink leading-tight max-w-lg"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              {t.skills.label === 'Kompetenzen'
                ? 'Bereit, vom ersten Tag an einen Beitrag zu leisten.'
                : 'Ready to contribute from day one.'}
            </p>
            <a
              href="https://www.linkedin.com/in/lars-meyer-18022002lm/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 font-sans text-sm tracking-wider uppercase text-gold border border-gold/40 px-8 py-4 hover:bg-gold hover:text-cream transition-all duration-300"
            >
              LinkedIn
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
