import type { SkillItem, Skills as SkillsContent } from '@/content/schema'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import NextLink from './ui/NextLink'

export default function Skills({ skills }: { skills: SkillsContent }) {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section bg-cream">
      <div className="container-page">
        <SectionHeader id="skills-title" eyebrow={skills.eyebrow} title={skills.title} lead={skills.lead} />

        {/* Desktop: three columns of two groups each, filled column by column */}
        <div className="mt-16 grid gap-x-14 gap-y-14 md:grid-cols-2 lg:grid-flow-col lg:grid-cols-3 lg:grid-rows-2">
          {skills.groups.map((group, i) => (
            <Reveal key={group.id} index={i % 3}>
              <h3 id={group.id} className="border-b border-gold/50 pb-3 text-[1.75rem]">
                {group.title}
              </h3>
              <ul aria-labelledby={group.id} className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.label} className="flex items-baseline justify-between gap-4">
                    <span>{item.label}</span>
                    {item.level && <Level item={item} scale={skills.levelScale} />}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <NextLink href="#beyond" label={skills.next} />
      </div>
    </section>
  )
}

function Level({ item, scale }: { item: SkillItem; scale: string }) {
  return (
    <span className="flex shrink-0 items-center gap-3 text-sm text-ink-muted">
      {item.levelText}
      <span aria-hidden className="flex gap-1">
        {[1, 2, 3, 4].map((n) => (
          <span
            key={n}
            className={`h-1.5 w-1.5 rounded-full ${n <= item.level! ? 'bg-gold-text' : 'border border-gold'}`}
          />
        ))}
      </span>
      <span className="sr-only">
        ({item.level} {scale})
      </span>
    </span>
  )
}
