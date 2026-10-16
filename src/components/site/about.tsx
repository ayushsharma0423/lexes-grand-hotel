import Image from "next/image"

import { about } from "@/content/hotel"

import { FlipTile, Reveal3D, ScrollDepth } from "./depth"
import { Reveal, Stagger } from "./reveal"
import { SectionLabel } from "./section-label"

export function About() {
  const [tall, wide] = about.images

  return (
    <section id="about" aria-labelledby="about-title" className="py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionLabel number={about.number} label={about.label} className="lg:col-span-3 lg:pt-3" />
          <Reveal className="lg:col-span-9">
            <h2 id="about-title" className="text-[2rem] leading-[1.12] sm:text-5xl sm:leading-[1.08] lg:text-[3.6rem]">
              {about.statement}
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid items-start gap-12 sm:mt-24 lg:grid-cols-12 lg:gap-8">
          <Reveal3D from="left" className="lg:col-span-5">
            <figure className="flex flex-col gap-3">
              <ScrollDepth rotateY={[-8, 0, 6]} y={[30, -30]} className="relative aspect-4/5 overflow-hidden bg-muted">
                <Image src={tall.src} alt={tall.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </ScrollDepth>
              <figcaption className="label text-muted-foreground">{tall.caption}</figcaption>
            </figure>
          </Reveal3D>

          <div className="flex flex-col gap-12 lg:col-span-6 lg:col-start-7 lg:pt-24">
            <Reveal className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground">
              {about.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>

            <Stagger>
              <dl className="grid grid-cols-3 border-t border-foreground/15">
                {about.stats.map((stat) => (
                  <FlipTile
                    key={stat.label}
                    className="flex flex-col gap-2 border-r border-foreground/15 pt-5 pr-4 last:border-r-0 [&:not(:first-child)]:pl-4"
                  >
                    <dt className="label order-2 text-muted-foreground">{stat.label}</dt>
                    <dd className="order-1 font-heading text-4xl sm:text-5xl">{stat.value}</dd>
                  </FlipTile>
                ))}
              </dl>
            </Stagger>

            <Reveal3D from="right" className="sm:w-4/5 sm:self-end">
              <figure className="flex flex-col gap-3">
                <ScrollDepth y={[60, -60]} rotateX={[8, 0, -4]} className="relative aspect-4/3 overflow-hidden bg-muted">
                  <Image src={wide.src} alt={wide.alt} fill sizes="(min-width: 1024px) 38vw, 90vw" className="object-cover" />
                </ScrollDepth>
                <figcaption className="label text-muted-foreground">{wide.caption}</figcaption>
              </figure>
            </Reveal3D>
          </div>
        </div>
      </div>
    </section>
  )
}
