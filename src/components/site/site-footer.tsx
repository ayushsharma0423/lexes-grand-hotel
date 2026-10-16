import { hotel, nav } from "@/content/hotel"
import { emailLink, phoneLink, whatsappLink } from "@/lib/links"

const linkClass =
  "inline-flex min-h-11 items-center rounded-sm text-sm text-foreground/80 underline-offset-4 outline-none hover:text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="label font-sans text-muted-foreground">{title}</h2>
      {children}
    </div>
  )
}

export function SiteFooter() {
  const { street, city, region, postalCode } = hotel.address

  return (
    <footer className="night overflow-hidden pt-20 pb-28 sm:pb-10">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-12 lg:px-8">
        <Column title="Visit">
          <address className="text-sm leading-relaxed text-foreground/80 not-italic">
            {street}
            <br />
            {city}, {region} {postalCode}
          </address>
        </Column>

        <Column title="Contact">
          <ul className="flex flex-col">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp {hotel.contact.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={phoneLink} className={linkClass}>
                {hotel.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={emailLink} className={linkClass}>
                {hotel.contact.email}
              </a>
            </li>
          </ul>
        </Column>

        <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
          <Column title="Explore">
            <ul className="grid grid-cols-2 gap-x-6">
              {[...nav, { label: "Reservations", href: "#booking" }].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Column>
        </nav>

        <Column title="Follow">
          <ul className="flex flex-col">
            {hotel.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Column>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p aria-hidden className="font-heading text-[21vw] leading-[0.8] whitespace-nowrap text-foreground/90 lg:text-[16.5rem]">
          {hotel.name}
        </p>
        <p className="label mt-8 flex flex-col justify-between gap-2 border-t border-border pt-6 text-muted-foreground sm:flex-row">
          <span>
            © {new Date().getFullYear()} {hotel.name}
          </span>
          <span>New York · Est. 1928</span>
        </p>
      </div>
    </footer>
  )
}
