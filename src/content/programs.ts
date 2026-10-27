export type Discipline = "dance" | "drama" | "music";

export type Program = {
  slug: Discipline;
  name: string;
  kicker: string;
  summary: string;
  intro: string;
  /** Optional photo in /public; a styled placeholder is shown until one is added. */
  image?: string;
  tone: string;
  tracks: { name: string; ages: string; description: string }[];
  highlights: string[];
  faculty: { name: string; role: string }[];
};

export const programs: Program[] = [
  {
    slug: "dance",
    image: "/images/dance.jpg",
    name: "Dance",
    kicker: "Ballet · Contemporary · Jazz · Hip-Hop",
    summary:
      "Classical foundations and contemporary voice, from first pliés to pre-professional company work.",
    intro:
      "Our dance division pairs rigorous classical technique with choreographic exploration. Students train daily with working artists, perform on our main stage each season, and graduate ready for conservatories, companies, and commercial work.",
    tone: "from-neutral-900 via-neutral-800 to-amber-900",
    tracks: [
      { name: "Foundations", ages: "4–7", description: "Creative movement, rhythm, and joyful first ballet steps." },
      { name: "Graded Ballet", ages: "8–14", description: "Syllabus-based ballet with optional exams and pointe readiness." },
      { name: "Pre-Professional", ages: "13–18", description: "Daily technique, repertoire, partnering, and choreography labs." },
      { name: "Adult Open Classes", ages: "18+", description: "Drop-in ballet, contemporary, and jazz at every level." },
    ],
    highlights: ["Two full-length productions a year", "Pointe & partnering intensives", "Guest masterclasses with company artists"],
    faculty: [
      { name: "Faculty Name", role: "Director of Dance" },
      { name: "Faculty Name", role: "Ballet Mistress" },
      { name: "Faculty Name", role: "Contemporary Lead" },
    ],
  },
  {
    slug: "drama",
    image: "/images/drama.jpg",
    name: "Drama",
    kicker: "Acting · Musical Theatre · Voice · Screen",
    summary:
      "Ensemble-driven actor training for stage and screen, rooted in craft, text, and fearless play.",
    intro:
      "Drama students build a full actor's toolkit — voice, movement, text analysis, and on-camera technique — in small ensembles. Every year ends in a fully staged production, and senior students prepare audition books for college and professional programs.",
    tone: "from-stone-900 via-rose-950 to-neutral-900",
    tracks: [
      { name: "Story & Play", ages: "5–8", description: "Imagination, storytelling, and confidence through drama games." },
      { name: "Young Actors", ages: "9–13", description: "Scene work, improvisation, and a showcase each term." },
      { name: "Musical Theatre", ages: "11–18", description: "Singing, dancing, and acting combined into full productions." },
      { name: "Conservatory Prep", ages: "15–18", description: "Monologues, audition coaching, and screen acting." },
    ],
    highlights: ["Annual musical and straight play", "On-camera studio sessions", "College audition coaching"],
    faculty: [
      { name: "Faculty Name", role: "Director of Drama" },
      { name: "Faculty Name", role: "Musical Theatre Lead" },
      { name: "Faculty Name", role: "Voice & Speech" },
    ],
  },
  {
    slug: "music",
    image: "/images/music.jpg",
    name: "Music",
    kicker: "Piano · Strings · Voice · Winds · Composition",
    summary:
      "Private lessons, chamber ensembles, and theory for musicians who want to play with purpose.",
    intro:
      "Music students combine weekly private instruction with ensembles, theory, and performance classes. From first lessons to concerto competitions, every musician gets a personal plan and regular chances to perform for real audiences.",
    tone: "from-neutral-950 via-slate-900 to-amber-950",
    tracks: [
      { name: "First Notes", ages: "4–7", description: "Musicianship, singing, and early keyboard in small groups." },
      { name: "Private Study", ages: "7+", description: "Weekly one-to-one lessons on piano, strings, voice, or winds." },
      { name: "Ensembles", ages: "10–18", description: "Chamber groups, choir, and the academy orchestra." },
      { name: "Advanced Musicianship", ages: "14–18", description: "Theory, composition, and competition preparation." },
    ],
    highlights: ["Seasonal recitals and concerto night", "Graded exam preparation", "Recording studio access"],
    faculty: [
      { name: "Faculty Name", role: "Director of Music" },
      { name: "Faculty Name", role: "Piano Faculty" },
      { name: "Faculty Name", role: "Strings & Orchestra" },
    ],
  },
];

export function getProgram(slug: string) {
  return programs.find((p) => p.slug === slug);
}
