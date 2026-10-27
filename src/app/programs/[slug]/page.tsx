import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventRow } from "@/components/cards";
import { images } from "@/content/images";
import { Artwork, PageHero } from "@/components/media";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { site } from "@/config/site";
import { events } from "@/content/events";
import { getProgram, programs } from "@/content/programs";

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const program = getProgram((await params).slug);
  return program ? { title: `${program.name} Program`, description: program.summary } : {};
}

export default async function ProgramPage({ params }: PageProps<"/programs/[slug]">) {
  const program = getProgram((await params).slug);
  if (!program) notFound();

  const upcoming = events.filter((e) => e.discipline === program.slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={program.kicker} title={program.name} intro={program.summary} image={images[program.slug]}>
        <ButtonLink href={site.applyUrl} variant="gold">
          Apply to {program.name}
        </ButtonLink>
        <ButtonLink href="/contact" variant="light">
          Book a free trial class
        </ButtonLink>
      </PageHero>

      <Section id="overview">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow>Overview</Eyebrow>
            <p className="mt-5 text-2xl leading-relaxed">{program.intro}</p>
            <ul className="mt-8 space-y-3">
              {program.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden className="text-gold-deep">
                    ✦
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <Artwork
            src={images[`${program.slug}Class`].src}
            alt={images[`${program.slug}Class`].alt}
            tone={program.tone}
            label={`${program.name} photo`}
            className="aspect-[4/3] rounded-3xl"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </Container>
      </Section>

      <Section id="tracks" className="bg-white">
        <Container>
          <SectionHeading eyebrow="Classes" title="Tracks & ages" />
          <div className="grid gap-6 md:grid-cols-2">
            {program.tracks.map((t) => (
              <article key={t.name} className="flex gap-6 rounded-3xl bg-ivory p-8">
                <p className="w-20 shrink-0 font-display text-3xl text-gold-deep">{t.ages}</p>
                <div>
                  <h3 className="text-2xl">{t.name}</h3>
                  <p className="mt-2 text-muted">{t.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="faculty">
        <Container>
          <SectionHeading eyebrow="Faculty" title={`Meet the ${program.name.toLowerCase()} faculty`} />
          <ul className="grid gap-8 sm:grid-cols-3">
            {program.faculty.map((f, i) => (
              <li key={i}>
                <Artwork alt={`Portrait of ${f.name}`} label="Portrait" tone={program.tone} className="aspect-[4/5] rounded-3xl" />
                <p className="mt-4 font-display text-2xl">{f.name}</p>
                <p className="text-sm text-muted">{f.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {upcoming.length > 0 && (
        <Section id="performances" className="bg-white">
          <Container>
            <SectionHeading eyebrow="On stage" title={`Upcoming ${program.name.toLowerCase()} performances`} />
            <div className="border-b border-ink/10">
              {upcoming.map((e) => (
                <EventRow key={e.id} event={e} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
