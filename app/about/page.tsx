import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { getAboutPageContent } from "@/sanity/lib/siteContent";
import { getSeoEntry, getTeamMembers, getTestimonials } from "@/sanity/lib/cmsBackend";
import { mergeCmsMetadata } from "@/app/lib/cmsMetadata";
import type { AboutPageContent } from "@/sanity/types/siteContent";

export const revalidate = 300;

const fallbackMetadata: Metadata = {
  title: "About",
  description:
    "Meet IMVO Group, a Kigali-based built-environment design and development consultancy working across Rwanda and East Africa.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: "About IMVO Group",
    description:
      "A Kigali-based built-environment studio combining design, development consultancy, and site coordination.",
    images: [{ url: "/about-hero.png", alt: "IMVO Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About IMVO Group",
    description:
      "A Kigali-based built-environment studio combining design, development consultancy, and site coordination.",
    images: ["/about-hero.png"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoEntry("/about");
  return mergeCmsMetadata(fallbackMetadata, seo, "/about");
}

export default async function AboutPage() {
  const [content, structuredTeam, curatedReviews] = await Promise.all([
    getAboutPageContent(),
    getTeamMembers(),
    getTestimonials(),
  ]);

  const testimonials = (content?.testimonials || [])
    .map((item, index) => ({ ...item, __index: index }))
    .filter((item) => item.active !== false)
    .sort((a, b) => {
      const featuredDelta = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      if (featuredDelta) return featuredDelta;
      const orderDelta = (a.order ?? 100) - (b.order ?? 100);
      return orderDelta || a.__index - b.__index;
    })
    .map((item) => ({
      text: item.text,
      author: item.author,
      date: [item.role, item.company, item.source || item.date]
        .filter(Boolean)
        .join(" · "),
    }));

  // Studio collection reviews are independently editable and publishable.
  // The About Page's own review array takes priority while valid and active.
  // Do not display blank placeholders or unverified hard-coded client quotes.
  const renderedTestimonials = testimonials.filter(item=>item.text?.trim()&&item.author?.trim()).length
    ? testimonials.filter(item=>item.text?.trim()&&item.author?.trim())
    : curatedReviews.filter(item=>item.quote?.trim()&&item.author?.trim()).map(item=>({
        text:item.quote,author:item.author,date:[item.role,item.company,item.source||item.date].filter(Boolean).join(" · "),
      }));

  const resolvedContent: AboutPageContent = {
    ...(content || {}),
    teamMembers: structuredTeam.length ? structuredTeam : content?.teamMembers,
    testimonials: renderedTestimonials,
  };

  return (
    <>
      <AboutPageClient content={resolvedContent} />
    </>
  );
}
