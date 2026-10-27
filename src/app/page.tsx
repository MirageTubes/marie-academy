import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { EventRow, StoryCard } from "@/components/cards";
import { LogoIntro } from "@/components/logo-intro";
import { Artwork, hasImage } from "@/components/media";
import { ArrowLink, ButtonLink, Container, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { site } from "@/config/site";
import { campSessions, campYear, earlyBirdDeadline } from "@/content/camp";
import { events } from "@/content/events";
import { images } from "@/content/images";
import { stories } from "@/content/news";
import { programs } from "@/content/programs";

const stats = [
  { value: "3", label: "Disciplines under one roof" },
  { value: "40+", label: "Performances every season" },
  { value: "4+", label: "From age four to adult" },
  { value: "1:8", label: "Faculty-to-student ratio" },
];

function LearnMore({ href, label, light = false }: { href: string; label: string; light?: boolean }) {
  return (
    <Link
      href={href}
      aria-label={`Learn more about ${label}`}
      className={`group inline-flex items-center gap-4 font-semibold ${light ? "text-white" : "text-ink"}`}
    >
      <span
        aria-hidden
        className={`grid h-12 w-12 place-items-center rounded-full border transition-colors ${
          light
            ? "border-white/40 group-hover:border-gold group-hover:bg-gold group-hover:text-ink"
            : "border-ink/25 group-hover:bg-ink group-hover:text-white"
        }`}
      >
        →
      </span>
      <span className="eyebrow">Learn more</span>
    </Link>
  );
}

/** Large alternating image + text block, one per discipline. */
function Feature({
  index,
  kicker,
  title,
  text,
  href,
  image,
  tone,
  links,
  flip = false,
}: {
  index: number;
  kicker: string;
  title: string;
  text: string;
  href: string;
  image: { src: string; alt: string };
  tone?: string;
  links: { label: string; href: string }[];
  flip?: boolean;
}) {
  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <Link href={href} tabIndex={-1} aria-hidden className={`group relative block lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Artwork
          src={image.src}
          alt={image.alt}
          tone={tone}
          label={title}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="aspect-[4/3] rounded-[2rem] sm:aspect-[16/11]"
          imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <span className="pointer-events-none absolute -top-10 left-6 font-display text-[6rem] leading-none text-gold sm:-top-14 sm:text-[9rem]">
          {String(index).padStart(2, "0")}
        </span>
      </Link>
      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <Eyebrow>{kicker}</Eyebrow>
        <h3 className="mt-4 text-5xl leading-none sm:text-6xl">{title}</h3>
        <p className="mt-6 text-lg text-muted">{text}</p>
        <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="group flex items-center justify-between py-3.5 text-sm font-semibold hover:text-gold-deep">
                {l.label}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <LearnMore href={href} label={title} />
        </div>
      </div>
    </article>
  );
}

/** Full-bleed photographic banner with overlaid copy. */
function Banner({
  image,
  eyebrow,
  title,
  children,
  align = "left",
}: {
  image: { src: string; alt: string };
  eyebrow: string;
  title: string;
  children: ReactNode;
  align?: "left" | "right";
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Artwork src={image.src} alt={image.alt} sizes="100vw" tone="from-amber-950 via-neutral-900 to-ink" className="absolute! inset-0 -z-10" />
      <div
        className={`absolute inset-0 -z-10 ${
          align === "left" ? "bg-gradient-to-r from-ink via-ink/80 to-ink/0" : "bg-gradient-to-l from-ink via-ink/80 to-ink/0"
        }`}
      />
      <Container className={`flex min-h-[38rem] items-center py-24 ${align === "right" ? "justify-end" : ""}`}>
        <div className="max-w-xl">
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h2 className="mt-4 text-5xl leading-none sm:text-7xl">{title}</h2>
          {children}
        </div>
      </Container>
    </section>
  );
}

export default function Home() {
  const [featured, ...moreStories] = stories;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {hasImage(images.hero.src) ? (
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover object-[70%_center]"
          />
        ) : (
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_30%,rgba(201,161,90,0.35),transparent_55%)]" />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/65 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-transparent" />

        <Container className="flex min-h-[calc(100svh-5rem)] flex-col justify-end pb-14 pt-24 sm:pb-20">
          <p className="eyebrow animate-rise text-gold">Dance · Drama · Music</p>
          <h1 className="animate-rise mt-6 max-w-5xl text-[3.4rem] leading-[0.95] [animation-delay:100ms] sm:text-8xl xl:text-[8.5rem]">
            Where artists become <em className="text-gold">unforgettable.</em>
          </h1>
          <p className="animate-rise mt-8 max-w-xl text-lg text-white/75 [animation-delay:200ms] sm:text-xl">
            Conservatory-level training for every age, taught by working artists and proven on a real stage.
          </p>
          <div className="animate-rise mt-10 flex flex-wrap gap-3 [animation-delay:300ms]">
            <ButtonLink href={site.applyUrl} variant="gold">
              Apply for 2027
            </ButtonLink>
            <ButtonLink href="/events" variant="light">
              See a performance
            </ButtonLink>
          </div>
          <dl className="animate-rise mt-16 grid grid-cols-2 gap-y-8 border-t border-white/15 pt-8 [animation-delay:400ms] lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-white/60">{s.label}</dt>
                <dd className="font-display text-4xl text-gold sm:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Welcome */}
      <section className="bg-paper">
        <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.15fr]">
          <LogoIntro />
          <div>
            <Eyebrow>Welcome to Marie</Eyebrow>
            <p className="mt-5 font-display text-3xl leading-snug sm:text-[2.6rem]">
              A conservatory with the heart of a family, where four-year-olds take their first bow and eighteen-year-olds
              leave ready for the world’s stages.
            </p>
            <div className="mt-10">
              <LearnMore href="/about" label="the academy" />
            </div>
          </div>
        </Container>
      </section>

      {/* Disciplines */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Areas of study"
            title="Three disciplines. One stage."
            intro="Train deeply in one art form or cross between them. Our dancers sing in the musical, our actors move, and our musicians play for the ballet."
            action={<ArrowLink href="/programs">Compare all programs</ArrowLink>}
          />
          <div className="space-y-28 pt-10 sm:space-y-36">
            {programs.map((p, i) => (
              <Feature
                key={p.slug}
                index={i + 1}
                kicker={p.kicker}
                title={p.name}
                text={p.intro}
                href={`/programs/${p.slug}`}
                image={images[p.slug]}
                tone={p.tone}
                flip={i % 2 === 1}
                links={p.tracks.map((t) => ({ label: `${t.name} · ages ${t.ages}`, href: `/programs/${p.slug}#tracks` }))}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Summer Camp */}
      <Banner image={images.camp} eyebrow={`Summer Camp ${campYear}`} title="The best summer they’ll ever perform." align="right">
        <p className="mt-6 text-lg text-white/75">
          {campSessions.length} sessions for ages 6 to 17, each ending in a show for families. Early-bird pricing until{" "}
          {earlyBirdDeadline}.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {campSessions.map((s) => (
            <li key={s.id} className="rounded-full border border-white/25 bg-ink/30 px-4 py-1.5 text-sm backdrop-blur-sm">
              {s.name}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <LearnMore href="/camp" label="Summer Camp" light />
          <ButtonLink href="/camp#register" variant="gold">
            Register now
          </ButtonLink>
        </div>
      </Banner>

      {/* Admissions */}
      <Section className="bg-stone">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Artwork
            src={images.admissions.src}
            alt={images.admissions.alt}
            label="Admissions"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] rounded-[2rem]"
          />
          <div>
            <Eyebrow>Admissions</Eyebrow>
            <h2 className="mt-4 text-5xl leading-none sm:text-6xl">Take your place on stage.</h2>
            <p className="mt-6 text-lg text-muted">
              Applications are open year-round. Begin with a free trial class, then audition or join a friendly placement
              session. Scholarships cover up to 100% of tuition.
            </p>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Try a free class", "Apply online", "Audition or assess", "Welcome to Marie"].map((step, i) => (
                <li key={step} className="flex items-center gap-4 rounded-2xl bg-ivory p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink font-display text-gold">
                    {i + 1}
                  </span>
                  <span className="font-semibold">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <LearnMore href="/admissions" label="Admissions" />
              <ButtonLink href={site.applyUrl}>Apply now</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* Performances */}
      <section className="grid bg-ink text-white lg:grid-cols-[0.9fr_1.1fr]">
        <Artwork
          src={images.performances.src}
          alt={images.performances.alt}
          label="On stage"
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="min-h-80"
        />
        <div className="px-5 py-20 sm:px-12 sm:py-24 lg:px-16">
          <p className="eyebrow text-gold">Performances</p>
          <h2 className="mt-4 text-5xl leading-none sm:text-6xl">The season on stage.</h2>
          <p className="mt-5 max-w-lg text-white/70">Ballets, plays, musicals, and concerts. Most tickets are under $25, and many are free.</p>
          <div className="mt-8 border-b border-white/10">
            {events.slice(0, 3).map((e) => (
              <EventRow key={e.id} event={e} dark />
            ))}
          </div>
          <div className="mt-10">
            <LearnMore href="/events" label="Performances" light />
          </div>
        </div>
      </section>

      {/* News */}
      <Section className="bg-white">
        <Container>
          <SectionHeading eyebrow="Stories" title="News from the academy" action={<LearnMore href="/news" label="academy news" />} />
          <div className="grid gap-12 lg:grid-cols-2">
            <StoryCard story={featured} large />
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1 lg:gap-8">
              {moreStories.slice(0, 2).map((s) => (
                <StoryCard key={s.slug} story={s} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonial */}
      <Section>
        <Container className="max-w-4xl text-center">
          <p aria-hidden className="font-display text-8xl leading-none text-gold">
            “
          </p>
          <blockquote className="font-display text-3xl leading-snug sm:text-[2.6rem]">
            Marie gave our daughter more than technique. It gave her a stage, a family, and the confidence to audition
            anywhere.
          </blockquote>
          <p className="eyebrow mt-8 text-muted">Parent of a Pre-Professional dancer</p>
        </Container>
      </Section>

      {/* Support */}
      <Banner image={images.give} eyebrow="Support the academy" title="Every gift opens a curtain.">
        <p className="mt-6 text-lg text-white/75">
          One in three Marie students receives financial aid. Your gift makes sure talent, not income, decides who takes
          the stage.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <LearnMore href="/give" label="giving" light />
          <ButtonLink href="/give#donate" variant="gold">
            Make a gift
          </ButtonLink>
        </div>
      </Banner>
    </>
  );
}
