"use client";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, RotateCcw, X } from "lucide-react";
import type { HomePageContent } from "@/sanity/types/siteContent";
import { StudioStatusPanel } from "../components/CmsStudioStatus";
import { elevationPaths } from "../studio-home/sourceDrawings";
import { CornerMarks, StudioJump, useStudioStatus } from "./StudioFrame";
import StudioImage from "./StudioImage";
import styles from "./StudioCanvas.module.css";
export default function DrawingHero({content,showStatus=true,nextSection='#regional-reach'}:{content?:HomePageContent|null;showStatus?:boolean;nextSection?:string}){
 const [replay,setReplay]=useState(0),[phase,setPhase]=useState('First lines'),[status,setStatus]=useState(true),[inquiry,setInquiry]=useState(true);
 const studioStatus=useStudioStatus(),selection=useRef<HTMLDivElement>(null),start=useRef<{x:number;y:number}|null>(null);
 useEffect(()=>{setPhase('First lines');const a=setTimeout(()=>setPhase('Structure in focus'),1800),b=setTimeout(()=>setPhase('Elevation complete'),4900);return()=>{clearTimeout(a);clearTimeout(b);};},[replay]);
 const down=(event:PointerEvent<HTMLDivElement>)=>{if(event.pointerType!=='mouse'||(event.target as Element).closest('a,button'))return;const rect=event.currentTarget.getBoundingClientRect();start.current={x:event.clientX-rect.left,y:event.clientY-rect.top};event.currentTarget.setPointerCapture(event.pointerId);};
 const move=(event:PointerEvent<HTMLDivElement>)=>{const el=selection.current;if(!start.current||!el)return;const rect=event.currentTarget.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top;el.dataset.active='true';Object.assign(el.style,{left:`${Math.min(start.current.x,x)}px`,top:`${Math.min(start.current.y,y)}px`,width:`${Math.abs(x-start.current.x)}px`,height:`${Math.abs(y-start.current.y)}px`});};
 const up=()=>{if(selection.current)delete selection.current.dataset.active;if(start.current){setStatus(true);setInquiry(true);}start.current=null;};
 return <section id="studio-opening" className={styles.hero} aria-labelledby="studio-heading" tabIndex={-1}>
  <div className={styles.heroCanvas} data-drawing-surface onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
   <CornerMarks/><div className={styles.canvasMeta}><span>{content?.heroKicker||'Built environment design & development'}</span><span>IMVO Studio / A—01</span></div>
   <div className={styles.house} key={replay}><svg className={styles.houseLines} viewBox="-105 -51 1928 972" preserveAspectRatio="xMidYMid meet" aria-hidden="true">{elevationPaths.map((d,i)=><path key={i} d={d} pathLength="1" style={{'--line-delay':`${i*.018}s`} as CSSProperties}/>)}</svg><StudioImage className={styles.houseFill} src="/studio/elevation.svg" alt="A modern house draws itself from its first construction lines into a complete shaded architectural elevation" width="2060" height="1037" fetchPriority="high"/></div>
   {showStatus&&<button className={`${styles.hotspot} ${styles.heroPointOne}`} type="button" aria-label="Show studio status" aria-expanded={status} aria-controls="opening-studio-signal" onClick={()=>setStatus(!status)}/>}
   <button className={`${styles.hotspot} ${styles.heroPointTwo}`} type="button" aria-label="Show project inquiries" aria-expanded={inquiry} onClick={()=>setInquiry(!inquiry)}/>
   <aside className={styles.heroStatus} aria-label="Live Kigali studio signal">
    {showStatus&&status&&<div className={styles.statusBox} id="opening-studio-signal"><div className={styles.boxTop}><span>Studio signal</span><button type="button" aria-label="Close studio signal" onClick={()=>setStatus(false)}><X size={13}/></button></div><div className={styles.signal}><StudioStatusPanel content={studioStatus}/></div></div>}
    {inquiry&&<Link href="/contact#quote" className={styles.inquiryBox}><span>Project inquiries / Open</span><strong>Tell us what you have in mind.</strong><ArrowUpRight size={16}/></Link>}
   </aside>
   <div ref={selection} className={styles.selection} aria-hidden="true"/>
   <div className={styles.canvasBottom}><span><i className={styles.liveSquare}/>{phase}</span><span className={styles.drawingStudy}>Illustrative architectural study</span><button type="button" aria-label="Replay the building drawing" onClick={()=>setReplay(n=>n+1)}><RotateCcw size={12}/> Replay drawing</button></div>
  </div>
  <div className={styles.heroTitle}><h1 id="studio-heading">IMVO shapes residential, commercial, and institutional environments.</h1><div className={styles.heroRight}><div className={styles.heroIntro}><p>{content?.heroIntro||'Built-environment design, development strategy, site coordination, and execution-aware planning.'}</p><Link href="/projects">{content?.heroButtonLabel||'Explore work'}<ArrowUpRight/></Link></div><div className={styles.heroTicker}><span>Design / Strategy / Execution</span><ArrowRight size={13}/></div></div></div>
  <div className={styles.heroFoot}><span>Intellectu / Mens / Visio / Origo</span><StudioJump href={nextSection}>Scroll to explore <ArrowDown size={13}/></StudioJump></div>
 </section>;
}
