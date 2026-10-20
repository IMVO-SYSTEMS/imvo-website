"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StudioStatusPanel } from "../components/CmsStudioStatus";
import { useStudioStatus } from "./StudioFrame";
import styles from "./StudioCanvas.module.css";

/** Public studio information only: never show invented task counts or model-health metrics. */
export default function StudioDesk({ progress }: { progress: number }) {
  const content = useStudioStatus();
  const rows = [
    { number: "01", title: "Architecture & spatial design", detail: "Selected projects and design work", href: "/projects" },
    { number: "02", title: "Technical coordination", detail: "Integrated project disciplines", href: "/services" },
    { number: "03", title: "New project conversation", detail: "Send a brief to the studio", href: "/contact#quote" },
  ];
  return (
    <aside className={styles.heroStatus} aria-label="IMVO Studio design desk">
      <div className={styles.studioDesk} id="opening-studio-signal">
        <div className={styles.studioDeskTop}><span>IMVO / STUDIO DESK</span><span aria-hidden="true" className={styles.deskPulse}/></div>
        <div className={styles.studioDeskMetrics} aria-label="Studio quick facts">
          <div><small>BASED IN</small><strong>KIGALI</strong><i/></div>
          <div><small>TIME ZONE</small><strong>CAT</strong><i/></div>
          <div><small>PROJECT BRIEFS</small><strong>OPEN</strong><i/></div>
          <div><small>DRAWING</small><strong>{String(progress).padStart(2, "0")}%</strong><i/></div>
        </div>
        <div className={styles.studioDeskState}>
          <span className={styles.studioDeskLabel}>KIGALI STUDIO / CURRENT AVAILABILITY</span>
          <div className={styles.signal}><StudioStatusPanel content={content}/></div>
        </div>
        <div className={styles.studioDeskActivity}>
          <div className={styles.studioDeskActivityHead}><span>EXPLORE THE STUDIO</span><Link href="/services">VIEW ALL <ArrowUpRight size={12}/></Link></div>
          {rows.map(row=><Link key={row.number} href={row.href} className={styles.studioDeskRow}>
            <span>{row.number}</span><span><strong>{row.title}</strong><small>{row.detail}</small></span><ArrowUpRight size={13}/>
          </Link>)}
        </div>
      </div>
    </aside>
  );
}
