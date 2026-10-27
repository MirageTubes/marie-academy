"use client";

import { useMemo, useState } from "react";
import { disciplineLabel, type AcademyEvent } from "@/content/events";
import { EventRow } from "./event-row";

const filters = ["all", "dance", "drama", "music", "academy"] as const;
type Filter = (typeof filters)[number];

export function EventBrowser({ events }: { events: AcademyEvent[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter(
      (e) =>
        (filter === "all" || e.discipline === filter) &&
        (!q || `${e.title} ${e.description} ${e.venue}`.toLowerCase().includes(q)),
    );
  }, [events, filter, query]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by discipline" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                filter === f ? "border-ink bg-ink text-white" : "border-ink/20 hover:border-ink"
              }`}
            >
              {f === "all" ? "All events" : disciplineLabel[f]}
            </button>
          ))}
        </div>
        <label className="relative block md:w-72">
          <span className="sr-only">Search events</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events"
            className="w-full rounded-full border border-ink/20 bg-white px-5 py-2.5 focus:border-ink focus:outline-none"
          />
        </label>
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} events shown
      </p>
      {visible.length ? (
        <div className="border-b border-ink/10">
          {visible.map((e) => (
            <EventRow key={e.id} event={e} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-ink/20 p-10 text-center text-muted">
          No events match. Try another filter or search term.
        </p>
      )}
    </div>
  );
}
