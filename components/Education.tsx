'use client'

import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import type { Education as EducationContent, Highlight } from '@/content/schema'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import NextLink from './ui/NextLink'

export default function Education({ education }: { education: EducationContent }) {
  return (
    <section id="education" aria-labelledby="education-title" className="section bg-sand">
      <div className="container-page">
        <SectionHeader
          id="education-title"
          eyebrow={education.eyebrow}
          title={education.title}
          lead={education.lead}
        />

        <Reveal>
          <dl className="mt-14 grid divide-y divide-gold/30 border-y border-gold/50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {education.highlights.map((h) => (
              <div key={h.id} className="flex flex-col-reverse gap-3 py-7 sm:px-6 sm:first:pl-0 lg:px-10">
                <dt className="text-sm leading-snug text-ink-muted">{h.label}</dt>
                <dd className="font-serif text-[clamp(2.75rem,5vw,4rem)] leading-none">
                  <CountUp highlight={h} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <ol className="relative mt-20">
          <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-gold/40" />
          {education.entries.map((e, i) => (
            <li key={e.id} className="relative pb-14 pl-10 last:pb-0 md:pl-14">
              <span
                aria-hidden
                className="absolute left-0 top-[0.35rem] h-[11px] w-[11px] rounded-full border border-gold bg-sand"
              />
              <Reveal index={i % 2}>
                <p className="eyebrow">{e.period}</p>
                <h3 className="mt-3 max-w-[30ch] text-[clamp(1.625rem,2.6vw,2.125rem)]">{e.title}</h3>
                <p className="mt-1 text-ink-muted">{e.institution}</p>
                <p className="mt-4 max-w-measure">{e.text}</p>

                {e.modules && (
                  <div className="mt-6">
                    <h4 className="eyebrow">{e.modulesLabel}</h4>
                    <ul className="mt-3 max-w-measure space-y-1.5 text-ink-muted">
                      {e.modules.map((m) => (
                        <li key={m} className="relative pl-6">
                          <span aria-hidden className="absolute left-0 top-[0.8em] h-px w-3 bg-gold" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {e.focus && (
                  <div className="mt-6">
                    <h4 className="eyebrow">{e.focusLabel}</h4>
                    <ul className="mt-3 flex max-w-3xl flex-wrap gap-2">
                      {e.focus.map((f) => (
                        <li key={f} className="chip">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ol>

        <NextLink href="#skills" label={education.next} />
      </div>
    </section>
  )
}

// Counts from 0 to the value once it scrolls into view. The server renders the
// final value, so readers without JavaScript or with reduced motion see it as is.
function CountUp({ highlight }: { highlight: Highlight }) {
  const { value, decimals, suffix } = highlight
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const done = useRef(false)
  const final = value.toFixed(decimals)

  useEffect(() => {
    const node = ref.current
    if (!node || reduce || done.current) return
    if (!inView) {
      node.textContent = (0).toFixed(decimals)
      return
    }
    done.current = true
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = v.toFixed(decimals)
      },
    })
    return () => controls.stop()
  }, [inView, reduce, value, decimals])

  return (
    <>
      <span className="sr-only">
        {final}
        {suffix}
      </span>
      <span aria-hidden>
        <span ref={ref}>{final}</span>
        {suffix && <span className="text-[0.55em] text-ink-muted">{suffix}</span>}
      </span>
    </>
  )
}
