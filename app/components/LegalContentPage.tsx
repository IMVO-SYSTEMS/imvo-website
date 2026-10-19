import type { LegalPageContent } from "@/sanity/types/siteContent";

type LegalFallback = Required<Pick<LegalPageContent, "kicker" | "title" | "intro" | "sections" | "lastUpdated">>;

export default function LegalContentPage({
  content,
  fallback,
}: {
  content?: LegalPageContent | null;
  fallback: LegalFallback;
}) {
  const sections = content?.sections?.length ? content.sections : fallback.sections;

  return (
    <div style={{ background: "var(--sc-bg)", color: "var(--sc-ink)", minHeight: "100vh", padding: "180px 0 120px" }}>
      <div className="containerWide" style={{ maxWidth: 920 }}>

        <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.92, letterSpacing: "-0.06em", margin: "18px 0 40px", fontWeight: 900 }}>
          {content?.title || fallback.title}
        </h1>
        <div style={{ color: "color-mix(in srgb, var(--sc-ink) 68%, transparent)", fontSize: 18, lineHeight: 1.9 }}>
          <p>{content?.intro || fallback.intro}</p>
          {sections.map((section, index) => (
            <section key={`${section.heading}-${index}`}>
              <h2>{section.heading}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{section.body}</p>
            </section>
          ))}
          <p style={{ marginTop: 50, color: "color-mix(in srgb, var(--sc-ink) 38%, transparent)", fontSize: 14 }}>
            {content?.lastUpdated || fallback.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
}
