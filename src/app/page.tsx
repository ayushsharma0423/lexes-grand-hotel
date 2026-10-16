import { Hero } from "@/components/hero/hero"
import { About } from "@/components/site/about"
import { Amenities } from "@/components/site/amenities"
import { Booking } from "@/components/site/booking"
import { Dining } from "@/components/site/dining"
import { Gallery } from "@/components/site/gallery"
import { HotelJsonLd } from "@/components/site/hotel-json-ld"
import { Location } from "@/components/site/location"
import { Rooms } from "@/components/site/rooms"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { Testimonials } from "@/components/site/testimonials"

export default function Home() {
  return (
    <>
      <HotelJsonLd />
      <a
        href="#main"
        className="fixed top-2 left-2 z-50 -translate-y-20 bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Rooms />
        <Amenities />
        <Dining />
        <Gallery />
        <Testimonials />
        <Location />
        <Booking />
      </main>
      <SiteFooter />
    </>
  )
}
