// Single source of truth for the academy's identity and contact details.
// Swap the placeholder values below — every page reads from here.

export const site = {
  name: "Marie Performing Arts Academy",
  shortName: "Marie Academy",
  tagline: "Where artists become unforgettable.",
  description:
    "Marie Performing Arts Academy trains dancers, actors, and musicians of every age through conservatory-level instruction, live performance, and summer intensives.",
  url: "https://www.marieacademy.example", // TODO: replace with the real domain
  email: "hello@marieacademy.example",
  admissionsEmail: "admissions@marieacademy.example",
  phone: "+1 (555) 010-2024",
  address: {
    street: "100 Placeholder Avenue",
    city: "Your City",
    region: "ST",
    postalCode: "00000",
    country: "US",
  },
  hours: "Mon–Fri 9:00–19:00 · Sat 9:00–15:00",
  donateUrl: "https://donate.example.com/marie-academy", // TODO: payment provider link
  applyUrl: "/admissions#apply",
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
    { label: "Facebook", href: "https://facebook.com/" },
    { label: "TikTok", href: "https://tiktok.com/" },
  ],
} as const;

/** Full-screen menu: every page, with its key sections. `image` keys map to src/content/images.ts. */
export const menu = [
  {
    label: "About",
    href: "/about",
    image: "about",
    blurb: "Our mission, values, and the people behind the curtain.",
    links: [
      { label: "Our mission", href: "/about#mission" },
      { label: "Values", href: "/about#values" },
      { label: "Our story", href: "/about#story" },
      { label: "Leadership", href: "/about#leadership" },
    ],
  },
  {
    label: "Dance",
    href: "/programs/dance",
    image: "dance",
    blurb: "Ballet, contemporary, jazz, and hip-hop from age 4.",
    links: [
      { label: "Overview", href: "/programs/dance#overview" },
      { label: "Tracks & ages", href: "/programs/dance#tracks" },
      { label: "Faculty", href: "/programs/dance#faculty" },
      { label: "Performances", href: "/programs/dance#performances" },
    ],
  },
  {
    label: "Drama",
    href: "/programs/drama",
    image: "drama",
    blurb: "Acting, musical theatre, voice, and screen.",
    links: [
      { label: "Overview", href: "/programs/drama#overview" },
      { label: "Tracks & ages", href: "/programs/drama#tracks" },
      { label: "Faculty", href: "/programs/drama#faculty" },
      { label: "Performances", href: "/programs/drama#performances" },
    ],
  },
  {
    label: "Music",
    href: "/programs/music",
    image: "music",
    blurb: "Private study, ensembles, theory, and composition.",
    links: [
      { label: "Overview", href: "/programs/music#overview" },
      { label: "Tracks & ages", href: "/programs/music#tracks" },
      { label: "Faculty", href: "/programs/music#faculty" },
      { label: "Performances", href: "/programs/music#performances" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    image: "admissions",
    blurb: "Trial classes, auditions, tuition, and scholarships.",
    links: [
      { label: "How to join", href: "/admissions#steps" },
      { label: "Auditions", href: "/admissions#auditions" },
      { label: "Tuition & aid", href: "/admissions#tuition" },
      { label: "Apply", href: "/admissions#apply" },
    ],
  },
  {
    label: "Summer Camp",
    href: "/camp",
    image: "camp",
    blurb: "Themed day camps and intensives for ages 6–17.",
    links: [
      { label: "Sessions", href: "/camp#sessions" },
      { label: "A day at camp", href: "/camp#day" },
      { label: "FAQ", href: "/camp#faq" },
      { label: "Register", href: "/camp#register" },
    ],
  },
  {
    label: "Performances",
    href: "/events",
    image: "performances",
    blurb: "Ballets, plays, musicals, concerts, and the gala.",
    links: [
      { label: "Season calendar", href: "/events" },
      { label: "All programs", href: "/programs" },
    ],
  },
  {
    label: "News",
    href: "/news",
    image: "hero",
    blurb: "Student spotlights, alumni, and academy news.",
    links: [{ label: "Latest stories", href: "/news" }],
  },
  {
    label: "Support Us",
    href: "/give",
    image: "give",
    blurb: "Scholarships that put talent, not income, on stage.",
    links: [
      { label: "Make a gift", href: "/give#donate" },
      { label: "Your impact", href: "/give#impact" },
      { label: "Partner with us", href: "/give#ways" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    image: "contact",
    blurb: "Book a visit, a trial class, or just say hello.",
    links: [{ label: "Get in touch", href: "/contact" }],
  },
] as const;

export const footerNav = [
  {
    title: "Study",
    links: [
      { label: "Dance", href: "/programs/dance" },
      { label: "Drama", href: "/programs/drama" },
      { label: "Music", href: "/programs/music" },
      { label: "Summer Camp", href: "/camp" },
    ],
  },
  {
    title: "Join",
    links: [
      { label: "Admissions", href: "/admissions" },
      { label: "Auditions", href: "/admissions#auditions" },
      { label: "Tuition & Aid", href: "/admissions#tuition" },
      { label: "Apply", href: "/admissions#apply" },
    ],
  },
  {
    title: "Experience",
    links: [
      { label: "Events & Tickets", href: "/events" },
      { label: "News", href: "/news" },
      { label: "About", href: "/about" },
      { label: "Support Us", href: "/give" },
    ],
  },
] as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
