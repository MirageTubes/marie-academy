import type { Discipline } from "./programs";

export type AcademyEvent = {
  id: string;
  title: string;
  /** Wall-clock start time at the venue, stored as UTC so it formats identically everywhere. */
  start: string;
  discipline: Discipline | "academy";
  venue: string;
  description: string;
  price: string;
  ticketUrl?: string;
};

// Placeholder season — replace with the real calendar.
export const events: AcademyEvent[] = [
  {
    id: "winter-showcase",
    title: "Winter Dance Showcase",
    start: "2026-12-12T19:00:00Z",
    discipline: "dance",
    venue: "Main Stage",
    description: "Pre-professional dancers perform classical excerpts and new contemporary work.",
    price: "$18 · Students $10",
    ticketUrl: "#",
  },
  {
    id: "holiday-concert",
    title: "Holiday Strings & Choir Concert",
    start: "2026-12-18T18:30:00Z",
    discipline: "music",
    venue: "Recital Hall",
    description: "Academy orchestra and choir in a festive program for the whole family.",
    price: "Free · RSVP",
    ticketUrl: "#",
  },
  {
    id: "open-house",
    title: "Spring Open House",
    start: "2027-01-23T10:00:00Z",
    discipline: "academy",
    venue: "Whole Campus",
    description: "Tour studios, try free taster classes, and meet faculty before spring enrollment.",
    price: "Free",
    ticketUrl: "#",
  },
  {
    id: "monologue-night",
    title: "Monologue Night",
    start: "2027-02-06T19:00:00Z",
    discipline: "drama",
    venue: "Black Box Studio",
    description: "Conservatory Prep actors present their audition pieces in an intimate evening.",
    price: "$12",
    ticketUrl: "#",
  },
  {
    id: "concerto-night",
    title: "Concerto Night",
    start: "2027-03-13T19:30:00Z",
    discipline: "music",
    venue: "Recital Hall",
    description: "Competition winners perform as soloists with the academy orchestra.",
    price: "$20 · Students $12",
    ticketUrl: "#",
  },
  {
    id: "spring-musical",
    title: "Spring Musical",
    start: "2027-04-17T19:00:00Z",
    discipline: "drama",
    venue: "Main Stage",
    description: "A fully staged musical with live band, featuring students from every division.",
    price: "$22 · Students $14",
    ticketUrl: "#",
  },
  {
    id: "gala",
    title: "Annual Gala & Scholarship Benefit",
    start: "2027-05-08T18:00:00Z",
    discipline: "academy",
    venue: "Main Stage & Foyer",
    description: "An evening of performances supporting student scholarships.",
    price: "From $95",
    ticketUrl: "#",
  },
  {
    id: "spring-ballet",
    title: "Spring Ballet: The Sleeping Beauty (Excerpts)",
    start: "2027-05-22T14:00:00Z",
    discipline: "dance",
    venue: "Main Stage",
    description: "The full dance division in our end-of-year classical production.",
    price: "$20 · Students $12",
    ticketUrl: "#",
  },
];

export const disciplineLabel: Record<AcademyEvent["discipline"], string> = {
  dance: "Dance",
  drama: "Drama",
  music: "Music",
  academy: "Academy",
};

export function formatEventDate(iso: string) {
  const d = new Date(iso);
  const opts = { timeZone: "UTC" } as const;
  return {
    day: d.toLocaleDateString("en-US", { ...opts, day: "numeric" }),
    month: d.toLocaleDateString("en-US", { ...opts, month: "short" }),
    weekday: d.toLocaleDateString("en-US", { ...opts, weekday: "long" }),
    full: d.toLocaleDateString("en-US", { ...opts, weekday: "short", month: "long", day: "numeric", year: "numeric" }),
    time: d.toLocaleTimeString("en-US", { ...opts, hour: "numeric", minute: "2-digit" }),
  };
}
