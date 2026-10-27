'use client'

import { useRef, useState } from 'react'
import { m, useReducedMotion, useScroll } from 'framer-motion'
import type { Experience as ExperienceContent, ExperienceGroup, UiStrings } from '@/content/schema'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import NextLink from './ui/NextLink'

interface Props {
  experience: ExperienceContent
  ui: UiStrings
}

export default function Experience({ experience, ui }: Props) {
  const [open, setOpen] = useState<Set<string>>(new Set())
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <section id="experience" aria-labelledby="experience-title" className="section bg-cream">
      <div className="container-page">
        <SectionHeader
          id="experience-title"
          eyebrow={experience.eyebrow}
          title={experience.title}
          lead={experience.lead}
        />
        <div className="mt-16 space-y-20 lg:mt-20">
          {experience.groups.map((group) => (
            <Group key={group.id} group={group} open={open} toggle={toggle} ui={ui} />
          ))}
        </div>
        <NextLink href="#projects" label={experience.next} />
      </div>
    </section>
  )
}

interface GroupProps {
  group: ExperienceGroup
  open: Set<string>
  toggle: (id: string) => void
  ui: UiStrings
}

function Group({ group, open, toggle, ui }: GroupProps) {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  // The gold line draws itself as the reader scrolls through the group.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })

  return (
    <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
          <h3 className="eyebrow">{group.title}</h3>
        </Reveal>
      </div>
      <ol ref={ref} className="relative lg:col-span-9">
        <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-gold/30" />
        <m.span
          aria-hidden
          style={{ scaleY: reduce ? 1 : scrollYProgress }}
          className="absolute bottom-3 left-[5px] top-3 w-px origin-top bg-gold"
        />
        {group.entries.map((entry, i) => {
          const isOpen = open.has(entry.id)
          const detailsId = `${entry.id}-details`
          return (
            <li key={entry.id} className="relative pb-14 pl-10 last:pb-0 md:pl-14">
              <span
                aria-hidden
                className="absolute left-0 top-[0.35rem] h-[11px] w-[11px] rounded-full border border-gold bg-cream"
              />
              <Reveal index={i % 2}>
                <p className="eyebrow">{entry.period}</p>
                <h4 className="mt-3 text-[clamp(1.625rem,2.6vw,2.125rem)]">{entry.title}</h4>
                <p className="mt-1 text-ink-muted">
                  {entry.company}, {entry.location}
                </p>
                <p className="mt-4 max-w-measure">{entry.summary}</p>

                {entry.details.length > 0 && (
                  <>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={detailsId}
                      onClick={() => toggle(entry.id)}
                      className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-gold-text"
                    >
                      <span className="link-underline">{isOpen ? ui.hideDetails : ui.details}</span>
                      <span
                        aria-hidden
                        className={`inline-block text-base transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      >
                        +
                      </span>
                    </button>
                    <ul id={detailsId} hidden={!isOpen} className="reveal-in mt-2 max-w-measure space-y-2.5 text-ink-muted">
                      {entry.details.map((d) => (
                        <li key={d} className="relative pl-6">
                          <span aria-hidden className="absolute left-0 top-[0.8em] h-px w-3 bg-gold" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Reveal>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
