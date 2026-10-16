"use client"

import { LazyMotion, MotionConfig, domAnimation } from "motion/react"

import { Toaster } from "@/components/ui/toast"

/**
 * Global client providers. Motion honours the OS "reduce motion" setting site-wide,
 * and LazyMotion ships only the DOM animation features the site uses (use `m.*`, not `motion.*`).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Toaster>{children}</Toaster>
      </MotionConfig>
    </LazyMotion>
  )
}
