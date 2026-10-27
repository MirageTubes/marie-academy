import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./ui";

// Server-only: checks /public at build time so missing photos fall back gracefully.
export function hasImage(src?: string): src is string {
  return !!src && existsSync(join(process.cwd(), "public", src));
}

/**
 * Photo slot. Renders the image when the file exists; otherwise a branded gradient
 * placeholder so layouts look finished before photography arrives.
 */
export function Artwork({
  src,
  alt,
  tone = "from-neutral-900 via-neutral-800 to-amber-900",
  label,
  className = "",
  imgClassName = "",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
}: {
  src?: string;
  alt: string;
  tone?: string;
  label?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${tone} ${className}`}>
      {hasImage(src) ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imgClassName}`} />
      ) : (
        <>
          <Image
            src="/brand/logo-white.png"
            alt=""
            width={296}
            height={296}
            className="absolute -right-[12%] -bottom-[14%] w-[75%] max-w-sm opacity-[0.09]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,161,90,0.35),transparent_55%)]" />
          {label && (
            <span role="img" aria-label={alt} className="eyebrow absolute bottom-5 left-5 text-white/80">
              {label}
            </span>
          )}
        </>
      )}
    </div>
  );
}

/** Dark page banner with an optional full-bleed photo behind the title. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: { src: string; alt: string };
  children?: ReactNode;
}) {
  const photo = hasImage(image?.src) ? image : undefined;
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {photo ? (
        <>
          <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/75 to-ink/10" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_0%,rgba(201,161,90,0.28),transparent_60%)]" />
          <Image
            src="/brand/logo-white.png"
            alt=""
            width={296}
            height={296}
            className="pointer-events-none absolute -right-16 -bottom-24 -z-10 hidden w-[28rem] opacity-[0.06] md:block"
          />
        </>
      )}
      <Container className={`relative ${photo ? "flex min-h-[34rem] flex-col justify-end py-16 sm:min-h-[40rem] sm:py-24" : "py-20 sm:py-28"}`}>
        <p className="eyebrow animate-rise text-gold">{eyebrow}</p>
        <h1 className="animate-rise mt-4 max-w-4xl text-5xl leading-[1.02] [animation-delay:80ms] sm:text-7xl">{title}</h1>
        {intro && (
          <p className="animate-rise mt-6 max-w-2xl text-lg text-white/75 [animation-delay:160ms] sm:text-xl">{intro}</p>
        )}
        {children && <div className="animate-rise mt-10 flex flex-wrap gap-3 [animation-delay:240ms]">{children}</div>}
      </Container>
    </section>
  );
}
