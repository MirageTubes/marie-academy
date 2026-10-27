import type { Metadata } from "next";
import { images } from "@/content/images";
import { Artwork, PageHero } from "@/components/media";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `The mission, values, and people behind ${site.name}.`,
};

const values = [
  { title: "Craft first", text: "Technique is the foundation of freedom. We teach it patiently, precisely, and joyfully." },
  { title: "Real stages", text: "Every student performs for a live audience every year, because art is meant to be shared." },
  { title: "Every artist belongs", text: "Scholarships, sliding-scale tuition, and adaptive classes keep our doors open to all." },
  { title: "Working artists teach", text: "Our faculty perform, choreograph, and direct professionally, and they bring that world into class." },
];

const leadership = [
  { name: "Founder Name", role: "Founder & Artistic Director" },
  { name: "Leader Name", role: "Executive Director" },
  { name: "Leader Name", role: "Dean of Students" },
  { name: "Leader Name", role: "Director of Admissions" },
];

const timeline = [
  { year: "Founded", text: "The academy opens with one studio and a handful of ballet students." },
  { year: "Growth", text: "Drama and music divisions join, and the first full-length production sells out." },
  { year: "Today", text: "Hundreds of students, three divisions, and a season of more than 40 performances." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the academy"
        image={images.about}
        title="A home for the next generation of performers."
        intro={site.description}
      />

      <Section id="mission">
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Artwork src={images.contact.src} alt={images.contact.alt} label="Studio photo" className="aspect-[4/3] rounded-3xl" />
          <div>
            <Eyebrow>Our mission</Eyebrow>
            <p className="mt-5 font-display text-3xl leading-snug sm:text-4xl">
              To train artists of every age with the rigor of a conservatory and the warmth of a family, and to give
              every one of them a stage.
            </p>
            <p className="mt-6 text-lg text-muted">
              Placeholder: share the founder’s story here: why Marie began, who it serves, and what makes it
              different from every other school in town.
            </p>
          </div>
        </Container>
      </Section>

      <Section id="values" className="bg-white">
        <Container>
          <SectionHeading eyebrow="What we believe" title="Our values" />
          <div className="grid gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-2">
            {values.map((v, i) => (
              <div key={v.title} className="bg-white p-8 sm:p-10">
                <p className="font-display text-gold-deep">0{i + 1}</p>
                <h3 className="mt-3 text-3xl">{v.title}</h3>
                <p className="mt-3 text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="story">
        <Container>
          <SectionHeading eyebrow="Our story" title="From one studio to a full academy" />
          <ol className="grid gap-8 md:grid-cols-3">
            {timeline.map((t) => (
              <li key={t.year} className="border-t-2 border-ink pt-6">
                <p className="eyebrow text-gold-deep">{t.year}</p>
                <p className="mt-3 text-lg">{t.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="leadership" className="bg-white">
        <Container>
          <SectionHeading eyebrow="Leadership" title="The people behind the curtain" />
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((p, i) => (
              <li key={i}>
                <Artwork alt={`Portrait of ${p.name}`} label="Portrait" className="aspect-[3/4] rounded-3xl" />
                <p className="mt-4 font-display text-2xl">{p.name}</p>
                <p className="text-sm text-muted">{p.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container className="text-center">
          <h2 className="text-4xl sm:text-5xl">Come see us in the studio.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">Tours run weekly, and every program offers a free trial class.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">Book a visit</ButtonLink>
            <ButtonLink href="/programs" variant="outline">
              Explore programs
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
