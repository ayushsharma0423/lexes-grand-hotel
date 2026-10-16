"use client"

import { useRef } from "react"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Room } from "@/content/hotel"
import { goToBookingForm, selectRoom } from "@/lib/booking-events"
import { formatPrice, whatsappLink } from "@/lib/links"
import { cn } from "@/lib/utils"

import { Reveal3D, ScrollDepth } from "./depth"
import { Reveal } from "./reveal"

function Facts({ room }: { room: Room }) {
  return (
    <dl className="grid grid-cols-3 border-y border-foreground/15 py-4 text-sm">
      {[
        ["Size", room.size],
        ["Bed", room.bed],
        ["Sleeps", String(room.guests)],
      ].map(([k, v]) => (
        <div key={k} className="flex flex-col gap-1">
          <dt className="label text-muted-foreground">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

/** One room as an editorial row: large photo on one side, details on the other. */
export function RoomRow({ room, index, total }: { room: Room; index: number; total: number }) {
  const flip = index % 2 === 1
  // When "Book this room" is chosen in the dialog, land in the enquiry form instead of back here.
  const goingToBooking = useRef(false)

  const book = () => {
    selectRoom(room.id)
    goToBookingForm()
  }

  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12" aria-labelledby={`room-${room.id}`}>
      <Reveal3D from={flip ? "right" : "left"} className={cn("lg:col-span-7", flip && "lg:order-2")}>
        <ScrollDepth
          rotateY={flip ? [-10, 0, 6] : [10, 0, -6]}
          y={[40, -40]}
          className="relative aspect-4/3 overflow-hidden bg-muted"
        >
          <Image src={room.image.src} alt={room.image.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
        </ScrollDepth>
      </Reveal3D>

      <Reveal className={cn("flex flex-col gap-6 lg:col-span-5", flip && "lg:order-1")}>
        <p className="label text-muted-foreground tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <h3 id={`room-${room.id}`} className="text-4xl leading-none sm:text-5xl">
          {room.name}
        </h3>
        <p className="text-lg leading-relaxed text-muted-foreground">{room.description}</p>
        <Facts room={room} />
        <p className="text-sm text-muted-foreground">{room.amenities.join(" · ")}</p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <p>
            <span className="label text-muted-foreground">From </span>
            <span className="font-heading text-3xl">{formatPrice(room.price)}</span>
            <span className="text-sm text-muted-foreground"> / night</span>
          </p>
          <div className="flex items-center gap-2">
            <Dialog
              onOpenChangeComplete={(open) => {
                if (open) {
                  goingToBooking.current = false
                  return
                }
                // Runs after the dialog's scroll lock is released, so the scroll isn't undone.
                if (goingToBooking.current) goToBookingForm()
              }}
            >
              <DialogTrigger render={<Button variant="ghost" size="lg" className="label h-11 underline underline-offset-4" />}>
                Details
              </DialogTrigger>
              <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-2xl" finalFocus={() => !goingToBooking.current}>
                <div className="relative aspect-video">
                  <Image src={room.image.src} alt={room.image.alt} fill sizes="(min-width: 640px) 672px, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-col gap-5 p-6">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-4xl font-normal">{room.name}</DialogTitle>
                    <DialogDescription className="text-base">{room.description}</DialogDescription>
                  </DialogHeader>
                  <Facts room={room} />
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    {room.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-2">
                        <Check aria-hidden className="size-4 text-primary" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <DialogFooter className="m-0 gap-3 border-t p-6 sm:justify-between">
                  <Button
                    render={
                      <a
                        href={whatsappLink(`Hello Lexes Grand, I'd like to enquire about the ${room.name}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    nativeButton={false}
                    variant="outline"
                    size="xl"
                  >
                    Ask on WhatsApp
                  </Button>
                  <DialogClose
                    render={<Button size="xl" />}
                    onClick={() => {
                      goingToBooking.current = true
                      selectRoom(room.id)
                    }}
                  >
                    Book this room · {formatPrice(room.price)}
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button size="lg" className="label h-11 px-5" onClick={book}>
              Book
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </Reveal>
    </article>
  )
}
