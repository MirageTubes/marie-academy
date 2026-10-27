"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type MenuItem = {
  label: string;
  href: string;
  blurb: string;
  image?: { src: string; alt: string };
  links: readonly { label: string; href: string }[];
};

type Props = {
  items: MenuItem[];
  applyUrl: string;
  email: string;
  phone: string;
  social: readonly { label: string; href: string }[];
};

export function SiteMenu({ items, applyUrl, email, phone, social }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const initial = Math.max(0, items.findIndex((i) => pathname === i.href || pathname.startsWith(`${i.href}/`)));
  const [active, setActive] = useState(initial);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const current = items[active];

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setActive(initial);
          setOpen(true);
        }}
        aria-expanded={open}
        aria-controls="site-menu"
        className="group flex h-11 items-center gap-3 rounded-full border border-white/25 pl-5 pr-2 text-sm font-semibold tracking-wide transition-colors hover:border-gold"
      >
        Menu
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-ink">
          <span className="flex w-3.5 flex-col gap-[3px]" aria-hidden>
            <span className="h-px w-full bg-current" />
            <span className="h-px w-full bg-current" />
            <span className="h-px w-2/3 bg-current transition-all group-hover:w-full" />
          </span>
        </span>
      </button>

      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={`fixed inset-0 z-[100] flex flex-col bg-ink text-white transition-[opacity,visibility] duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* top bar */}
        <div className="mx-auto flex h-20 w-full max-w-7xl shrink-0 items-center justify-between px-5 sm:px-8">
          <Link href="/" onClick={close} className="flex items-center gap-3" aria-label="Home">
            <Image src="/brand/logo-white.png" alt="" width={48} height={48} className="h-12 w-12" />
            <span className="hidden font-display text-lg tracking-[0.12em] sm:block">MARIE</span>
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="flex h-11 items-center gap-3 rounded-full border border-white/25 pl-5 pr-2 text-sm font-semibold hover:border-gold"
          >
            Close
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-lg leading-none text-ink" aria-hidden>
              ×
            </span>
          </button>
        </div>

        {/* body */}
        <div className="mx-auto grid w-full max-w-7xl flex-1 gap-10 overflow-y-auto px-5 pb-8 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:overflow-hidden">
          <nav aria-label="All pages" className="lg:overflow-y-auto lg:pr-6">
            <ol className="border-t border-white/10">
              {items.map((item, i) => (
                <li
                  key={item.href}
                  className={`border-b border-white/10 transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  style={{ transitionDelay: open ? `${120 + i * 40}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    onClick={close}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={i === initial && pathname !== "/" ? "page" : undefined}
                    className="group flex items-baseline gap-5 py-3.5 sm:py-4 lg:py-[min(1.1vh,1rem)]"
                  >
                    <span className={`w-7 shrink-0 text-xs font-semibold tabular-nums ${active === i ? "text-gold" : "text-white/40"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-3xl leading-none transition-colors sm:text-4xl lg:text-[min(4.4vh,3rem)] ${
                        active === i ? "text-white lg:text-gold" : "text-white/85 lg:text-white/55"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span aria-hidden className="ml-auto text-gold opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                  {/* sub-pages: inline on small screens, in the preview panel on large */}
                  {item.links.length > 1 && (
                    <ul className="-mt-1 flex flex-wrap gap-x-5 gap-y-2 pb-4 pl-12 text-sm text-white/60 lg:hidden">
                      {item.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} onClick={close} className="hover:text-gold">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* preview panel */}
          <aside aria-label={`${current.label} preview`} className="relative hidden overflow-hidden rounded-[2rem] bg-ink-soft lg:block">
            {items.map((item, i) =>
              item.image ? (
                <Image
                  key={item.href}
                  src={item.image.src}
                  alt=""
                  fill
                  sizes="45vw"
                  className={`object-cover transition-all duration-700 ${active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
                />
              ) : null,
            )}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,161,90,0.25),transparent_55%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-10">
              <p className="eyebrow text-gold">{String(active + 1).padStart(2, "0")} · Explore</p>
              <p className="mt-3 font-display text-5xl">{current.label}</p>
              <p className="mt-3 max-w-sm text-white/75">{current.blurb}</p>
              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/15 pt-6">
                {current.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={close} className="group inline-flex items-center gap-2 text-sm font-semibold hover:text-gold">
                      {l.label}
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* bottom bar */}
        <div className="shrink-0 border-t border-white/10">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-3">
              <Link href={applyUrl} onClick={close} className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-[#d8b273]">
                Apply
              </Link>
              <Link href="/events" onClick={close} className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white hover:text-ink">
                Tickets
              </Link>
              <Link href="/give" onClick={close} className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white hover:text-ink">
                Give
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
              <a href={`mailto:${email}`} className="hover:text-gold">
                {email}
              </a>
              <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="hover:text-gold">
                {phone}
              </a>
              {social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
