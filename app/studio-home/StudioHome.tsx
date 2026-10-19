"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, Minus, Plus, X } from "lucide-react";
import type { HomePageContent } from "@/sanity/types/siteContent";
import type { Project } from "../projects/projectsData";
import { PROJECTS } from "../projects/projectsData";
import { elevationPaths, planPaths } from "./sourceDrawings";
import styles from "./StudioHome.module.css";

const stages = [
  { name: "Read the site", title: "Every place begins with a possibility.", text: "We read the land, its context and its constraints. Feasibility, access and development potential give the first line its purpose.", detail: "Site appraisal / Feasibility / Project direction" },
  { name: "Shape the space", title: "A plan takes shape. Life finds its place.", text: "Walls, movement, light and proportion come together. We test the way a space works before deciding how it looks.", detail: "Spatial planning / Concept design / Architecture" },
  { name: "Connect the details", title: "One design. Every discipline connected.", text: "Architecture and engineering develop together. Clear drawings and coordinated systems turn a strong idea into a buildable project.", detail: "MEP coordination / Documentation / Cost planning" },
  { name: "Bring it to life", title: "Design value, protected all the way to site.", text: "From drawings to delivery, we support the decisions, quality reviews and coordination that keep the original intention intact.", detail: "Site coordination / Quality review / Delivery support" },
];

const services = [
  { title: "Built environment design", text: "Concept development, spatial planning, residential and commercial design, documentation, and context-aware spatial solutions.", items: "Architecture · Interiors · Landscape · Master planning", href: "/contact#quote" },
  { title: "Consultancy & project direction", text: "Feasibility guidance, design advisory, project development support, regulatory awareness, and strategic decision-making.", items: "Land appraisal · Feasibility · Planning · Development strategy", href: "/contact#quote" },
  { title: "Site coordination", text: "Site observation, quality review, design implementation support, and coordination between client, consultants, and contractors.", items: "Technical coordination · Quality review · Delivery support", href: "/contact#quote" },
];

const defaultTeam = [
  { name: "ASINGIZWE Benjamin Marie Merci", role: "Built Environment Design & Development Lead", image: { url: "/team1.webp" } },
  { name: "SHEMA BAMBI Antonella M.", role: "Strategy & Digital Systems Lead", image: { url: "/team2.webp" } },
  { name: "RUKUNDO Prince", role: "Technical Delivery Lead", image: { url: "/team3.webp" } },
  { name: "KANGWAGYE Sharon", role: "Project Coordination & Growth Lead", image: { url: "/team4.webp" } },
];

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const ease = (n: number) => 1 - Math.pow(1 - clamp(n), 3);
const coverFallbacks: Record<string, string> = {
  "/p01-01.png": "/p01-01.webp", "/p02-1.png": "/p02-1.webp",
  "/p03-1.png": "/p03-1.webp", "/p04-1.png": "/p04-1.webp",
  "/p05-1.png": "/p05-1.webp",
};

function DrawingCursor() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!media.matches) return;
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    let frame = 0;
    let point = { x: -1, y: -1, dark: false, active: false };
    const size = () => { el.width = innerWidth; el.height = innerHeight; };
    const paint = () => {
      ctx.clearRect(0, 0, el.width, el.height);
      if (!point.active) return;
      const { x, y, dark } = point;
      ctx.strokeStyle = dark ? "rgba(248,247,244,.26)" : "rgba(8,8,8,.22)";
      ctx.lineWidth = .6;
      ctx.beginPath();
      ctx.moveTo(0, y + .5); ctx.lineTo(x - 9, y + .5);
      ctx.moveTo(x + 9, y + .5); ctx.lineTo(el.width, y + .5);
      ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, y - 9);
      ctx.moveTo(x + .5, y + 9); ctx.lineTo(x + .5, el.height);
      ctx.stroke();
      ctx.strokeStyle = dark ? "#f8f7f4" : "#080808";
      ctx.strokeRect(x - 3.5, y - 3.5, 7, 7);
      ctx.fillStyle = dark ? "#f8f7f4" : "#080808";
      ctx.font = "10px monospace";
      const tx = x > el.width - 155 ? x - 145 : x + 18;
      const ty = y > el.height - 45 ? y - 26 : y + 20;
      ctx.fillText(`X ${Math.round(x).toString().padStart(4, "0")} / Y ${Math.round(y).toString().padStart(4, "0")}`, tx, ty);
    };
    const move = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const surface = target?.closest<HTMLElement>("[data-drawing-surface]");
      point = { x: event.clientX, y: event.clientY, dark: surface?.dataset.drawingSurface === "dark", active: !!surface && !target?.closest("a, button") };
      cancelAnimationFrame(frame); frame = requestAnimationFrame(paint);
    };
    const clear = () => { point.active = false; paint(); };
    size();
    window.addEventListener("resize", size);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", clear);
    window.addEventListener("scroll", clear, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", size); window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", clear); window.removeEventListener("scroll", clear); };
  }, []);
  return <canvas ref={canvas} className={styles.cursor} aria-hidden="true" />;
}

