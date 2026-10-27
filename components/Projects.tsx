'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import type { ResolvedProject } from '@/content'
import type { Projects as ProjectsContent, UiStrings } from '@/content/schema'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import NextLink from './ui/NextLink'

interface Props {
  projects: Omit<ProjectsContent, 'items'> & { items: ResolvedProject[] }
  ui: UiStrings
}

type Labels = ProjectsContent['labels']
const caseSteps = ['situation', 'contribution', 'approach', 'result'] as const

export default function Projects({ projects, ui }: Props) {
  const featured = projects.items.find((p) => p.featured)
  const cards = projects.items.filter((p) => !p.featured)
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  // Shareable links: #project-<slug> opens the matching panel.
  useEffect(() => {
    const sync = () => {
      const match = window.location.hash.match(/^#project-(.+)$/)
      setOpenSlug(match && cards.some((p) => p.slug === match[1]) ? match[1] : null)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
    // cards come from static content and never change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openPanel = (slug: string, trigger: HTMLElement) => {
    triggerRef.current = trigger
    setOpenSlug(slug)
    history.replaceState(null, '', `#project-${slug}`)
  }

  const closePanel = useCallback(() => {
    setOpenSlug(null)
    history.replaceState(null, '', window.location.pathname)
    triggerRef.current?.focus()
  }, [])

  const openProject = cards.find((p) => p.slug === openSlug)

  return (
    <section id="projects" aria-labelledby="projects-title" className="section bg-cream">
      <div className="container-page">
        <SectionHeader
          id="projects-title"
          eyebrow={projects.eyebrow}
          title={projects.title}
          lead={projects.lead}
        />
      </div>

      {featured && <Featured project={featured} labels={projects.labels} />}

      <div className="container-page">
        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((p, i) => (
            <li key={p.id} className="md:last:odd:col-span-2 lg:last:odd:col-span-1">
              <Reveal index={i} className="h-full">
                <article id={`project-${p.slug}`} className="card relative flex h-full flex-col p-7 md:p-8">
                  <p className="eyebrow">{p.eyebrow}</p>
                  <h3 id={`${p.id}-title`} className="mt-4 text-[1.875rem] leading-tight">
                    {p.title}
                  </h3>
                  {p.clientDisplay && <p className="mt-2 text-sm text-ink-muted">{p.clientDisplay}</p>}
                  <p className="mt-5 flex-1 text-ink-muted">{p.summary}</p>
                  <Tags tags={p.tags} />
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-describedby={`${p.id}-title`}
                    onClick={(e) => openPanel(p.slug, e.currentTarget)}
                    className="mt-8 inline-flex min-h-[44px] items-center gap-2 self-start text-sm font-medium text-gold-text after:absolute after:inset-0 after:content-['']"
                  >
                    <span className="link-underline">{projects.labels.more}</span>
                    <span aria-hidden>→</span>
                  </button>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="mt-16 flex max-w-measure items-start gap-5 font-serif-italic text-[1.5rem] italic leading-snug text-ink-muted">
            <span aria-hidden className="mt-[0.7em] h-px w-10 shrink-0 bg-gold" />
            {projects.outlook}
          </p>
        </Reveal>

        <NextLink href="#education" label={projects.next} />
      </div>

      <AnimatePresence>
        {openProject && (
          <Panel key={openProject.id} project={openProject} labels={projects.labels} ui={ui} onClose={closePanel} />
        )}
      </AnimatePresence>
    </section>
  )
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {tags.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  )
}

function Meta({ project, labels }: { project: ResolvedProject; labels: Labels }) {
  const rows = [
    { label: labels.client, value: project.clientDisplay },
    { label: labels.role, value: project.role },
  ].filter((r) => r.value)
  if (!rows.length) return null
  return (
    <dl className="mt-8 space-y-4">
      {rows.map((r) => (
        <div key={r.label}>
          <dt className="eyebrow">{r.label}</dt>
          <dd className="mt-1">{r.value}</dd>
        </div>
      ))}
    </dl>
  )
}

// The one dark band on the page: title, role and tags stay pinned while the
// four steps of the case study scroll past.
function Featured({ project, labels }: { project: ResolvedProject; labels: Labels }) {
  return (
    <div id={`project-${project.slug}`} className="section mt-16 bg-ink text-cream lg:mt-20">
      <div className="container-page grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
            <p className="eyebrow">{project.eyebrow}</p>
            <h3 className="mt-5 text-[clamp(2.125rem,3.8vw,3.25rem)] text-cream">{project.title}</h3>
            <div className="text-cream/85">
              <Meta project={project} labels={labels} />
            </div>
            <Tags tags={project.tags} />
          </Reveal>
        </div>
        <div className="space-y-12 lg:col-span-7 lg:space-y-16 lg:pt-2">
          {caseSteps.map((step, i) =>
            project[step] ? (
              <Reveal key={step} index={i % 2}>
                <div className="border-t border-gold/30 pt-6">
                  <h4 className="eyebrow">{labels[step]}</h4>
                  <p className="mt-4 max-w-measure text-[1.0625em] leading-relaxed text-cream/85">{project[step]}</p>
                </div>
              </Reveal>
            ) : null,
          )}
        </div>
      </div>
    </div>
  )
}

interface PanelProps {
  project: ResolvedProject
  labels: Labels
  ui: UiStrings
  onClose: () => void
}

function Panel({ project, labels, ui, onClose }: PanelProps) {
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = `${project.id}-panel-title`
  const transition = reduce ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  // Keep Tab inside the dialog.
  const trapFocus = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const focusable = panelRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const sections = [...caseSteps.map((s) => ({ label: labels[s], text: project[s] })), { label: '', text: project.text }]

  return (
    <div className="fixed inset-0 z-[60]">
      <m.div
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
      />
      <m.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={trapFocus}
        className="absolute inset-y-0 right-0 w-full max-w-xl overflow-y-auto bg-cream shadow-[-24px_0_48px_-24px_rgba(10,10,10,0.25)]"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={transition}
      >
        <div className="sticky top-0 flex justify-end bg-cream/95 px-5 py-3 backdrop-blur md:px-8">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex h-11 items-center gap-3 text-sm font-medium text-ink-muted hover:text-ink"
          >
            {ui.close}
            <span aria-hidden className="text-2xl leading-none">
              ×
            </span>
          </button>
        </div>
        <div className="px-6 pb-16 md:px-12">
          <p className="eyebrow">{project.eyebrow}</p>
          <h3 id={titleId} className="mt-4 text-[clamp(2rem,4vw,2.75rem)]">
            {project.title}
          </h3>
          <Meta project={project} labels={labels} />
          <div className="mt-10 space-y-8">
            {sections.map((s, i) =>
              s.text ? (
                <div key={i} className="border-t border-gold/40 pt-5">
                  {s.label && <h4 className="eyebrow">{s.label}</h4>}
                  <p className={s.label ? 'mt-3' : ''}>{s.text}</p>
                </div>
              ) : null,
            )}
          </div>
          <Tags tags={project.tags} />
        </div>
      </m.div>
    </div>
  )
}
