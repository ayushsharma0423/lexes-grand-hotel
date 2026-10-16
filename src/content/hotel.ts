/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  HOTEL CONTENT: the only file you need to edit for a new hotel client.
 *
 *  Every word, price, photo and contact detail on the site is read from here.
 *  Images marked `// REPLACE` are Unsplash placeholders: put real photos in
 *  /public/images and use paths like "/images/rooms/classic-king.jpg".
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Build an Unsplash placeholder URL cropped to the given size. Remove once real photos are in. */
const unsplash = (id: string, w = 1600, h = 1067) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

export type Img = { src: string; alt: string; width: number; height: number }
export type Captioned = Img & { caption: string }

export const hotel = {
  name: "Lexes Grand",
  shortDescription:
    "A 1928 landmark hotel five minutes from Grand Central, with a rooftop pool, a restored ballroom for 600 guests and Verdant, a pure-vegetarian restaurant.",
  category: "Heritage business hotel",
  starRating: 5,
  priceRange: "$$$",
  currency: "USD",
  checkInTime: "15:00",
  checkOutTime: "12:00",
  /** Public site URL, used for SEO, sitemap and social previews. */
  url: "https://lexes-grand-hotel.vercel.app", // REPLACE with the hotel's own domain once connected

  contact: {
    /** International format, digits only, used for tel: and WhatsApp links. */
    phone: "18907162534", // CONFIRM country code (+1 assumed for New York)
    phoneDisplay: "+1 890 716 2534",
    whatsapp: "19087654321", // CONFIRM country code (+1 assumed for New York)
    whatsappDisplay: "+1 908 765 4321",
    whatsappGreeting: "Hello Lexes Grand, I'd like to enquire about a stay.",
    email: "lexes@gmail.com",
  },

  address: {
    street: "140 East 45th Street", // REPLACE with the real address
    city: "New York",
    region: "NY",
    postalCode: "10017",
    country: "US",
    /** Coordinates for the schema markup. */
    lat: 40.7527,
    lng: -73.9745,
  },

  social: [
    { label: "Instagram", href: "https://instagram.com/" }, // REPLACE
    { label: "Facebook", href: "https://facebook.com/" }, // REPLACE
    { label: "LinkedIn", href: "https://linkedin.com/" }, // REPLACE
  ],
} as const

