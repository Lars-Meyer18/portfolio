'use client'

import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

interface Props {
  children: ReactNode
  className?: string
  // Position in a group, used for the 0.08 s stagger
  index?: number
  id?: string
}

// Fades content up once when it scrolls into view. With reduced motion the
// transition runs with zero duration, so content appears immediately.
export default function Reveal({ children, className, index = 0, id }: Props) {
  const reduce = useReducedMotion()
  return (
    <m.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={reduce ? { duration: 0 } : { duration: 0.7, delay: index * 0.08, ease }}
    >
      {children}
    </m.div>
  )
}
