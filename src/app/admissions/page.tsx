import type { Metadata } from "next";
import { images } from "@/content/images";
import { PageHero } from "@/components/media";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Admissions",
  description: "How to join: trial classes, auditions, tuition, scholarships, and the application process.",
};

const steps = [
  { title: "Try a class", text: "Book a free trial or placement class in any discipline." },
  { title: "Apply online", text: "Tell us about the student, their experience, and goals. It takes about ten minutes." },
  { title: "Audition or assess", text: "Pre-Professional and Conservatory Prep tracks audition; all others take a friendly placement class." },
  { title: "Welcome to Marie", text: "Receive your offer and schedule within two weeks, then join us for orientation." },
];

const auditions = [
  { date: "January 16, 2027", tracks: "Dance — Pre-Professional", note: "Bring ballet and contemporary attire" },
  { date: "January 30, 2027", tracks: "Drama — Conservatory Prep", note: "Two contrasting monologues, under 2 minutes each" },
  { date: "February 13, 2027", tracks: "Music — Advanced & Ensembles", note: "Two contrasting pieces and scales" },
];

const tuition = [
  { name: "Early Years", price: "$95", per: "per month", detail: "One 45-minute class weekly" },
  { name: "Junior & Senior", price: "$160", per: "per month", detail: "Two classes weekly + termly showcase" },
  { name: "Pre-Professional", price: "$340", per: "per month", detail: "Daily training, productions, and coaching" },
  { name: "Private Music Lessons", price: "$65", per: "per 45 min", detail: "Billed monthly; recital included" },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        image={images.admissions}
        title="Your first step onto our stage."
        intro="Applications are open year-round. Most students begin with a free trial class — no experience required for our foundation programs."
      >
        <ButtonLink href="#apply" variant="gold">
          Start an application
        </ButtonLink>
        <ButtonLink href="#auditions" variant="light">
          Audition dates
        </ButtonLink>
      </PageHero>

      <Section id="steps">
        <Container>
          <SectionHeading eyebrow="How it works" title="Four steps to joining" />
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-3xl border border-ink/10 bg-white p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-ink font-display text-xl text-gold">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-2xl">{s.title}</h3>
                <p className="mt-3 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="auditions" className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="Auditions"
            title="Spring 2027 audition dates"
            intro="Auditions are relaxed, supportive, and include a short class so we can see every student at their best."
          />
          <div className="overflow-hidden rounded-3xl border border-ink/10">
            <table className="w-full text-left">
              <thead className="bg-ink text-white">
                <tr>
                  <th scope="col" className="eyebrow px-6 py-4">Date</th>
                  <th scope="col" className="eyebrow px-6 py-4">Program</th>
                  <th scope="col" className="eyebrow hidden px-6 py-4 md:table-cell">What to prepare</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {auditions.map((a) => (
                  <tr key={a.date}>
                    <td className="px-6 py-5 font-display text-xl">{a.date}</td>
                    <td className="px-6 py-5 font-semibold">
                      {a.tracks}
                      <span className="mt-1 block text-sm font-normal text-muted md:hidden">{a.note}</span>
                    </td>
                    <td className="hidden px-6 py-5 text-muted md:table-cell">{a.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section id="tuition">
        <Container>
          <SectionHeading
            eyebrow="Tuition & financial aid"
            title="Transparent tuition. Generous aid."
            intro="Placeholder pricing — update with the academy’s real rates. Sibling discounts apply automatically."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tuition.map((t) => (
              <div key={t.name} className="rounded-3xl bg-white p-8">
                <p className="eyebrow text-muted">{t.name}</p>
                <p className="mt-4 font-display text-5xl">{t.price}</p>
                <p className="text-sm text-muted">{t.per}</p>
                <p className="mt-5 border-t border-ink/10 pt-5 text-sm">{t.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-3xl bg-gold p-8 sm:flex sm:items-center sm:justify-between sm:p-10">
            <div>
              <h3 className="text-3xl">Scholarships available</h3>
              <p className="mt-2 max-w-xl text-ink/75">
                Need-based and merit scholarships cover up to 100% of tuition. Apply alongside your admission form.
              </p>
            </div>
            <ButtonLink href="/contact" className="mt-6 sm:mt-0">
              Ask about aid
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section id="apply" className="bg-ink text-white">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow className="text-gold">Apply</Eyebrow>
            <h2 className="mt-4 text-4xl sm:text-6xl">Ready when you are.</h2>
            <p className="mt-5 max-w-lg text-lg text-white/70">
              Start with a message and our admissions team will send the application, schedule a trial class, and
              answer every question along the way.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl border border-white/15 p-8">
            <ButtonLink href="/contact" variant="gold">
              Start your application
            </ButtonLink>
            <a href={`mailto:${site.admissionsEmail}`} className="text-center text-white/80 hover:text-gold">
              or email {site.admissionsEmail}
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
