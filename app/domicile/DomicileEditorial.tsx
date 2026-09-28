"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import styles from "./DomicileEditorial.module.css";

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_DOMICILE_WEB3FORMS_KEY ||
  "566d4852-a822-4432-83ba-8d522618ee66";

const whatsappUrl =
  "https://wa.me/250799409409?text=" +
  encodeURIComponent(
    "Hello DŌMICILE, I would like to discuss property management with your team."
  );

const images = {
  hero: "/domicile/exact/estate-hero.png",
  c1: "/domicile/exact/estate-c1.png",
  street: "/domicile/exact/estate-street.png",
  privateResidence: "/domicile/exact/estate-c1.png",
  residentialEstate: "/domicile/exact/estate-hero.png",
  privateHome: "/domicile/exact/estate-street.png",
};

const explanation = [
  {
    number: "01",
    title: "We understand the property",
    text: "We establish the home, access arrangements, priorities, contacts and the level of authority you want DŌMICILE to hold.",
  },
  {
    number: "02",
    title: "We become the local point of contact",
    text: "Routine checks, technicians, repairs and property matters move through one responsible desk instead of several disconnected conversations.",
  },
  {
    number: "03",
    title: "You approve what matters",
    text: "Costs, works and decisions that require your authority stay visible and are confirmed before action, except where agreed emergency authority applies.",
  },
  {
    number: "04",
    title: "You keep the record",
    text: "Photos, notes, reports, approvals and completed matters stay connected to the same property so you can see what happened and what comes next.",
  },
];

const services = [
  {
    icon: "⌂",
    title: "Property oversight",
    text: "Scheduled checks, local presence and clear follow-through on the matters that affect your property.",
  },
  {
    icon: "◎",
    title: "Routine inspections",
    text: "Structured property checks with observations, photographs and a useful record for the owner.",
  },
  {
    icon: "⌁",
    title: "Maintenance & repairs",
    text: "Issues are scoped, technicians coordinated and completion followed through instead of being left in message threads.",
  },
  {
    icon: "↗",
    title: "Technician coordination",
    text: "A single local point of contact coordinates access, attendance, updates and the work around your property.",
  },
  {
    icon: "◌",
    title: "Owner-away care",
    text: "Dependable local presence when you are outside Kigali, travelling or simply want the property handled.",
  },
  {
    icon: "◇",
    title: "Property works",
    text: "Repairs and improvements are coordinated with the owner’s approval, priorities and required level of oversight.",
  },
];

const propertyStories = [
  {
    number: "01",
    title: "Private residence",
    status: "ROUTINE CARE ACTIVE",
    image: images.privateResidence,
    copy: "Scheduled checks, issue follow-through and one clear local contact for the owner.",
  },
  {
    number: "02",
    title: "Residential estate",
    status: "INSPECTION SCHEDULED",
    image: images.residentialEstate,
    copy: "Property readiness, maintenance coordination and owner visibility kept in one place.",
  },
  {
    number: "03",
    title: "Private home",
    status: "OWNER-AWAY CARE",
    image: images.privateHome,
    copy: "Local presence while the owner is away, with private reporting and direct escalation when needed.",
  },
];

const faqItems = [
  [
    "Do I need to live outside Rwanda?",
    "No. DŌMICILE is for owners abroad, frequent travellers and Kigali-based owners who want reliable delegated property care.",
  ],
  [
    "Can you manage one property only?",
    "Yes. The service can be shaped around one home, several properties or a defined one-off need.",
  ],
  [
    "How are repairs approved?",
    "The approval process is agreed during onboarding. Work requiring owner approval does not proceed until authority is confirmed.",
  ],
  [
    "What happens if something is urgent?",
    "The matter is triaged, the owner is contacted and DŌMICILE acts within any pre-agreed emergency authority where applicable.",
  ],
  [
    "Will my property appear on the website?",
    "No, not by default. Client properties and identifying information are public only when the owner has explicitly agreed.",
  ],
  ["Which areas do you serve?", "DŌMICILE is currently focused on properties across Kigali, Rwanda."],
];

