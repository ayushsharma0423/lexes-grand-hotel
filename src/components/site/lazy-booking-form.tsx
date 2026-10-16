"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

/** Placeholder with the form's footprint, so nothing shifts when it loads. */
function FormSkeleton() {
  return (
    <div aria-hidden className="flex min-h-[34rem] flex-col gap-6 rounded-xl bg-background p-4 ring-1 ring-foreground/10 sm:min-h-[32rem]">
      <div className="h-8 w-48 rounded-md bg-muted" />
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="h-11 rounded-lg bg-muted" />
        </div>
      ))}
    </div>
  )
}

// The form (react-hook-form + zod) is only downloaded when the booking section nears the viewport.
const BookingForm = dynamic(() => import("./booking-form").then((m) => m.BookingForm), {
  ssr: false,
  loading: FormSkeleton,
})

export function LazyBookingForm() {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
          observer.disconnect()
        }
      },
      { rootMargin: "800px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{show ? <BookingForm /> : <FormSkeleton />}</div>
}
