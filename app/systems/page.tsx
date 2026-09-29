import type { Metadata } from "next";
import SystemsPageClient from "./SystemsPageClient";

export const metadata: Metadata = {
  title: "IMVO Systems | Digital Transformation & Technology Services",
  description: "IMVO Systems designs digital experiences, software products, managed technology services, enterprise systems, innovation solutions and market-entry technology support from Kigali, Rwanda.",
  alternates: { canonical: "/systems" },
};

export default function SystemsPage() {
  return <SystemsPageClient />;
}
