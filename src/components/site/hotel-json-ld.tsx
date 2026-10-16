import { amenities, hero, hotel, rooms } from "@/content/hotel"

/**
 * schema.org Hotel structured data for rich results.
 * aggregateRating is intentionally omitted: add it only once you have real, verifiable reviews.
 */
export function HotelJsonLd() {
  const { street, city, region, postalCode, country, lat, lng } = hotel.address

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    description: hotel.shortDescription,
    url: hotel.url,
    image: [new URL("/og.jpg", hotel.url).toString(), ...hero.panorama.slice(0, 3).map((p) => p.src)],
    telephone: `+${hotel.contact.phone}`,
    email: hotel.contact.email,
    priceRange: hotel.priceRange,
    starRating: { "@type": "Rating", ratingValue: hotel.starRating },
    checkinTime: hotel.checkInTime,
    checkoutTime: hotel.checkOutTime,
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: city,
      addressRegion: region,
      postalCode,
      addressCountry: country,
    },
    geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng },
    amenityFeature: amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.title,
      value: true,
    })),
    makesOffer: rooms.map((r) => ({
      "@type": "Offer",
      name: r.name,
      priceCurrency: hotel.currency,
      price: r.price,
      itemOffered: {
        "@type": "HotelRoom",
        name: r.name,
        description: r.description,
        occupancy: { "@type": "QuantitativeValue", maxValue: r.guests },
      },
    })),
    sameAs: hotel.social.map((s) => s.href),
  }

  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  )
}
