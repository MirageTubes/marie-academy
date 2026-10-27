import type { Metadata } from "next";
import { ProgramCard } from "@/components/cards";
import { images } from "@/content/images";
import { PageHero } from "@/components/media";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { programs } from "@/content/programs";

export const metadata: Metadata = {
  title: "Programs",
  description: "Dance, drama, and music programs for ages four to adult, from first classes to pre-professional training.",
};

const levels = [
  { name: "Early Years", ages: "4 to 7", text: "Playful foundations in movement, music, and storytelling." },
  { name: "Junior", ages: "8 to 12", text: "Structured technique with termly showcases." },
  { name: "Senior and Pre-Professional", ages: "13 to 18", text: "Intensive training, productions, and audition prep." },
  { name: "Adult", ages: "18+", text: "Open classes and ensembles at every level." },
];

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        image={images.performances}
        title="Find your discipline. Then find your voice."
        intro="Every program combines weekly technique, expert feedback, and real performance opportunities."
      >
        <ButtonLink href="/admissions" variant="gold">
          How to join
        </ButtonLink>
        <ButtonLink href="/camp" variant="light">
          Summer Camp
        </ButtonLink>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-10 md:grid-cols-3">
            {programs.map((p, i) => (
              <ProgramCard key={p.slug} program={p} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="Pathways"
            title="A clear path at every age"
            intro="Students move up by readiness, not just birthday. Faculty review progress each term."
          />
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {levels.map((l, i) => (
              <li key={l.name} className="rounded-3xl bg-ivory p-8">
                <p className="font-display text-5xl text-gold">{i + 1}</p>
                <h3 className="mt-4 text-2xl">{l.name}</h3>
                <p className="eyebrow mt-2 text-muted">Ages {l.ages}</p>
                <p className="mt-4 text-muted">{l.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
