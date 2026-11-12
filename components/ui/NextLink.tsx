interface Props {
  href: string
  label: string
}

// Quiet link at the end of a section that leads on to the next one.
export default function NextLink({ href, label }: Props) {
  return (
    <p className="mt-20">
      <a href={href} className="link-chevron press text-[1.0625rem]">
        <span className="label">{label}</span>
        {/* Outer span moves on hover, inner span points the chevron down. */}
        <span aria-hidden className="chev inline-block">
          <span className="inline-block rotate-90">›</span>
        </span>
      </a>
    </p>
  )
}
