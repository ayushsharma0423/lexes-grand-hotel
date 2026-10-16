"use client"

/**
 * The hero's 3D element: hotel photographs on the inside of a cylinder, so the
 * wall curves around the viewer like a panorama. It drifts slowly, turns with
 * the page scroll and leans toward the pointer. Pure CSS 3D + Framer Motion,
 * so it runs on phones too (no WebGL download).
 */
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  m,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"

import type { Captioned } from "@/content/hotel"

type Geometry = { card: number; radius: number; perspective: number; height: number }

/**
 * Card size and ring radius scale with the container width. With the viewer at
 * the ring's centre, the front card appears at perspective / (perspective + radius)
 * of its size (~63% here); cards toward the edges curve in and appear larger.
 */
function geometryFor(width: number, count: number): Geometry {
  const apparent = width * (width < 640 ? 0.5 : 0.22) // on-screen width of the front card
  const card = Math.round(Math.min(Math.max(apparent / 0.63, 220), 520))
  const gap = card * 0.12
  const radius = Math.round((count * (card + gap)) / (2 * Math.PI))
  const perspective = Math.round(radius * 1.7)
  const height = Math.round(card * 1.2)
  return { card, radius, perspective, height }
}

const DRIFT_DEG_PER_SEC = 2.4

export function Panorama({ images }: { images: Captioned[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref)
  const [geo, setGeo] = useState<Geometry>(() => geometryFor(1280, images.length))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setGeo(geometryFor(entry.contentRect.width, images.length)))
    observer.observe(el)
    return () => observer.disconnect()
  }, [images.length])

  // Rotation = slow drift + page scroll + a gentle lean toward the pointer.
  const drift = useMotionValue(0)
  const pointer = useMotionValue(0)
  const pointerSpring = useSpring(pointer, { stiffness: 60, damping: 20 })
  const { scrollY } = useScroll()

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return
    drift.set(drift.get() - (DRIFT_DEG_PER_SEC * delta) / 1000)
  })

  useEffect(() => {
    if (reduce) return
    const onMove = (e: PointerEvent) => pointer.set((e.clientX / window.innerWidth - 0.5) * 2)
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [pointer, reduce])

  const rotateY = useTransform([drift, scrollY, pointerSpring], ([d, s, p]: number[]) =>
    reduce ? 0 : d - s * 0.05 + p * 6
  )
  const tilt = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 10])

  const step = 360 / images.length

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: geo.height * 0.8, perspective: geo.perspective }}
    >
      <m.div
        className="absolute top-1/2 left-1/2"
        style={{
          width: geo.card,
          height: geo.height,
          marginLeft: -geo.card / 2,
          marginTop: -geo.height / 2,
          transformStyle: "preserve-3d",
          rotateX: tilt,
          rotateY,
        }}
      >
        {images.map((img, i) => (
          <figure
            key={img.src}
            className="absolute inset-0 flex flex-col gap-2 [backface-visibility:hidden]"
            style={{ transform: `rotateY(${i * step}deg) translateZ(${-geo.radius}px)` }}
          >
            <div className="relative flex-1 overflow-hidden bg-muted">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={`${geo.card}px`}
                loading={i < 3 || i > images.length - 3 ? "eager" : "lazy"}
                className="object-cover"
              />
            </div>
            <figcaption className="label flex justify-between text-muted-foreground">
              <span>{img.caption}</span>
              <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}
      </m.div>
    </div>
  )
}