const tabs = ["Overview", "Photos", "Reports", "Approvals", "Maintenance"];
const tabCopy: Record<string, { title: string; text: string }> = {
  Overview: {
    title: "Everything important, in one place.",
    text: "See what happened, what needs approval, what comes next and what has already been closed.",
  },
  Photos: {
    title: "A visual record of the property.",
    text: "Inspection, maintenance and follow-up photography stays attached to the property record.",
  },
  Reports: {
    title: "Reports stay easy to find.",
    text: "Routine checks, observations and completed actions stay organised instead of disappearing into message threads.",
  },
  Approvals: {
    title: "Decisions stay visible.",
    text: "Owner approvals and agreed authority remain clear before work proceeds.",
  },
  Maintenance: {
    title: "Maintenance stays connected.",
    text: "Issues, technicians, notes and completed matters remain attached to the same property record.",
  },
};

const ownerPriorities = [
  {
    quote: "Know what happened without chasing five different people.",
    title: "One responsible line",
    copy: "Inspections, technicians, repairs, access and updates are coordinated through one dependable point of contact.",
  },
  {
    quote: "Keep control of decisions without managing every small step.",
    title: "Approval stays with you",
    copy: "Costs and works that need your authority remain visible before action, while day-to-day coordination stays off your desk.",
  },
  {
    quote: "Have a usable record of what was seen, approved and completed.",
    title: "A clear property record",
    copy: "Photos, reports, approvals and maintenance history stay connected to the same home.",
  },
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  location: string;
  propertyType: string;
  helpWith: string;
  message: string;
  botcheck: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  location: "",
  propertyType: "",
  helpWith: "",
  message: "",
  botcheck: "",
};

type QuickState = {
  propertyType: string;
  location: string;
  helpWith: string;
  ownerStatus: string;
  contact: string;
};

