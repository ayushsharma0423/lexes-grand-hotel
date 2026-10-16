import { booking, hotel } from "@/content/hotel"
import { emailLink, phoneLink, whatsappLink } from "@/lib/links"

import { Reveal3D } from "./depth"
import { LazyBookingForm } from "./lazy-booking-form"
import { Reveal } from "./reveal"
import { SectionLabel } from "./section-label"

export function Booking() {
  const contacts = [
    { label: "WhatsApp", value: hotel.contact.whatsappDisplay, href: whatsappLink(), external: true },
    { label: "Telephone", value: hotel.contact.phoneDisplay, href: phoneLink, external: false },
    { label: "Email", value: hotel.contact.email, href: emailLink, external: false },
  ]

  return (
    <section id="booking" aria-labelledby="booking-title" className="border-t border-foreground/15 bg-secondary py-24 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <SectionLabel number={booking.number} label={booking.label} />
          <Reveal className="flex flex-col gap-5">
            <h2 id="booking-title" className="text-5xl leading-none sm:text-7xl">
              {booking.title}
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">{booking.description}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="flex flex-col border-t border-foreground/15">
              {contacts.map((c) => (
                <div key={c.label} className="flex items-baseline justify-between gap-4 border-b border-foreground/15 py-4">
                  <dt className="label text-muted-foreground">{c.label}</dt>
                  <dd>
                    <a
                      href={c.href}
                      {...(c.external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="rounded-sm text-lg underline-offset-4 outline-none hover:text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {c.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="label mt-4 text-muted-foreground">
              Check-in {hotel.checkInTime} · Check-out {hotel.checkOutTime}
            </p>
          </Reveal>
        </div>

        <Reveal3D from="up" delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <LazyBookingForm />
        </Reveal3D>
      </div>
    </section>
  )
}
