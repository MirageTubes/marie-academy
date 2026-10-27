import type { Metadata } from "next";
import { StoryCard } from "@/components/cards";
import { images } from "@/content/images";
import { PageHero } from "@/components/media";
import { Container, Section } from "@/components/ui";
import { stories } from "@/content/news";

export const metadata: Metadata = {
  title: "News",
  description: "Student spotlights, performance news, and alumni stories from the academy.",
};

export default function NewsPage() {
  const [featured, ...rest] = stories;
  return (
    <>
      <PageHero eyebrow="News & stories" title="Life at the academy." image={images.hero} />
      <Section>
        <Container>
          <StoryCard story={featured} large />
          <div className="mt-16 grid gap-12 border-t border-ink/10 pt-16 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
