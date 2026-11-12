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
            <h2
              id="contact-title"
              className="max-w-[20ch] text-[clamp(2.5rem,5.4vw,4.5rem)] leading-[1.04] tracking-[-0.022em]"
            >
              {closing.sentence}
            </h2>
          </Reveal>
          <Reveal index={1}>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-primary press group mt-10"
            >
              {closing.button}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                ›
              </span>
            </a>
          </Reveal>
        </div>
      </section>
      <footer className="bg-sand">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 py-6 text-xs text-ink-muted">
          <p>{closing.footer.replace('{year}', String(year))}</p>
          <a href="#top" className="press font-serif text-lg tracking-[0.12em] text-ink">
            <span aria-hidden>LM</span>
            <span className="sr-only">Lars Meyer</span>
          </a>
        </div>
      </footer>
    </>
  )
}
