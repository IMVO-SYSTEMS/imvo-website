"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, MoveUpRight } from "lucide-react";
import { PROJECTS, type Project } from "../projects/projectsData";
import { elevationPaths, planPaths } from "../studio-home/sourceDrawings";
import { useStudioScroll } from "./SmoothScrollProvider";
import styles from "./StudioDrawingJourney.module.css";

const steps = [
  { label: "First lines", title: "A clear idea, drawn into focus.", text: "Context, proportion and purpose give every project its starting point.", position: 0.15 },
  { label: "Spatial planning", title: "Space takes shape.", text: "Walls, openings and circulation turn an idea into a considered plan.", position: 0.4 },
  { label: "Life within", title: "Designed around the way we live.", text: "Furniture, movement and everyday use bring the space into focus.", position: 0.56 },
  { label: "Technical clarity", title: "Every detail, connected.", text: "Dimensions and coordinated information carry the design forward.", position: 0.7 },
  { label: "Selected work", title: "Ideas, made tangible.", text: "Explore the residential, commercial and hospitality work of IMVO Studio.", position: 0.98 },
] as const;

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const between = (n: number, start: number, end: number) => clamp((n - start) / (end - start));
const smooth = (n: number) => n * n * (3 - 2 * n);

/** An additive drawing chapter. The existing homepage owns its hero, shell and content. */
export default function StudioDrawingJourney({ projects = [] }: { projects?: Project[] }) {
  const section = useRef<HTMLElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const coordinates = useRef<HTMLSpanElement>(null);
  const [stage, setStage] = useState(0);
  const [staticMode, setStaticMode] = useState(false);
  const scrollStudioTo = useStudioScroll();
  const project = projects.find((item) => item.cover) || PROJECTS[0];

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;
    let lastStage = -1;

    const update = () => {
      frame = 0;
      if (!visible || preference.matches) return;
      const rect = element.getBoundingClientRect();
      const p = clamp(-rect.top / Math.max(1, rect.height - innerHeight));
      const travel = smooth(between(p, 0.76, 0.98));
      const house = 1 - between(p, 0.22, 0.28);
      element.style.setProperty("--elevation-draw", String(between(p, 0, 0.14)));
      element.style.setProperty("--elevation-fill", `${between(p, 0.1, 0.2) * 100}%`);
      element.style.setProperty("--elevation-ink", String(1 - between(p, 0.15, 0.21)));
      element.style.setProperty("--house-opacity", String(house));
      element.style.setProperty("--plan-opacity", String(between(p, 0.24, 0.29)));
      element.style.setProperty("--wall-progress", String(between(p, 0.25, 0.46)));
      element.style.setProperty("--furniture-opacity", String(between(p, 0.47, 0.57)));
      element.style.setProperty("--dimensions-opacity", String(between(p, 0.59, 0.7)));
      element.style.setProperty("--journey-travel", `${-travel * 100}%`);
      element.style.setProperty("--journey-progress", `${p * 100}%`);
      element.style.setProperty("--photo-scale", String(1.08 - travel * 0.08));
      const current = p < 0.24 ? 0 : p < 0.47 ? 1 : p < 0.59 ? 2 : p < 0.8 ? 3 : 4;
      if (current !== lastStage) {
        lastStage = current;
        setStage(current);
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const applyPreference = () => {
      element.dataset.motion = preference.matches ? "static" : "scrub";
      setStaticMode(preference.matches);
      schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    }, { rootMargin: "100% 0px" });
    observer.observe(element);
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    applyPreference();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", applyPreference);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", applyPreference);
    };
  }, []);

  const goTo = (index: number) => {
    const element = section.current;
    if (!element || staticMode) return;
    const rect = element.getBoundingClientRect();
    const top = scrollY + rect.top + (rect.height - innerHeight) * steps[index].position;
    if (scrollStudioTo) scrollStudioTo(top);
    else window.scrollTo({ top, behavior: "instant" });
  };

  const point = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !cursor.current || !sheet.current) return;
    const bounds = sheet.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    cursor.current.style.setProperty("--cursor-x", `${x}px`);
    cursor.current.style.setProperty("--cursor-y", `${y}px`);
    cursor.current.dataset.visible = "true";
    if (coordinates.current) coordinates.current.textContent = `X: ${Math.round(x)}  Y: ${Math.round(y)}`;
  };

  return (
    <section ref={section} id="design-in-motion" className={styles.journey} aria-labelledby="drawing-journey-title" data-imvo-drawing-journey>
      <div ref={sheet} className={styles.sheet} onPointerMove={point} onPointerLeave={() => { if (cursor.current) cursor.current.dataset.visible = "false"; }}>
        <div className={styles.sheetFrame} aria-hidden="true" />
        <div className={styles.topline}>
          <span>IMVO Studio / Design in motion</span>
          <a className={styles.skip} href="#studio-approach" onClick={(event) => {
            const target = document.getElementById("studio-approach");
            if (!scrollStudioTo || !target) return;
            event.preventDefault();
            scrollStudioTo(target.getBoundingClientRect().top + scrollY);
            target.focus({ preventScroll: true });
            window.history.replaceState(window.history.state, "", "#studio-approach");
          }}>Continue through the studio <ArrowDown aria-hidden="true" /></a>
        </div>

        <div className={styles.track}>
          <div className={styles.drawingPanel}>
            <div className={styles.elevation}>
              <div className={styles.chapterTitle}>
                <span>From vision to execution</span>
                <h2 id="drawing-journey-title">Every place begins<br />with a line.</h2>
              </div>
              <div className={styles.house} role="img" aria-label="An architectural elevation develops from its first lines into a shaded building study">
                <svg className={styles.houseLines} viewBox="-105 -51 1928 972" preserveAspectRatio="none" aria-hidden="true">
                  {elevationPaths.map((d, index) => <path key={index} d={d} pathLength={1} style={{ "--line-index": index } as CSSProperties} />)}
                </svg>
                <img className={styles.houseFill} src="/studio/elevation.svg" alt="" width="2060" height="1037" loading="lazy" />
              </div>
            </div>

            <div className={styles.plan} role="img" aria-label="An illustrative floor plan assembles wall by wall, then adds furniture and dimensions">
              <img className={styles.planGhost} src="/studio/plan-furniture.svg" alt="" width="2312" height="2234" loading="lazy" />
              <svg className={styles.planWalls} viewBox="0 0 1156 1117" aria-hidden="true">
                {planPaths.map((d, index) => <path key={index} d={d} style={{
                  "--part-delay": index * 0.015,
                  "--part-x": index % 4 === 0 ? "-1200px" : index % 4 === 1 ? "1200px" : "0px",
                  "--part-y": index % 4 === 2 ? "-1200px" : index % 4 === 3 ? "1200px" : "0px",
                } as CSSProperties} />)}
              </svg>
              <img className={styles.planFurniture} src="/studio/plan-furniture.svg" alt="" width="2312" height="2234" loading="lazy" />
              <img className={styles.planDimensions} src="/studio/plan-dimensions.svg" alt="" width="2312" height="2234" loading="lazy" />
            </div>
          </div>

          <div className={styles.projectPanel}>
            <div className={styles.projectHeading}><span>From the drawing, into the world.</span><span>Selected IMVO work</span></div>
            <Link className={styles.projectImage} href={`/projects/${project.slug}`} aria-label={`Discover ${project.title}`} onFocus={() => goTo(4)}>
              <Image src={project.cover} alt={project.title} fill sizes="(max-width: 760px) 100vw, 92vw" style={{ objectFit: "cover" }} />
              <span className={styles.projectOpen}>Discover the project <MoveUpRight aria-hidden="true" /></span>
            </Link>
            <div className={styles.projectCaption}><h3>{project.title}</h3><span>{project.location} / {project.category}</span></div>
          </div>
        </div>

        <div className={styles.caption}>
          <div className={styles.captionLabel}>{String(stage + 1).padStart(2, "0")} / {steps[stage].label}</div>
          <p>{steps[stage].text}</p>
          {stage < 4 ? <span className={styles.studyNote}>Illustrative drawing study</span> : null}
          <span className={styles.scrollHint}>Scroll to develop the design <ArrowRight aria-hidden="true" /></span>
        </div>
        <div className={styles.bottomline}>
          <span className={styles.studyLabel}>Illustrative drawing study / A—01</span>
          <div className={styles.stages} role="group" aria-label="Explore the drawing sequence">
            {steps.map((step, index) => <button key={step.label} type="button" aria-label={`Go to ${step.label.toLowerCase()}`} aria-pressed={stage === index} title={step.label} onClick={() => goTo(index)} disabled={staticMode}>{String(index + 1).padStart(2, "0")}</button>)}
          </div>
          <span className={styles.sheetNumber}>Design / Strategy / Execution</span>
        </div>
        <div ref={cursor} className={styles.cursor} aria-hidden="true"><i /><i /><span ref={coordinates} /></div>
        <div className={styles.progress} aria-hidden="true"><span /></div>
      </div>
      <ol className={styles.staticSteps}>{steps.slice(0, 4).map((step) => <li key={step.label}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
    </section>
  );
}
