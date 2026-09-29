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
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <img src="/brand/imvo-systems.svg" alt="IMVO Systems" />
          <p>Digital products and business systems by IMVO Group.</p>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/systems">Systems</Link>
          <Link href="/systems/about">About</Link>
          <Link href="/systems/contact">Contact</Link>
          <Link href="/">IMVO Studio</Link>
          <Link href="/domicile">DŌMICILE</Link>
        </div>
      </div>
    </footer>
  );
}
