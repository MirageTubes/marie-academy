import Image from "next/image";
import Link from "next/link";
import { menu, site } from "@/config/site";
import { images } from "@/content/images";
import { hasImage } from "./media";
import { SiteMenu, type MenuItem } from "./site-menu";

export function SiteHeader() {
  const items: MenuItem[] = menu.map((m) => {
    const img = images[m.image];
    return { label: m.label, href: m.href, blurb: m.blurb, links: m.links, image: hasImage(img.src) ? img : undefined };
  });

  return (
    // No backdrop-filter here: it would trap the fixed full-screen menu inside the header.
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
          <Image src="/brand/logo-white.png" alt="" width={52} height={52} priority className="h-13 w-13" />
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-xl tracking-[0.14em]">MARIE</span>
            <span className="eyebrow block text-[0.58rem] text-white/60">Performing Arts Academy</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/events" className="hidden px-3 py-2 text-sm font-semibold hover:text-gold md:inline">
            Tickets
          </Link>
          <Link href="/give" className="hidden px-3 py-2 text-sm font-semibold hover:text-gold md:inline">
            Give
          </Link>
          <Link
            href={site.applyUrl}
            className="mr-1 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-[#d8b273] sm:mr-2"
          >
            Apply
          </Link>
          <SiteMenu items={items} applyUrl={site.applyUrl} email={site.email} phone={site.phone} social={site.social} />
        </div>
      </div>
    </header>
  );
}
