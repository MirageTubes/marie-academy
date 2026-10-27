import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`} {...props} />;
}

export function Section({ className = "", ...props }: ComponentProps<"section">) {
  return <section className={`py-20 sm:py-28 ${className}`} {...props} />;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow text-gold-deep ${className}`}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow className={light ? "text-gold" : ""}>{eyebrow}</Eyebrow>}
        <h2 className="mt-3 text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
        {intro && <p className={`mt-5 text-lg ${light ? "text-white/70" : "text-muted"}`}>{intro}</p>}
      </div>
      {action}
    </div>
  );
}

type ButtonVariant = "solid" | "outline" | "gold" | "light";

const buttonStyles: Record<ButtonVariant, string> = {
  solid: "bg-ink text-white hover:bg-ink-soft",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white",
  gold: "bg-gold text-ink hover:bg-[#d8b273]",
  light: "border border-white/40 text-white hover:bg-white hover:text-ink",
};

export function buttonClass(variant: ButtonVariant = "solid", className = "") {
  return `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors ${buttonStyles[variant]} ${className}`;
}

export function ButtonLink({
  href,
  variant = "solid",
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      className={buttonClass(variant, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}

export function ArrowLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-semibold tracking-wide ${light ? "text-white" : "text-ink"}`}
    >
      <span className="border-b border-current pb-0.5">{children}</span>
      <span aria-hidden className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
