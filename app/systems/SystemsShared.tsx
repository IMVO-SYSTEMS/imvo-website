"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./SystemsPage.module.css";
import PracticeSwitcher from "../components/PracticeSwitcher";
import { serviceGroups, industries } from "./systemData";

export function SystemsHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/systems" className={styles.brand} aria-label="IMVO Systems home">
          <img src="/brand/imvo-systems.svg" alt="IMVO Systems" />
        </Link>

        <div className={styles.divisionSwitch}>
          <PracticeSwitcher placement="inline" variant="light" />
        </div>

        <nav className={styles.primaryNav} aria-label="IMVO Systems navigation">
          <div className={styles.navDrop}>
            <Link href="/systems/services">Services <span>⌄</span></Link>
            <div className={styles.navMenu}>
              {serviceGroups.map((group) => (
                <Link key={group.id} href={"/systems/services#" + group.id}>{group.title}</Link>
              ))}
            </div>
          </div>

          <div className={styles.navDrop}>
            <Link href="/systems/industries">Industries <span>⌄</span></Link>
            <div className={styles.navMenu}>
              {industries.map(([title]) => (
                <Link key={title} href="/systems/industries">{title}</Link>
              ))}
            </div>
          </div>

          <Link href="/systems/projects">Projects</Link>
          <Link href="/systems/about">About</Link>
          <Link href="/systems/careers">Careers</Link>
          <Link href="/systems/insights">Insights</Link>
        </nav>

        <button type="button" className={styles.mobileToggle} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="systems-mobile-menu" onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
        <Link className={styles.headerCta} href="/systems/contact">
          Start a project <span>→</span>
        </Link>
      </div>
      <nav id="systems-mobile-menu" className={styles.mobileMenu} data-open={menuOpen} aria-label="Mobile IMVO Systems navigation">
        <Link href="/systems" onClick={() => setMenuOpen(false)}>Overview <span>→</span></Link>
        <Link href="/systems/services" onClick={() => setMenuOpen(false)}>Services <span>→</span></Link>
        <Link href="/systems/industries" onClick={() => setMenuOpen(false)}>Industries <span>→</span></Link>
        <Link href="/systems/projects" onClick={() => setMenuOpen(false)}>Projects <span>→</span></Link>
        <Link href="/systems/about" onClick={() => setMenuOpen(false)}>About <span>→</span></Link>
        <Link href="/systems/insights" onClick={() => setMenuOpen(false)}>Insights <span>→</span></Link>
        <Link href="/systems/careers" onClick={() => setMenuOpen(false)}>Careers <span>→</span></Link>
        <Link href="/systems/contact" onClick={() => setMenuOpen(false)}>Start a project <span>→</span></Link>
      </nav>
    </header>
  );
}

export function SystemsFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerIdentity}>
          <img src="/brand/imvo-systems.svg" alt="IMVO Systems" />
          <p>IMVO GROUP · KIGALI, RWANDA</p>
          <strong>Digital products and business systems.</strong>
          <span>Product strategy, software engineering, integrations, automation and long-term digital support.</span>
          <Link href="/systems/contact">Start a project →</Link>
        </div>

        <div className={styles.footerColumn}>
          <strong>Systems</strong>
          <Link href="/systems/services">Services</Link>
          <Link href="/systems/projects">Projects</Link>
          <Link href="/systems/industries">Industries</Link>
          <Link href="/systems/about">About</Link>
          <Link href="/systems/careers">Careers</Link>
          <Link href="/systems/insights">Insights</Link>
        </div>

        <div className={styles.footerColumn}>
          <strong>Capabilities</strong>
          <Link href="/systems/services#product-development">Custom software</Link>
          <Link href="/systems/services#digital-experience">Web & mobile products</Link>
          <Link href="/systems/services#innovation-services">Automation & AI</Link>
          <Link href="/systems/services#managed-services">Cloud & support</Link>
        </div>

        <div className={styles.footerColumn}>
          <strong>IMVO Group</strong>
          <Link href="/">IMVO Studio</Link>
          <Link href="/systems">IMVO Systems</Link>
          <Link href="/domicile">DŌMICILE</Link>
        </div>

        <div className={styles.footerColumn}>
          <strong>Contact</strong>
          <Link href="/systems/contact">Project enquiry</Link>
          <span>Kigali, Rwanda</span>
          <Link href="/">IMVO Group</Link>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>© 2026 IMVO DESIGN GROUP LTD · KIGALI, RWANDA</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/">IMVO Group ↗</Link>
        </div>
      </div>
    </footer>
  );
}
