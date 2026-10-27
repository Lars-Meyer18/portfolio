import Reveal from './Reveal'

interface Props {
  id: string
  eyebrow: string
  title: string
  lead?: string
}

export default function SectionHeader({ id, eyebrow, title, lead }: Props) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal index={1}>
        <h2 id={id} className="section-title mt-5">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal index={2}>
          <p className="lead mt-6">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
