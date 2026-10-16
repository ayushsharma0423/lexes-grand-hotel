import { hotel, location } from "@/content/hotel"

export const whatsappLink = (message: string = hotel.contact.whatsappGreeting) =>
  `https://wa.me/${hotel.contact.whatsapp}?text=${encodeURIComponent(message)}`

export const phoneLink = `tel:+${hotel.contact.phone}`

export const emailLink = `mailto:${hotel.contact.email}`

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&output=embed`

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.mapQuery)}`

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: hotel.currency,
    maximumFractionDigits: 0,
  }).format(amount)
