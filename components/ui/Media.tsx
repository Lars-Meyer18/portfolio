import Image from 'next/image'
import type { ResolvedImage } from '@/content'

interface Props {
  image: ResolvedImage
  sizes: string
  // Sizing and rounding come from the caller, e.g. 'aspect-[16/10] rounded-card'
  className?: string
  quality?: number
}

// A photo with its crop, an illustration shown whole on white, or a
// typographic poster where no usable photo exists.
export default function Media({ image, sizes, className = '', quality }: Props) {
  if (image.kind === 'poster') {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-[linear-gradient(160deg,#18222f_0%,#34465c_48%,#c08a57_100%)] px-6 text-center ${className}`}
      >
        <span aria-hidden className="text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-tight tracking-[-0.03em] text-white">
          {image.title}
        </span>
        <span aria-hidden className="mt-1.5 text-sm tracking-[0.01em] text-white/75">
          {image.subtitle}
        </span>
      </div>
    )
  }

  const contain = image.fit === 'contain'
  return (
    <div className={`relative overflow-hidden ${contain ? 'bg-white' : 'bg-sand'} ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        quality={quality}
        className={contain ? 'object-contain p-4' : 'object-cover'}
        style={!contain && image.position ? { objectPosition: image.position } : undefined}
      />
    </div>
  )
}
