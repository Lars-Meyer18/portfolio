'use client'

import type { ReactNode } from 'react'
import { LazyMotion } from 'framer-motion'

// The animation features load in a separate chunk after the page is
// interactive, which keeps them out of the critical path.
const loadFeatures = () => import('./motion-features').then((mod) => mod.default)

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  )
}
