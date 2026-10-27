export type CampSession = {
  id: string;
  name: string;
  dates: string;
  minAge: number;
  maxAge: number;
  focus: string;
  description: string;
  hours: string;
  price: number;
  earlyBird: number;
  spotsLeft: number;
};

// Placeholder 2027 season — replace dates, prices, and capacity.
export const campYear = 2027;
export const earlyBirdDeadline = "January 31, 2027";

export const campSessions: CampSession[] = [
  {
    id: "little-stars",
    name: "Little Stars",
    dates: "June 21 – 25",
    minAge: 6,
    maxAge: 9,
    focus: "Dance · Drama · Music sampler",
    description: "A joyful first taste of every art form, ending in a Friday mini-show for families.",
    hours: "9:00 – 15:00",
    price: 395,
    earlyBird: 345,
    spotsLeft: 14,
  },
  {
    id: "ballet-intensive",
    name: "Ballet Intensive",
    dates: "June 28 – July 9",
    minAge: 11,
    maxAge: 17,
    focus: "Dance",
    description: "Two weeks of daily technique, pointe, variations, and contemporary repertoire.",
    hours: "9:00 – 16:00",
    price: 890,
    earlyBird: 790,
    spotsLeft: 9,
  },
  {
    id: "musical-theatre",
    name: "Musical Theatre Intensive",
    dates: "July 12 – 23",
    minAge: 10,
    maxAge: 17,
    focus: "Drama · Voice · Dance",
    description: "Rehearse and perform a full junior musical in two weeks, with live accompaniment.",
    hours: "9:00 – 16:00",
    price: 920,
    earlyBird: 820,
    spotsLeft: 18,
  },
  {
    id: "young-musicians",
    name: "Young Musicians Week",
    dates: "July 26 – 30",
    minAge: 8,
    maxAge: 14,
    focus: "Music",
    description: "Chamber groups, choir, and composition games, closing with a family concert.",
    hours: "9:00 – 15:00",
    price: 420,
    earlyBird: 370,
    spotsLeft: 20,
  },
  {
    id: "screen-acting",
    name: "Screen Acting Lab",
    dates: "August 2 – 6",
    minAge: 12,
    maxAge: 17,
    focus: "Drama",
    description: "On-camera technique, self-tapes, and a short film shot and screened on Friday.",
    hours: "10:00 – 16:00",
    price: 460,
    earlyBird: 410,
    spotsLeft: 3,
  },
];

export const campDay = [
  { time: "8:30", label: "Supervised drop-off" },
  { time: "9:00", label: "Warm-up & technique" },
  { time: "10:30", label: "Specialty workshop" },
  { time: "12:00", label: "Lunch & outdoor break" },
  { time: "13:00", label: "Rehearsal for the showcase" },
  { time: "15:00", label: "Pick-up (extended care to 17:30)" },
];

export const campFaqs = [
  {
    q: "Does my child need prior experience?",
    a: "No. Little Stars and Young Musicians welcome complete beginners. Intensives list a suggested level on registration, and faculty place students into groups on day one.",
  },
  {
    q: "Is extended care available?",
    a: "Yes — supervised extended care runs until 17:30 for a small daily fee. Select it on the registration form.",
  },
  {
    q: "What should campers bring?",
    a: "A labeled water bottle, packed lunch, and clothes they can move in. Dancers need ballet shoes; we send a full list after registration.",
  },
  {
    q: "Are there sibling discounts or scholarships?",
    a: "Siblings receive 10% off each additional registration, and need-based scholarships are available. Ask on the form or email us.",
  },
  {
    q: "What is the refund policy?",
    a: "Full refunds until May 1, 50% until June 1. After that we offer credit toward classes or a future camp.",
  },
];
