"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import PracticeSwitcher from "../components/PracticeSwitcher";
import styles from "./DomicileEditorial.module.css";

const whatsappUrl =
  "https://wa.me/250799409409?text=" +
  encodeURIComponent("Hello DŌMICILE, I would like to discuss property management.");

const images = {
  hero: "/chosen/casa-vento.webp",
  difference: "/chosen/virunga-residence.webp",
  mobile: "/chosen/casa-lumara.webp",
  property: "/chosen/casa-palma.webp",
};

type IconName =
  | "play"
  | "arrow"
  | "check"
  | "clock"
  | "tool"
  | "file"
  | "map"
  | "gear"
  | "link"
  | "chart"
  | "home"
  | "updates"
  | "reports"
  | "property"
  | "message";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
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

  const p: Record<IconName, ReactNode> = {
    play: <><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/></>,
    arrow: <><path d="M4 12h15"/><path d="m14 7 5 5-5 5"/></>,
    check: <><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    tool: <><path d="M14 6.2a4 4 0 0 0-5.2 5.2L4 16.2 7.8 20l4.8-4.8A4 4 0 0 0 17.8 10l-3 3-3.8-3.8z"/></>,
    file: <><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4"/><path d="M9 12h6M9 16h6"/></>,
    map: <><path d="m3 6 5-2 8 3 5-2v13l-5 2-8-3-5 2z"/><path d="M8 4v13M16 7v13"/></>,
    gear: <><circle cx="12" cy="12" r="3"/><path d="M19 13.5v-3l-2-.6-.8-1.9 1-1.9-2.1-2.1-1.9 1-1.9-.8L10.5 2h-3l-.6 2.2-1.9.8-1.9-1L1 6.1 2 8l-.8 1.9-2 .6v3l2 .6.8 1.9-1 1.9L3.1 20l1.9-1 1.9.8.6 2.2h3l.8-2.2 1.9-.8 1.9 1 2.1-2.1-1-1.9.8-1.9z"/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.1 0l2.1-2.1a5 5 0 0 0-7.1-7.1L10.9 5"/><path d="M14 11a5 5 0 0 0-7.1 0l-2.1 2.1a5 5 0 0 0 7.1 7.1l1.2-1.2"/></>,
    chart: <><path d="M5 20V10M12 20V4M19 20v-7"/><path d="M3 20h18"/></>,
    home: <><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/></>,
    updates: <><path d="M4 12a8 8 0 1 0 2.3-5.7"/><path d="M4 4v6h6"/><path d="M12 8v4l2.5 1.5"/></>,
    reports: <><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4"/><path d="M9 12h6M9 16h6"/></>,
    property: <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 20V9h8v11"/></>,
    message: <><path d="M4 5h16v11H8l-4 3z"/></>,
  };

  return <svg {...common}>{p[name]}</svg>;
}

function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`${styles.logoCrop} ${light ? "" : styles.logoCropDark} ${className}`}>
      <Image
        src="/domicile/domicile-white.webp"
        alt="DŌMICILE"
        width={1495}
        height={376}
        priority
      />
    </span>
  );
}

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardTop}>
        <div className={styles.dashboardLogo}><Logo /></div>
        <nav>
          <span className={styles.activeTab}>Overview</span>
          <span>Properties</span>
          <span>Maintenance</span>
          <span>Approvals</span>
          <span>Reports</span>
        </nav>
        <div className={styles.ownerMini}><i>JM</i><div><b>James M.</b><small>Owner</small></div></div>
      </div>

      <div className={styles.dashboardTitle}>
        <div><small>PROPERTY OVERVIEW</small><h3>Kigali Residence</h3></div>
        <span className={styles.goodPill}><i /> All good</span>
      </div>

      <div className={styles.dashboardMetrics}>
        <article><small>PROPERTY STATUS</small><strong>All good</strong><span>Last checked today</span></article>
        <article><small>OPEN ITEMS</small><strong>03</strong><span className={styles.attention}>Needs attention</span></article>
        <article><small>NEXT VISIT</small><strong>27 Aug</strong><span>Routine inspection</span></article>
        <article><small>ACTIVE REQUESTS</small><strong>05</strong><span>In progress</span></article>
      </div>

      <div className={styles.dashboardBody}>
        <article className={styles.activityList}>
          <div className={styles.listHead}><div><small>RECENT ACTIVITY</small><b>What happened at the property</b></div><span>View all</span></div>
          <ul>
            <li><span className={styles.activityIcon + " " + styles.green}><Icon name="check" size={14}/></span><div><b>Routine inspection completed</b><small>Today · Photos uploaded</small></div></li>
            <li><span className={styles.activityIcon + " " + styles.blue}><Icon name="tool" size={14}/></span><div><b>Water tank service completed</b><small>Yesterday · Completed</small></div></li>
            <li><span className={styles.activityIcon + " " + styles.orange}><Icon name="file" size={14}/></span><div><b>Fence repair quotation</b><small>2 days ago · Awaiting approval</small></div></li>
            <li><span className={styles.activityIcon + " " + styles.gray}><Icon name="clock" size={14}/></span><div><b>Garden maintenance scheduled</b><small>3 days ago · 12 Aug 2024</small></div></li>
          </ul>
        </article>

        <article className={styles.pendingList}>
          <div className={styles.listHead}><div><small>PENDING APPROVALS</small></div><span>View all</span></div>
          <ul>
            <li><div><b>Fence repair quotation</b><small>RWF 285,000</small></div><button>Review</button></li>
            <li><div><b>Generator service</b><small>RWF 120,000</small></div><button>Review</button></li>
            <li><div><b>Painting quote</b><small>RWF 450,000</small></div><button>Review</button></li>
          </ul>
        </article>
      </div>
    </div>
  );
}

