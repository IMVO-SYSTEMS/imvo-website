import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../SystemsPage.module.css";
import { SystemsHeader, SystemsFooter } from "../SystemsShared";

export const metadata: Metadata = {
  title: "Careers & Collaborators | IMVO Systems",
  description: "Discover how to collaborate with IMVO Systems on software engineering, design, product and digital operations.",
  alternates: { canonical: "/systems/careers" },
};

const disciplines = [
  ["Software engineering", "Web applications, mobile products, APIs, architecture and quality engineering."],
  ["Product & experience design", "Discovery, interaction design, interface systems, research and accessible design."],
  ["Cloud & platform operations", "Infrastructure, observability, DevOps, security, continuity and release engineering."],
  ["AI & automation", "Practical automations, integrations and applied intelligence within real workflows."],
];

export default function SystemsCareersPage() {
  return (
    <main className={styles.page}>
      <SystemsHeader />
      <section className={styles.innerHero}>
        <Image src="https://images.pexels.com/photos/5466236/pexels-photo-5466236.jpeg?auto=compress&cs=tinysrgb&w=2200" alt="Technology professionals collaborating" fill priority className={styles.innerHeroImage} />
        <div className={styles.innerHeroWash} />
        <div className={styles.innerHeroContent}>
          <p className={styles.kickerLight}>IMVO Systems / People</p>
          <h1>Good work takes good people.</h1>
          <p>We value focused engineering, clear thinking, curiosity and a real respect for the people who use what we build.</p>
        </div>
      </section>
      <section className={styles.contentSection}>
        <div className={styles.contentGrid}>
          <div className={styles.contentLead}>
            <p className={styles.kicker}>Work with us</p>
            <h2>Craft matters. Collaboration matters.</h2>
            <p>We are interested in meeting capable people and teams across product, technology and operations. This page is a collaborator introduction, not a list of confirmed open vacancies.</p>
            <Link className={styles.blueButton} href="/systems/contact" style={{marginTop:28}}>Get in touch ↗</Link>
          </div>
          <div className={styles.industryPageGrid}>
            {disciplines.map(([title,description],index)=>(
              <article className={styles.industryPageCard} key={title}>
                <span>{String(index+1).padStart(2,"0")} / DISCIPLINE</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.finalCta}>
        <div><p className={styles.kickerLight}>Introduce yourself</p><h2>Let’s build useful things.</h2><p>Tell us about your skills, interests and the kind of work you want to contribute to.</p></div>
        <Link href="/systems/contact" className={styles.whiteButton}>Contact IMVO Systems ↗</Link>
      </section>
      <SystemsFooter />
    </main>
  );
}
