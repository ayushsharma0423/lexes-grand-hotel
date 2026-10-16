import { rooms, roomsSection } from "@/content/hotel"

import { Reveal } from "./reveal"
import { RoomRow } from "./room-row"
import { SectionLabel } from "./section-label"

export function Rooms() {
  return (
    <section id="rooms" aria-labelledby="rooms-title" className="border-t border-foreground/15 py-24 sm:py-36">
      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-4 sm:gap-28 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionLabel number={roomsSection.number} label={roomsSection.label} className="lg:col-span-3 lg:pt-4" />
          <Reveal className="flex flex-col gap-5 lg:col-span-9">
            <h2 id="rooms-title" className="text-5xl leading-none sm:text-7xl">
              {roomsSection.title}
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">{roomsSection.intro}</p>
          </Reveal>
        </div>

        {rooms.map((room, i) => (
          <RoomRow key={room.id} room={room} index={i} total={rooms.length} />
        ))}
      </div>
    </section>
  )
}
