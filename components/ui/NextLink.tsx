interface Props {
  href: string
  label: string
}

// Quiet link at the end of a section that leads on to the next one.
export default function NextLink({ href, label }: Props) {
  return (
    <p className="mt-20">
      <a href={href} className="eyebrow group inline-flex items-center gap-3">
        <span className="link-underline">{label}</span>
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
          ↓
        </span>
      </a>
    </p>
  )
}