export default function StudioHome({ content, projects }: { content: HomePageContent | null; projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const process = useRef<HTMLElement>(null);
  const works = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stage, setStage] = useState(0);
  const [serviceOpen, setServiceOpen] = useState<number | null>(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const selected = (projects.length ? projects : PROJECTS).slice(0, 5);
  const team = content?.teamMembers?.length ? content.teamMembers : defaultTeam;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastStage = -1;
    const update = () => {
      const vh = innerHeight;
      const small = innerWidth <= 760;
      const progress = (section: HTMLElement | null) => section ? clamp(-section.getBoundingClientRect().top / Math.max(1, section.offsetHeight - vh)) : 0;
      const hp = media.matches ? 1 : progress(hero.current);
      const pp = media.matches ? 1 : progress(process.current);
      const wp = progress(works.current);
      el.style.setProperty("--hero-p", String(hp));
      el.style.setProperty("--hero-fill", `${clamp((hp - .08) / .62) * 100}%`);
      el.style.setProperty("--plan-fill", `${clamp((pp - .12) / .35) * 100}%`);
      el.style.setProperty("--furniture", String(clamp((pp - .4) / .15)));
      el.style.setProperty("--dimensions", String(clamp((pp - .62) / .14)));
      el.style.setProperty("--plan-shift", `${small || media.matches ? 0 : -ease((pp - .45) / .22) * 17}vw`);
      el.style.setProperty("--plan-scale", String(small ? 1 : 1 - ease((pp - .45) / .22) * .12));
      el.style.setProperty("--rail-x", `${small || media.matches ? 0 : -wp * Math.max(0, (rail.current?.scrollWidth || 0) - innerWidth + 64)}px`);
      el.style.setProperty("--work-p", String(wp));
      el.querySelectorAll<SVGPathElement>("[data-elevation-path]").forEach((path, i) => {
        const amount = clamp(.2 + hp * 1.9 - (i / elevationPaths.length) * .45);
        path.style.strokeDashoffset = String(1 - amount);
      });
      el.querySelectorAll<SVGPathElement>("[data-plan-path]").forEach((path, i) => {
        const p = media.matches ? 1 : ease((pp - i * .009) / .28);
        const direction = i % 4;
        const x = direction === 0 ? -550 : direction === 1 ? 550 : 0;
        const y = direction === 2 ? -500 : direction === 3 ? 500 : 0;
        path.style.transform = `translate(${x * (1 - p)}px,${y * (1 - p)}px)`;
        path.style.opacity = String(media.matches ? 1 : clamp(.16 + p));
        path.style.fillOpacity = String(clamp((pp - .17) / .18));
      });
      const currentStage = Math.min(3, Math.floor(pp * 4));
      if (!small && !media.matches && currentStage !== lastStage) { lastStage = currentStage; setStage(currentStage); }
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const preference = () => { setReducedMotion(media.matches); schedule(); };
    preference();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", preference);
    const observer = new ResizeObserver(schedule);
    if (rail.current) observer.observe(rail.current);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); media.removeEventListener("change", preference); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileNav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
      if (event.key !== "Tab") return;
      const links = [menuButton.current, ...Array.from(mobileNav.current?.querySelectorAll<HTMLElement>("a") || [])].filter(Boolean) as HTMLElement[];
      const first = links[0], last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", key);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener("keydown", key); };
  }, [menuOpen]);

  const goStage = (index: number) => {
    setStage(index);
    if (!process.current || innerWidth <= 760 || reducedMotion) return;
    const top = process.current.getBoundingClientRect().top + scrollY;
    window.scrollTo({ top: top + (process.current.offsetHeight - innerHeight) * ((index + .35) / 4), behavior: "smooth" });
  };

  const shiftWork = (direction: number) => {
    if (!works.current || !rail.current) return;
    if (innerWidth <= 760 || reducedMotion) { rail.current.scrollBy({ left: direction * rail.current.clientWidth * .85, behavior: reducedMotion ? "instant" : "smooth" }); return; }
    const section = works.current;
    const offset = Math.max(1, section.offsetHeight - innerHeight);
    const p = clamp(-section.getBoundingClientRect().top / offset);
    window.scrollTo({ top: scrollY + section.getBoundingClientRect().top + clamp(p + direction / (selected.length - 1)) * offset, behavior: "smooth" });
  };

  return (
    <div ref={root} className={styles.page}>
      <DrawingCursor />
      <a className={styles.skip} href="#main-content">Skip to main content</a>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="IMVO Studio home"><img src="/brand/imvo-studio.svg" alt="IMVO Studio" width="180" height="34" /></Link>
        <nav className={styles.divisions} aria-label="IMVO divisions"><Link href="/" aria-current="page">Studio</Link><Link href="/systems">Systems</Link><Link href="/domicile">Dōmicile</Link></nav>
        <nav className={styles.navigation} aria-label="Main navigation"><Link href="/projects">Projects</Link><Link href="/services">Services</Link><Link href="/about">About</Link><Link className={styles.headerCta} href="/contact#quote">Let’s talk <ArrowUpRight size={16} /></Link></nav>
        <button ref={menuButton} className={styles.menuToggle} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="studio-mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </header>
      {menuOpen && <nav ref={mobileNav} id="studio-mobile-menu" className={styles.mobileMenu} aria-label="Mobile navigation">{[["Projects", "/projects"], ["Services", "/services"], ["About the studio", "/about"], ["Start a project", "/contact#quote"], ["IMVO Systems", "/systems"], ["Dōmicile", "/domicile"]].map(([label, href]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight /></Link>)}</nav>}

      <main id="main-content" tabIndex={-1}>
        <section ref={hero} className={styles.hero} aria-labelledby="studio-heading">
          <div className={styles.heroSticky}>
            <div className={styles.heroCanvas} data-drawing-surface="light">
              <div className={styles.canvasTop}><span>Kigali, Rwanda / East Africa</span><span>Built environment design & development</span></div>
              <div className={styles.elevation}>
                <img className={styles.elevationGhost} src="/studio/elevation.svg" alt="" width="2060" height="1037" />
                <svg className={styles.elevationOutline} viewBox="0 0 1712 890" fill="none" aria-hidden="true"><g opacity=".16">{elevationPaths.map((d, i) => <path key={i} d={d} />)}</g>{elevationPaths.map((d, i) => <path key={i} d={d} data-elevation-path="" pathLength={1} />)}</svg>
                <img className={styles.elevationSketch} src="/studio/elevation.svg" alt="Architectural drawing study of a modern two-storey house, developing from lines into a fully shaded elevation as you scroll" width="2060" height="1037" fetchPriority="high" />
              </div>
              <div className={styles.drawingTag}><span className={styles.dot} />Drawing study <span>A—01 / Elevation</span></div>
              <a className={styles.scrollPrompt} href="#design-process">Scroll to develop the design <ArrowDown size={14} /></a>
              <div className={styles.canvasCorner} aria-hidden="true"><Plus size={13} /><Plus size={13} /><Plus size={13} /><Plus size={13} /></div>
            </div>
            <div className={styles.heroTitle}>
              <h1 id="studio-heading">From first line.<br />To lasting places.</h1>
              <div className={styles.heroIntro}><p>{content?.heroIntro || "Built-environment design, development strategy, site coordination, and execution-aware planning."}</p><Link className={styles.textLink} href="/projects">Explore our work <ArrowUpRight size={19} /></Link></div>
            </div>
            <div className={styles.heroFoot}><span>Intellectu · Mens · Visio · Origo</span><span>Design / Strategy / Execution</span><span>Scroll to explore <ArrowDown size={12} /></span></div>
          </div>
        </section>

        <section className={styles.introduction} aria-labelledby="introduction-heading">
          <div className={styles.introImage}><img src="/studio/tower.svg" alt="Exploded architectural study showing structure, enclosure and spatial layers" width="1766" height="1766" loading="lazy" /><span className={styles.imageCaption}>Structure. Context. Proportion.</span></div>
          <div className={styles.introCopy}><span className={styles.eyebrow}>The IMVO approach</span><h2 id="introduction-heading">Good places begin<br />with clear thinking.</h2><p>{content?.manifestoText || "IMVO develops environments through disciplined design thinking, technical coordination, and construction awareness."}</p><p>{content?.regionalText || "Based in Kigali, we support residential, commercial, institutional and hospitality projects across Rwanda and East & Central Africa."}</p><Link className={styles.outlineButton} href="/about">Meet the studio <ArrowUpRight size={17} /></Link><div className={styles.metrics}><div><strong>2017</strong><span>Founded</span></div><div><strong>40+</strong><span>Projects</span></div><div><strong>04</strong><span>Core disciplines</span></div></div></div>
        </section>

        <section ref={process} id="design-process" className={styles.process} aria-labelledby="process-heading">
          <div className={styles.processSticky} data-drawing-surface="dark">
            <div className={styles.processHeader}><span className={styles.eyebrow}>From possibility to place</span><h2 id="process-heading">Every line has a purpose.</h2><span className={styles.sheet}>Drawing study / P—01</span></div>
            <div className={styles.planViewport}>
              <div className={styles.plan}>
                <svg className={styles.planAssembly} viewBox="0 0 1156 1117" fill="none" aria-hidden="true">{planPaths.map((d, i) => <path key={i} d={d} data-plan-path="" strokeWidth="1.5" />)}</svg>
                <img className={styles.planWalls} src="/studio/plan-walls.svg" alt="Floor plan study with walls assembling, furniture appearing and dimensions completing the layout" width="1734" height="1676" loading="lazy" />
                <img className={styles.planFurniture} src="/studio/plan-furniture.svg" alt="" width="2312" height="2234" loading="lazy" />
                <img className={styles.planDimensions} src="/studio/plan-dimensions.svg" alt="" width="2312" height="2234" loading="lazy" />
              </div>
              <div className={styles.processCaptions}>{stages.map((item, i) => <div key={item.name} className={`${styles.processCaption} ${stage === i ? styles.captionActive : ""}`} aria-hidden={stage !== i}><span className={styles.stageNumber}>0{i + 1} / {item.name}</span><h3>{item.title}</h3><p>{item.text}</p><span className={styles.stageDetail}>{item.detail}</span></div>)}</div>
            </div>
            <div className={styles.processNavigation} role="group" aria-label="Explore the design process">{stages.map((item, i) => <button key={item.name} aria-pressed={stage === i} onClick={() => goStage(i)}><span>0{i + 1}</span>{item.name}<ArrowUpRight size={15} /></button>)}</div>
            <div className={styles.processFoot}><span>IMVO Studio / Design in progress</span><span>Scroll to build the plan <ArrowDown size={12} /></span></div>
          </div>
        </section>

        <section className={styles.services} aria-labelledby="services-heading">
          <div className={styles.sectionLead}><span className={styles.eyebrow}>Our expertise</span><h2 id="services-heading">Design, strategy<br />and execution.</h2><p>{content?.servicesHeading || "Three pillars from vision to execution."}</p><Link className={styles.textLink} href="/services">Explore our services <ArrowUpRight size={18} /></Link></div>
          <div className={styles.serviceList}>{services.map((item, i) => <article className={styles.service} key={item.title}><h3><button aria-expanded={serviceOpen === i} aria-controls={`studio-service-${i}`} onClick={() => setServiceOpen(serviceOpen === i ? null : i)}><span className={styles.serviceNumber}>0{i + 1}</span><span>{content?.services?.[i]?.title || item.title}</span>{serviceOpen === i ? <Minus size={19} /> : <Plus size={19} />}</button></h3><div id={`studio-service-${i}`} hidden={serviceOpen !== i} className={styles.serviceBody}><p>{content?.services?.[i]?.text || item.text}</p><span>{item.items}</span><Link href={item.href}>Discuss this scope <ArrowUpRight size={15} /></Link></div></article>)}</div>
        </section>

        <section ref={works} id="selected-work" className={styles.works} aria-labelledby="work-heading">
          <div className={styles.worksSticky}>
            <div className={styles.worksHeading}><div><span className={styles.eyebrow}>Selected work</span><h2 id="work-heading">Ideas, made tangible.</h2></div><div className={styles.worksControls}><Link className={styles.textLink} href="/projects">All projects <ArrowUpRight size={17} /></Link><button aria-label="Previous project" onClick={() => shiftWork(-1)}><ArrowLeft size={19} /></button><button aria-label="Next project" onClick={() => shiftWork(1)}><ArrowRight size={19} /></button></div></div>
            <div ref={rail} className={styles.projectRail} role="region" aria-label="Selected IMVO projects" tabIndex={0} onFocus={(event) => { if (event.target !== event.currentTarget && matchMedia("(min-width: 761px)").matches && !reducedMotion) { const card = (event.target as HTMLElement).closest<HTMLElement>("[data-project-index]"); if (card && works.current) { const index = Number(card.dataset.projectIndex); const top = works.current.getBoundingClientRect().top + scrollY; window.scrollTo({top: top + (works.current.offsetHeight - innerHeight) * index / Math.max(1,selected.length - 1),behavior:"instant"}); } } }}>
              {selected.map((project, i) => <Link data-project-index={i} className={styles.project} href={`/projects/${project.slug}`} key={project.id}><div className={styles.projectImage}><img src={coverFallbacks[project.cover] || project.cover} alt={project.title} width="1100" height="800" loading="lazy" /><span className={styles.projectOpen}><ArrowUpRight size={25} /></span></div><div className={styles.projectMeta}><span>[0{i + 1}]</span><div><h3>{project.title}</h3><p>{project.location} / {project.category}</p></div><span>{project.year}</span></div></Link>)}
            </div>
            <div className={styles.workProgress} aria-hidden="true"><span /></div>
            <div className={styles.worksFoot}><span>Residential / Commercial / Institutional / Hospitality / Urban</span><span>Keep scrolling to explore <ArrowRight size={14} /></span></div>
          </div>
        </section>

        <section className={styles.team} aria-labelledby="team-heading"><div className={styles.teamHeading}><span className={styles.eyebrow}>The people behind the lines</span><h2 id="team-heading">A shared way<br />of seeing.</h2><p>{content?.teamHeading || "A studio shaped by collaboration, technical focus, and shared responsibility."}</p><Link className={styles.textLink} href="/about">Inside IMVO <ArrowUpRight size={18} /></Link></div><div className={styles.teamGrid}>{team.slice(0,4).map((member,i) => <div className={styles.member} key={member.name || i}><div className={styles.memberImage}><img src={member.image?.url || defaultTeam[i]?.image.url} alt={member.name || "IMVO team member"} width="600" height="720" loading="lazy" /></div><h3>{member.name}</h3><p>{member.role}</p></div>)}</div></section>

        <section className={styles.contact} aria-labelledby="contact-heading"><div className={styles.contactMeta}><span>Have a site, a vision or a question?</span><span>Kigali, Rwanda / Working across the region</span></div><h2 id="contact-heading">Let’s draw<br />what’s next.</h2><Link className={styles.contactButton} href="/contact#quote">Start a conversation <ArrowUpRight size={27} /></Link><div className={styles.contactBottom}><span>Design with intention. Build with clarity.</span><span>Intellectu · Mens · Visio · Origo</span></div></section>
      </main>

      <footer className={styles.footer}><div className={styles.footerBrand}><img src="/brand/imvo-main.svg" alt="IMVO Group" width="255" height="53" /><p>A built-environment design and development consultancy.</p></div><div className={styles.footerLinks}><div><span>Explore</span><Link href="/projects">Projects</Link><Link href="/services">Services</Link><Link href="/about">About us</Link><Link href="/contact">Contact</Link></div><div><span>IMVO Group</span><Link href="/" aria-current="page">IMVO Studio</Link><Link href="/systems">IMVO Systems</Link><Link href="/domicile">Dōmicile</Link></div><div><span>Follow</span><a href="https://www.instagram.com/imvo_group/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><a href="https://www.linkedin.com/company/imvo-design-group" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a></div></div><div className={styles.footerBottom}><span>© {new Date().getFullYear()} IMVO Group</span><p>Regulated professional services and statutory sign-off are undertaken only by appropriately registered practitioners.</p><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link></div></div></footer>
    </div>
  );
}
