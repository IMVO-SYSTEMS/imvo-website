"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Hand } from "lucide-react";
import type { HomePageContent } from "@/sanity/types/siteContent";
import { StudioStatusPanel } from "../components/CmsStudioStatus";
import { elevationPaths } from "../studio-home/sourceDrawings";
import { CornerMarks, StudioJump, useStudioStatus } from "./StudioFrame";
import { DrawingInteraction } from "./DrawingInteraction";
import StudioImage from "./StudioImage";
import styles from "./StudioCanvas.module.css";
export default function DrawingHero({content,showStatus=true,nextSection='#regional-reach'}:{content?:HomePageContent|null;showStatus?:boolean;nextSection?:string}){
 const canvas=useRef<HTMLDivElement>(null),value=useRef(1),[progress,setProgress]=useState(1),[running,setRunning]=useState(true);
 const studioStatus=useStudioStatus();
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const finish=()=>{if(media.matches){value.current=100;setProgress(100);setRunning(false);canvas.current?.style.setProperty('--build-progress','1');}};finish();media.addEventListener('change',finish);return()=>media.removeEventListener('change',finish);},[]);
 useEffect(()=>{if(!running)return;let raf=0,last=0;const step=(time:number)=>{if(!last)last=time;value.current=Math.min(100,value.current+(time-last)/60);last=time;canvas.current?.style.setProperty('--build-progress',String(value.current/100));setProgress(Math.floor(value.current));if(value.current<100)raf=requestAnimationFrame(step);else setRunning(false);};raf=requestAnimationFrame(step);return()=>cancelAnimationFrame(raf);},[running]);
 const start=()=>{if(value.current>=100){value.current=1;setProgress(1);canvas.current?.style.setProperty('--build-progress','.01');}setRunning(true);};
 const pause=()=>setRunning(false);
 const complete=()=>{value.current=100;setProgress(100);setRunning(false);canvas.current?.style.setProperty('--build-progress','1');};
 return <section id="studio-opening" className={styles.hero} aria-labelledby="studio-heading" tabIndex={-1}>
  <div ref={canvas} className={styles.heroCanvas} data-drawing-surface data-build-state={progress===100?'complete':running?'building':'paused'}>
   <CornerMarks/>
   <div className={styles.house}><svg className={styles.houseLines} viewBox="-105 -51 1928 972" preserveAspectRatio="xMidYMid meet" aria-hidden="true">{elevationPaths.map((d,i)=><path key={i} d={d} pathLength="1" style={{'--line-order':i/elevationPaths.length} as CSSProperties}/>)}</svg><StudioImage className={styles.houseFill} src="/studio/elevation.svg" alt="A modern house draws itself from its first construction lines into a complete shaded architectural elevation" width="2060" height="1037" fetchPriority="high"/></div>
   <DrawingInteraction kind="elevation" label="Select any part of the house to explore the design"/>
   <aside className={styles.heroStatus} aria-label="Live Kigali studio status">
    {showStatus&&<div className={styles.statusBox} id="opening-studio-signal"><div className={styles.boxTop}><span>Studio status</span><span className={styles.liveSquare}/></div><div className={styles.signal}><StudioStatusPanel content={studioStatus}/></div></div>}
    <Link href="/contact#quote" className={styles.inquiryBox}><span>Project inquiries / Open</span><strong>Tell us what you have in mind.</strong><ArrowUpRight size={16}/></Link>
   </aside>
   <div className={styles.heroBuildBar}><div role="progressbar" aria-label="House drawing completion" aria-valuemin={1} aria-valuemax={100} aria-valuenow={progress}><span/><output>{String(progress).padStart(2,'0')}%</output></div></div>
   <div className={styles.canvasBottom}><span><i className={styles.liveSquare}/>{progress===100?'Elevation complete':running?'Building the design':'Drawing paused'}</span><div className={styles.buildControls}><button type="button" className={styles.holdBuild} onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);start();}} onPointerUp={pause} onPointerCancel={pause} onLostPointerCapture={pause} onKeyDown={e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();start();}}} onKeyUp={e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();pause();}}} onBlur={pause} aria-label={progress===100?'Hold to draw the house again':'Hold to build the house; release to pause'}><Hand size={13}/>{progress===100?'Hold to draw again':'Hold to build'}</button><button type="button" aria-label="Show completed house drawing" disabled={progress===100} onClick={complete}><Check size={14}/><span>Complete</span></button></div></div>
  </div>
  <div className={styles.heroTitle}><h1 id="studio-heading">IMVO shapes residential, commercial, and institutional environments.</h1><div className={styles.heroRight}><div className={styles.heroIntro}><p>{content?.heroIntro||'Built-environment design, development strategy, site coordination, and execution-aware planning.'}</p><Link href="/projects">{content?.heroButtonLabel||'Explore work'}<ArrowUpRight/></Link></div><div className={styles.heroTicker}><span>Design / Strategy / Execution</span><ArrowRight size={13}/></div></div></div>
  <div className={styles.heroFoot}><span>Intellectu / Mens / Visio / Origo</span><StudioJump href={nextSection}>Scroll to explore <ArrowDown size={13}/></StudioJump></div>
 </section>;
}
