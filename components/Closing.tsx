import type { Closing as ClosingContent } from '@/content/schema'
import { LINKEDIN_URL } from '@/content/flags'
import Reveal from './ui/Reveal'

export default function Closing({ closing }: { closing: ClosingContent }) {
  const year = new Date().getFullYear()
  return (
    <>
      <section id="contact" aria-labelledby="contact-title" className="section bg-sand">
        <div className="container-page">
          <Reveal>
            <span aria-hidden className="block h-px w-20 bg-gold" />
            <h2
              id="contact-title"
              className="mt-10 max-w-[24ch] text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.1]"
            >
              {closing.sentence}
            </h2>
          </Reveal>
          <Reveal index={1}>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-12 inline-flex min-h-[52px] items-center gap-4 border border-ink px-8 text-sm font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
            >
              {closing.button}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>
      </section>
      <footer className="bg-sand">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 py-8 text-sm text-ink-muted">
          <p>{closing.footer.replace('{year}', String(year))}</p>
          <a href="#top" className="font-serif text-xl tracking-[0.15em] text-ink hover:text-gold-text">
            <span aria-hidden>LM</span>
            <span className="sr-only">Lars Meyer</span>
          </a>
        </div>
      </footer>
    </>
  )
}
