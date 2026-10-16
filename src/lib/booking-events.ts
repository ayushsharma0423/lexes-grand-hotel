/**
 * Lets other parts of the page (room rows, the hero booking bar) fill in the
 * enquiry form. Values are remembered, so a form that lazy-loads *after* the
 * click still picks them up.
 */
export type BookingPrefill = {
  roomType?: string
  checkIn?: string
  checkOut?: string
  guests?: string
}

const EVENT = "lexes:prefill-booking"

let pending: BookingPrefill = {}

export function prefillBooking(values: BookingPrefill) {
  pending = { ...pending, ...values }
  window.dispatchEvent(new CustomEvent<BookingPrefill>(EVENT, { detail: values }))
}

export function selectRoom(roomId: string) {
  prefillBooking({ roomType: roomId })
}

export function onPrefillBooking(handler: (values: BookingPrefill) => void) {
  if (Object.keys(pending).length) handler(pending)
  const listener = (e: Event) => handler((e as CustomEvent<BookingPrefill>).detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}

let focusPending = false

/** Focus the form's first field, or remember to do so once the lazily loaded form mounts. */
export function focusBookingForm() {
  const input = document.getElementById("booking-name")
  if (input) input.focus({ preventScroll: true })
  else focusPending = true
}

export function consumeFocusRequest() {
  const was = focusPending
  focusPending = false
  return was
}

/** Scroll to the reservations section, then put the cursor in the form. */
export function goToBookingForm() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  document.getElementById("booking")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
  focusBookingForm()
}
