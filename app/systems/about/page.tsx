import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../SystemsPage.module.css";
import { SystemsHeader, SystemsFooter } from "../SystemsShared";

export const metadata: Metadata = {
  title: "About IMVO Systems",
  description: "About IMVO Systems, the technology and product-engineering practice of IMVO Group.",
  alternates: { canonical: "/systems/about" },
};

const principles = [
  ["01","Business first","We understand the operation, users and commercial objective before choosing technology."],
  ["02","Clear ownership","Repositories, credentials, deployment, data access and handover are treated as part of the product."],
  ["03","Useful design","Interfaces should reduce friction, make decisions clearer and help people complete real work."],
  ["04","Built for continuity","Documentation, maintainability, security and recovery matter after the first launch."],
  ["05","Measured innovation","AI, automation and emerging tools are used where they create a practical advantage, not decoration."],
];

export default function SystemsAboutPage() {
  return (
    <main className={styles.page}>
      <SystemsHeader />
      <section className={styles.innerHero}>
        <Image src="/about-hero.webp" alt="About IMVO Systems" fill priority className={styles.innerHeroImage} />
        <div className={styles.innerHeroWash} />
        <div className={styles.innerHeroContent}>
          <p className={styles.kickerLight}>IMVO Systems / About us</p>
          <h1>Technology with a job to do.</h1>
          <p>IMVO Systems is the technology practice of IMVO Group, based in Kigali and focused on digital products, business systems and dependable delivery.</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentGrid}>
          <div className={styles.contentLead}>
            <p className={styles.kicker}>Our approach</p>
            <h2>Build around the operation.</h2>
            <p>Good technology connects customers, people, payments, information, decisions and the work that needs to happen next.</p>
            <Link className={styles.blueButton} href="/systems/contact" style={{marginTop:28}}>Work with us ↗</Link>
          </div>
          <div className={styles.principleList}>
            {principles.map(([n,title,text]) => (
              <article key={n}>
                <span>{n}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.presenceSection}>
        <div className={styles.presenceCopy}>
          <p className={styles.kickerLight}>Where we work</p>
          <h2>Kigali roots.<br />Regional ambition.</h2>
          <p>We combine local understanding with modern product engineering so businesses can launch, operate and grow with stronger digital foundations.</p>
          <div className={styles.presenceStats}>
            <div><span>Base</span><strong>Kigali</strong><small>Rwanda</small></div>
            <div><span>Focus</span><strong>East Africa</strong><small>Regional delivery</small></div>
            <div><span>Mode</span><strong>Remote-ready</strong><small>Global collaboration</small></div>
          </div>
        </div>
        <div className={styles.presenceVisual}><Image src="/regional-map.webp" alt="IMVO Systems East Africa presence" fill /></div>
      </section>

      <SystemsFooter />
    </main>
  );
}
