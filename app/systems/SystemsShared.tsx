import Link from "next/link";
import styles from "./SystemsPage.module.css";
import { serviceGroups, industries } from "./systemData";

export function SystemsHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/systems" className={styles.brand} aria-label="IMVO Systems home">
          <img src="/brand/imvo-systems.svg" alt="IMVO Systems" />
        </Link>

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
              {industries.map(([title]) => <Link key={title} href="/systems/industries">{title}</Link>)}
            </div>
          </div>

          <Link href="/systems/projects">Projects</Link>

          <div className={styles.navDrop}>
            <Link href="/systems/about">About us <span>⌄</span></Link>
            <div className={styles.navMenu}>
              <Link href="/systems/about">About IMVO Systems</Link>
              <Link href="/systems/projects">Our Projects</Link>
              <Link href="#testimonials">Testimonials</Link>
            </div>
          </div>

          <Link href="#testimonials">Testimonials</Link>
          <Link href="/careers">Careers</Link>
          <Link href="#insights">Blog</Link>
        </nav>

        <Link className={styles.headerCta} href="/systems/contact">Contact Us <span>→</span></Link>
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
          <p>IMVO Systems</p>
          <strong>Kigali, Rwanda</strong>
          <span>Digital products, enterprise systems, managed technology and innovation services.</span>
          <Link href="/systems/contact">Contact IMVO Systems →</Link>
        </div>

        <div className={styles.footerColumn}>
          <strong>Services</strong>
          {serviceGroups.map((group) => (
            <Link key={group.id} href={"/systems/services#" + group.id}>{group.title}</Link>
          ))}
        </div>

        <div className={styles.footerColumn}>
          <strong>Industries</strong>
          {industries.slice(0,7).map(([title]) => (
            <Link key={title} href="/systems/industries">{title}</Link>
          ))}
        </div>

        <div className={styles.footerColumn}>
          <strong>About us</strong>
          <Link href="/systems/about">About Us</Link>
          <Link href="/systems/projects">Our Projects</Link>
          <Link href="#testimonials">Testimonials</Link>
          <Link href="/careers">Careers</Link>
        </div>

        <div className={styles.footerColumn}>
          <strong>Insights</strong>
          <Link href="#insights">Technologies</Link>
          <Link href="#insights">Business</Link>
          <Link href="#insights">Product</Link>
          <Link href="#insights">Systems</Link>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>© 2026 IMVO DESIGN GROUP Ltd. All Rights Reserved.</span>
        <div>
          <Link href="/">Studio</Link>
          <Link href="/systems">Systems</Link>
          <Link href="/domicile">DŌMICILE</Link>
        </div>
      </div>
    </footer>
  );
}
