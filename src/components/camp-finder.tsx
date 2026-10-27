"use client";

import { useState } from "react";
import type { CampSession } from "@/content/camp";

const ages = Array.from({ length: 13 }, (_, i) => i + 6);

export function CampFinder({ sessions }: { sessions: CampSession[] }) {
  const [age, setAge] = useState<number | null>(null);
  const matches = (s: CampSession) => age === null || (age >= s.minAge && age <= s.maxAge);
  const count = sessions.filter(matches).length;

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 rounded-3xl bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <label htmlFor="camp-age" className="font-display text-2xl">
            How old is your camper this summer?
          </label>
          <p aria-live="polite" className="mt-1 text-sm text-muted">
            {age === null ? `${sessions.length} sessions for ages 6–17` : `${count} session${count === 1 ? "" : "s"} for age ${age}`}
          </p>
        </div>
        <select
          id="camp-age"
          value={age ?? ""}
          onChange={(e) => setAge(e.target.value ? Number(e.target.value) : null)}
          className="rounded-full border border-ink/20 bg-ivory px-5 py-3 text-base font-semibold focus:border-ink focus:outline-none"
        >
          <option value="">Any age</option>
          {ages.map((a) => (
            <option key={a} value={a}>
              Age {a}
            </option>
          ))}
        </select>
      </div>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((s) => {
          const on = matches(s);
          return (
            <li
              key={s.id}
              className={`flex flex-col rounded-3xl border bg-white p-7 transition-opacity ${
                on ? "border-ink/10" : "border-transparent opacity-35"
              }`}
              aria-hidden={!on || undefined}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="eyebrow text-gold-deep">Ages {s.minAge}–{s.maxAge}</p>
                {s.spotsLeft <= 5 && (
                  <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                    {s.spotsLeft} spots left
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-3xl">{s.name}</h3>
              <p className="mt-1 text-sm font-semibold">{s.dates}</p>
              <p className="mt-4 flex-1 text-muted">{s.description}</p>
              <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-ink/10 pt-5 text-sm">
                <div>
                  <dt className="text-muted">Focus</dt>
                  <dd className="font-semibold">{s.focus}</dd>
                </div>
                <div>
                  <dt className="text-muted">Daily</dt>
                  <dd className="font-semibold">{s.hours}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-muted">Tuition</dt>
                  <dd>
                    <span className="font-display text-2xl">${s.earlyBird}</span>{" "}
                    <span className="text-muted line-through">${s.price}</span>{" "}
                    <span className="text-xs font-semibold text-gold-deep">early bird</span>
                  </dd>
                </div>
              </dl>
              <a
                href="#register"
                tabIndex={on ? undefined : -1}
                className="mt-6 inline-flex justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink-soft"
              >
                Reserve a place
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
