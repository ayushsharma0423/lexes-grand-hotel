"use client"

/**
 * 3D scroll effects built on Framer Motion (no WebGL, so they run on phones too).
 * Everything animates transform/opacity only, and honours prefers-reduced-motion.
 */
import { useRef } from "react"
import { m, useReducedMotion, useScroll, useTransform, type HTMLMotionProps, type Variants } from "motion/react"

import { EASE_OUT } from "./reveal"

type Direction = "up" | "left" | "right"

const FROM: Record<Direction, { rotateX: number; rotateY: number; y: number; origin: string }> = {
  // Rises out of the page, hinged on its bottom edge.
  up: { rotateX: 24, rotateY: 0, y: 60, origin: "50% 100%" },
  // Swings in like a door, hinged on the near edge.
  left: { rotateX: 0, rotateY: 26, y: 24, origin: "0% 50%" },
  right: { rotateX: 0, rotateY: -26, y: 24, origin: "100% 50%" },
}

type Reveal3DProps = HTMLMotionProps<"div"> & { from?: Direction; delay?: number }

/** Entrance in 3D: tilts in from the page and settles flat, once (0.75s). */
export function Reveal3D({ from = "up", delay = 0, style, ...props }: Reveal3DProps) {
  const f = FROM[from]
  return (
    <m.div
      initial={{ opacity: 0, rotateX: f.rotateX, rotateY: f.rotateY, y: f.y }}
      whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: EASE_OUT }}
      style={{ transformPerspective: 1200, transformOrigin: f.origin, ...style }}
      {...props}
    />
  )
}

/** Stagger child that flips up from its top edge (use inside <Stagger>). */
export const staggerItem3D: Variants = {
  hidden: { opacity: 0, rotateX: -65, y: 16 },
  show: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

/** A tile that flips up from its top edge (use inside <Stagger>). */
export function FlipTile({ style, ...props }: HTMLMotionProps<"div">) {
  return (
    <m.div
      variants={staggerItem3D}
      style={{ transformPerspective: 800, transformOrigin: "50% 0%", ...style }}
      {...props}
    />
  )
}

type Range3 = [number, number, number]

type ScrollDepthProps = {
  children: React.ReactNode
  className?: string
  /** Values at [entering from below, centred in viewport, leaving at top]. */
  rotateX?: Range3
  rotateY?: Range3
  scale?: Range3
  /** Parallax drift in px from entering to leaving; opposite signs read as different depths. */
  y?: [number, number]
  origin?: string
}

const ZERO: Range3 = [0, 0, 0]
const ONE: Range3 = [1, 1, 1]

/**
 * Scroll-linked 3D: the element tilts, scales and drifts continuously as it
 * travels through the viewport, so the page feels layered in depth.
 */
export function ScrollDepth({
  children,
  className,
  rotateX = ZERO,
  rotateY = ZERO,
  scale = ONE,
  y = [0, 0],
  origin = "50% 50%",
}: ScrollDepthProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  const rx = useTransform(scrollYProgress, [0, 0.5, 1], rotateX)
  const ry = useTransform(scrollYProgress, [0, 0.5, 1], rotateY)
  const sc = useTransform(scrollYProgress, [0, 0.5, 1], scale)
  const ty = useTransform(scrollYProgress, [0, 1], y)

  return (
    <m.div
      ref={ref}
      className={className}
      style={
        reduce
          ? undefined
          : { rotateX: rx, rotateY: ry, scale: sc, y: ty, transformPerspective: 1000, transformOrigin: origin }
      }
    >
      {children}
    </m.div>
  )
}
