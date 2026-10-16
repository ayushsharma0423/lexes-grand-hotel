"use client"

import { useState, useSyncExternalStore } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { booking } from "@/content/hotel"
import { goToBookingForm, prefillBooking } from "@/lib/booking-events"

const localISODate = (d = new Date()) => new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 10)
const subscribeNoop = () => () => {}

/** Quick dates + guests bar in the hero. Hands its values to the full enquiry form. */
export function BookingBar() {
  const today = useSyncExternalStore(subscribeNoop, localISODate, () => undefined)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("2")

  return (
    <form
      aria-label="Check availability"
      className="grid grid-cols-2 gap-x-3 gap-y-4 border-t border-foreground/15 pt-5 sm:grid-cols-[1fr_1fr_0.8fr_auto] sm:items-end sm:gap-x-5"
      onSubmit={(e) => {
        e.preventDefault()
        prefillBooking({ checkIn, checkOut, guests })
        goToBookingForm()
      }}
    >
      <Field>
        <FieldLabel htmlFor="bar-checkin" className="label text-muted-foreground">
          Arrive
        </FieldLabel>
        <Input id="bar-checkin" type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
      </Field>
      <Field>
        <FieldLabel htmlFor="bar-checkout" className="label text-muted-foreground">
          Depart
        </FieldLabel>
        <Input
          id="bar-checkout"
          type="date"
          min={checkIn || today}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </Field>
      <Field className="col-span-2 sm:col-span-1">
        <FieldLabel htmlFor="bar-guests" className="label text-muted-foreground">
          Guests
        </FieldLabel>
        <NativeSelect id="bar-guests" className="w-full" value={guests} onChange={(e) => setGuests(e.target.value)}>
          {Array.from({ length: booking.maxGuests }, (_, i) => (
            <NativeSelectOption key={i + 1} value={String(i + 1)}>
              {i + 1} {i === 0 ? "guest" : "guests"}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Field>
      <Button type="submit" size="xl" className="col-span-2 h-11 sm:col-span-1">
        Check availability
        <ArrowRight data-icon="inline-end" />
      </Button>
    </form>
  )
}
