import type { Metadata } from "next";
import { CampFinder } from "@/components/camp-finder";
import { CampRegistrationForm } from "@/components/forms";
import { images } from "@/content/images";
import { Artwork, PageHero } from "@/components/media";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { site } from "@/config/site";
import { campDay, campFaqs, campSessions, campYear, earlyBirdDeadline } from "@/content/camp";

export const metadata: Metadata = {
  title: `Summer Camp ${campYear}`,
  description: `Dance, drama, and music summer camps for ages 6 to 17. Early-bird pricing until ${earlyBirdDeadline}.`,
};

export default function CampPage() {
  return (
    <>
      <PageHero
        eyebrow={`Summer Camp ${campYear}`}
        image={images.camp}
        title="One summer. Endless encores."
        intro={`Themed day camps and intensives for ages 6 to 17, each ending in a performance for families. Save with early-bird pricing until ${earlyBirdDeadline}.`}
      >
        <ButtonLink href="#sessions" variant="gold">
          Find a session
        </ButtonLink>
        <ButtonLink href="#register" variant="light">
          Register
        </ButtonLink>
      </PageHero>

      <Section id="sessions">
        <Container>
          <SectionHeading eyebrow="Sessions" title="Choose your camp" />
          <CampFinder sessions={campSessions} />
        </Container>
      </Section>

      <Section id="day" className="bg-white">
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>A day at camp</Eyebrow>
            <h2 className="mt-4 text-4xl sm:text-5xl">Busy, creative, and full of applause.</h2>
            <ol className="mt-10 border-l border-ink/15">
              {campDay.map((slot) => (
                <li key={slot.time} className="relative pb-6 pl-8 last:pb-0">
                  <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-gold" />
                  <p className="font-display text-xl">{slot.time}</p>
                  <p className="text-muted">{slot.label}</p>
                </li>
              ))}
            </ol>
          </div>
          <Artwork src={images.campDay.src} alt={images.campDay.alt} label="Camp photo" tone="from-amber-900 via-stone-900 to-ink" className="aspect-[4/5] rounded-3xl" />
        </Container>
      </Section>

      <Section id="faq">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Camp FAQ" />
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {campFaqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl sm:text-2xl">
                  {f.q}
                  <span aria-hidden className="text-2xl text-gold-deep transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="register" className="bg-stone">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Register</Eyebrow>
            <h2 className="mt-4 text-4xl sm:text-5xl">Reserve a place.</h2>
            <p className="mt-5 text-muted">
              Reserving holds a spot for 7 days while we send payment details. Questions? Email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
          </div>
          <div className="rounded-3xl bg-ivory p-6 sm:p-10">
            <CampRegistrationForm sessions={campSessions} />
          </div>
        </Container>
      </Section>
    </>
  );
}