function Laptop() {
  return (
    <motion.div
      className={styles.laptop}
      initial={{ opacity: 0, y: 36, rotateX: -7 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: .8, ease: [0.16,1,0.3,1] }}
    >
      <div className={styles.laptopLid}><div className={styles.webcam}/><Dashboard /></div>
      <div className={styles.laptopBase}><i /></div>
    </motion.div>
  );
}

function Phone({ variant }: { variant: "property" | "updates" }) {
  return (
    <motion.div
      className={styles.phone}
      initial={{ opacity: 0, y: 50, rotateY: variant === "property" ? -12 : 12 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .7, delay: variant === "updates" ? .08 : 0 }}
    >
      <div className={styles.island}/>
      <div className={styles.phoneStatus}><span>9:41</span><b>•••</b></div>
      <div className={styles.phoneHead}><Logo /><span className={styles.avatarDot}>J</span></div>

      {variant === "property" ? (
        <>
          <div className={styles.phonePropertyPhoto}><Image src={images.property} alt="Kigali Residence" fill sizes="260px" /></div>
          <div className={styles.phonePropertyName}><small>Kigali Residence</small><span><i/> All good</span></div>
          <div className={styles.phoneMiniGrid}>
            <article><Icon name="updates" size={16}/><b>Updates</b></article>
            <article><Icon name="check" size={16}/><b>Approvals</b></article>
            <article><Icon name="reports" size={16}/><b>Reports</b></article>
            <article><Icon name="tool" size={16}/><b>Maintenance</b></article>
          </div>
        </>
      ) : (
        <>
          <div className={styles.updateTitle}><small>Updates</small><div><span className={styles.activeChip}>All</span><span>Maintenance</span><span>Approvals</span><span>Visits</span></div></div>
          <div className={styles.phoneUpdates}>
            {[
              ["Routine inspection completed","Today · 3 photos"],
              ["Water tank service","Completed · 2 days"],
              ["Garden maintenance","Completed · 2 days"],
              ["Fence repair quotation","Awaiting your approval"],
              ["Generator inspection","No action required"],
            ].map(([title,meta],i)=>(
              <article key={title}>
                <div className={styles.updateThumb}><Image src={i%2===0?images.property:images.mobile} alt="" fill sizes="45px" /></div>
                <div><b>{title}</b><small>{meta}</small></div>
              </article>
            ))}
          </div>
        </>
      )}

      <div className={styles.phoneBottom}>
        <span className={styles.phoneBottomActive}><Icon name="home" size={16}/><small>Home</small></span>
        <span><Icon name="updates" size={16}/><small>Updates</small></span>
        <span><Icon name="property" size={16}/><small>Property</small></span>
        <span><Icon name="message" size={16}/><small>Messages</small></span>
        <span><Icon name="reports" size={16}/><small>More</small></span>
      </div>
    </motion.div>
  );
}

