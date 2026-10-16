"use client"

import { m, type HTMLMotionProps, type Variants } from "motion/react"

/** Premium "slow cinematic" ease. Every reveal on the site stays under 0.8s. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number }

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ delay = 0, y = 24, ...props }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
      {...props}
    />
  )
}

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

/** Parent for staggered entrances. Children use `staggerItem3D` / `FlipTile` from ./depth. */
export function Stagger(props: HTMLMotionProps<"div">) {
  return (
    <m.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      {...props}
    />
  )
}
