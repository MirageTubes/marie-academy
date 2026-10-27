// Every photo slot on the site. Files live in /public/images and are downloaded by
// `npm run photos` (scripts/fetch-photos.mjs). Replace any file with the academy's own photography.
// A missing file falls back to a branded placeholder, so the site never shows a broken image.

export const images = {
  hero: { src: "/images/hero.jpg", alt: "A ballerina performing alone under stage lights in a darkened theatre" },
  about: { src: "/images/about.jpg", alt: "Young ballet students reaching up with their teacher at the barre" },
  dance: { src: "/images/dance.jpg", alt: "A dancer holding an arabesque in a sunlit studio" },
  drama: { src: "/images/drama.jpg", alt: "Two actors kneeling face to face on a bare stage under a spotlight" },
  music: { src: "/images/music.jpg", alt: "A violinist performing with a chamber orchestra" },
  danceClass: { src: "/images/dance-class.jpg", alt: "A ballet teacher guiding two young students' arm positions" },
  dramaClass: { src: "/images/drama-class.jpg", alt: "A director coaching two actors holding scripts in rehearsal" },
  musicClass: { src: "/images/music-class.jpg", alt: "A teacher helping a young girl at the keyboard" },
  camp: { src: "/images/camp.jpg", alt: "Children dancing together in a bright studio" },
  campDay: { src: "/images/camp-day.jpg", alt: "Children in costume performing on a small curtained stage" },
  admissions: { src: "/images/admissions.jpg", alt: "A teacher coaching a student through a ballet pose" },
  performances: { src: "/images/performances.jpg", alt: "A view from a theatre box toward a red-curtained stage" },
  give: { src: "/images/give.jpg", alt: "A dancer tying the ribbons of her pointe shoes" },
  contact: { src: "/images/contact.jpg", alt: "A bright academy studio with students warming up at the barre" },
} as const;

export type ImageKey = keyof typeof images;

export const storyImage = (slug: string) => ({ src: `/images/news/${slug}.jpg`, alt: "" });
