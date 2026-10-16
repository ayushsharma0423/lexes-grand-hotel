import type { Metadata, Viewport } from "next"
import { Instrument_Serif, Inter_Tight } from "next/font/google"

import { Providers } from "@/components/providers"
import { WhatsAppFab } from "@/components/site/whatsapp-fab"
import { hotel } from "@/content/hotel"
import "./globals.css"

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
})

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
})

const title = `${hotel.name} | ${hotel.category} in ${hotel.address.city}`

export const metadata: Metadata = {
  metadataBase: new URL(hotel.url),
  title: { default: title, template: `%s | ${hotel.name}` },
  description: hotel.shortDescription,
  keywords: [
    `${hotel.address.city} hotel`,
    "heritage hotel",
    "business hotel Midtown",
    "hotel near Grand Central",
    "rooftop pool",
    "wedding banquet hall",
    "vegetarian restaurant",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: hotel.name,
    title,
    description: hotel.shortDescription,
    locale: "en_US",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${hotel.name}, ${hotel.address.city}` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: hotel.shortDescription,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#f4efe7",
  colorScheme: "light",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${interTight.variable} antialiased`}
    >
      <body className="min-h-dvh overflow-x-clip">
        <Providers>
          {children}
          <WhatsAppFab />
        </Providers>
      </body>
    </html>
  )
}
