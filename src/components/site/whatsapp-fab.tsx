import { siWhatsapp } from "simple-icons"

import { whatsappLink } from "@/lib/links"

/** Floating WhatsApp button, rendered from the root layout so it appears on every page. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg shadow-black/20 transition-transform duration-200 outline-none animate-in fade-in zoom-in-90 fill-mode-both [animation-delay:1s] hover:scale-105 focus-visible:ring-4 focus-visible:ring-whatsapp/50 sm:right-6 sm:bottom-6"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="size-7 fill-current">
        <path d={siWhatsapp.path} />
      </svg>
      <span className="sr-only">WhatsApp us</span>
    </a>
  )
}