const initialQuick: QuickState = {
  propertyType: "Private residence",
  location: "Kigali",
  helpWith: "Ongoing property management",
  ownerStatus: "Owner in Kigali",
  contact: "WhatsApp",
};

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.66, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Roll({ children }: { children: string }) {
  return (
    <motion.span initial="rest" whileHover="hover" className={styles.roll}>
      <span className={styles.rollTop}>
        {children.split("").map((character, index) => (
          <motion.span
            key={`a-${index}`}
            variants={{ rest: { y: 0 }, hover: { y: "-110%" } }}
            transition={{ duration: 0.32, delay: index * 0.014, ease: [0.33, 1, 0.68, 1] }}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </span>
      <span className={styles.rollBottom} aria-hidden="true">
        {children.split("").map((character, index) => (
          <motion.span
            key={`b-${index}`}
            variants={{ rest: { y: "110%" }, hover: { y: 0 } }}
            transition={{ duration: 0.32, delay: index * 0.014, ease: [0.33, 1, 0.68, 1] }}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}

export default function DomicileEditorial() {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState("Overview");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [quick, setQuick] = useState<QuickState>(initialQuick);
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const formReady = useMemo(() => {
    const email = form.email.trim();
    const emailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const hasContact = Boolean(form.phone.trim() || email);

    return Boolean(
      form.name.trim() &&
        hasContact &&
        emailValid &&
        form.location.trim() &&
        form.propertyType &&
        form.helpWith
    );
  }, [form]);

  const startFromQuick = () => {
    setForm((current) => ({
      ...current,
      location: quick.location,
      propertyType: quick.propertyType,
      helpWith: quick.helpWith,
      message:
        current.message ||
        `${quick.ownerStatus}. Preferred first contact: ${quick.contact}.`,
    }));
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formReady || form.botcheck) return;
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New DŌMICILE enquiry — ${form.name} — ${form.location}`,
          from_name: "DŌMICILE by IMVO Group",
          replyto: form.email || undefined,
          name: form.name,
          phone_whatsapp: form.phone || "Not provided",
          email: form.email || "Not provided",
          property_location: form.location,
          property_type: form.propertyType,
          help_with: form.helpWith,
          message: form.message.trim() || "No additional message provided.",
          botcheck: "",
        }),
      });
      const result = await response.json();
      if (!response.ok || !result?.success) throw new Error("Submission failed");
      setIsSubmitted(true);
      setForm(initialForm);
    } catch {
      setError("We could not send the enquiry just now. Please try again or continue on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/domicile" className={styles.brand} aria-label="DŌMICILE home">
          <Image src="/domicile/domicile-white.webp" alt="DŌMICILE" width={1495} height={376} priority unoptimized />
        </Link>

        <nav className={styles.nav}>
          <a href="#top"><Roll>Home</Roll></a>
          <a href="#care"><Roll>Care</Roll></a>
          <a href="#owner-view"><Roll>Owner view</Roll></a>
          <a href="#properties"><Roll>Properties</Roll></a>
          <a href="#faq"><Roll>FAQ</Roll></a>
        </nav>

        <a href="#enquire" className={styles.headerCta}>
          Contact us
        </a>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroSky} />
        <motion.div
          className={styles.heroPhoto}
          initial={reduceMotion ? false : { scale: 1.025, y: 8 }}
          animate={reduceMotion ? undefined : { scale: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src={images.hero} alt="DŌMICILE managed residence in Kigali" fill priority unoptimized sizes="100vw" />
        </motion.div>
        <div className={styles.heroShade} />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>PROPERTY MANAGEMENT · KIGALI</p>
          <h1>
            Your property,
            <br />
            handled.
          </h1>
          <p className={styles.heroLead}>
            One dependable local point of contact for property oversight, maintenance,
            owner-away care and follow-through.
          </p>
          <div className={styles.heroActions}>
            <a href="#enquire" className={styles.primaryButton}>
              Get in touch
            </a>
            <a href="#care" className={styles.ghostButton}>
              Explore care
            </a>
          </div>
        </div>

        <div className={styles.heroFacts}>
          <div>
            <strong>KIGALI</strong>
            <span>LOCAL PRESENCE</span>
          </div>
          <div>
            <strong>ONE</strong>
            <span>RESPONSIBLE CONTACT</span>
          </div>
          <div>
            <strong>PRIVATE</strong>
            <span>BY DEFAULT</span>
          </div>
        </div>
      </section>

      <section className={styles.quickSearch} aria-label="Start a DŌMICILE enquiry">
        <div className={styles.quickField}>
          <span>PROPERTY</span>
          <select
            value={quick.propertyType}
            onChange={(event) => setQuick({ ...quick, propertyType: event.target.value })}
          >
            <option>Private residence</option>
            <option>Apartment / condominium</option>
            <option>Residential estate</option>
            <option>Commercial property</option>
            <option>Other</option>
          </select>
        </div>
        <div className={styles.quickField}>
          <span>LOCATION</span>
          <select
            value={quick.location}
            onChange={(event) => setQuick({ ...quick, location: event.target.value })}
          >
            <option>Kigali</option>
            <option>Kacyiru, Kigali</option>
            <option>Nyarutarama, Kigali</option>
            <option>Kimihurura, Kigali</option>
            <option>Kibagabaga, Kigali</option>
            <option>Other Kigali area</option>
          </select>
        </div>
        <div className={styles.quickField}>
          <span>NEED</span>
          <select
            value={quick.helpWith}
            onChange={(event) => setQuick({ ...quick, helpWith: event.target.value })}
          >
            <option>Ongoing property management</option>
            <option>Owner-away care</option>
            <option>Maintenance coordination</option>
            <option>Property inspection</option>
            <option>One-off property support</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div className={styles.quickField}>
          <span>OWNER STATUS</span>
          <select
            value={quick.ownerStatus}
            onChange={(event) => setQuick({ ...quick, ownerStatus: event.target.value })}
          >
            <option>Owner in Kigali</option>
            <option>Owner outside Rwanda</option>
            <option>Frequent traveller</option>
            <option>Property representative</option>
          </select>
        </div>
        <div className={styles.quickField}>
          <span>FIRST CONTACT</span>
          <select
            value={quick.contact}
            onChange={(event) => setQuick({ ...quick, contact: event.target.value })}
          >
            <option>WhatsApp</option>
            <option>Phone</option>
            <option>Email</option>
          </select>
        </div>
        <button type="button" className={styles.quickButton} onClick={startFromQuick}>
          <span>⌕</span> Start enquiry
        </button>
      </section>

      <section className={styles.explained} id="explained">
        <span className={styles.sectionIndex}>DŌMICILE / 01</span>
        <div className={styles.explainedCopy}>
          <h2>
            DŌMICILE is the local operating layer between you and everything that needs
            attention at your property.
          </h2>
          <p className={styles.explainedLead}>
            Inspections, technicians, repairs, access, approvals and updates — coordinated
            through one responsible point of contact.
          </p>
        </div>
        <div className={styles.explainedPhoto}>
          <Image src={images.c1} alt="DŌMICILE residential care" fill unoptimized sizes="240px" />
        </div>
      </section>

      <section className={styles.photoEssay} id="care">
        <div className={styles.photoEssayIntro}>
          <div>
            <span className={styles.sectionTag}>CARE IN PRACTICE</span>
            <h2>A property, properly looked after.</h2>
          </div>
          <p>
            DŌMICILE keeps the property visible to the owner while the coordination behind
            it stays calm, organised and local.
          </p>
          <div className={styles.filterPills} aria-hidden="true">
            <span className={styles.activePill}>All</span>
            <span>Oversight</span>
            <span>Maintenance</span>
            <span>Owner-away</span>
            <span>Works</span>
          </div>
        </div>

        <div className={styles.photoEssayGrid}>
          <Reveal className={`${styles.essayPhoto} ${styles.essayPhotoMain}`}>
            <Image src={images.street} alt="Property oversight" fill unoptimized sizes="(max-width:900px) 90vw, 24vw" />
            <div className={styles.cardYear}>01</div>
            <div className={styles.essayCaption}>
              <strong>Property oversight</strong>
              <p>Scheduled checks and dependable local presence.</p>
              <a href="#enquire">Take a look ↗</a>
            </div>
          </Reveal>

          <Reveal className={`${styles.essayPhoto} ${styles.essayPhotoTall}`}>
            <Image src={images.hero} alt="Maintenance and repairs" fill unoptimized sizes="(max-width:900px) 90vw, 24vw" />
            <div className={styles.cardYear}>02</div>
            <div className={styles.essayCaption}>
              <strong>Maintenance & repairs</strong>
              <p>Issues scoped, coordinated and followed through.</p>
              <a href="#enquire">Take a look ↗</a>
            </div>
          </Reveal>

          <Reveal className={`${styles.statementCard} ${styles.careImageCard}`}>
            <Image src={images.c1} alt="Owner-away care" fill unoptimized sizes="(max-width:900px) 90vw, 24vw" />
            <div className={styles.cardYear}>03</div>
            <div className={styles.essayCaption}>
              <strong>Owner-away care</strong>
              <p>Local presence when you are not in Kigali.</p>
              <a href="#enquire">Take a look ↗</a>
            </div>
          </Reveal>

          <Reveal className={`${styles.statementCardDark} ${styles.careImageCard}`}>
            <Image src={images.street} alt="Property works" fill unoptimized sizes="(max-width:900px) 90vw, 24vw" />
            <div className={styles.cardYear}>04</div>
            <div className={styles.essayCaption}>
              <strong>Property works</strong>
              <p>Repairs and improvements with clear owner approval.</p>
              <a href="#enquire">Take a look ↗</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.servicesHeading}>
          <span>WHAT WE OFFER?</span>
          <h2>A FULL-SPECTRUM PROPERTY CARE SERVICE</h2>
          <p>
            From routine oversight to repairs and owner-away care, DŌMICILE gives the
            property one accountable local operating point.
          </p>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <article key={service.title}>
              <span className={styles.serviceIcon}>{service.icon}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
              <a href="#enquire">Learn more ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.properties} id="properties">
        <div className={styles.propertiesHeading}>
          <div>
            <span className={styles.sectionTag}>SELECTED PROPERTIES</span>
            <h2>Real homes. Quietly looked after.</h2>
          </div>
          <p>
            Privacy comes first. These visual examples show the kind of residential
            environments DŌMICILE is designed to care for.
          </p>
          <div className={styles.filterPills}>
            <span className={styles.activePill}>All</span>
            <span>Residence</span>
            <span>Estate</span>
            <span>Owner-away</span>
          </div>
        </div>

        <div className={styles.propertyStories}>
          {propertyStories.map((property) => (
            <Reveal key={property.number} className={styles.propertyStory}>
              <div className={styles.propertyPhoto}>
                <Image src={property.image} alt={property.title} fill unoptimized sizes="(max-width:900px) 92vw, 31vw" />
                <button type="button" aria-label="Save property example">♡</button>
              </div>
              <div className={styles.propertyCopy}>
                <div>
                  <small>{property.status}</small>
                  <span>{property.number}</span>
                </div>
                <h3>{property.title}</h3>
                <p>{property.copy}</p>
                <div className={styles.propertyMeta}>
                  <span>⌂ Kigali</span>
                  <span>✓ Private</span>
                  <span>↻ Managed</span>
                </div>
                <a href="#enquire">
                  Discuss your property <span>↗</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.howSection}>
        <div className={styles.howHeading}>
          <span>HOW DOES IT WORK?</span>
          <h2>One clear journey from first conversation to ongoing care.</h2>
        </div>
        <div className={styles.explanationList}>
          {explanation.map((item) => (
            <article key={item.number}>
              <div className={styles.processIcon}>⌁</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <span>{item.number}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ownerView} id="owner-view">
        <div className={styles.ownerIntro}>
          <span className={styles.sectionTag}>OWNER VIEW</span>
          <div className={styles.ownerHeading}>
            <h2>Visibility without chasing updates.</h2>
            <p>
              The Owner View keeps what happened, what needs approval and what comes next
              in one calm place.
            </p>
          </div>
        </div>

        <div className={styles.ownerStage}>
          <div className={styles.ownerPhoto}>
            <Image src={images.c1} alt="DŌMICILE Owner View property" fill unoptimized sizes="100vw" />
          </div>
          <div className={styles.ownerShade} />
          <div className={styles.dashboard}>
            <div className={styles.dashboardTop}>
              <strong>DŌMICILE / OWNER VIEW</strong>
              <span>PROPERTY ACTIVE</span>
            </div>
            <div className={styles.metrics}>
              <div>
                <small>STATUS</small>
                <strong>ALL GOOD</strong>
              </div>
              <div>
                <small>LAST CHECK</small>
                <strong>TODAY · 09:42</strong>
              </div>
              <div>
                <small>OPEN</small>
                <strong>01</strong>
              </div>
              <div>
                <small>NEXT VISIT</small>
                <strong>27 AUG</strong>
              </div>
            </div>
            <div className={styles.tabs}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={activeTab === tab ? styles.activeTab : ""}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className={styles.tabPanel}>
              <span>{activeTab.toUpperCase()}</span>
              <h3>{tabCopy[activeTab].title}</h3>
              <p>{tabCopy[activeTab].text}</p>
              <button type="button">VIEW LATEST REPORT →</button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ownerPriorities}>
        <div className={styles.ownerPriorityHeading}>
          <span>OWNER EXPERIENCE</span>
          <h2>Clarity, discretion and follow-through.</h2>
          <p>
            The value is not more messages. It is knowing that somebody responsible is
            already handling the property.
          </p>
        </div>
        <div className={styles.ownerPriorityCards}>
          {ownerPriorities.map((item, index) => (
            <Reveal key={item.title} className={styles.priorityCard}>
              <span className={styles.quoteMark}>“</span>
              <p>{item.quote}</p>
              <div>
                <strong>{item.title}</strong>
                <small>0{index + 1} / DŌMICILE</small>
              </div>
              <em>{item.copy}</em>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.trustFaq} id="faq">
        <div className={styles.trust}>
          <span className={styles.sectionTag}>BACKED BY IMVO GROUP</span>
          <h2>Property care with built-environment thinking behind it.</h2>
          <p>
            DŌMICILE combines day-to-day property coordination with IMVO Group’s design,
            technical and built-environment perspective.
          </p>
          <Image src="/logo.png" alt="IMVO Group" width={500} height={180} unoptimized />
          <Link href="/">
            VISIT IMVO GROUP <span>↗</span>
          </Link>
        </div>

        <div className={styles.faq}>
          <span className={styles.sectionTag}>CLARITY IN PROPERTY CARE</span>
          <h2>Your practical questions, answered.</h2>
          <div className={styles.faqList}>
            {faqItems.map(([question, answer], index) => (
              <article key={question} className={openFaq === index ? styles.faqOpen : ""}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  <strong>{question}</strong>
                  <b>{openFaq === index ? "−" : "↘"}</b>
                </button>
                <div>
                  <p>{answer}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.enquiry} id="enquire">
        <div className={styles.enquiryImage}>
          <Image src={images.street} alt="Residential street cared for by DŌMICILE" fill unoptimized sizes="(max-width:900px) 100vw, 42vw" />
          <div className={styles.enquiryOverlay} />
          <div className={styles.enquiryIntro}>
            <Image src="/domicile/domicile-white.webp" alt="DŌMICILE" width={1495} height={376} unoptimized />
            <span className={styles.sectionTagLight}>START WITH A CONVERSATION</span>
            <h2>Tell us about your property.</h2>
            <p>
              This is an enquiry, not a registration. We’ll contact you to understand the
              property and what you need.
            </p>
            <div>
              <a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                +250 799 409 409
              </a>
              <span>KIGALI · RWANDA</span>
            </div>
          </div>
        </div>

        <div className={styles.formSide}>
          <div className={styles.formHeading}>
            <span>PROPERTY ENQUIRY</span>
            <h3>What should we know?</h3>
            <p>A first conversation is enough to start. Phone or email is enough.</p>
          </div>

          {isSubmitted ? (
            <div className={styles.success}>
              <span>ENQUIRY RECEIVED</span>
              <h3>Thank you.</h3>
              <p>We’ll review the details and contact you directly.</p>
              <button type="button" onClick={() => setIsSubmitted(false)}>
                SEND ANOTHER ENQUIRY
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.botcheck}
                type="checkbox"
                name="botcheck"
                value={form.botcheck}
                onChange={(event) =>
                  setForm({ ...form, botcheck: event.target.checked ? "1" : "" })
                }
                tabIndex={-1}
                autoComplete="off"
              />

              <label>
                Full name
                <input
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Your name"
                />
              </label>

              <label>
                Phone / WhatsApp (or email)
                <input
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  placeholder="+250 ..."
                />
              </label>

              <label>
                Email (or phone)
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Property location
                <input
                  value={form.location}
                  onChange={(event) => setForm({ ...form, location: event.target.value })}
                  placeholder="e.g. Kacyiru, Kigali"
                />
              </label>

              <label>
                Property type
                <select
                  value={form.propertyType}
                  onChange={(event) => setForm({ ...form, propertyType: event.target.value })}
                >
                  <option value="">Select property type</option>
                  <option>Private residence</option>
                  <option>Apartment / condominium</option>
                  <option>Residential estate</option>
                  <option>Commercial property</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                What do you need?
                <select
                  value={form.helpWith}
                  onChange={(event) => setForm({ ...form, helpWith: event.target.value })}
                >
                  <option value="">Select what you need</option>
                  <option>Ongoing property management</option>
                  <option>Owner-away care</option>
                  <option>Maintenance coordination</option>
                  <option>Property inspection</option>
                  <option>One-off property support</option>
                  <option>Not sure yet</option>
                </select>
              </label>

              <label className={styles.message}>
                Message (optional)
                <textarea
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  placeholder="Tell us what the property needs, if there is anything else we should know..."
                />
              </label>

              <div className={styles.formFooter}>
                <button type="submit" disabled={!formReady || isSubmitting}>
                  {isSubmitting ? "SENDING..." : "SEND TO DŌMICILE ↗"}
                </button>
                <span>PRIVATE BY DEFAULT · DIRECT FOLLOW-UP</span>
              </div>

              {error ? <p className={styles.formError}>{error}</p> : null}
            </form>
          )}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Image src="/domicile/domicile-white.webp" alt="DŌMICILE" width={1495} height={376} unoptimized />
            <p>
              PROPERTY MANAGEMENT BY IMVO GROUP.
              <br />
              YOUR PROPERTY, HANDLED.
            </p>
          </div>

          <div className={styles.footerColumns}>
            <div>
              <strong>PLATFORM</strong>
              <a href="#care">Care</a>
              <a href="#owner-view">Owner view</a>
              <a href="#properties">Properties</a>
            </div>
            <div>
              <strong>COMPANY</strong>
              <Link href="/">IMVO Group</Link>
              <a href="#faq">FAQ</a>
              <a href="#enquire">Contact</a>
            </div>
            <div>
              <strong>CONTACT</strong>
              <a href="mailto:domicile@imvogroup.com">Email</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <span>Kigali, Rwanda</span>
            </div>
          </div>
        </div>

        <div className={styles.footerLine}>
          <span>© 2026 DŌMICILE · IMVO GROUP</span>
          <span>PRIVATE BY DEFAULT</span>
        </div>

        <div className={styles.footerWord} aria-hidden="true">
          domicile
        </div>
      </footer>
    </main>
  );
}
