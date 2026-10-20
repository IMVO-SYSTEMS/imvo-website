import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { getContactPageContent } from "@/sanity/lib/siteContent";
import { getSeoEntry } from "@/sanity/lib/cmsBackend";
import { mergeCmsMetadata } from "@/app/lib/cmsMetadata";
import type { ContactPageContent } from "@/sanity/types/siteContent";

export const revalidate = 300;

const fallbackMetadata: Metadata = {
  title: "Contact",
  description:
    "Contact IMVO Group in Kigali to discuss built-environment design, feasibility, development consultancy, site coordination, or project direction.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact IMVO Group",
    description:
      "Start a conversation with IMVO Group about your project, site, development, or built-environment needs.",
    images: [{ url: "/contact-hero.webp", alt: "Contact IMVO Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact IMVO Group",
    description:
      "Start a conversation with IMVO Group about your project, site, development, or built-environment needs.",
    images: ["/contact-hero.webp"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoEntry("/contact");
  return mergeCmsMetadata(fallbackMetadata, seo, "/contact");
}

export default async function ContactPage() {
  const content = await getContactPageContent();
  // Keep the LCP hero in the initial server-rendered HTML before client hydration.
  const heroUrl = content?.heroImage?.url || "/contact-hero.webp";
  const heroAlt = content?.heroImage?.alt || "Contact IMVO";
  const resolvedContent = {
    ...(content || {}),
    heroImage: { url: heroUrl, alt: heroAlt },
  } as ContactPageContent;

  // The client component is also server-rendered. A separate first-paint overlay
  // would duplicate the hero and delay its largest-contentful paint on mobile.
  return <ContactPageClient content={resolvedContent} />;
}
