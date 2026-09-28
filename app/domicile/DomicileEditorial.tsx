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
  building: "/chosen/casa-lumara.webp",
  building2: "/chosen/casa-palma.webp",
  building3: "/chosen/aurelian-villa.webp",
  building4: "/chosen/verdea-2.webp",
};

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function MiniChart() {
  return (
    <div className={styles.miniChart} aria-hidden="true">
      <span style={{ height: "38%" }} />
      <span style={{ height: "62%" }} />
      <span style={{ height: "46%" }} />
      <span style={{ height: "78%" }} />
      <span style={{ height: "58%" }} />
      <span style={{ height: "88%" }} />
    </div>
  );
}

function DashboardMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? styles.dashboardCompact : styles.dashboardMock}>
      <div className={styles.dashboardNav}>
        <div className={styles.dashboardBrand}>
          <span className={styles.logoMark}>D</span>
          <b>DŌMICILE</b>
        </div>
        <div className={styles.dashboardTabs}>
          <span className={styles.dashboardActive}>Overview</span>
          <span>Reports</span>
          <span>Approvals</span>
        </div>
        <span className={styles.avatar}>IM</span>
      </div>

      <div className={styles.dashboardBody}>
        <div className={styles.metricGrid}>
          <article>
            <small>PROPERTY STATUS</small>
            <strong>All good</strong>
            <em>Last check today</em>
          </article>
          <article>
            <small>OPEN ITEMS</small>
            <strong>01</strong>
            <em>1 approval needed</em>
          </article>
          <article>
            <small>NEXT VISIT</small>
            <strong>27 AUG</strong>
            <em>Routine inspection</em>
          </article>
        </div>

        <div className={styles.dashboardMainGrid}>
          <article className={styles.chartPanel}>
            <div className={styles.panelTitle}>
              <span>Property activity</span>
              <b>Last 30 days</b>
            </div>
            <svg viewBox="0 0 420 150" role="img" aria-label="Property activity chart">
              <path d="M10 118 C65 85,90 100,128 78 S203 58,240 72 S316 102,410 35" fill="none" stroke="currentColor" strokeWidth="4"/>
              <path d="M10 130 C72 120,100 128,142 111 S222 93,267 101 S337 112,410 83" fill="none" stroke="currentColor" strokeWidth="2" opacity=".35"/>
            </svg>
          </article>

          <article className={styles.statusPanel}>
            <span>Maintenance</span>
            <strong>92%</strong>
            <small>On-time resolution</small>
            <div className={styles.progress}><i /></div>
          </article>
        </div>
      </div>
    </div>
  );
}

function PhoneMock({ variant = "overview" }: { variant?: "overview" | "analytics" | "home" }) {
  return (
    <div className={styles.phone}>
      <div className={styles.phoneNotch} />
      <div className={styles.phoneScreen}>
        <div className={styles.phoneTop}>
          <span>9:41</span>
          <div><i/><i/><i/></div>
        </div>
        <div className={styles.phoneBrand}>
          <span className={styles.logoMark}>D</span>
          <b>DŌMICILE</b>
          <span className={styles.phoneBell}>•</span>
        </div>

        {variant === "overview" && (
          <>
            <div className={styles.phoneMetricRow}>
              <article><small>Status</small><strong>GOOD</strong></article>
              <article><small>Open</small><strong>01</strong></article>
            </div>
            <div className={styles.phoneCard}>
              <small>NEXT PROPERTY VISIT</small>
              <strong>27 AUG</strong>
              <span>Kigali · 09:30</span>
            </div>
            <div className={styles.phoneCard}>
              <small>MAINTENANCE</small>
              <div className={styles.phoneProgress}><i /></div>
              <span>HVAC inspection · complete</span>
            </div>
          </>
        )}

        {variant === "analytics" && (
          <>
            <div className={styles.phoneCard}>
              <small>ISSUES BY SOURCE</small>
              <MiniChart />
            </div>
            <div className={styles.phoneMetricRow}>
              <article><small>Closed</small><strong>14</strong></article>
              <article><small>Open</small><strong>01</strong></article>
            </div>
            <div className={styles.phoneCard}>
              <small>OWNER APPROVALS</small>
              <strong>1 pending</strong>
              <span>Maintenance quotation</span>
            </div>
          </>
        )}

        {variant === "home" && (
          <>
            <div className={styles.phonePropertyImage}>
              <Image src={images.building2} alt="" fill sizes="260px" />
            </div>
            <div className={styles.phoneMetricRow}>
              <article><small>Checks</small><strong>12</strong></article>
              <article><small>Issues</small><strong>01</strong></article>
            </div>
            <div className={styles.phoneCard}>
              <small>PROPERTY CARE</small>
              <span>Routine inspection</span>
              <div className={styles.phoneProgress}><i /></div>
            </div>
          </>
        )}

        <div className={styles.phoneNav}>
          <span className={styles.phoneNavActive}>⌂</span>
          <span>▥</span>
          <span>◴</span>
          <span>⚙</span>
        </div>
      </div>
    </div>
  );
}

