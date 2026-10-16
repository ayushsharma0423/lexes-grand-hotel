import type { MetadataRoute } from "next"

import { hotel } from "@/content/hotel"

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: hotel.url, changeFrequency: "monthly", priority: 1 }]
}
