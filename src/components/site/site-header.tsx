"use client"

import { useEffect, useState } from "react"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { hotel, nav } from "@/content/hotel"
import { phoneLink, whatsappLink } from "@/lib/links"
import { cn } from "@/lib/utils"

const linkClass =
  "label rounded-sm text-foreground/75 transition-colors outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const left = nav.slice(0, 3)
  const right = nav.slice(3)

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-300",
        scrolled ? "border-border bg-background/92 backdrop-blur-md" : "border-transparent bg-background/0"
      )}
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-4 sm:h-18 sm:px-6 lg:px-8">
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {left.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#top"
          className="col-start-1 justify-self-start rounded-sm font-heading text-2xl leading-none tracking-wide outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:text-[1.7rem] lg:col-start-2 lg:justify-self-center"
        >
          {hotel.name}
        </a>

        <div className="col-start-3 flex items-center justify-end gap-7">
          <ul className="hidden items-center gap-7 lg:flex">
            {right.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Button render={<a href="#booking" />} nativeButton={false} size="lg" className="label hidden h-10 px-5 sm:inline-flex">
            Book a stay
          </Button>

          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon-xl" className="-mr-3 lg:hidden" aria-label="Open menu" />}>
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] gap-0 bg-background p-0">
              <SheetHeader className="border-b border-border p-6">
                <SheetTitle className="font-heading text-3xl font-normal">{hotel.name}</SheetTitle>
                <SheetDescription className="label">{hotel.address.city} · Est. 1928</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-4">
                <ul className="flex flex-col">
                  {nav.map((item, i) => (
                    <li key={item.href} className="border-b border-border">
                      <SheetClose
                        render={<a href={item.href} />}
                        nativeButton={false}
                        className="flex min-h-14 w-full items-baseline gap-4 font-heading text-3xl outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        <span className="label text-muted-foreground tabular-nums">0{i + 1}</span>
                        {item.label}
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex flex-col gap-3 border-t border-border p-6">
                <SheetClose
                  render={<Button render={<a href="#booking" />} nativeButton={false} size="xl" className="label" />}
                  nativeButton={false}
                >
                  Book a stay
                </SheetClose>
                <div className="flex justify-between text-sm">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                    WhatsApp
                  </a>
                  <a href={phoneLink} className="underline-offset-4 hover:underline">
                    {hotel.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
