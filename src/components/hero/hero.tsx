import { hero } from "@/content/hotel"

import { BookingBar } from "./booking-bar"
import { HeroScroll } from "./hero-scroll"
import { Panorama } from "./panorama"

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-svh flex-col overflow-hidden pt-24 sm:pt-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroScroll className="flex flex-col gap-4">
          <p className="label text-muted-foreground animate-in fade-in duration-700 fill-mode-both">{hero.kicker}</p>
          <h1
            id="hero-title"
            className="max-w-5xl text-[13.5vw] leading-[0.88] animate-in slide-in-from-bottom-4 duration-700 sm:text-7xl lg:text-[7.25rem]"
          >
            {hero.headline} <em className="text-primary">{hero.headlineItalic}</em>
          </h1>
        </HeroScroll>
      </div>

      <div className="my-6 flex-1 sm:my-8 animate-in fade-in duration-700 fill-mode-both [animation-delay:150ms]">
        <Panorama images={hero.panorama} />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <BookingBar />
      </div>
    </section>
  )
}
