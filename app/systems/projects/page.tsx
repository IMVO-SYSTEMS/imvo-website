import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../SystemsPage.module.css";
import { SystemsHeader, SystemsFooter } from "../SystemsShared";
import { caseStudies } from "../systemData";

export const metadata: Metadata = {
  title: "Projects | IMVO Systems",
  description: "Selected IMVO Systems product and business-system directions across commerce, hospitality, property operations and internal tools.",
  alternates: { canonical: "/systems/projects" },
};

export default function SystemsProjectsPage() {
  return (
    <main className={styles.page}>
      <SystemsHeader />
      <section className={styles.innerHero}>
        <Image src="https://images.pexels.com/photos/3861957/pexels-photo-3861957.jpeg?auto=compress&cs=tinysrgb&w=2200" alt="Laptop displaying data analytics for digital systems" fill priority className={styles.innerHeroImage} />
        <div className={styles.innerHeroWash} />
        <div className={styles.innerHeroContent}>
          <p className={styles.kickerLight}>IMVO Systems / Projects</p>
          <h1>Selected systems.</h1>
          <p>Examples of the kinds of digital operations, customer journeys and business platforms we shape and deliver.</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.projectPageGrid}>
          {caseStudies.map((project) => (
            <article className={styles.projectPageCard} key={project.title}>
              <Image src={project.image} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
              <div>
                <span>{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <div><p className={styles.kickerLight}>Your project</p><h2>Build something that fits the business properly.</h2><p>New product, existing platform, operational problem or integration challenge — start with what needs to work.</p></div>
        <Link className={styles.whiteButton} href="/systems/contact">Start a project ↗</Link>
      </section>
      <SystemsFooter />
    </main>
  );
}
