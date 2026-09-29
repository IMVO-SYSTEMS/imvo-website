import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../SystemsPage.module.css";
import { SystemsHeader, SystemsFooter } from "../SystemsShared";

export const metadata: Metadata = {
  title: "Contact IMVO Systems",
  description: "Start a software, digital-product, integration or business-systems project with IMVO Systems.",
  alternates: { canonical: "/systems/contact" },
};

export default function SystemsContactPage() {
  return (
    <main className={styles.page}>
      <SystemsHeader />
      <section className={styles.innerHero}>
        <Image src="/imvo-contact-team.webp" alt="Contact IMVO Systems" fill priority className={styles.innerHeroImage} />
        <div className={styles.innerHeroWash} />
        <div className={styles.innerHeroContent}>
          <p className={styles.kickerLight}>IMVO Systems / Contact</p>
          <h1>Tell us what needs to work.</h1>
          <p>You do not need a finished technical brief. Start with the problem, product, workflow or system you want to improve.</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentGrid}>
          <div className={styles.contentLead}>
            <p className={styles.kicker}>Project inquiries</p>
            <h2>Start with the business need.</h2>
            <p>We can help define whether the right route is a new build, an integration, a redesign, a migration, an operational system or ongoing technology support.</p>
          </div>
          <div className={styles.contactCards}>
            <article className={styles.contactCard}>
              <span>01 / NEW PRODUCT</span>
              <h3>Build from zero</h3>
              <p>For a new platform, mobile app, web product, marketplace or internal system.</p>
              <Link href="/contact?practice=systems#quote">Open project brief →</Link>
            </article>
            <article className={styles.contactCard}>
              <span>02 / EXISTING PLATFORM</span>
              <h3>Improve what exists</h3>
              <p>For audits, redesigns, rebuilds, migrations, integrations and stabilisation.</p>
              <Link href="/contact?practice=systems#quote">Request a review →</Link>
            </article>
            <article className={styles.contactCard}>
              <span>03 / ENTERPRISE</span>
              <h3>Connect the operation</h3>
              <p>For CRM, ERP, reporting, data, permissions and cross-team workflow integration.</p>
              <Link href="/contact?practice=systems#quote">Discuss the system →</Link>
            </article>
            <article className={styles.contactCard}>
              <span>04 / CONTINUITY</span>
              <h3>Support & managed services</h3>
              <p>For hosting, repositories, cloud operations, security, backups, documentation and maintenance.</p>
              <Link href="/contact?practice=systems#quote">Talk to Systems →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div><p className={styles.kickerLight}>IMVO Systems</p><h2>One conversation can clarify the whole route.</h2><p>Bring the business problem. We will help turn it into a practical technology plan.</p></div>
        <Link className={styles.whiteButton} href="/contact?practice=systems#quote">Start now ↗</Link>
      </section>

      <SystemsFooter />
    </main>
  );
}