export default function DomicileEditorial() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} id="home">
        <div className={styles.heroMedia}><Image src={images.hero} alt="Premium residence managed by DŌMICILE" fill priority sizes="100vw" /></div>
        <div className={styles.heroShade}/>

        <header className={styles.header}>
          <Link href="/domicile" className={styles.headerLogo} aria-label="DŌMICILE home"><Logo light /></Link>
          <div className={styles.headerCenter}>
            <PracticeSwitcher placement="inline" variant="light" />
            <nav>
              <a href="#home" className={styles.current}>Home</a>
              <a href="#process">How it works</a>
              <a href="#owner">Owner experience</a>
              <a href="#difference">Features</a>
              <a href="/about">About</a>
            </nav>
          </div>
          <div className={styles.headerActions}>
            <a href="#owner" className={styles.signIn}>Sign in</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.startButton}>Start a conversation <Icon name="arrow" size={14}/></a>
          </div>
        </header>

        <div className={styles.heroInner}>
          <motion.div className={styles.heroCopy} initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.75}}>
            <span>PROPERTY MANAGEMENT · KIGALI</span>
            <h1>YOUR<br/>PROPERTY,<br/><em>BEAUTIFULLY</em><br/>HANDLED.</h1>
            <p>Complete property care, in one place. Oversight, maintenance, approvals and updates — handled through one dependable local point of contact.</p>
            <div className={styles.heroButtons}>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">Start a conversation <Icon name="arrow" size={14}/></a>
              <a href="#process" className={styles.playButton}><Icon name="play" size={18}/> See how it works</a>
            </div>
            <div className={styles.heroStats}>
              <div><strong>100+</strong><small>Properties managed</small></div>
              <div><strong>98%</strong><small>Owner satisfaction</small></div>
              <div><strong>24/7</strong><small>Local support</small></div>
              <div><strong>4x</strong><small>Faster issue resolution</small></div>
            </div>
          </motion.div>

          <motion.div className={styles.glassCard} initial={{opacity:0,x:35}} animate={{opacity:1,x:0}} transition={{duration:.8,delay:.18}}>
            <i/>
            <h2>Property care,<br/>in one place.</h2>
            <p>Real people. Local expertise.<br/>Complete peace of mind.</p>
            <div className={styles.ratingRow}>
              <div className={styles.avatars}><span>A</span><span>M</span><span>J</span></div>
              <div><b>★★★★★</b><small>4.9/5<br/>from property owners</small></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.difference} id="difference">
        <div className={styles.differenceImage}><Image src={images.difference} alt="" fill sizes="100vw" /></div>
        <div className={styles.differenceFade}/>
        <div className={styles.differenceCopy}>
          <span>THE DŌMICILE DIFFERENCE</span>
          <h2>More than property<br/>management.<br/><em>A better way to own.</em></h2>
          <p>DŌMICILE connects every part of property care — people, processes and information — so you always know what’s happening, and what comes next.</p>
          <a href="/about">Our story <Icon name="arrow" size={14}/></a>
        </div>
        <div className={styles.laptopWrap}><Laptop /></div>
        <div className={styles.handNote}>Real data.<br/>Real clarity.<br/>Total control.<i>↙</i></div>
        <div className={styles.books}><span>THE KIGALI COLLECTION</span><span>MODERN LIVING</span></div>
      </section>

      <section className={styles.process} id="process">
        <div className={styles.processHead}>
          <div><span>HOW IT WORKS</span><h2>A clear four-step<br/>property care process.</h2></div>
          <p>A clear structure keeps owners informed while DŌMICILE handles the local coordination.</p>
          <a href="#owner">Explore the process <Icon name="arrow" size={14}/></a>
        </div>
        <div className={styles.processTrack}>
          {[
            ["01","map","Understand","Property, access, owner priorities and key contacts."],
            ["02","gear","Set up","DŌMICILE becomes the local operating point and prepares the Owner View."],
            ["03","link","Manage","Inspections, maintenance, approvals and updates — all connected."],
            ["04","chart","Report","A clear record of what happened and what comes next."],
          ].map(([n,icon,title,copy],i)=>(
            <div className={styles.processStep} key={n}>
              <div className={styles.stepCircle}><span>{n}</span><Icon name={icon as IconName} size={21}/><b>{title}</b><p>{copy}</p></div>
              {i<3 && <div className={styles.stepArrow}><Icon name="arrow" size={18}/></div>}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.owner} id="owner">
        <div className={styles.ownerBg}><Image src={images.mobile} alt="" fill sizes="100vw" /></div>
        <div className={styles.ownerShade}/>
        <div className={styles.ownerCopy}>
          <span>IN YOUR HAND</span>
          <h2>Your property.<br/>Everywhere you are.</h2>
          <p>The DŌMICILE app keeps you connected with real-time updates, photos, approvals and messages — all in one place, anytime, anywhere.</p>
          <div className={styles.storeBadges}>
            <div><small>Download on the</small><b> App Store</b></div>
            <div><small>GET IT ON</small><b>▶ Google Play</b></div>
          </div>
        </div>

        <div className={styles.phones}><Phone variant="property"/><Phone variant="updates"/></div>

        <div className={styles.ownerFeatures}>
          <article><span><Icon name="updates" size={19}/></span><div><b>Real-time updates</b><p>Photos, notes and progress.</p></div></article>
          <article><span><Icon name="link" size={19}/></span><div><b>Approvals on the go</b><p>Review and approve in seconds.</p></div></article>
          <article><span><Icon name="message" size={19}/></span><div><b>Direct local support</b><p>Message the DŌMICILE team.</p></div></article>
        </div>
      </section>

      <section className={styles.challenge}>
        <div className={styles.challengeSide}>
          <span>THE CHALLENGE</span>
          <h2>Scattered information<br/>creates uncertainty.</h2>
          <p>Updates, photos and decisions are spread across different chats and people, making it hard to keep track of your property.</p>
          <ul>
            <li>Updates lost in chats</li>
            <li>Maintenance chasing</li>
            <li>No clear property record</li>
          </ul>

          <div className={styles.chatMap}>
            <span className={styles.chatBadge + " " + styles.wa}>W</span>
            <span className={styles.chatBadge + " " + styles.mail}>M</span>
            <article className={styles.chatOne}><i>TK</i><div><small>Technician</small><b>Work completed ✓</b><span>2 photos</span></div></article>
            <article className={styles.chatTwo}><i>CO</i><div><small>Contractor</small><b>Can we approve this?</b></div></article>
            <article className={styles.chatThree}><i>PM</i><div><small>Property Manager</small><b>Latest update here...</b></div></article>
            <article className={styles.chatFour}><i>YO</i><div><small>You</small><b>Which one is the final status?</b></div></article>
          </div>
        </div>

        <div className={styles.solutionSide}>
          <span>THE SOLUTION</span>
          <h2>Everything in <em>one place.</em></h2>
          <p>Inspections, maintenance, approvals and completed work stay connected to the property, not scattered across chats.</p>
          <ul>
            <li><Icon name="check" size={16}/> All updates in one place</li>
            <li><Icon name="check" size={16}/> Faster, clearer decisions</li>
            <li><Icon name="check" size={16}/> Complete property record</li>
          </ul>

          <div className={styles.solutionOrbit}>
            <div className={styles.orbitImage}><Image src={images.property} alt="Managed residence" fill sizes="240px"/></div>
            <span className={styles.orbitIcon + " " + styles.oi1}><Icon name="file" size={16}/></span>
            <span className={styles.orbitIcon + " " + styles.oi2}><Icon name="chart" size={16}/></span>
            <span className={styles.orbitIcon + " " + styles.oi3}><Icon name="link" size={16}/></span>
            <span className={styles.orbitIcon + " " + styles.oi4}><Icon name="message" size={16}/></span>
            <article className={styles.propertyUpdated}><small>Property updated</small><b>Routine inspection completed</b><span>11:24 AM</span></article>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <Image
              src="/domicile/domicile-white.webp"
              alt="DŌMICILE — Property Management by IMVO Group"
              width={1495}
              height={376}
              className={styles.footerLogo}
            />
            <p>
              Property management and ongoing property care in Kigali, Rwanda —
              coordinated through one dependable local point of contact.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className={styles.footerCta}>
              Start a conversation <Icon name="arrow" size={14}/>
            </a>
          </div>

          <div className={styles.footerColumn}>
            <small>EXPLORE</small>
            <a href="#home">Home</a>
            <a href="#process">How it works</a>
            <a href="#owner">Owner experience</a>
            <a href="#difference">Features</a>
            <Link href="/about">About IMVO Group</Link>
          </div>

          <div className={styles.footerColumn}>
            <small>PROPERTY CARE</small>
            <span>Property oversight</span>
            <span>Routine inspections</span>
            <span>Maintenance coordination</span>
            <span>Owner approvals</span>
            <span>Reports & property records</span>
            <span>Owner-away care</span>
          </div>

          <div className={styles.footerColumn}>
            <small>CONTACT</small>
            <a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a>
            <a href="tel:+250799409409">+250 799 409 409</a>
            <span>Kigali, Rwanda</span>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp DŌMICILE ↗</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerCopyright}>
            <Image
              src="/domicile/logo-icon-white.webp"
              alt=""
              width={727}
              height={919}
              className={styles.footerIcon}
            />
            <span>© 2026 DŌMICILE / IMVO GROUP</span>
          </div>
          <div>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/">IMVO Group ↗</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
