'use client'

import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  // Position in a group, used for the 0.08 s stagger
  index?: number
  id?: string
}

// Rises into place once when it scrolls into view, on a critically damped
// spring (no overshoot). With reduced motion it only cross-fades.
export default function Reveal({ children, className, index = 0, id }: Props) {
  const reduce = useReducedMotion()
  return (
    <m.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={
        reduce
          ? { opacity: { duration: 0.25 }, y: { duration: 0 } }
          : { type: 'spring', bounce: 0, duration: 0.8, delay: index * 0.08 }
      }
    >
      {children}
    </m.div>
  )
}