export const nav = [
  { label: "Rooms", href: "#rooms" },
  { label: "Dining", href: "#dining" },
  { label: "The Hotel", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
] as const

// ── Hero ──────────────────────────────────────────────────────────────────────
export const hero = {
  kicker: "Midtown Manhattan · Est. 1928",
  headline: "The grand hotel of Midtown,",
  headlineItalic: "since 1928.",
  /** Photos on the curved 3D panorama (portrait crops look best). */
  panorama: [
    { src: unsplash("1546436836-07a91091f160", 900, 1200), alt: "Manhattan skyline at golden hour", width: 900, height: 1200, caption: "Midtown at dusk" },
    { src: unsplash("1559329007-40df8a9345d8", 900, 1200), alt: "Grand dining room seen from above, with patterned marble floor", width: 900, height: 1200, caption: "Verdant dining room" },
    { src: unsplash("1587985064135-0366536eab42", 900, 1200), alt: "Heritage suite bedroom with gold wall panel", width: 900, height: 1200, caption: "Heritage Suite" },
    { src: unsplash("1514933651103-005eec06c04b", 900, 1200), alt: "Wood-panelled hotel bar with backlit shelves", width: 900, height: 1200, caption: "The Bar" },
    { src: unsplash("1519167758481-83f550bb49b3", 900, 1200), alt: "Ballroom set for a wedding under chandeliers", width: 900, height: 1200, caption: "The Ballroom" },
    { src: unsplash("1590490360182-c33d57733427", 900, 1200), alt: "Classic room with tufted sofa and drapes", width: 900, height: 1200, caption: "Classic King" },
    { src: unsplash("1470337458703-46ad1756a187", 900, 1200), alt: "Bartender pouring a whisky over a large ice cube", width: 900, height: 1200, caption: "House old fashioned" },
    { src: unsplash("1541971875076-8f970d573be6", 900, 1200), alt: "Quiet hotel corridor in warm light", width: 900, height: 1200, caption: "Fourth floor" },
    { src: unsplash("1522083165195-3424ed129620", 900, 1200), alt: "Lower Manhattan through the Brooklyn Bridge cables", width: 900, height: 1200, caption: "Twenty minutes downtown" },
  ] satisfies Captioned[], // REPLACE all with the hotel's own photography
}

// ── 01 The Hotel ─────────────────────────────────────────────────────────────
export const about = {
  number: "01",
  label: "The Hotel",
  statement:
    "Lexes Grand opened in 1928, as Midtown rose in limestone and brass. Nearly a century on, it is still the address people choose when they have somewhere to be.",
  body: [
    "Five minutes from Grand Central, the hotel keeps its original façade, marble lobby and ballroom, restored for today. Executives work from the fourth-floor lounge, families take the connecting suites, and wedding parties fill the ballroom most Saturdays.",
  ],
  stats: [
    { value: "212", label: "Rooms & suites" },
    { value: "5 min", label: "Walk to Grand Central" },
    { value: "600", label: "Ballroom guests" },
  ],
  images: [
    { src: unsplash("1541971875076-8f970d573be6", 1200, 1500), alt: "Quiet hotel corridor in warm light", width: 1200, height: 1500, caption: "Guest corridor, fourth floor" }, // REPLACE: lobby
    { src: unsplash("1578898886225-c7c894047899", 1200, 900), alt: "Classic guest room with patterned wall and white bedding", width: 1200, height: 900, caption: "Classic King" }, // REPLACE
  ] satisfies Captioned[],
}

// ── 02 Rooms & Suites ────────────────────────────────────────────────────────
export const roomsSection = {
  number: "02",
  label: "Rooms & Suites",
  title: "Four ways to stay",
  intro: "Every room has blackout drapes, a proper desk and a rain shower. Suites add space, a sitting room and butler service.",
}

export type Room = {
  id: string
  name: string
  price: number
  size: string
  bed: string
  guests: number
  description: string
  amenities: string[]
  image: Img
}

export const rooms: Room[] = [
  {
    id: "classic-king",
    name: "Classic King",
    price: 289,
    size: "32 m²",
    bed: "King bed",
    guests: 2,
    description: "Our most booked room: a king bed, a real work desk and windows onto East 45th Street.",
    amenities: ["City view", "Work desk", "Rain shower", "Nespresso"],
    image: {
      src: unsplash("1578898886225-c7c894047899", 1600, 1200), // REPLACE
      alt: "Classic King room with patterned wall and white bedding",
      width: 1600,
      height: 1200,
    },
  },
  {
    id: "executive",
    name: "Executive Room",
    price: 359,
    size: "38 m²",
    bed: "King or twin",
    guests: 3,
    description: "More room to work, plus access to the fourth-floor executive lounge and late checkout.",
    amenities: ["Lounge access", "Ergonomic desk", "Soaking tub", "Late checkout"],
    image: {
      src: unsplash("1618773928121-c32242e63f39", 1600, 1200), // REPLACE
      alt: "Executive room with king bed, artwork and bedside lamps",
      width: 1600,
      height: 1200,
    },
  },
  {
    id: "heritage-suite",
    name: "Heritage Suite",
    price: 549,
    size: "62 m²",
    bed: "King + sofa bed",
    guests: 4,
    description: "A separate sitting room with original 1920s detailing. The one families ask for.",
    amenities: ["Sitting room", "Sofa bed", "Marble bath", "Butler service"],
    image: {
      src: unsplash("1587985064135-0366536eab42", 1600, 1200), // REPLACE
      alt: "Heritage suite with patterned bedspread, gold wall panel and city window",
      width: 1600,
      height: 1200,
    },
  },
  {
    id: "grand-presidential",
    name: "Grand Presidential Suite",
    price: 1250,
    size: "140 m²",
    bed: "King + guest room",
    guests: 4,
    description: "The top floor: panoramic views, a dining room for eight and a dedicated butler.",
    amenities: ["Panoramic view", "Private dining", "Butler", "Airport transfer"],
    image: {
      src: unsplash("1578683010236-d716f9a3f461", 1600, 1200), // REPLACE
      alt: "Presidential suite with open-plan living area and floor-to-ceiling windows",
      width: 1600,
      height: 1200,
    },
  },
]

// ── 03 The House (amenities) ─────────────────────────────────────────────────
export const amenitiesSection = {
  number: "03",
  label: "The House",
  title: "What's in the building",
  image: {
    src: unsplash("1519167758481-83f550bb49b3", 1200, 1500), // REPLACE: rooftop pool
    alt: "The ballroom set for a wedding reception under chandeliers",
    width: 1200,
    height: 1500,
    caption: "The Ballroom, set for 280",
  } satisfies Captioned,
}

export type Amenity = { title: string; description: string }

export const amenities: Amenity[] = [
  { title: "Rooftop pool", description: "Heated year-round, with the Chrysler Building for company." },
  { title: "The Ballroom", description: "Weddings and banquets for up to 600, with an in-house events team." },
  { title: "Verdant", description: "Our pure-vegetarian restaurant, open from breakfast to late." },
  { title: "Grand Central, 5 min", description: "Metro-North, five subway lines and the airport trains." },
  { title: "Meeting rooms", description: "Six rooms for 8 to 80, with AV and a business centre." },
  { title: "Spa & fitness", description: "Treatment rooms and a 24-hour gym on the lower level." },
  { title: "Family floors", description: "Connecting rooms, cribs and a kids' menu on request." },
  { title: "Concierge & valet", description: "Tickets, tables and cars, around the clock." },
]

// ── 04 Dining ────────────────────────────────────────────────────────────────
export const dining = {
  number: "04",
  label: "Dining",
  name: "Verdant",
  title: "Verdant",
  subtitle: "A pure-vegetarian kitchen",
  description:
    "Seasonal menus from the Greenmarket, breads baked in-house and a seven-course tasting menu that sells out on weekends. Jain and vegan menus are available at every service.",
  hours: [
    { label: "Breakfast", time: "6:30–10:30" },
    { label: "Lunch", time: "12:00–15:00" },
    { label: "Dinner", time: "18:00–23:00" },
  ],
  images: [
    {
      src: unsplash("1559329007-40df8a9345d8", 1600, 1100), // REPLACE: restaurant interior
      alt: "Verdant's dining room seen from above, with patterned marble floor",
      width: 1600,
      height: 1100,
    },
    {
      src: unsplash("1414235077428-338989a2e8c0", 900, 1100), // REPLACE: signature dish
      alt: "A plated dish served at a candlelit table",
      width: 900,
      height: 1100,
    },
  ] satisfies Img[],
}

// ── 05 Gallery ───────────────────────────────────────────────────────────────
export const gallerySection = { number: "05", label: "Gallery", title: "Inside Lexes Grand" }

export const gallery: Captioned[] = [
  { src: unsplash("1559329007-40df8a9345d8", 1600, 1100), alt: "Verdant's dining room from above", width: 1600, height: 1100, caption: "Verdant" }, // REPLACE
  { src: unsplash("1514933651103-005eec06c04b", 1200, 1600), alt: "Wood-panelled bar with backlit shelves", width: 1200, height: 1600, caption: "The Bar" }, // REPLACE
  { src: unsplash("1519225421980-715cb0215aed", 1600, 1100), alt: "Long wedding table with flowers and glassware", width: 1600, height: 1100, caption: "Wedding dinner" }, // REPLACE
  { src: unsplash("1587985064135-0366536eab42", 1600, 1100), alt: "Heritage suite bedroom", width: 1600, height: 1100, caption: "Heritage Suite" }, // REPLACE
  { src: unsplash("1546436836-07a91091f160", 1200, 1600), alt: "Manhattan skyline at golden hour", width: 1200, height: 1600, caption: "The view north" }, // REPLACE
  { src: unsplash("1470337458703-46ad1756a187", 1600, 1100), alt: "Whisky poured over a large ice cube", width: 1600, height: 1100, caption: "House old fashioned" }, // REPLACE
  { src: unsplash("1519167758481-83f550bb49b3", 1600, 1100), alt: "Ballroom under chandeliers", width: 1600, height: 1100, caption: "The Ballroom" }, // REPLACE
  { src: unsplash("1590073242678-70ee3fc28e8e", 1200, 1600), alt: "Bedside table with books and a crisp white bed", width: 1200, height: 1600, caption: "Turndown" }, // REPLACE
  { src: unsplash("1544161515-4ab6ce6db874", 1600, 1100), alt: "Guest receiving a massage at the spa", width: 1600, height: 1100, caption: "The Spa" }, // REPLACE
]

// ── 06 Guests ────────────────────────────────────────────────────────────────
export const testimonialsSection = { number: "06", label: "Guests" }

export type Testimonial = { name: string; guestType: string; quote: string }

/** PLACEHOLDER reviews: replace with real, verifiable guest reviews before launch. */
export const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    guestType: "Corporate traveller, 5 nights",
    quote: "Five minutes from Grand Central, a proper desk and the quietest room I've had in Midtown.",
  },
  {
    name: "The Patel family",
    guestType: "Family stay, Heritage Suite",
    quote: "Room for all four of us, the kids lived in the rooftop pool, and Verdant was the best meal of our trip.",
  },
  {
    name: "Aisha & Daniel",
    guestType: "Wedding, 280 guests",
    quote: "The events team handled every detail. Our guests are still talking about that ballroom.",
  },
  {
    name: "James R.",
    guestType: "Business traveller",
    quote: "Seamless check-in, a concierge who got us a table everywhere. It's my default in New York now.",
  },
]

// ── 07 Location ──────────────────────────────────────────────────────────────
export const location = {
  number: "07",
  label: "Location",
  title: "Off Park Avenue, a short walk from everything",
  /** Google Maps search used for the embedded map and "Get directions". */
  mapQuery: "Grand Central Terminal, New York, NY", // REPLACE with the hotel's own address
  landmarks: [
    { name: "Grand Central Terminal", time: "5 min walk" },
    { name: "Chrysler Building", time: "4 min walk" },
    { name: "Bryant Park", time: "8 min walk" },
    { name: "Rockefeller Center", time: "12 min walk" },
    { name: "Times Square", time: "14 min walk" },
    { name: "LaGuardia Airport", time: "25 min drive" },
    { name: "JFK Airport", time: "45 min drive" },
  ],
}

// ── 08 Reservations ──────────────────────────────────────────────────────────
export const booking = {
  number: "08",
  label: "Reservations",
  title: "Reserve your stay",
  description: "Send your dates and we'll confirm availability and our best rate on WhatsApp, usually within the hour.",
  maxGuests: 8,
}
