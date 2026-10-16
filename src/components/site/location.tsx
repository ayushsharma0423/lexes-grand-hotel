import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { hotel, location } from "@/content/hotel"
import { directionsUrl, mapEmbedUrl, phoneLink } from "@/lib/links"

import { ScrollDepth } from "./depth"
import { Reveal } from "./reveal"
import { SectionLabel } from "./section-label"

export function Location() {
  const { street, city, region, postalCode } = hotel.address

  return (
    <section id="location" aria-labelledby="location-title" className="py-24 sm:py-36">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 sm:gap-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionLabel number={location.number} label={location.label} className="lg:col-span-3 lg:pt-4" />
          <Reveal className="lg:col-span-9">
            <h2 id="location-title" className="max-w-4xl text-5xl leading-none sm:text-7xl">
              {location.title}
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* The map lies back and unfolds flat as it scrolls in, like a paper map on a table. */}
          <ScrollDepth rotateX={[40, 0, 0]} scale={[0.9, 1, 1]} origin="50% 100%" className="lg:col-span-8">
            <div className="relative aspect-4/3 overflow-hidden bg-muted sm:aspect-16/10">
              <iframe
                title={`Map showing ${hotel.name}, ${city}`}
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0 [filter:grayscale(1)_sepia(0.2)_contrast(1.05)]"
              />
            </div>
          </ScrollDepth>

          <Reveal delay={0.1} className="flex flex-col gap-8 lg:col-span-4">
            <address className="flex flex-col gap-1 not-italic">
              <span className="label text-muted-foreground">Address</span>
              <span className="font-heading text-3xl leading-tight">
                {street}
                <br />
                {city}, {region} {postalCode}
              </span>
            </address>

            <dl className="flex flex-col border-t border-foreground/15">
              {location.landmarks.map((l) => (
                <div key={l.name} className="flex items-baseline justify-between gap-4 border-b border-foreground/15 py-3 text-sm">
                  <dt>{l.name}</dt>
                  <dd className="shrink-0 text-muted-foreground">{l.time}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button
                render={<a href={directionsUrl} target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
                size="xl"
                className="label"
              >
                Directions
                <ArrowUpRight data-icon="inline-end" />
              </Button>
              <Button render={<a href={phoneLink} />} nativeButton={false} variant="outline" size="xl" className="label">
                Call the hotel
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
