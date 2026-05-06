'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 200 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  const isHovering = useRef(false)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const handleEnter = () => { isHovering.current = true }
    const handleLeave = () => { isHovering.current = false }

    window.addEventListener('mousemove', handleMove)

    const interactables = document.querySelectorAll('a, button, [role="button"]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMove)
    }
  }, [cursorX, cursorY, dotX, dotY])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