const faq = [
  ["Who is DŌMICILE for?", "Property owners who want one dependable local point of contact for oversight, maintenance and owner-away care."],
  ["Do I have to live abroad?", "No. DŌMICILE is for owners abroad, frequent travellers and Kigali-based owners who prefer delegated property care."],
  ["How do approvals work?", "You keep control of decisions that matter. Costs and works requiring approval stay visible before action."],
  ["Where do you currently operate?", "DŌMICILE is currently focused on Kigali, Rwanda."],
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  location: string;
  need: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  location: "",
  need: "",
  message: "",
};

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
        <Link href="/domicile" className={styles.brand}>
          <Image src="/domicile/domicile-black-no-tagline.svg" alt="DŌMICILE" width={900} height={220} priority />
        </Link>
        <nav>
          <a href="#system">System</a>
          <a href="#owner">Owner View</a>
          <a href="#journey">How it works</a>
        </nav>
        <a href="#contact" className={styles.headerCta}>Get started</a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <Image src={images.hero} alt="Modern residence managed through DŌMICILE" fill priority sizes="100vw" />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroCopy}>
          <span>PROPERTY MANAGEMENT · KIGALI</span>
          <h1>YOUR PROPERTY.<br/>ONE CLEAR SYSTEM.</h1>
          <p>Property oversight, maintenance, approvals and owner visibility — connected through one dependable local point of contact.</p>
          <a href="#system">Explore DŌMICILE ↓</a>
        </div>

        <div className={styles.heroCard}>
          <strong>Property care,<br/>in one place.</strong>
          <p>One owner view. One local contact. One record of what happened and what comes next.</p>
          <span>DŌMICILE / IMVO GROUP</span>
        </div>
      </section>

      <section className={styles.intro} id="system">
        <div className={styles.introMeta}>
          <span>WHAT IS DŌMICILE?</span>
          <small>Property Management<br/>Platform</small>
        </div>
        <div className={styles.introCopy}>
          <h2>DŌMICILE is a property management platform that keeps owners connected to everything that matters.</h2>
          <p>From routine inspections and maintenance to approvals, reports and owner-away care, DŌMICILE brings the property into one clear operating system.</p>
          <div className={styles.introFacts}>
            <div><span>LOCATION</span><b>Kigali, Rwanda</b></div>
            <div><span>FOCUS</span><b>Property care + owner visibility</b></div>
            <div><span>BY</span><b>IMVO Group</b></div>
          </div>
        </div>
        <div className={styles.introArt}>
          <div className={styles.arcImage}>
            <Image src={images.intro} alt="" fill sizes="420px" />
          </div>
        </div>
        <div className={styles.projectStats}>
          <div><strong>24/7</strong><span>Owner access</span></div>
          <div><strong>01</strong><span>Responsible local contact</span></div>
          <div><strong>100%</strong><span>Private by default</span></div>
        </div>
        <div className={styles.laptopScene}>
          <DashboardMock compact />
        </div>
      </section>

      <section className={styles.experience}>
        <div className={styles.experienceTitle}>
          <span>OWNER EXPERIENCE</span>
          <h2>Designed to turn property complexity into <em>clarity</em>, <em>control</em>, and confident decisions.</h2>
        </div>
        <div className={styles.laptopLarge}>
          <DashboardMock />
        </div>
      </section>

      <section className={styles.architectureShowcase}>
        <div className={styles.architectureImage}>
          <Image src={images.building} alt="DŌMICILE property" fill sizes="100vw" />
        </div>
        <div className={styles.floatingInfo}>
          <article>
            <b>Property oversight</b>
            <p>Checks, status, access and follow-through stay visible in one place.</p>
          </article>
          <article>
            <b>Maintenance coordination</b>
            <p>Issues, technicians, approvals and progress stay connected to the same property record.</p>
          </article>
        </div>
        <div className={styles.floatingLogo}>D</div>
      </section>

      <section className={styles.mobileSection} id="owner">
        <div className={styles.mobileHeading}>
          <h2>Property Management.<br/>Right in Your <em>Pocket.</em></h2>
          <p>Stay connected wherever you are. See status, maintenance, approvals and what comes next through one mobile experience.</p>
        </div>

        <div className={styles.mobileCanvas}>
          <div className={styles.sideStat + " " + styles.sideStatLeft}>
            <small>PROPERTY STATUS</small><strong>ALL GOOD</strong><span>Latest inspection complete</span>
          </div>
          <div className={styles.sideStat + " " + styles.sideStatRight}>
            <small>OWNER APPROVALS</small><strong>01</strong><span>Pending decision</span>
          </div>
          <PhoneMock variant="overview" />
          <div className={styles.wideChart}>
            <svg viewBox="0 0 780 160">
              <path d="M10 112 C100 80,145 122,220 92 S360 52,435 82 S575 118,770 46" fill="none" stroke="currentColor" strokeWidth="4"/>
              <path d="M10 126 C90 116,160 128,240 111 S390 92,470 102 S610 119,770 92" fill="none" stroke="currentColor" strokeWidth="2" opacity=".3"/>
            </svg>
          </div>
        </div>
      </section>

      <section className={styles.analyticsSection}>
        <div className={styles.analyticsCopy}>
          <h2>Property visibility.<br/>Built for <em>Better Decisions.</em></h2>
          <p>Track what needs attention, what has been resolved and what requires your approval from one place.</p>
        </div>
        <div className={styles.analyticsStage}>
          <div className={styles.analyticsCard + " " + styles.analyticsCardOne}>
            <b>Open items</b><p>See exactly what still needs action.</p><strong>01</strong><span>Open matter</span>
          </div>
          <div className={styles.analyticsCard + " " + styles.analyticsCardTwo}>
            <b>Maintenance</b><p>Understand what is active and what is complete.</p><strong>92%</strong><span>On-time resolution</span>
          </div>
          <PhoneMock variant="analytics" />
        </div>
      </section>

      <section className={styles.responsiveSection}>
        <div className={styles.responsiveImage}>
          <Image src={images.building3} alt="" fill sizes="100vw" />
        </div>
        <div className={styles.responsiveCopy}>
          <h2>Fully responsive owner interface <em>Experience.</em></h2>
          <p>Managing a property should not require multiple conversations and scattered records. DŌMICILE brings the important parts together.</p>
        </div>
        <div className={styles.responsivePhone}><PhoneMock variant="home" /></div>
        <div className={styles.responsiveStat}>
          <small>MAINTENANCE PERFORMANCE</small>
          <strong>92%</strong>
          <span>On-time resolution</span>
        </div>
      </section>

      <section className={styles.journeySection} id="journey">
        <div className={styles.journeyHeading}>
          <h2>Owner Journey</h2>
          <p>One continuous property-care relationship — from onboarding to routine oversight, approvals, maintenance and reporting.</p>
        </div>
        <div className={styles.journeyVisual}>
          <div className={styles.journeyCircle}>
            <Image src={images.building4} alt="" fill sizes="580px" />
          </div>
          {[
            ["01","Onboard","Property, access, owner priorities and contacts are set."],
            ["02","Observe","Routine checks and status updates keep the property visible."],
            ["03","Act","Maintenance and property matters move through one responsible contact."],
            ["04","Record","Reports, approvals and completed work remain connected."],
          ].map(([n,t,p],i)=>(
            <article key={n} className={styles["journeyCard" + (i+1)]}>
              <small>STAGE {n}</small>
              <b>{t}</b>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.flowSection}>
        <div className={styles.flowTitle}>
          <span>SYSTEM FLOW</span>
          <h2>Connecting every part of property management into <em>one seamless flow.</em></h2>
        </div>
        <div className={styles.flowMap}>
          <div className={styles.flowImage}>
            <Image src={images.building2} alt="" fill sizes="700px" />
          </div>
          <div className={styles.flowNode + " " + styles.nodeA}>Onboarding</div>
          <div className={styles.flowNode + " " + styles.nodeB}>Owner login</div>
          <div className={styles.flowNode + " " + styles.nodeC}>Home</div>
          <div className={styles.flowNode + " " + styles.nodeD}>Property</div>
          <div className={styles.flowNode + " " + styles.nodeE}>Reports</div>
          <div className={styles.flowNode + " " + styles.nodeF}>Approvals</div>
          <div className={styles.flowNode + " " + styles.nodeG}>Maintenance</div>
          <svg viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">
            <path d="M150 280 H355 H500 H670 H835" />
            <path d="M500 280 V140 H670" />
            <path d="M500 280 V420 H670" />
            <path d="M670 140 H835" />
            <path d="M670 420 H835" />
          </svg>
        </div>
      </section>

      <section className={styles.problemSection}>
        <div className={styles.problemHeading}>
          <h2>Turning property chaos into <em>clear control.</em></h2>
          <p>Replacing scattered messages, maintenance chasing and uncertain follow-up with one dependable operating line.</p>
        </div>
        <div className={styles.problemGrid}>
          <div className={styles.problemCards}>
            <article><b>Scattered property information</b><p>Updates, photos and decisions disappear across different chats and people.</p><span>Problem 01</span></article>
            <article><b>Maintenance chasing</b><p>Owners spend time following technicians and trying to understand what is actually complete.</p><span>Problem 02</span></article>
            <article><b>No clear property record</b><p>Approvals and completed work are difficult to recover later.</p><span>Problem 03</span></article>
          </div>
          <div className={styles.solutionArc}>
            <div className={styles.solutionImage}><Image src={images.hero} alt="" fill sizes="520px" /></div>
            <div className={styles.solutionBlur} />
            <div className={styles.solutionLabel}><span>SOLUTION</span><b>Everything in one <em>Place.</em></b></div>
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.processHeader}>
          <div>
            <span>HOW DŌMICILE WORKS</span>
            <h2>A four-step property care process built for clarity.</h2>
          </div>
          <p>A clear structure keeps owners informed while DŌMICILE handles the local coordination.</p>
        </div>
        <div className={styles.processMap}>
          {[
            ["01","Understand","Property, access and priorities"],
            ["02","Set up","Owner view and contacts"],
            ["03","Manage","Checks, maintenance and approvals"],
            ["04","Report","Records, follow-through and next steps"],
          ].map(([n,t,p],i)=>(
            <article key={n} className={styles["processCard" + (i+1)]}>
              <span>{n}</span>
              <b>{t}</b>
              <p>{p}</p>
            </article>
          ))}
          <div className={styles.processRail}>
            <i/><i/><i/><i/>
          </div>
        </div>
      </section>

      <section className={styles.contactSection} id="contact">
        <div className={styles.contactIntro}>
          <span>DŌMICILE / KIGALI</span>
          <h2>Your property.<br/>Handled.</h2>
          <p>Start with one conversation. Tell us where the property is and what you need handled.</p>
          <div>
            <a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">+250 799 409 409</a>
          </div>
        </div>

        {sent ? (
          <div className={styles.sentState}>
            <span>ENQUIRY RECEIVED</span>
            <h3>We’ll contact you directly.</h3>
            <button onClick={() => setSent(false)}>Send another enquiry</button>
          </div>
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
        <div>
          <span>QUESTIONS</span>
          <h2>Clear answers.</h2>
        </div>
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
        <Image src="/domicile/domicile-white-no-tagline.svg" alt="DŌMICILE" width={900} height={220} />
        <div>
          <span>PROPERTY MANAGEMENT BY IMVO GROUP</span>
          <span>KIGALI · RWANDA</span>
          <Link href="/">IMVO GROUP ↗</Link>
        </div>
      </footer>
    </main>
  );
}
