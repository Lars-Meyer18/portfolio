'use client'

import type { ReactNode } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'

// Loads only the animation features the site uses, which keeps the JavaScript
// bundle smaller than the full `motion` component.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
