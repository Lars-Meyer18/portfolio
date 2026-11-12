'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { AnimatePresence, m, useDragControls, useReducedMotion, type PanInfo } from 'framer-motion'
import type { ResolvedProject } from '@/content'
import type { Projects as ProjectsContent, UiStrings } from '@/content/schema'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import NextLink from './ui/NextLink'
import Media from './ui/Media'

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

  // Shareable links: #project-<slug> opens the matching sheet.
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

  const openSheet = (slug: string, trigger: HTMLElement) => {
    triggerRef.current = trigger
    setOpenSlug(slug)
    history.replaceState(null, '', `#project-${slug}`)
  }

  const closeSheet = useCallback(() => {
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

        {featured && <Featured project={featured} labels={projects.labels} />}

        {/* Mobile: a swipeable row with native momentum and snap points.
            Tablet and up: a grid of equal tiles. */}
        <ul className="scrollbar-none -mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-8 pt-2 md:mx-0 md:mt-6 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {cards.map((p, i) => (
            <li
              key={p.id}
              className="w-[84%] shrink-0 snap-start md:w-auto md:last:odd:col-span-2 lg:last:odd:col-span-1"
            >
              <Reveal index={i} className="h-full">
                <article id={`project-${p.slug}`} className="tile tile-interactive relative flex h-full flex-col overflow-hidden">
                  {p.images[0] && (
                    <Media
                      image={p.images[0]}
                      sizes="(min-width: 1024px) 24rem, (min-width: 768px) 45vw, 84vw"
                      className="aspect-[16/10] shrink-0"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-7 md:p-8">
                    <p className="eyebrow">{p.eyebrow}</p>
                    <h3 id={`${p.id}-title`} className="mt-3 text-[2rem] leading-[1.05] tracking-[-0.015em]">
                      {p.title}
                    </h3>
                    {p.clientDisplay && <p className="mt-2 text-sm text-ink-muted">{p.clientDisplay}</p>}
                    <p className="mt-4 flex-1 text-ink-muted">{p.summary}</p>
                    <Tags tags={p.tags} />
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      aria-describedby={`${p.id}-title`}
                      onClick={(e) => openSheet(p.slug, e.currentTarget)}
                      className="link-chevron mt-7 min-h-[44px] self-start after:absolute after:inset-0 after:rounded-tile after:content-['']"
                    >
                      <span className="label">{projects.labels.more}</span>
                      <span aria-hidden className="chev inline-block">
                        ›
                      </span>
                    </button>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="mt-14 flex max-w-measure items-start gap-5 font-serif-italic text-[1.5rem] italic leading-snug text-ink-muted">
            <span aria-hidden className="mt-[0.7em] h-px w-10 shrink-0 bg-gold" />
            {projects.outlook}
          </p>
        </Reveal>

        <NextLink href="#education" label={projects.next} />
      </div>

      <AnimatePresence>
        {openProject && (
          <Sheet key={openProject.id} project={openProject} labels={projects.labels} ui={ui} onClose={closeSheet} />
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
    <dl className="mt-7 space-y-4">
      {rows.map((r) => (
        <div key={r.label}>
          <dt className="eyebrow">{r.label}</dt>
          <dd className="mt-0.5">{r.value}</dd>
        </div>
      ))}
    </dl>
  )
}

// The one dark surface on the page: title, role and tags stay pinned while the
// four steps of the case study scroll past.
function Featured({ project, labels }: { project: ResolvedProject; labels: Labels }) {
  return (
    <div
      id={`project-${project.slug}`}
      className="surface-feature -mx-5 mt-14 px-5 py-16 md:mx-0 md:rounded-tile md:px-12 md:py-20 lg:mt-20 lg:px-16"
    >
      {project.images.length > 0 && (
        <Reveal className={`mb-12 grid gap-3 md:mb-16 md:gap-4 ${project.images.length > 1 ? 'md:grid-cols-[1.4fr_1fr]' : ''}`}>
          {project.images.map((img) => (
            <Media
              key={img.id}
              image={img}
              sizes="(min-width: 1024px) 40rem, (min-width: 768px) 55vw, 100vw"
              className="h-60 rounded-card md:h-[24rem]"
            />
          ))}
        </Reveal>
      )}
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <p className="eyebrow">{project.eyebrow}</p>
            <h3 className="mt-4 hyphens-auto text-[clamp(2rem,2.7vw,2.5rem)] leading-[1.06] tracking-[-0.02em]">
              {project.title}
            </h3>
            <div className="text-on-feature/85">
              <Meta project={project} labels={labels} />
            </div>
            <Tags tags={project.tags} />
          </Reveal>
        </div>
        <div className="space-y-12 lg:col-span-7 lg:space-y-16 lg:pt-1">
          {caseSteps.map((step, i) =>
            project[step] ? (
              <Reveal key={step} index={i % 2}>
                <div className="border-t border-on-feature/15 pt-6">
                  <h4 className="eyebrow">{labels[step]}</h4>
                  <p className="mt-3 max-w-measure text-[1.125rem] leading-[1.55] text-on-feature/85">{project[step]}</p>
                </div>
              </Reveal>
            ) : null,
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- sheet */

// Apple's momentum projection: where a flick would come to rest if it kept
// decelerating like a scroll view. Used to decide whether to dismiss.
function projectMomentum(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate)
}

// Enter and exit on a critically damped spring; snapping back after a drag
// gets a little bounce (damping ≈ 0.8) because the hand carried momentum.
const sheetSpring = { type: 'spring', bounce: 0, duration: 0.42 } as const
const snapBack = { bounceStiffness: 500, bounceDamping: 36 }

interface SheetProps {
  project: ResolvedProject
  labels: Labels
  ui: UiStrings
  onClose: () => void
}

function Sheet({ project, labels, ui, onClose }: SheetProps) {
  const reduce = useReducedMotion()
  // Phones get a bottom sheet, larger screens a floating side sheet. The
  // sheet only ever mounts in the browser, so matchMedia is safe here.
  const [compact] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const controls = useDragControls()
  const sheetRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = `${project.id}-sheet-title`

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  // Keep Tab inside the dialog.
  const trapFocus = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !sheetRef.current) return
    const focusable = sheetRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')
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

  // Release: project the flick forward and dismiss if it would land past
  // half the sheet. Otherwise the drag constraints spring it back.
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const el = sheetRef.current
    if (!el) return
    const size = compact ? el.offsetHeight : el.offsetWidth
    const offset = compact ? info.offset.y : info.offset.x
    const velocity = compact ? info.velocity.y : info.velocity.x
    if (offset + projectMomentum(velocity) > size * 0.5) onClose()
  }

  // Dragging starts only from the header, so the body can scroll normally.
  const startDrag = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return
    controls.start(e)
  }

  const hiddenPos = compact ? { y: '100%' } : { x: '110%' }
  const shownPos = compact ? { y: 0 } : { x: 0 }
  const motionProps = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } }
    : { initial: hiddenPos, animate: shownPos, exit: hiddenPos, transition: sheetSpring }

  const sections = [...caseSteps.map((s) => ({ label: labels[s], text: project[s] })), { label: '', text: project.text }]

  return (
    <div className="fixed inset-0 z-[60]">
      <m.div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0.2 : 0.35 }}
      />
      <m.div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={trapFocus}
        drag={reduce ? false : compact ? 'y' : 'x'}
        dragListener={false}
        dragControls={controls}
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        // Follows 1:1 toward dismissal, rubber-bands the other way.
        dragElastic={compact ? { top: 0.06, bottom: 1 } : { left: 0.06, right: 1 }}
        dragMomentum={false}
        dragTransition={snapBack}
        onDragEnd={onDragEnd}
        // In dark mode the sheet is the lighter, elevated surface, as on iOS.
        className={`absolute flex flex-col overflow-hidden bg-cream shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] dark:bg-sand ${
          compact
            ? 'inset-x-0 bottom-0 h-[92svh] rounded-t-[22px]'
            : 'bottom-3 right-3 top-3 w-[min(36rem,calc(100%-1.5rem))] rounded-tile'
        }`}
        {...motionProps}
      >
        <div
          onPointerDown={startDrag}
          className={`flex shrink-0 select-none flex-col ${reduce ? '' : compact ? 'cursor-grab touch-none' : 'cursor-grab'}`}
        >
          {compact && <span aria-hidden className="mx-auto mt-2 h-[5px] w-9 rounded-full bg-ink/20" />}
          <div className="flex items-center justify-end px-4 pt-3 md:px-5 md:pt-4">
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={ui.close}
              className="press flex h-8 w-8 items-center justify-center rounded-full bg-ink/[0.07] text-ink-muted hover:bg-ink/[0.1] hover:text-ink"
            >
              <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-16 md:px-10">
          {project.images.length > 0 && (
            <div className="scrollbar-none -mx-6 mb-8 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 md:-mx-10 md:scroll-px-10 md:px-10">
              {project.images.map((img) => (
                <Media
                  key={img.id}
                  image={img}
                  sizes="(min-width: 768px) 30rem, 85vw"
                  className={`aspect-[4/3] shrink-0 snap-start rounded-card ${project.images.length > 1 ? 'w-[85%]' : 'w-full'}`}
                />
              ))}
            </div>
          )}
          <p className="eyebrow">{project.eyebrow}</p>
          <h3 id={titleId} className="mt-3 text-[clamp(2.125rem,4vw,2.75rem)] leading-[1.04] tracking-[-0.02em]">
            {project.title}
          </h3>
          <Meta project={project} labels={labels} />
          <div className="mt-9 space-y-7">
            {sections.map((s, i) =>
              s.text ? (
                <div key={i} className="border-t border-ink/10 pt-5">
                  {s.label && <h4 className="eyebrow">{s.label}</h4>}
                  <p className={s.label ? 'mt-2' : ''}>{s.text}</p>
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
