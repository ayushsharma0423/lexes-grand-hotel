import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { dining } from "@/content/hotel"
import { whatsappLink } from "@/lib/links"

import { Reveal3D, ScrollDepth } from "./depth"
import { Reveal } from "./reveal"
import { SectionLabel } from "./section-label"

export function Dining() {
  const [room, dish] = dining.images

  return (
    <section id="dining" aria-labelledby="dining-title" className="night py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <SectionLabel number={dining.number} label={dining.label} className="lg:col-span-3 lg:pb-6" />
          <Reveal className="lg:col-span-9">
            <h2 id="dining-title" className="text-[26vw] leading-[0.8] sm:text-[11rem] lg:text-[13rem]">
              {dining.title}
            </h2>
            <p className="mt-3 font-heading text-3xl text-primary italic sm:text-4xl">{dining.subtitle}</p>
          </Reveal>
        </div>

        <Reveal3D from="up" className="relative mt-14 sm:mt-20">
          <ScrollDepth rotateX={[14, 0, -4]} scale={[0.94, 1, 1]} className="relative aspect-4/3 overflow-hidden sm:aspect-16/8">
            <Image src={room.src} alt={room.alt} fill sizes="100vw" className="object-cover" />
          </ScrollDepth>
          {/* Closer layer: moves faster than the room photo behind it. */}
          <ScrollDepth
            y={[120, -80]}
            className="absolute -bottom-10 left-4 hidden aspect-4/5 w-[22%] overflow-hidden border-8 border-background shadow-2xl sm:block lg:left-10"
          >
            <Image src={dish.src} alt={dish.alt} fill sizes="22vw" className="object-cover" />
          </ScrollDepth>
        </Reveal3D>

        <div className="mt-16 grid gap-12 sm:mt-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-5 lg:col-start-4">
            <p className="text-lg leading-relaxed text-muted-foreground">{dining.description}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-6 lg:col-span-3 lg:col-start-10">
            <dl className="flex flex-col">
              {dining.hours.map((h) => (
                <div key={h.label} className="flex justify-between border-b border-border py-3">
                  <dt className="label text-muted-foreground">{h.label}</dt>
                  <dd className="tabular-nums">{h.time}</dd>
                </div>
              ))}
            </dl>
            <Button
              render={
                <a
                  href={whatsappLink(`Hello Lexes Grand, I'd like to reserve a table at ${dining.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              nativeButton={false}
              size="xl"
              className="label"
            >
              Reserve a table
              <ArrowUpRight data-icon="inline-end" />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
