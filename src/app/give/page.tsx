import type { Metadata } from "next";
import { DonatePicker } from "@/components/donate-picker";
import { images } from "@/content/images";
import { PageHero } from "@/components/media";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Support Us",
  description: "Fund scholarships, productions, and new studios. Every gift helps a young artist take the stage.",
};

const impact = [
  { amount: "$50", text: "buys a pair of pointe shoes for a scholarship dancer" },
  { amount: "$250", text: "funds a month of private music lessons" },
  { amount: "$1,000", text: "sends a student to Summer Camp on full scholarship" },
];

const ways = [
  { title: "Sponsor a production", text: "Put your name on the program and help bring a full show to the stage." },
  { title: "Corporate partnership", text: "Matching gifts, employee nights, and community programs." },
  { title: "Gifts in kind", text: "Instruments, costumes, and studio equipment find a grateful home here." },
];

export default function GivePage() {
  return (
    <>
      <PageHero
        eyebrow="Support the academy"
        image={images.give}
        title="Every gift opens a curtain."
        intro="One in three Marie students receives financial aid. Your support makes sure talent, not income, decides who takes the stage."
      />

      <Section id="impact">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow>Your impact</Eyebrow>
            <h2 className="mt-4 text-4xl sm:text-5xl">What your gift does</h2>
            <ul className="mt-10 space-y-6">
              {impact.map((i) => (
                <li key={i.amount} className="flex items-baseline gap-6 border-b border-ink/10 pb-6">
                  <span className="w-28 shrink-0 font-display text-4xl text-gold-deep">{i.amount}</span>
                  <span className="text-lg">{i.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div id="donate" className="scroll-mt-28">
            <DonatePicker donateUrl={site.donateUrl} />
          </div>
        </Container>
      </Section>

      <Section id="ways" className="bg-white">
        <Container>
          <SectionHeading eyebrow="More ways to give" title="Partner with us" />
          <div className="grid gap-6 md:grid-cols-3">
            {ways.map((w) => (
              <div key={w.title} className="rounded-3xl bg-ivory p-8">
                <h3 className="text-2xl">{w.title}</h3>
                <p className="mt-3 text-muted">{w.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-muted">
            To discuss a gift, email{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-ink underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
