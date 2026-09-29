import Link from "next/link";
import styles from "./SystemsPage.module.css";
import PracticeSwitcher from "../components/PracticeSwitcher";
import { serviceGroups, industries } from "./systemData";

export function SystemsHeader() {
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
        </nav>

        <Link className={styles.headerCta} href="/systems/contact">
          Start a project <span>→</span>
        </Link>
      </div>
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
        </div>

        <div className={styles.footerColumn}>
          <strong>Capabilities</strong>
          <Link href="/systems/services#custom-software">Custom software</Link>
          <Link href="/systems/services#web-mobile">Web & mobile products</Link>
          <Link href="/systems/services#automation">Automation & AI</Link>
          <Link href="/systems/services#cloud">Cloud & support</Link>
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
          <Link href="mailto:systems@imvogroup.com">systems@imvogroup.com</Link>
          <Link href="/">imvogroup.com</Link>
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
