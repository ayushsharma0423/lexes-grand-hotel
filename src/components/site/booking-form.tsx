"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarCheck, MessageCircle, Mail, RotateCcw } from "lucide-react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { toast } from "@/components/ui/toast"
import { booking, hotel, rooms } from "@/content/hotel"
import { consumeFocusRequest, onPrefillBooking } from "@/lib/booking-events"
import { formatPrice, whatsappLink } from "@/lib/links"

/** yyyy-mm-dd in the visitor's local time zone (what <input type="date"> uses). */
const localISODate = (d = new Date()) => {
  const offset = d.getTimezoneOffset() * 60_000
  return new Date(d.getTime() - offset).toISOString().slice(0, 10)
}

const roomIds = rooms.map((r) => r.id) as [string, ...string[]]

const schema = z
  .object({
    name: z.string().trim().min(2, "Please enter your full name."),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s\-()]{7,20}$/, "Please enter a valid phone number, e.g. +1 212 555 0100."),
    checkIn: z.string().min(1, "Please choose a check-in date."),
    checkOut: z.string().min(1, "Please choose a check-out date."),
    guests: z.string().min(1, "Please select the number of guests."),
    roomType: z.enum(roomIds, { error: "Please choose a room type." }),
  })
  .superRefine((v, ctx) => {
    if (v.checkIn && v.checkIn < localISODate()) {
      ctx.addIssue({ code: "custom", path: ["checkIn"], message: "Check-in can't be in the past." })
    }
    if (v.checkIn && v.checkOut && v.checkOut <= v.checkIn) {
      ctx.addIssue({ code: "custom", path: ["checkOut"], message: "Check-out must be after check-in." })
    }
  })

type BookingValues = z.input<typeof schema>

const defaults: BookingValues = { name: "", phone: "", checkIn: "", checkOut: "", guests: "2", roomType: "" as BookingValues["roomType"] }

const subscribeNoop = () => () => {}

function buildMessage(v: BookingValues) {
  const room = rooms.find((r) => r.id === v.roomType)
  return [
    `Hello ${hotel.name}, I'd like to book a stay:`,
    `• Name: ${v.name}`,
    `• Phone: ${v.phone}`,
    `• Check-in: ${v.checkIn}`,
    `• Check-out: ${v.checkOut}`,
    `• Guests: ${v.guests}`,
    `• Room: ${room?.name ?? v.roomType}`,
  ].join("\n")
}

export function BookingForm() {
  // Today's date only exists on the client; the server renders no `min`.
  const today = useSyncExternalStore(subscribeNoop, localISODate, () => undefined)
  const [sent, setSent] = useState<string | null>(null)

  const form = useForm<BookingValues>({ resolver: zodResolver(schema), defaultValues: defaults, mode: "onTouched" })
  const checkIn = useWatch({ control: form.control, name: "checkIn" })

  // A "Book this room" click that happened before this form loaded still lands focus here.
  useEffect(() => {
    if (consumeFocusRequest()) document.getElementById("booking-name")?.focus({ preventScroll: true })
  }, [])

  // Room "Book" buttons and the hero booking bar fill in the form.
  useEffect(
    () =>
      onPrefillBooking(({ roomType, checkIn, checkOut, guests }) => {
        const opts = { shouldValidate: true }
        if (roomType) form.setValue("roomType", roomType as BookingValues["roomType"], opts)
        if (checkIn) form.setValue("checkIn", checkIn, opts)
        if (checkOut) form.setValue("checkOut", checkOut, opts)
        if (guests) form.setValue("guests", guests, opts)
      }),
    [form]
  )

  const onSubmit = (values: BookingValues) => {
    const message = buildMessage(values)
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer")
    setSent(message)
    toast.add({ title: "Enquiry ready", description: "Send the pre-filled message on WhatsApp to confirm.", type: "success" })
  }

  if (sent) {
    return (
      <Card className="gap-6 bg-card ring-foreground/15" role="status">
        <CardHeader>
          <CalendarCheck aria-hidden className="size-8 text-primary" />
          <CardTitle className="text-4xl font-normal">Almost there</CardTitle>
          <CardDescription className="text-base">
            WhatsApp should have opened with your enquiry. If it didn&apos;t, use the buttons below. We reply within the hour.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-4 font-sans text-sm whitespace-pre-wrap text-muted-foreground">{sent}</pre>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-3 sm:flex-row">
          <Button render={<a href={whatsappLink(sent)} target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="xl">
            <MessageCircle data-icon="inline-start" />
            Send on WhatsApp
          </Button>
          <Button
            render={
              <a href={`mailto:${hotel.contact.email}?subject=${encodeURIComponent("Booking enquiry")}&body=${encodeURIComponent(sent)}`} />
            }
            nativeButton={false}
            variant="outline"
            size="xl"
          >
            <Mail data-icon="inline-start" />
            Email instead
          </Button>
          <Button
            variant="ghost"
            size="xl"
            onClick={() => {
              form.reset(defaults)
              setSent(null)
            }}
          >
            <RotateCcw data-icon="inline-start" />
            New enquiry
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="gap-6 bg-card ring-foreground/15">
      <CardHeader>
        <CardTitle className="text-4xl font-normal">Your enquiry</CardTitle>
        <CardDescription>All fields are required.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="booking-form" noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
                  <FieldLabel htmlFor="booking-name">Full name</FieldLabel>
                  <Input {...field} id="booking-name" autoComplete="name" aria-invalid={fieldState.invalid} />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
                  <FieldLabel htmlFor="booking-phone">Phone / WhatsApp</FieldLabel>
                  <Input {...field} id="booking-phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={fieldState.invalid} />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="checkIn"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="booking-checkin">Check-in</FieldLabel>
                  <Input {...field} id="booking-checkin" type="date" min={today} aria-invalid={fieldState.invalid} />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="checkOut"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="booking-checkout">Check-out</FieldLabel>
                  <Input {...field} id="booking-checkout" type="date" min={checkIn || today} aria-invalid={fieldState.invalid} />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="guests"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="booking-guests">Guests</FieldLabel>
                  <NativeSelect {...field} id="booking-guests" className="w-full" aria-invalid={fieldState.invalid}>
                    {Array.from({ length: booking.maxGuests }, (_, i) => (
                      <NativeSelectOption key={i + 1} value={String(i + 1)}>
                        {i + 1} {i === 0 ? "guest" : "guests"}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="roomType"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="booking-room">Room type</FieldLabel>
                  <NativeSelect {...field} id="booking-room" className="w-full" aria-invalid={fieldState.invalid}>
                    <NativeSelectOption value="" disabled>
                      Select a room
                    </NativeSelectOption>
                    {rooms.map((r) => (
                      <NativeSelectOption key={r.id} value={r.id}>
                        {r.name} · from {formatPrice(r.price)}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-3 bg-transparent">
        <Button type="submit" form="booking-form" size="xl">
          <MessageCircle data-icon="inline-start" />
          Send enquiry on WhatsApp
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          No payment now. We&apos;ll confirm availability and the best rate.
        </p>
      </CardFooter>
    </Card>
  )
}
