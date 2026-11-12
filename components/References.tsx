import type { Locale, References as ReferencesContent } from '@/content/schema'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'

interface Props {
  references: ReferencesContent
  // Source lines are resolved on the server according to the disclosure flags
  sources: Record<string, string>
  locale: Locale
}

const marks: Record<Locale, [string, string]> = {
  de: ['«', '»'],
  en: ['“', '”'],
}

export default function References({ references, sources, locale }: Props) {
  const [open, close] = marks[locale]
  return (
    <section id="references" aria-labelledby="references-title" className="section bg-cream">
      <div className="container-page">
        <SectionHeader
          id="references-title"
          eyebrow={references.eyebrow}
          title={references.title}
          lead={references.lead}
        />
        <div className="mt-14 grid gap-4 md:gap-5 lg:grid-cols-3">
          {references.items.map((item, i) => (
            <Reveal key={item.id} index={i} className="h-full">
              <figure className="tile flex h-full flex-col p-7 md:p-9">
                <blockquote className="flex-1 font-serif-italic text-[1.625rem] italic leading-[1.3] tracking-[-0.01em]">
                  <p>
                    {open}
                    {item.quote}
                    {close}
                  </p>
                </blockquote>
                <figcaption className="eyebrow mt-6">{sources[item.id]}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
