import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../SystemsPage.module.css";
import { SystemsHeader, SystemsFooter } from "../SystemsShared";

export const metadata: Metadata = {
  title: "Insights | IMVO Systems",
  description: "Ideas on digital products, software engineering, operations, security and technology by IMVO Systems.",
  alternates: { canonical: "/systems/insights" },
};

const notes = [
  [
    "Management",
    "Designing software around the operation, not around the template.",
    "Before choosing tools, map who does the work, what decisions must be made, what information is needed, and where handoffs fail. The interface should reduce those handoffs—not add another layer."
  ],
  [
    "Technology",
    "When a custom platform is better than adding another tool.",
    "Custom development makes sense where business rules, integrated payments, permissions or multi-team operations cannot be reliably served by a set of disconnected subscriptions."
  ],
  [
    "E-commerce",
    "What a serious commerce platform needs beyond the storefront.",
    "The storefront is only one piece. Inventory availability, order state, payment reconciliation, fulfillment, customer communications and reporting all need to agree."
  ],
  [
    "AI & Automation",
    "Where automation creates real operational leverage.",
    "Start with repeatable, reviewable processes. Use automation where it reduces delay or mistakes while keeping a person in control of sensitive approvals."
  ],
  [
    "Systems",
    "Ownership, access, backups and handover after launch.",
    "A durable product has clear credential custody, tested backups, documented releases, appropriate roles, and a clear owner for incidents and change requests."
  ],
  [
    "Enterprise",
    "Connecting customer, finance, inventory and team workflows.",
    "Treat shared identifiers and event flows as product decisions. A reliable operating view depends on consistency across source systems, not only charts."
  ],
  [
    "Security",
    "Building permissions and auditability into the product early.",
    "Separate duties where needed, log consequential changes, minimize access, and make recovery paths explicit rather than retrofitting them after launch."
  ],
  [
    "Product",
    "How to move from an idea to a system people can actually use.",
    "Ship the smallest coherent workflow, test it in the real environment, measure friction, then add capability without losing the product’s core clarity."
  ]
];

export default function SystemsInsightsPage() {
  return (
    <main className={styles.page}>
      <SystemsHeader />
      <section className={styles.innerHero}>
        <Image src="https://images.pexels.com/photos/3861957/pexels-photo-3861957.jpeg?auto=compress&cs=tinysrgb&w=2200" alt="Digital systems and product engineering" fill priority className={styles.innerHeroImage} />
        <div className={styles.innerHeroWash} />
        <div className={styles.innerHeroContent}>
          <p className={styles.kickerLight}>IMVO Systems / Insights</p>
          <h1>Notes from the building side.</h1>
          <p>Practical perspectives on the systems that help organisations work better.</p>
        </div>
      </section>
      <section className={styles.contentSection}>
        <div className={styles.contentGrid}>
          <div className={styles.contentLead}>
            <p className={styles.kicker}>Engineering notes</p>
            <h2>Clarity first. Technology second.</h2>
            <p>Short observations from the product and delivery process, written for operators and decision makers.</p>
            <Link className={styles.blueButton} href="/systems/contact" style={{marginTop:28}}>Discuss your project ↗</Link>
          </div>
          <div className={styles.servicePageRows}>
            {notes.map(([category,title,copy],index)=>(
              <article className={styles.servicePageRow} id={"note-"+(index+1)} key={category}>
                <p className={styles.kicker}>{String(index+1).padStart(2,"0")} / {category}</p>
                <h2 style={{fontSize:"clamp(28px,3vw,43px)",lineHeight:1.1,letterSpacing:"-.04em",margin:"12px 0 18px"}}>{title}</h2>
                <p style={{color:"#616775",lineHeight:1.8,fontSize:15,maxWidth:740}}>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SystemsFooter />
    </main>
  );
}
