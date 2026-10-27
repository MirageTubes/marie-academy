import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { fullAddress, site } from "@/config/site";
import "./globals.css";

// Bodoni: the high-contrast serif of ballet programmes and fashion mastheads.
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

// Jost: a clean geometric sans that sits well beside the logo's lettering.
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: "/brand/logo.png", width: 592, height: 592, alt: site.name }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e10",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/logo.png`,
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", streetAddress: fullAddress },
  sameAs: site.social.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
