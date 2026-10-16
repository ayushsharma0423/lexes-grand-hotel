"use client"

import Image from "next/image"
import { m } from "motion/react"

import { amenities, amenitiesSection } from "@/content/hotel"

import { Reveal3D, ScrollDepth, staggerItem3D } from "./depth"
import { Reveal, Stagger } from "./reveal"
import { SectionLabel } from "./section-label"

export function Amenities() {
  const img = amenitiesSection.image

  return (
    <section id="amenities" aria-labelledby="amenities-title" className="border-t border-foreground/15 py-24 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <SectionLabel number={amenitiesSection.number} label={amenitiesSection.label} />
          <Reveal>
            <h2 id="amenities-title" className="text-5xl leading-none sm:text-6xl">
              {amenitiesSection.title}
            </h2>
          </Reveal>
          <Reveal3D from="left" className="hidden lg:block">
            <figure className="flex flex-col gap-3">
              <ScrollDepth rotateX={[10, 0, -6]} className="relative aspect-4/5 overflow-hidden bg-muted">
                <Image src={img.src} alt={img.alt} fill sizes="40vw" className="object-cover" />
              </ScrollDepth>
              <figcaption className="label text-muted-foreground">{img.caption}</figcaption>
            </figure>
          </Reveal3D>
        </div>

        <Stagger className="lg:col-span-6 lg:col-start-7">
          <ol className="border-t border-foreground/15">
            {amenities.map((a, i) => (
              <m.li
                key={a.title}
                variants={staggerItem3D}
                style={{ transformPerspective: 900, transformOrigin: "50% 0%" }}
                className="grid grid-cols-[3rem_1fr] gap-x-4 gap-y-1 border-b border-foreground/15 py-6 sm:py-7"
              >
                <span className="label pt-2 text-primary tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-3xl leading-tight sm:text-4xl">{a.title}</h3>
                <p className="col-start-2 text-muted-foreground">{a.description}</p>
              </m.li>
            ))}
          </ol>
        </Stagger>
      </div>
    </section>
  )
}
