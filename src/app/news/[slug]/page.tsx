import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryCard } from "@/components/cards";
import { Artwork } from "@/components/media";
import { storyImage } from "@/content/images";
import { ArrowLink, Container, Section } from "@/components/ui";
import { formatStoryDate, getStory, stories } from "@/content/news";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const story = getStory((await params).slug);
  return story
    ? { title: story.title, description: story.excerpt, openGraph: { type: "article", publishedTime: story.date } }
    : {};
}

export default async function StoryPage({ params }: PageProps<"/news/[slug]">) {
  const story = getStory((await params).slug);
  if (!story) notFound();

  const related = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <>
      <article>
        <Container className="max-w-3xl pt-16 sm:pt-24">
          <ArrowLink href="/news">All news</ArrowLink>
          <p className="eyebrow mt-10 text-gold-deep">
            {story.category} · <time dateTime={story.date}>{formatStoryDate(story.date)}</time>
          </p>
          <h1 className="mt-4 text-4xl leading-tight sm:text-6xl">{story.title}</h1>
          <p className="mt-6 text-xl text-muted">{story.excerpt}</p>
        </Container>
        <Container className="mt-12 max-w-5xl">
          <Artwork src={story.image ?? storyImage(story.slug).src} alt="" label="Story photo" className="aspect-[16/9] rounded-3xl" priority sizes="(min-width: 1024px) 1024px, 100vw" />
        </Container>
        <Container className="max-w-3xl space-y-6 py-14 text-lg leading-relaxed">
          {story.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Container>
      </article>

      <Section className="bg-white">
        <Container>
          <h2 className="mb-10 text-4xl">More stories</h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
