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

        <nav className={styles.primaryNav} aria-label="IMVO Systems navigation">
          <div className={styles.megaTrigger}>
            <Link href="/systems/services">Services</Link>
            <div className={styles.megaMenu}>
              <div className={styles.megaIntro}>
                <span>Services</span>
                <strong>Technology capabilities built around real business needs.</strong>
                <Link href="/systems/services">View all services →</Link>
              </div>
              <div className={styles.megaColumns}>
                {serviceGroups.map((group) => (
                  <div key={group.id} className={styles.megaGroup}>
                    <Link href={"/systems/services#" + group.id}>{group.title}</Link>
                    {group.items.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.megaTrigger}>
            <Link href="/systems/industries">Industries</Link>
            <div className={styles.industryMenu}>
              {industries.map(([title]) => (
                <Link href="/systems/industries" key={title}>{title}</Link>
              ))}
            </div>
          </div>

          <Link href="/systems/projects">Projects</Link>
          <Link href="/systems/about">About us</Link>
        </nav>

        <div className={styles.headerRight}>
          <PracticeSwitcher placement="inline" variant="light" />
          <Link className={styles.headerCta} href="/systems/contact">Contact us</Link>
        </div>
      </div>
    </header>
  );
}

export function SystemsFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <img src="/brand/imvo-systems.svg" alt="IMVO Systems" />
          <p>Digital products, enterprise systems and technology services by IMVO Group.</p>
        </div>
        <div className={styles.footerGrid}>
          <div>
            <strong>Services</strong>
            {serviceGroups.map((group) => <Link key={group.id} href={"/systems/services#" + group.id}>{group.title}</Link>)}
          </div>
          <div>
            <strong>Company</strong>
            <Link href="/systems/projects">Projects</Link>
            <Link href="/systems/industries">Industries</Link>
            <Link href="/systems/about">About us</Link>
            <Link href="/systems/contact">Contact</Link>
          </div>
          <div>
            <strong>IMVO Group</strong>
            <Link href="/">Studio</Link>
            <Link href="/systems">Systems</Link>
            <Link href="/domicile">DŌMICILE</Link>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>IMVO DESIGN GROUP Ltd · Kigali, Rwanda</span>
        <span>Technology that works in the real operation.</span>
      </div>
    </footer>
  );
}
