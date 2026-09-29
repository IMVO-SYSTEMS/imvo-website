"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./SystemsPage.module.css";
import { SystemsHeader, SystemsFooter } from "./SystemsShared";
import { serviceGroups, industries, processSteps, caseStudies } from "./systemData";

export default function SystemsPageClient() {
  return (
    <main className={styles.page}>
      <SystemsHeader />

      <section className={styles.hero}>
        <Image src="/about-future.jpg" alt="IMVO Systems digital technology work" fill priority sizes="100vw" className={styles.heroImage} />
        <div className={styles.heroWash} />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kickerLight}>Digital transformation & technology services</p>
            <h1>Technology that moves the business forward.</h1>
            <p className={styles.heroLead}>
              IMVO Systems designs and builds digital products, custom software, connected business platforms and dependable technology operations.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.blueButton} href="/systems/contact">Talk to us <span>↗</span></Link>
              <Link className={styles.ghostButton} href="/systems/services">Explore services <span>↓</span></Link>
            </div>
          </div>

          <div className={styles.heroRail} aria-label="IMVO Systems capabilities">
            {serviceGroups.map((group) => (
              <Link key={group.id} href={"/systems/services#" + group.id}>
                <span>{group.index}</span>
                <strong>{group.title}</strong>
                <b>↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.introBand}>
        <div className={styles.introBandInner}>
          <p className={styles.kicker}>IMVO Systems</p>
          <h2>We understand technology.<br />We also understand that delivery has to work after launch.</h2>
          <p>
            From customer experiences and software products to cloud operations, integrations, automation and enterprise platforms, the work is designed around a clear business outcome.
          </p>
        </div>
      </section>

      <section className={styles.servicesShowcase}>
        <div className={styles.sectionTop}>
          <div>
            <p className={styles.kicker}>Our services</p>
            <h2>Capabilities for building, improving and operating digital business.</h2>
          </div>
          <Link href="/systems/services">View all services →</Link>
        </div>

        <div className={styles.serviceRows}>
          {serviceGroups.map((group) => (
            <article className={styles.serviceRow} id={group.id} key={group.id}>
              <div className={styles.serviceNumber}>{group.index}</div>
              <div className={styles.serviceTitle}>
                <h3>{group.title}</h3>
                <p>{group.summary}</p>
              </div>
              <div className={styles.serviceItems}>
                {group.items.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className={styles.serviceImage}>
                <Image src={group.image} alt="" fill sizes="(max-width: 900px) 100vw, 28vw" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.presenceSection}>
        <div className={styles.presenceCopy}>
          <p className={styles.kickerLight}>Our presence</p>
          <h2>Built in Kigali.<br />Designed to work anywhere.</h2>
          <p>
            IMVO Systems is based in Rwanda and works with businesses that need strong local understanding, clear delivery and technology that can scale beyond one market.
          </p>
          <div className={styles.presenceStats}>
            <div><span>HQ</span><strong>Kigali</strong><small>Rwanda</small></div>
            <div><span>Delivery</span><strong>East Africa</strong><small>Regional projects</small></div>
            <div><span>Collaboration</span><strong>Global</strong><small>Remote delivery</small></div>
          </div>
        </div>
        <div className={styles.presenceVisual}>
          <Image src="/regional-map.webp" alt="IMVO Systems regional presence" fill sizes="(max-width: 900px) 100vw, 48vw" />
        </div>
      </section>

      <section className={styles.projectsSection}>
        <div className={styles.sectionTop}>
          <div>
            <p className={styles.kicker}>Selected systems</p>
            <h2>Products shaped around the operation, not the template.</h2>
          </div>
          <Link href="/systems/projects">See projects →</Link>
        </div>
        <div className={styles.projectGrid}>
          {caseStudies.map((project) => (
            <article key={project.title} className={styles.projectCard}>
              <div className={styles.projectImage}><Image src={project.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
              <div className={styles.projectCopy}>
                <span>{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.industriesSection}>
        <div className={styles.industriesLead}>
          <p className={styles.kickerLight}>Industries</p>
          <h2>Technology for organisations with real operational complexity.</h2>
          <p>We adapt the product and delivery model to how each sector actually works.</p>
          <Link className={styles.whiteTextLink} href="/systems/industries">Explore industries →</Link>
        </div>
        <div className={styles.industryList}>
          {industries.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
              <b>↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.sectionTop}>
          <div>
            <p className={styles.kicker}>How we work</p>
            <h2>A proven path from business problem to working system.</h2>
          </div>
        </div>
        <div className={styles.processGrid}>
          {processSteps.map(([n, title, text]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.insightsSection} id="insights">
        <div className={styles.sectionTop}>
          <div>
            <p className={styles.kicker}>Thinking</p>
            <h2>Useful technology decisions start before the code.</h2>
          </div>
        </div>
        <div className={styles.insightGrid}>
          <article><span>01 / SYSTEM OWNERSHIP</span><h3>What good system ownership looks like after launch.</h3><p>Repositories, credentials, data access, backups and documentation should never be an afterthought.</p></article>
          <article><span>02 / PRODUCT STRATEGY</span><h3>When to integrate, improve or rebuild.</h3><p>The right answer depends on business risk, current architecture, operational friction and the cost of change.</p></article>
          <article><span>03 / DELIVERY</span><h3>Software should survive handover.</h3><p>A strong build is understandable, maintainable and recoverable by the people who own it.</p></article>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div>
          <p className={styles.kickerLight}>Let’s collaborate</p>
          <h2>Give your business a stronger digital operating system.</h2>
          <p>Start with the problem you need solved. We will help define the right route from there.</p>
        </div>
        <Link className={styles.whiteButton} href="/systems/contact">Start a conversation <span>↗</span></Link>
      </section>

      <SystemsFooter />
    </main>
  );
}
