export type Story = {
  slug: string;
  title: string;
  date: string;
  category: "Student Spotlight" | "Performance" | "Academy News" | "Alumni";
  excerpt: string;
  image?: string;
  body: string[];
};

// Placeholder stories — replace with real news.
export const stories: Story[] = [
  {
    slug: "pre-professional-dancers-win-regional",
    title: "Pre-Professional dancers take top honors at regional ballet competition",
    date: "2026-10-12",
    category: "Student Spotlight",
    excerpt: "Six students placed in the classical and contemporary categories, with two invited to international finals.",
    body: [
      "Placeholder story text. Describe the competition, the students involved, and what the result means for the academy.",
      "Add a quote from the director of dance and from one of the students, then close with what comes next for the group.",
    ],
  },
  {
    slug: "summer-camp-registration-opens",
    title: "Summer Camp 2027 registration is open",
    date: "2026-10-01",
    category: "Academy News",
    excerpt: "Four themed weeks for ages 6–17, plus a new two-week musical theatre intensive. Early-bird pricing ends January 31.",
    body: [
      "Placeholder story text. Summarize the camp sessions, the new intensive, and early-bird pricing.",
      "Link readers to the Summer Camp page to compare sessions and register.",
    ],
  },
  {
    slug: "alumna-joins-national-company",
    title: "Alumna joins a national touring company",
    date: "2026-09-18",
    category: "Alumni",
    excerpt: "A graduate of our Musical Theatre track reflects on the training that prepared her for the professional stage.",
    body: [
      "Placeholder story text. Share the alum's journey from first class to professional contract.",
      "Include advice for current students and a photo from rehearsal.",
    ],
  },
  {
    slug: "new-recital-hall-season",
    title: "A new season in the Recital Hall",
    date: "2026-09-02",
    category: "Performance",
    excerpt: "Twelve concerts, three productions, and our first Concerto Night with full orchestra.",
    body: [
      "Placeholder story text. Preview the season's highlights and how to get tickets.",
    ],
  },
];

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug);
}

export function formatStoryDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
