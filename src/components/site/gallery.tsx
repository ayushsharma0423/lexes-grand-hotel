"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { gallery, gallerySection } from "@/content/hotel"

import { ScrollDepth } from "./depth"
import { Reveal } from "./reveal"
import { SectionLabel } from "./section-label"

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null)
  const current = gallery[index ?? 0]
  const step = (dir: 1 | -1) => setIndex((i) => ((i ?? 0) + dir + gallery.length) % gallery.length)

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="border-t border-foreground/15 py-24 sm:py-36">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 sm:gap-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionLabel number={gallerySection.number} label={gallerySection.label} className="lg:col-span-3 lg:pt-4" />
          <Reveal className="lg:col-span-9">
            <h2 id="gallery-title" className="text-5xl leading-none sm:text-7xl">
              {gallerySection.title}
            </h2>
          </Reveal>
        </div>

        {/* Masonry via CSS columns; each photo bends with the scroll like a curved wall. */}
        <ul className="columns-2 gap-4 sm:gap-6 md:columns-3">
          {gallery.map((img, i) => (
            <li key={img.src} className="mb-6 break-inside-avoid sm:mb-10">
              <ScrollDepth rotateX={[16, 0, -16]} scale={[0.92, 1, 0.92]}>
                <Reveal delay={(i % 3) * 0.06}>
                  <figure className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      className="group relative block w-full cursor-zoom-in overflow-hidden bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring"
                    >
                      <span className="sr-only">Open photo: {img.alt}</span>
                      <Image
                        src={img.src}
                        alt=""
                        width={img.width}
                        height={img.height}
                        sizes="(min-width: 768px) 30vw, 48vw"
                        className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </button>
                    <figcaption className="label flex justify-between text-muted-foreground">
                      <span>{img.caption}</span>
                      <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              </ScrollDepth>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent
          className="night max-w-[calc(100%-1rem)] gap-0 border-none p-0 ring-0 sm:max-w-5xl"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1)
            if (e.key === "ArrowLeft") step(-1)
          }}
        >
          <DialogTitle className="sr-only">Photo gallery</DialogTitle>
          <div className="relative flex max-h-[80svh] items-center justify-center">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="h-auto max-h-[80svh] w-auto object-contain animate-in fade-in duration-300"
            />
          </div>
          <div className="flex items-center justify-between gap-4 p-3 sm:p-4">
            <Button variant="ghost" size="icon-xl" onClick={() => step(-1)} aria-label="Previous photo">
              <ArrowLeft />
            </Button>
            <DialogDescription aria-live="polite" className="label text-center">
              {current.caption}
              <span className="mt-1 block tabular-nums">
                {(index ?? 0) + 1} / {gallery.length}
              </span>
            </DialogDescription>
            <Button variant="ghost" size="icon-xl" onClick={() => step(1)} aria-label="Next photo">
              <ArrowRight />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
