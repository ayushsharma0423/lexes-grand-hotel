"use client"

import { m, useReducedMotion, useScroll, useTransform } from "motion/react"

type HeroScrollProps = { children: React.ReactNode; className?: string }

/** Scroll-linked depth for the hero headline: tilts back into the distance and fades over the first ~700px. */
export function HeroScroll({ children, className }: HeroScrollProps) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()

  const rotateX = useTransform(scrollY, [0, 700], [0, 20])
  const y = useTransform(scrollY, [0, 700], [0, -120])
  const opacity = useTransform(scrollY, [0, 550], [1, 0])
  const scale = useTransform(scrollY, [0, 700], [1, 0.92])

  return (
    <m.div
      className={className}
      style={reduce ? undefined : { rotateX, y, scale, opacity, transformPerspective: 1200, transformOrigin: "50% 100%" }}
    >
      {children}
    </m.div>
  )
}
