"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./SystemsPage.module.css";
import { SystemsHeader, SystemsFooter } from "./SystemsShared";
import { serviceGroups } from "./systemData";

const serviceImageSets = [
  [
    "https://images.pexels.com/photos/3862089/pexels-photo-3862089.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3183185/pexels-photo-3183185.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/7698802/pexels-photo-7698802.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/12911248/pexels-photo-12911248.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
  [
    "https://images.pexels.com/photos/12899153/pexels-photo-12899153.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/19805876/pexels-photo-19805876.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/32755772/pexels-photo-32755772.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/12899167/pexels-photo-12899167.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
  [
    "https://images.pexels.com/photos/37605911/pexels-photo-37605911.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/32755772/pexels-photo-32755772.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
  [
    "https://images.pexels.com/photos/7693683/pexels-photo-7693683.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/7698802/pexels-photo-7698802.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3861957/pexels-photo-3861957.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3183185/pexels-photo-3183185.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
  [
    "https://images.pexels.com/photos/3861957/pexels-photo-3861957.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/32755772/pexels-photo-32755772.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/7109291/pexels-photo-7109291.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
  [
    "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3862089/pexels-photo-3862089.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/7993903/pexels-photo-7993903.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/5466236/pexels-photo-5466236.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
  [
    "https://images.pexels.com/photos/10376212/pexels-photo-10376212.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/7693683/pexels-photo-7693683.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
];

const insightCards = [
  ["MANAGEMENT", "Designing software around the operation, not around the template.", "https://images.pexels.com/photos/3862089/pexels-photo-3862089.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["TECHNOLOGIES", "When a custom platform is better than adding another tool.", "https://images.pexels.com/photos/12899153/pexels-photo-12899153.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["ECOMMERCE", "What a serious commerce platform needs beyond the storefront.", "https://images.pexels.com/photos/3183185/pexels-photo-3183185.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["AI & AUTOMATION", "Where automation creates real operational leverage.", "https://images.pexels.com/photos/3861957/pexels-photo-3861957.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["SYSTEMS", "Ownership, access, backups and handover after launch.", "https://images.pexels.com/photos/37605911/pexels-photo-37605911.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["ENTERPRISE", "Connecting customer, finance, inventory and team workflows.", "https://images.pexels.com/photos/7693683/pexels-photo-7693683.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["SECURITY", "Building permissions and auditability into the product early.", "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["PRODUCT", "How to move from an idea to a system people can actually use.", "https://images.pexels.com/photos/5466236/pexels-photo-5466236.jpeg?auto=compress&cs=tinysrgb&w=1400"],
];

const presencePoints = [
  { label: "Kigali", className: styles.pinKigali },
  { label: "East Africa", className: styles.pinEastAfrica },
  { label: "Africa", className: styles.pinAfrica },
  { label: "Global", className: styles.pinGlobal },
];

export default function SystemsPageClient() {
  const [activeService, setActiveService] = useState(0);
  const visibleCards = useMemo(() => {
    const padded = [...group.items];
    while (padded.length < 4) padded.push(group.title);
    return padded.slice(0, 4).map((item, index) => ({
      title: item,
      image: serviceImageSets[activeService][index],
    }));
  }, [activeService, group]);

  return (
    <main className={styles.page}>
      <SystemsHeader />

      <section className={styles.systemsHero}>
        <Image
          src="https://images.pexels.com/photos/19805876/pexels-photo-19805876.jpeg?auto=compress&cs=tinysrgb&w=2200"
          alt="Software product team working in a modern office"
          fill
          priority
          sizes="100vw"
          className={styles.systemsHeroImage}
        />
        <div className={styles.systemsHeroShade} />

        <div className={styles.systemsHeroInner}>
          <motion.div
            className={styles.systemsHeroCopy}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .75, ease: [0.16,1,0.3,1] }}
          >
            <span>DIGITAL SYSTEMS · KIGALI</span>
            <h1>Systems that move<br/>the business <em>forward.</em></h1>
            <p>
              IMVO Systems designs and builds dependable digital products, platforms and automations around the way organisations actually work.
            </p>
            <div className={styles.systemsHeroActions}>
              <Link href="/systems/contact">Start a project <b>→</b></Link>
              <Link href="/systems/projects">View selected work <b>↗</b></Link>
            </div>
            <div className={styles.systemsProof}>
              <div><b>PRODUCT + ENGINEERING</b><small>From concept to working software</small></div>
              <div><b>BUSINESS-FIRST</b><small>Built around real operations</small></div>
              <div><b>OPERATE + IMPROVE</b><small>Support beyond launch</small></div>
            </div>
          </motion.div>

          <motion.aside
            className={styles.systemsHeroCard}
            initial={{ opacity: 0, x: 34, rotateY: -5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: .85, delay: .16, ease: [0.16,1,0.3,1] }}
          >
            <i />
            <small>IMVO SYSTEMS</small>
            <h2>From workflow<br/>to working system.</h2>
            <p>One team connecting strategy, product design, engineering and operational thinking.</p>
            <div className={styles.systemsCapabilityList}>
              <span>Custom software</span>
              <span>Web & mobile products</span>
              <span>Integrations & automation</span>
              <span>Cloud, support & improvement</span>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className={styles.vServices}>
        <div className={styles.vSectionTitle}>
          <h2>Our Services</h2>
        </div>

        <div className={styles.serviceTabs} role="tablist" aria-label="Service groups">
          {serviceGroups.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activeService === index}
              className={activeService === index ? styles.activeServiceTab : ""}
              onClick={() => setActiveService(index)}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className={styles.vServiceCards}>
          {visibleCards.map((card, index) => (
            <Link href={"/systems/services#" + group.id} className={styles.vServiceCard} key={card.title + index}>
              <Image src={card.image} alt="" fill sizes="(max-width: 760px) 82vw, 25vw" />
              <div className={styles.cardShade} />
              <strong>{card.title}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.presenceBlock}>
        <div className={styles.vSectionTitle}>
          <h2>Our Presence</h2>
        </div>

        <div className={styles.presenceTabs}>
          <span><b>HQ</b> Kigali</span>
          <span><b>Delivery</b> Rwanda & East Africa</span>
          <span><b>Remote</b> Global collaboration</span>
        </div>

        <div className={styles.mapStage}>
          <Image src="/regional-map.webp" alt="IMVO Systems regional presence" fill sizes="100vw" className={styles.mapImage} />
          {presencePoints.map((point) => (
            <div key={point.label} className={point.className}>
              <i />
              <span>{point.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.clientsSection} id="testimonials">
        <div className={styles.vSectionTitle}>
          <h2>Clients & Collaborators</h2>
        </div>
        <p className={styles.clientMarkets}>Rwanda · East Africa · Africa · International collaboration</p>

        <div className={styles.logoCloud}>
          {Array.from({ length: 9 }, (_, index) => (
            <div key={index}><Image src={"/partners/partner-" + (index + 1) + ".png"} alt={"IMVO partner " + (index + 1)} width={150} height={74} /></div>
          ))}
        </div>

        <div className={styles.testimonialLike}>
          <div className={styles.stars}>★★★★★</div>
          <p>Clear communication, dependable delivery, explicit ownership and systems that remain usable after launch.</p>
          <strong>IMVO Systems delivery standard</strong>
          <span>KIGALI, RWANDA</span>
        </div>
      </section>

      <section className={styles.edgeCta}>
        <div>
          <small>Maximise the value of your digital investment.</small>
          <h2>Give your business an edge with customised technology.</h2>
        </div>
        <div>
          <p>We bring product design, software engineering, integrations and operational thinking into one delivery team.</p>
          <Link href="/systems/contact">Get your consultation <span>→</span></Link>
        </div>
      </section>

      <section className={styles.insights} id="insights">
        <div className={styles.vSectionTitle}>
          <h2>Insights</h2>
          <p>Useful thinking for organisations building, improving or operating digital systems.</p>
        </div>

        <div className={styles.insightCards}>
          {insightCards.map(([category, title, image]) => (
            <article key={title} className={styles.insightCard}>
              <Image src={image} alt="" fill sizes="(max-width: 760px) 47vw, 25vw" />
              <div className={styles.insightShade} />
              <span>{category}</span>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.partnerCta}>
        <Image
          src="https://images.pexels.com/photos/5466236/pexels-photo-5466236.jpeg?auto=compress&cs=tinysrgb&w=2000"
          alt="Technology team collaborating around a laptop in a modern office"
          fill
          sizes="100vw"
        />
        <div className={styles.partnerShade} />
        <div className={styles.partnerCopy}>
          <h2>Your Technology Partner is Here.</h2>
          <p>Bring us the business problem, workflow or product. We will help define the right system and carry it through delivery.</p>
          <Link href="/systems/contact">Talk to Us <span>→</span></Link>
        </div>
        <div className={styles.diagonalBlue} />
      </section>

      <SystemsFooter />
    </main>
  );
}
