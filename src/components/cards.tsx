import Link from "next/link";
import { storyImage } from "@/content/images";
import { formatStoryDate, type Story } from "@/content/news";
import type { Program } from "@/content/programs";
import { Artwork } from "./media";

export { EventRow } from "./event-row";

export function ProgramCard({ program, index }: { program: Program; index: number }) {
  return (
    <Link href={`/programs/${program.slug}`} className="group block">
      <Artwork
        src={program.image}
        alt={`${program.name} students in performance`}
        tone={program.tone}
        className="aspect-[4/5] rounded-3xl transition-transform duration-500 group-hover:scale-[0.98]"
      />
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-muted">0{index + 1}</p>
          <h3 className="mt-2 text-3xl">{program.name}</h3>
          <p className="mt-2 text-sm text-muted">{program.kicker}</p>
        </div>
        <span
          aria-hidden
          className="mt-8 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors group-hover:bg-ink group-hover:text-white"
        >
          →
        </span>
      </div>
    </Link>
  );
}

export function StoryCard({ story, large = false }: { story: Story; large?: boolean }) {
  return (
    <Link href={`/news/${story.slug}`} className="group block">
      <Artwork
        src={story.image ?? storyImage(story.slug).src}
        alt=""
        tone="from-stone-800 via-neutral-900 to-amber-950"
        className={`${large ? "aspect-[16/10]" : "aspect-[4/3]"} rounded-3xl`}
        sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
      />
      <p className="eyebrow mt-5 text-gold-deep">
        {story.category} · <time dateTime={story.date}>{formatStoryDate(story.date)}</time>
      </p>
      <h3 className={`mt-3 leading-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 ${large ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
        {story.title}
      </h3>
      {large && <p className="mt-3 text-muted">{story.excerpt}</p>}
    </Link>
  );
}
