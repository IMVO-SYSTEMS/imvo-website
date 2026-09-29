import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../SystemsPage.module.css";
import { SystemsHeader, SystemsFooter } from "../SystemsShared";
import { serviceGroups, processSteps } from "../systemData";

export const metadata: Metadata = {
  title: "Services | IMVO Systems",
  description: "Digital Experience, Product Development, Managed Services, Enterprise Solutions, Innovation Services, market expansion and grant advisory by IMVO Systems.",
  alternates: { canonical: "/systems/services" },
};

export default function SystemsServicesPage() {
  return (
    <main className={styles.page}>
      <SystemsHeader />
      <section className={styles.innerHero}>
        <Image src="https://images.pexels.com/photos/12899153/pexels-photo-12899153.jpeg?auto=compress&cs=tinysrgb&w=2200" alt="Software development team reviewing code in a modern office" fill priority className={styles.innerHeroImage} />
        <div className={styles.innerHeroWash} />
        <div className={styles.innerHeroContent}>
          <p className={styles.kickerLight}>IMVO Systems / Services</p>
          <h1>Our services.</h1>
          <p>Technology capabilities for building customer experiences, software products, operational systems and stronger digital businesses.</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentGrid}>
          <div className={styles.contentLead}>
            <p className={styles.kicker}>Capabilities</p>
            <h2>One technology partner across the product lifecycle.</h2>
            <p>Start with one defined need or connect several services into a broader programme. The structure stays clear from discovery through support.</p>
            <Link className={styles.blueButton} href="/systems/contact" style={{marginTop: 28}}>Talk to us ↗</Link>
          </div>

          <div className={styles.contentBody}>
            <div className={styles.servicePageRows}>
              {serviceGroups.map((group) => (
                <article className={styles.servicePageRow} id={group.id} key={group.id}>
                  <div className={styles.servicePageHead}>
                    <div>
                      <p className={styles.contentEyebrow}>{group.index} / SERVICE GROUP</p>
                      <h2>{group.title}</h2>
                    </div>
                    <p>{group.summary}</p>
                  </div>
                  <div className={styles.servicePageImage}>
                    <Image src={group.image} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" />
                  </div>
                  <div className={styles.servicePageItems}>
                    {group.items.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.sectionTop}>
          <div><p className={styles.kicker}>How we work</p><h2>From product discovery to ongoing maintenance.</h2></div>
        </div>
        <div className={styles.processGrid}>
          {processSteps.map(([n,title,text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className={styles.finalCta}>
        <div><p className={styles.kickerLight}>Let’s collaborate</p><h2>Build the right system around the business.</h2><p>You do not need a finished technical brief. Start with the operation, challenge or product you need.</p></div>
        <Link className={styles.whiteButton} href="/systems/contact">Start a conversation ↗</Link>
      </section>
      <SystemsFooter />
    </main>
  );
}
