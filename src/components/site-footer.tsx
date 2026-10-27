import Image from "next/image";
import Link from "next/link";
import { footerNav, fullAddress, site } from "@/config/site";
import { NewsletterForm } from "./forms";
import { Container } from "./ui";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <Container className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow text-gold">Stay in the wings</p>
          <h2 className="mt-3 max-w-md text-4xl">Performances, auditions, and camp news, once a month.</h2>
        </div>
        <div className="flex items-end">
          <NewsletterForm />
        </div>
      </Container>

      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image src="/brand/logo-white.png" alt={site.name} width={120} height={120} className="h-28 w-28" />
          <address className="mt-6 text-sm not-italic leading-relaxed text-white/70">
            {fullAddress}
            <br />
            <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="hover:text-gold">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="hover:text-gold">
              {site.email}
            </a>
          </address>
        </div>
        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="eyebrow text-white/50">{group.title}</p>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/85 hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <Container className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <p>
          © {site.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-5">
          {site.social.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <Link href="/contact" className="hover:text-gold">
              Contact
            </Link>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
