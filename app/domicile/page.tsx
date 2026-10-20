import type { Metadata } from "next";
import DomicileEditorial from "./DomicileEditorial";
import { getDomicilePageContent, getFaqs, getSeoEntry } from "@/sanity/lib/cmsBackend";
import { mergeCmsMetadata } from "@/app/lib/cmsMetadata";
import type { SeoEntry } from "@/sanity/types/cmsBackend";

export const revalidate = 300;

const fallbackMetadata: Metadata = {
  title: { absolute: "DŌMICILE Rwanda | Property Management in Kigali | IMVO Group" },
  description:
    "DŌMICILE by IMVO Group provides property management in Kigali, Rwanda: inspections, maintenance coordination, owner approvals and trusted care for local and diaspora property owners.",
  category: "Property Management",
  keywords: [
    "property management Kigali",
    "property management Rwanda",
    "property care Kigali",
    "property maintenance Kigali",
    "property inspection Kigali",
    "diaspora property management Rwanda",
    "DŌMICILE",
    "Domicile Rwanda",
    "Domicile Kigali",
    "Domicile property management",
    "property management for overseas owners Rwanda",
    "Domicile by IMVO Group",
  ],
  alternates: {
    canonical: "https://www.imvogroup.com/domicile",
  },
  openGraph: {
    type: "website",
    url: "https://www.imvogroup.com/domicile",
    title: "DŌMICILE Rwanda | Property Management in Kigali",
    description:
      "Property management by IMVO Group. One reliable point of contact for the ongoing care, maintenance and coordination of your property.",
    siteName: "IMVO Group",
    locale: "en_RW",
    images: [
      {
        url: "/domicile/exact/estate-hero.png",
        alt: "DŌMICILE property management in Kigali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DŌMICILE Rwanda | Property Management in Kigali",
    description:
      "Property management by IMVO Group for property owners in Kigali, Rwanda.",
    images: ["/domicile/exact/estate-hero.png"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const [content, routeSeo] = await Promise.all([
    getDomicilePageContent(),
    getSeoEntry("/domicile"),
  ]);

  const domicileSeo: SeoEntry | null = content
    ? {
        routePath: "/domicile",
        title: content.seoTitle,
        description: content.seoDescription,
        shareImage: content.shareImage,
        noIndex: content.noIndex,
      }
    : null;

  return mergeCmsMetadata(
    fallbackMetadata,
    routeSeo || domicileSeo,
    "https://www.imvogroup.com/domicile",
  );
}

export default async function DomicilePage() {
  const [content, faqs] = await Promise.all([
    getDomicilePageContent(),
    getFaqs("domicile"),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
        "@context":"https://schema.org",
        "@graph":[
          {"@type":"Service","@id":"https://www.imvogroup.com/domicile#service",
           name:"DŌMICILE Property Management",alternateName:["Domicile Rwanda","Domicile by IMVO Group"],
           serviceType:"Property management and property care",
           description:"Property oversight, routine inspections, maintenance coordination, owner approvals and reporting in Kigali, Rwanda.",
           url:"https://www.imvogroup.com/domicile",
           provider:{"@id":"https://www.imvogroup.com/#organization"},
           areaServed:{"@type":"Place",name:"Kigali, Rwanda"}},
          {"@type":"WebPage","@id":"https://www.imvogroup.com/domicile#webpage",
           url:"https://www.imvogroup.com/domicile",name:"DŌMICILE Rwanda | Property Management in Kigali",
           isPartOf:{"@id":"https://www.imvogroup.com/#website"},
           about:{"@id":"https://www.imvogroup.com/domicile#service"}}
        ]
      }).replace(/</g,"\\u003c")}} />
      <DomicileEditorial content={content} faqs={faqs} />
    </>
  );
}
