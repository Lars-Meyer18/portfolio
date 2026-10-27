import type { Beyond as BeyondContent } from '@/content/schema'
import Reveal from './ui/Reveal'
import NextLink from './ui/NextLink'

interface Props {
  beyond: BeyondContent
  next?: { href: string; label: string }
}

export default function Beyond({ beyond, next }: Props) {
  return (
    <section id="beyond" aria-labelledby="beyond-title" className="section bg-sand">
      <div className="container-page">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">{beyond.eyebrow}</p>
            </Reveal>
            <Reveal index={1}>
              <h2 id="beyond-title" className="section-title mt-5">
                {beyond.title}
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="lead mt-6">{beyond.lead}</p>
            </Reveal>
          </div>

          <Reveal index={1} className="lg:col-span-7 lg:pt-3">
            <p className="eyebrow">{beyond.period}</p>
            <h3 className="mt-3 text-[clamp(1.625rem,2.6vw,2.125rem)]">{beyond.role}</h3>
            <p className="mt-1 text-ink-muted">{beyond.organisation}</p>
            <p className="mt-5 max-w-measure">{beyond.text}</p>

            <div className="mt-10 border-t border-gold/50 pt-6">
              <h3 className="eyebrow">{beyond.interestsLabel}</h3>
              <p className="mt-3 max-w-measure text-ink-muted">{beyond.interests}</p>
            </div>
          </Reveal>
        </div>

        {next && <NextLink href={next.href} label={next.label} />}
      </div>
    </section>
  )
}
