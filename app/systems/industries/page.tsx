import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../SystemsPage.module.css";
import { SystemsHeader, SystemsFooter } from "../SystemsShared";
import { industries } from "../systemData";

export const metadata: Metadata = {
  title: "Industries | IMVO Systems",
  description: "Technology systems for education, finance, commerce, government, healthcare, real estate, hospitality and other organisations.",
  alternates: { canonical: "/systems/industries" },
};

export default function SystemsIndustriesPage() {
  return (
    <main className={styles.page}>
      <SystemsHeader />
      <section className={styles.innerHero}>
        <Image src="https://images.pexels.com/photos/7698802/pexels-photo-7698802.jpeg?auto=compress&cs=tinysrgb&w=2200" alt="Business team analysing data and technology in an office meeting" fill priority className={styles.innerHeroImage} />
        <div className={styles.innerHeroWash} />
        <div className={styles.innerHeroContent}>
          <p className={styles.kickerLight}>IMVO Systems / Industries</p>
          <h1>Built around how your sector works.</h1>
          <p>The technology changes. The principle does not: understand the operation first, then design the right system around it.</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentGrid}>
          <div className={styles.contentLead}>
            <p className={styles.kicker}>Industry focus</p>
            <h2>Different sectors. Different constraints.</h2>
            <p>We adapt workflows, permissions, customer journeys, data structure and support models to the reality of each business or institution.</p>
          </div>
          <div className={styles.industryPageGrid}>
            {industries.map(([title,text], index) => (
              <article className={styles.industryPageCard} key={title}>
                <span>{String(index + 1).padStart(2,"0")} / INDUSTRY</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div><p className={styles.kickerLight}>Need a sector-specific system?</p><h2>Tell us the workflow that needs to improve.</h2><p>We can map the operation, identify the right digital route and define the product from there.</p></div>
        <Link className={styles.whiteButton} href="/systems/contact">Talk to IMVO Systems ↗</Link>
      </section>
      <SystemsFooter />
    </main>
  );
}
