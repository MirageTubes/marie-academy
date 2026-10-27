import { disciplineLabel, formatEventDate, type AcademyEvent } from "@/content/events";

export function EventRow({ event, dark = false }: { event: AcademyEvent; dark?: boolean }) {
  const d = formatEventDate(event.start);
  return (
    <article className={`grid gap-5 border-t py-7 ${dark ? "border-white/10" : "border-ink/10"} sm:grid-cols-[6rem_1fr_auto] sm:items-center`}>
      <div className="flex items-baseline gap-3 sm:block">
        <p className={`eyebrow ${dark ? "text-gold" : "text-gold-deep"}`}>{d.month}</p>
        <p className="font-display text-5xl leading-none">{d.day}</p>
      </div>
      <div>
        <p className={`eyebrow ${dark ? "text-white/50" : "text-muted"}`}>
          {disciplineLabel[event.discipline]} · {event.venue}
        </p>
        <h3 className="mt-2 text-2xl sm:text-3xl">{event.title}</h3>
        <p className={`mt-2 max-w-2xl ${dark ? "text-white/65" : "text-muted"}`}>{event.description}</p>
        <p className="mt-3 text-sm font-semibold">
          <time dateTime={event.start.replace("Z", "")}>
            {d.weekday}, {d.time}
          </time>{" "}
          · {event.price}
        </p>
      </div>
      {event.ticketUrl && (
        <a
          href={event.ticketUrl}
          className={`inline-flex w-fit items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition-colors ${dark ? "border-white/30 hover:bg-white hover:text-ink" : "border-ink/25 hover:bg-ink hover:text-white"}`}
          aria-label={`Tickets for ${event.title}`}
        >
          {event.price.startsWith("Free") ? "RSVP" : "Tickets"}
        </a>
      )}
    </article>
  );
}
