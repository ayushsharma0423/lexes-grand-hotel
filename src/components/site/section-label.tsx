import { cn } from "@/lib/utils"

/** "01 — The Hotel": the numbered section marker used down the left of every section. */
export function SectionLabel({ number, label, className }: { number: string; label: string; className?: string }) {
  return (
    <p className={cn("label flex items-center gap-3 text-muted-foreground", className)}>
      <span className="text-primary tabular-nums">{number}</span>
      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      {label}
    </p>
  )
}
