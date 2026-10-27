import type { Metadata } from "next";
import { ContactForm } from "@/components/forms";
import { images } from "@/content/images";
import { PageHero } from "@/components/media";
import { Container, Section } from "@/components/ui";
import { fullAddress, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about classes, auditions, camp, or tickets? Get in touch or visit the studios.",
};

export default function ContactPage() {
  const details = [
    { label: "Visit", value: fullAddress, href: `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}` },
    { label: "Call", value: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, "")}` },
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Front desk hours", value: site.hours },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        image={images.contact}
        title="Let’s talk."
        intro="Book a trial class, ask about auditions, or come see the studios. We reply within two working days."
      />
      <Section>
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <dl className="space-y-8">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="eyebrow text-gold-deep">{d.label}</dt>
                <dd className="mt-2 font-display text-2xl">
                  {d.href ? (
                    <a href={d.href} className="hover:underline hover:underline-offset-4" {...(d.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="rounded-3xl bg-white p-6 sm:p-10">
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
