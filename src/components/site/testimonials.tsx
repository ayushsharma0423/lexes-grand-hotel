"use client"

import { useEffect, useState } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { testimonials, testimonialsSection } from "@/content/hotel"

import { Reveal3D } from "./depth"
import { SectionLabel } from "./section-label"

const pad = (n: number) => String(n).padStart(2, "0")

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    if (!api) return
    const update = () => setCurrent(api.selectedScrollSnap() + 1)
    update()
    api.on("select", update)
    return () => {
      api.off("select", update)
    }
  }, [api])

  return (
    <section id="reviews" aria-label="Guest reviews" className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <SectionLabel number={testimonialsSection.number} label={testimonialsSection.label} className="lg:col-span-3 lg:pt-4" />

        {/* One quote at a time, no autoplay: guests set the pace. */}
        <Reveal3D from="right" className="min-w-0 lg:col-span-9">
          <Carousel setApi={setApi} opts={{ loop: true }} aria-label="Guest testimonials">
            <CarouselContent>
              {testimonials.map((t) => (
                <CarouselItem key={t.name}>
                  <figure className="flex flex-col gap-8">
                    <blockquote className="font-heading text-[2rem] leading-[1.15] sm:text-5xl lg:text-6xl">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="flex flex-col gap-1">
                      <span className="font-medium">{t.name}</span>
                      <span className="label text-muted-foreground">{t.guestType}</span>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-10 flex items-center gap-4 border-t border-foreground/15 pt-6">
              <CarouselPrevious variant="ghost" className="static size-12 rounded-none" />
              <CarouselNext variant="ghost" className="static size-12 rounded-none" />
              <p aria-live="polite" className="label ml-auto text-muted-foreground tabular-nums">
                {pad(current)} / {pad(testimonials.length)}
              </p>
            </div>
          </Carousel>
        </Reveal3D>
      </div>
    </section>
  )
}
