"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import styles from "./DomicileEditorial.module.css";

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_DOMICILE_WEB3FORMS_KEY ||
  "566d4852-a822-4432-83ba-8d522618ee66";

const whatsappUrl =
  "https://wa.me/250799409409?text=" +
  encodeURIComponent("Hello DŌMICILE, I would like to discuss property management.");

const images = {
  hero: "/chosen/casa-vento.webp",
  intro: "/chosen/virunga-residence.webp",
  residence: "/chosen/casa-lumara.webp",
  residence2: "/chosen/casa-palma.webp",
  residence3: "/chosen/aurelian-villa.webp",
  residence4: "/chosen/verdea-2.webp",
};

function Icon({
  name,
  size = 18,
}: {
  name:
    | "home"
    | "updates"
    | "reports"
    | "property"
    | "profile"
    | "bell"
    | "check"
    | "clock"
    | "tool"
    | "file"
    | "arrow";
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<string, ReactNode> = {
    home: <><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-5h5v5"/></>,
    updates: <><path d="M4 12a8 8 0 1 0 2.3-5.7"/><path d="M4 4v6h6"/><path d="M12 8v4l2.5 1.5"/></>,
    reports: <><path d="M5 3h10l4 4v14H5z"/><path d="M15 3v5h5"/><path d="M8 13h8M8 17h6"/></>,
    property: <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 20V9h8v11M8 13h8"/></>,
    profile: <><circle cx="12" cy="8" r="3"/><path d="M5 20c.7-4 3-6 7-6s6.3 2 7 6"/></>,
    bell: <><path d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 7H3s3 0 3-7"/><path d="M10 20h4"/></>,
    check: <><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    tool: <><path d="M14 6.2a4 4 0 0 0-5.2 5.2L4 16.2 7.8 20l4.8-4.8A4 4 0 0 0 17.8 10l-3 3-3.8-3.8z"/></>,
    file: <><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4"/><path d="M9 12h6M9 16h6"/></>,
    arrow: <><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProductLogo({ dark = false }: { dark?: boolean }) {
  return (
    <Image
      src={dark ? "/domicile/domicile-white-no-tagline.svg" : "/domicile/domicile-black-no-tagline.svg"}
      alt="DŌMICILE"
      width={900}
      height={220}
      unoptimized
    />
  );
}

function LaptopShell({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? styles.laptopCompact : styles.laptop}>
      <div className={styles.laptopLid}>
        <div className={styles.cameraDot} />
        <div className={styles.laptopScreen}>
          <OwnerDashboard compact={compact} />
        </div>
      </div>
      <div className={styles.laptopBase}>
        <div className={styles.trackpad} />
      </div>
    </div>
  );
}

function OwnerDashboard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <div className={styles.dashboardBrand}>
          <span>D</span>
          <b>DŌMICILE</b>
        </div>
        <div className={styles.dashboardNav}>
          <span className={styles.dashboardNavActive}>Overview</span>
          <span>Reports</span>
          <span>Approvals</span>
          <span>Visits</span>
          <span>Maintenance</span>
        </div>
        <div className={styles.dashboardOwner}>
          <small>KIGALI RESIDENCE</small>
          <i>JM</i>
        </div>
      </div>

      <div className={styles.dashboardContent}>
        <div className={styles.dashboardTitle}>
          <div>
            <small>OWNER VIEW</small>
            <h3>Kigali Residence</h3>
          </div>
          <span className={styles.statusGood}><i /> All good</span>
        </div>

        <div className={styles.dashboardMetrics}>
          <article>
            <small>PROPERTY STATUS</small>
            <strong>All good</strong>
            <span>Last checked today</span>
          </article>
          <article>
            <small>OPEN ITEMS</small>
            <strong>01</strong>
            <span>One approval required</span>
          </article>
          <article>
            <small>NEXT VISIT</small>
            <strong>27 Aug</strong>
            <span>Routine property inspection</span>
          </article>
          <article>
            <small>APPROVALS</small>
            <strong>01</strong>
            <span>Pending decision</span>
          </article>
        </div>

        <div className={styles.dashboardGrid}>
          <article className={styles.activityPanel}>
            <div className={styles.panelHeading}>
              <div>
                <small>RECENT ACTIVITY</small>
                <b>What happened at the property</b>
              </div>
              <span>View all</span>
            </div>
            <ul>
              <li><Icon name="check" size={16}/><div><b>Routine inspection completed</b><span>Today · 09:42 · 12 photos attached</span></div></li>
              <li><Icon name="tool" size={16}/><div><b>Gate technician attended</b><span>Yesterday · repair completed</span></div></li>
              <li><Icon name="check" size={16}/><div><b>Water tank service completed</b><span>25 Aug · no further action</span></div></li>
              {!compact && <li><Icon name="file" size={16}/><div><b>August property report issued</b><span>24 Aug · available in Reports</span></div></li>}
            </ul>
          </article>

          <div className={styles.dashboardSide}>
            <article className={styles.approvalPanel}>
              <small>PENDING APPROVAL</small>
              <b>Fence repair quotation</b>
              <strong>RWF 285,000</strong>
              <div><button>Review</button><button>Ask a question</button></div>
            </article>
            <article className={styles.maintenancePanel}>
              <small>MAINTENANCE FOLLOW-THROUGH</small>
              <div className={styles.maintenanceStat}><strong>92%</strong><span>On time</span></div>
              <div className={styles.progressTrack}><i /></div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneShell({ screen = "overview" }: { screen?: "overview" | "updates" | "property" }) {
  return (
    <div className={styles.phoneDevice}>
      <span className={styles.phoneButtonOne} />
      <span className={styles.phoneButtonTwo} />
      <span className={styles.phoneButtonThree} />
      <div className={styles.phoneGlass}>
        <div className={styles.dynamicIsland} />
        <div className={styles.phoneStatus}>
          <span>9:41</span>
          <div><i/><i/><i/></div>
        </div>
        <div className={styles.phoneHeader}>
          <div className={styles.phoneLogo}><span>D</span><b>DŌMICILE</b></div>
          <button aria-label="Notifications"><Icon name="bell" size={16}/><i /></button>
        </div>

        {screen === "overview" && <PhoneOverview />}
        {screen === "updates" && <PhoneUpdates />}
        {screen === "property" && <PhoneProperty />}

        <div className={styles.phoneNav}>
          <span className={screen === "overview" ? styles.phoneNavActive : ""}><Icon name="home" size={18}/><small>Home</small></span>
          <span className={screen === "updates" ? styles.phoneNavActive : ""}><Icon name="updates" size={18}/><small>Updates</small></span>
          <span><Icon name="reports" size={18}/><small>Reports</small></span>
          <span className={screen === "property" ? styles.phoneNavActive : ""}><Icon name="property" size={18}/><small>Property</small></span>
          <span><Icon name="profile" size={18}/><small>Profile</small></span>
        </div>
      </div>
    </div>
  );
}

function PhoneOverview() {
  return (
    <div className={styles.phoneBody}>
      <div className={styles.phonePropertyTitle}>
        <small>KIGALI RESIDENCE</small>
        <h4>Good morning.</h4>
        <span><i /> All good</span>
      </div>

      <div className={styles.phoneMetrics}>
        <article><small>OPEN</small><strong>01</strong><span>Needs approval</span></article>
        <article><small>NEXT VISIT</small><strong>27</strong><span>Aug · 09:30</span></article>
      </div>

      <article className={styles.phoneActivityCard}>
        <div><Icon name="check" size={17}/><span>Today</span></div>
        <b>Inspection completed</b>
        <p>12 photos and the visit note are now available.</p>
        <button>View update <Icon name="arrow" size={14}/></button>
      </article>

      <article className={styles.phoneApprovalCard}>
        <small>PENDING APPROVAL</small>
        <b>Fence repair quotation</b>
        <strong>RWF 285,000</strong>
        <div><button>Review</button><button>Ask</button></div>
      </article>
    </div>
  );
}

function PhoneUpdates() {
  const updates = [
    ["TODAY", "Routine inspection completed", "12 photos attached", "check"],
    ["YESTERDAY", "Fence repair quotation received", "Awaiting your approval", "file"],
    ["25 AUG", "Water tank serviced", "Completed by technician", "tool"],
    ["21 AUG", "Generator inspection", "No action required", "check"],
  ] as const;

  return (
    <div className={styles.phoneBody}>
      <div className={styles.phoneSectionTitle}>
        <small>KIGALI RESIDENCE</small>
        <h4>Updates</h4>
      </div>
      <div className={styles.timeline}>
        {updates.map(([date, title, meta, icon]) => (
          <article key={title}>
            <span className={styles.timelineIcon}><Icon name={icon} size={16}/></span>
            <div><small>{date}</small><b>{title}</b><p>{meta}</p></div>
          </article>
        ))}
      </div>
    </div>
  );
}

function PhoneProperty() {
  return (
    <div className={styles.phoneBody}>
      <div className={styles.phonePropertyPhoto}>
        <Image src={images.residence2} alt="Kigali residence" fill sizes="320px" />
      </div>
      <div className={styles.phoneSectionTitle}>
        <small>PROPERTY</small>
        <h4>Kigali Residence</h4>
      </div>
      <div className={styles.phonePropertyGrid}>
        <article><Icon name="check" size={17}/><b>12</b><span>Checks</span></article>
        <article><Icon name="tool" size={17}/><b>01</b><span>Open issue</span></article>
      </div>
      <article className={styles.phoneActivityCard}>
        <div><Icon name="clock" size={17}/><span>Next visit</span></div>
        <b>27 August · 09:30</b>
        <p>Routine property inspection</p>
      </article>
    </div>
  );
}

const faq = [
  ["Who is DŌMICILE for?", "Property owners who want one dependable local point of contact for oversight, maintenance and owner-away care."],
  ["Do I need to live abroad?", "No. DŌMICILE is also for Kigali-based owners and frequent travellers who prefer delegated property care."],
  ["Can you manage one property?", "Yes. DŌMICILE can be structured around a single residence or a wider portfolio."],
  ["How are repairs and works approved?", "You keep authority over costs and decisions that require approval. DŌMICILE coordinates the follow-through once authority is given."],
  ["What happens if something is urgent?", "The matter is triaged immediately and handled within the emergency authority agreed with the owner."],
  ["Will my property be shown publicly?", "No. Client property information is private by default unless you explicitly approve publication."],
  ["Where does DŌMICILE currently operate?", "DŌMICILE is currently focused on Kigali, Rwanda."],
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  location: string;
  need: string;
  message: string;
};

const initialForm: FormState = { name: "", phone: "", email: "", location: "", need: "", message: "" };

export default function DomicileEditorial() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const ready = useMemo(
    () => Boolean(form.name.trim() && (form.phone.trim() || form.email.trim()) && form.location.trim()),
    [form]
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || sending) return;
    setSending(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New DŌMICILE enquiry — ${form.name}`,
          from_name: "DŌMICILE by IMVO Group",
          name: form.name,
          phone: form.phone || "Not provided",
          email: form.email || "Not provided",
          property_location: form.location,
          need: form.need || "Not specified",
          message: form.message || "No additional message.",
        }),
      });
      const result = await response.json();
      if (!response.ok || !result?.success) throw new Error("failed");
      setSent(true);
      setForm(initialForm);
    } catch {
      window.location.href = whatsappUrl;
    } finally {
      setSending(false);
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/domicile" className={styles.brand}><ProductLogo /></Link>
        <nav>
          <a href="#system">System</a>
          <a href="#owner">Owner View</a>
          <a href="#journey">How it works</a>
        </nav>
        <a href="#contact" className={styles.headerCta}>Start a conversation</a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroImage}><Image src={images.hero} alt="Contemporary residence in Kigali" fill priority sizes="100vw" /></div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroCopy}>
          <span>PROPERTY MANAGEMENT · KIGALI</span>
          <h1>YOUR PROPERTY.<br/>HANDLED.</h1>
          <p>Property oversight, maintenance, approvals and owner updates — handled through one dependable local point of contact.</p>
          <div className={styles.heroActions}>
            <a href="#contact" className={styles.primaryCta}>Start a conversation</a>
            <a href="#journey" className={styles.secondaryCta}>See how it works</a>
          </div>
        </div>
        <div className={styles.heroCard}>
          <i />
          <strong>Property care,<br/>in one place.</strong>
          <p>One owner view. One local contact. One clear record of what happened and what comes next.</p>
          <span>DŌMICILE / IMVO GROUP</span>
        </div>
      </section>

      <section className={styles.intro} id="system">
        <div className={styles.introMeta}>
          <span>WHAT IS DŌMICILE?</span>
          <small>Property Management<br/>Platform</small>
        </div>
        <div className={styles.introCopy}>
          <h2>DŌMICILE keeps owners connected to everything that matters at their property.</h2>
          <p>Routine checks, maintenance, approvals, reports and owner-away care are coordinated through one dependable local operating line.</p>
          <div className={styles.introFacts}>
            <div><span>LOCATION</span><b>Kigali, Rwanda</b></div>
            <div><span>FOCUS</span><b>Property care + owner visibility</b></div>
            <div><span>BY</span><b>IMVO Group</b></div>
          </div>
        </div>
        <div className={styles.introVisual}>
          <div className={styles.blueRing}>
            <div className={styles.ringImage}><Image src={images.intro} alt="DŌMICILE managed residence" fill sizes="480px" /></div>
          </div>
          <div className={styles.promiseCard}>
            <div><strong>24/7</strong><span>OWNER ACCESS</span></div>
            <div><strong>ONE</strong><span>RESPONSIBLE CONTACT</span></div>
            <div><strong>PRIVATE</strong><span>BY DEFAULT</span></div>
          </div>
        </div>
        <div className={styles.introLaptop}><LaptopShell compact /></div>
      </section>

      <section className={styles.experience}>
        <Reveal className={styles.experienceHeading}>
          <span>OWNER EXPERIENCE</span>
          <h2>Designed to turn property complexity into <em>clarity</em>, <em>control</em>, and confident decisions.</h2>
        </Reveal>
        <div className={styles.laptopPresentation}><LaptopShell /></div>
      </section>

      <section className={styles.propertyShowcase}>
        <div className={styles.propertyImage}><Image src={images.residence} alt="Contemporary residence" fill sizes="100vw" /></div>
        <div className={styles.serviceCard}>
          <article>
            <i />
            <div><b>Property oversight</b><p>Routine checks, access, status and follow-through stay visible.</p></div>
          </article>
          <article>
            <i />
            <div><b>Maintenance coordination</b><p>Issues, technicians, approvals and progress stay connected to the same property record.</p></div>
          </article>
        </div>
      </section>

      <section className={styles.mobileSection} id="owner">
        <div className={styles.mobileHeading}>
          <h2>Property management.<br/>Right in your <em>Pocket.</em></h2>
          <p>See property status, maintenance, approvals, reports and upcoming visits wherever you are.</p>
        </div>
        <div className={styles.phoneStage}>
          <div className={styles.phoneSideCard + " " + styles.phoneSideLeft}>
            <small>PROPERTY STATUS</small><strong>ALL GOOD</strong><span>Latest inspection complete</span>
          </div>
          <PhoneShell screen="overview" />
          <div className={styles.phoneSideCard + " " + styles.phoneSideRight}>
            <small>APPROVALS</small><strong>01</strong><span>Pending decision</span>
          </div>
        </div>
      </section>

      <section className={styles.updatesSection}>
        <div className={styles.updatesCopy}>
          <span>PROPERTY RECORD</span>
          <h2>Every update.<br/><em>One property record.</em></h2>
          <p>Inspections, maintenance, approvals and completed work stay connected to the property instead of disappearing across chats.</p>
        </div>
        <div className={styles.updatesPhone}><PhoneShell screen="updates" /></div>
      </section>

      <section className={styles.whereverSection}>
        <div className={styles.whereverImage}><Image src={images.residence3} alt="Residence under DŌMICILE care" fill sizes="100vw" /></div>
        <div className={styles.whereverOverlay} />
        <div className={styles.whereverCopy}>
          <h2>YOUR PROPERTY,<br/>WHEREVER YOU ARE.</h2>
          <p>DŌMICILE gives owners one calm place to see what happened, what needs attention and what comes next.</p>
        </div>
        <div className={styles.whereverPhone}><PhoneShell screen="property" /></div>
        <div className={styles.maintenanceFloat}><small>MAINTENANCE STATUS</small><strong>92%</strong><span>ON-TIME FOLLOW-THROUGH</span></div>
      </section>

      <section className={styles.journeySection} id="journey">
        <div className={styles.journeyHeading}>
          <h2>Owner Journey</h2>
          <p>One continuous property-care relationship — from onboarding to routine oversight, approvals, maintenance and reporting.</p>
        </div>
        <div className={styles.journeyStage}>
          <div className={styles.journeyImage}><Image src={images.residence4} alt="Managed property" fill sizes="620px" /></div>
          <article className={styles.journeyOne}><small>STAGE 01</small><b>Onboard</b><p>Property, access, contacts and owner priorities are established.</p></article>
          <article className={styles.journeyTwo}><small>STAGE 02</small><b>Observe</b><p>Routine checks and status updates keep the property visible.</p></article>
          <article className={styles.journeyThree}><small>STAGE 03</small><b>Act</b><p>Maintenance and property matters move through one responsible local contact.</p></article>
          <article className={styles.journeyFour}><small>STAGE 04</small><b>Record</b><p>Reports, approvals and completed work remain connected to the property.</p></article>
        </div>
      </section>

      <section className={styles.flowSection}>
        <div className={styles.flowHeading}>
          <span>SYSTEM FLOW</span>
          <h2>Connecting every part of property care into <em>one clear flow.</em></h2>
        </div>
        <div className={styles.flowDiagram}>
          <div className={styles.flowImage}><Image src={images.residence2} alt="" fill sizes="900px" /></div>
          <div className={styles.flowNode + " " + styles.flowOwner}>OWNER</div>
          <div className={styles.flowNode + " " + styles.flowHome}>DŌMICILE<br/>HOME</div>
          <div className={styles.flowNode + " " + styles.flowProperty}>PROPERTY</div>
          <div className={styles.flowNode + " " + styles.flowReports}>REPORTS</div>
          <div className={styles.flowNode + " " + styles.flowApprovals}>APPROVALS</div>
          <div className={styles.flowNode + " " + styles.flowMaintenance}>MAINTENANCE</div>
          <div className={styles.flowNode + " " + styles.flowVisits}>VISITS</div>
          <div className={styles.flowNode + " " + styles.flowDocs}>DOCUMENTS</div>
          <svg viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
            <path d="M90 300 H360" />
            <path d="M440 300 H570" />
            <path d="M570 300 V90 H760" />
            <path d="M570 300 V195 H760" />
            <path d="M570 300 H760" />
            <path d="M570 300 V405 H760" />
            <path d="M570 300 V510 H760" />
            <path d="M760 90 H930" />
            <path d="M760 510 H930" />
          </svg>
        </div>
      </section>

      <section className={styles.problemSection}>
        <div className={styles.problemHeading}>
          <h2>Turning property chaos into <em>clear control.</em></h2>
          <p>Replacing scattered messages, maintenance chasing and uncertain follow-up with one dependable operating line.</p>
        </div>
        <div className={styles.problemLayout}>
          <div className={styles.problemCards}>
            <article><b>Scattered property information</b><p>Updates, photos and decisions disappear across different chats and people.</p><span>Problem 01</span></article>
            <article><b>Maintenance chasing</b><p>Owners spend time following technicians and trying to understand what has actually been completed.</p><span>Problem 02</span></article>
            <article><b>No clear property record</b><p>Approvals and completed work become difficult to recover later.</p><span>Problem 03</span></article>
          </div>
          <div className={styles.solutionVisual}>
            <div className={styles.solutionRing}>
              <div><Image src={images.hero} alt="Property care solution" fill sizes="500px" /></div>
            </div>
            <div className={styles.solutionText}><small>SOLUTION</small><b>Everything<br/>in one <em>place.</em></b></div>
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.processHeading}>
          <div><span>HOW DŌMICILE WORKS</span><h2>A clear four-step property care process.</h2></div>
          <p>A clear structure keeps owners informed while DŌMICILE handles the local coordination.</p>
        </div>
        <div className={styles.processMap}>
          <article className={styles.processOne}><span>01</span><b>Understand</b><p>Property, access, owner priorities and key contacts.</p></article>
          <article className={styles.processTwo}><span>02</span><b>Set up</b><p>DŌMICILE becomes the local operating point and prepares the Owner View.</p></article>
          <article className={styles.processThree}><span>03</span><b>Manage</b><p>Checks, maintenance, approvals and property matters are coordinated.</p></article>
          <article className={styles.processFour}><span>04</span><b>Report</b><p>Updates, records and next steps stay visible to the owner.</p></article>
          <div className={styles.processLine}><i/><i/><i/><i/></div>
        </div>
      </section>

      <section className={styles.contactSection} id="contact">
        <div className={styles.contactIntro}>
          <span>DŌMICILE / KIGALI</span>
          <h2>Your property.<br/>Handled.</h2>
          <p>Start with one conversation. Tell us where the property is and what you need handled.</p>
          <div><a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a><a href={whatsappUrl} target="_blank" rel="noreferrer">+250 799 409 409</a></div>
        </div>

        {sent ? (
          <div className={styles.sentState}><span>ENQUIRY RECEIVED</span><h3>We’ll contact you directly.</h3><button onClick={() => setSent(false)}>Send another enquiry</button></div>
        ) : (
          <form className={styles.contactForm} onSubmit={submit}>
            <label>Full name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name" /></label>
            <label>Phone / WhatsApp<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+250 ..." /></label>
            <label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com" /></label>
            <label>Property location<input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="Kigali" /></label>
            <label className={styles.formWide}>What do you need?
              <select value={form.need} onChange={e=>setForm({...form,need:e.target.value})}>
                <option value="">Select</option>
                <option>Ongoing property management</option>
                <option>Owner-away care</option>
                <option>Maintenance coordination</option>
                <option>Inspection / property check</option>
              </select>
            </label>
            <label className={styles.formWide}>Message<textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us anything useful..." /></label>
            <button className={styles.formWide} disabled={!ready || sending}>{sending ? "Sending..." : "Send to DŌMICILE"}</button>
          </form>
        )}
      </section>

      <section className={styles.faqSection}>
        <div><span>QUESTIONS</span><h2>Clear answers.</h2></div>
        <div className={styles.faqList}>
          {faq.map(([q,a],i)=>(
            <article key={q}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)}><b>{q}</b><span>{openFaq===i?"−":"+"}</span></button>
              {openFaq===i && <p>{a}</p>}
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}><ProductLogo dark /><p>PROPERTY MANAGEMENT<br/>BY IMVO GROUP</p><strong>YOUR PROPERTY. HANDLED.</strong></div>
        <div className={styles.footerLinks}>
          <div><span>SYSTEM</span><a href="#owner">Owner View</a><a href="#journey">How it works</a><a href="#faq">FAQ</a></div>
          <div><span>CONTACT</span><a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a><a href={whatsappUrl} target="_blank" rel="noreferrer">+250 799 409 409</a><small>Kigali, Rwanda</small></div>
        </div>
        <div className={styles.footerBottom}><span>© 2026 DŌMICILE / IMVO GROUP</span><div><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms">Terms</Link><Link href="/">IMVO Group ↗</Link></div></div>
        <div className={styles.footerWord} aria-hidden="true">domicile</div>
      </footer>
    </main>
  );
}
