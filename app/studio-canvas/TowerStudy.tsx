"use client";
import { useRef } from "react";
import { CornerMarks } from "./StudioFrame";
import { DrawingInteraction } from "./DrawingInteraction";
import StudioImage from "./StudioImage";
import { range, useScrollScene } from "./useScrollScene";
import styles from "./StudioCanvas.module.css";
export default function TowerStudy(){
 const ref=useRef<HTMLDivElement>(null);
 useScrollScene(ref,(p,reduced)=>{const el=ref.current;if(!el)return;const progress=reduced?1:range(p,0,.85);el.style.setProperty('--tower-fill',`${(1-progress)*100}%`);el.style.setProperty('--tower-lines',String(.15+progress*.55));const output=el.querySelector('output');if(output)output.textContent=`${Math.max(1,Math.round(progress*100)).toString().padStart(2,'0')}%`;});
 return <div ref={ref} className={styles.towerStudy} data-drawing-surface><StudioImage className={styles.towerGhost} src="/studio/tower.svg" alt="" width="1766" height="1766" loading="lazy"/><StudioImage className={styles.towerFill} src="/studio/tower.svg" alt="A tower study develops from linework to a shaded façade as you scroll" width="1766" height="1766" loading="lazy"/><CornerMarks/><DrawingInteraction kind="tower"/><span className={styles.studyFooter}>Structure / Context / Proportion <output aria-label="Tower drawing completion">01%</output></span></div>;
}
