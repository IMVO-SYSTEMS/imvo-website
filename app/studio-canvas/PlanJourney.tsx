"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import type { HomePageContent } from "@/sanity/types/siteContent";
import { planPaths } from "../studio-home/sourceDrawings";
import { useStudioScroll } from "../components/SmoothScrollProvider";
import { approachScenes } from "./content";
import { CornerMarks, StudioJump } from "./StudioFrame";
import { range, useScrollScene } from "./useScrollScene";
import StudioImage from "./StudioImage";
import styles from "./StudioCanvas.module.css";
const stages = [
 {label:'First lines',text:'Context, proportion and purpose give every project its starting point.',at:.08},
 {label:'Spatial planning',text:'Walls, openings and circulation turn an idea into a considered plan.',at:.32},
 {label:'Life within',text:'Furniture, movement and everyday use bring the space into focus.',at:.51},
 {label:'Technical clarity',text:'Dimensions and coordinated information carry the design forward.',at:.69},
 {label:'One connected design',text:'Design, strategy and execution move together, from early vision to delivery.',at:.97},
];
export default function PlanJourney({content,nextSection='#studio-approach'}:{content?:HomePageContent|null;nextSection?:string}){
 const section=useRef<HTMLElement>(null),lastStage=useRef(-1),manuallyControlled=useRef(false);
 const [stage,setStage]=useState(0),[focus,setFocus]=useState<number|null>(null);const scrollTo=useStudioScroll();
 const principles=content?.principles?.length?content.principles.map(item=>({label:item.label||item.title||'Principle',title:item.title||'',text:item.text||''})):approachScenes;
 useScrollScene(section,(p,reduced,mobile)=>{const el=section.current;if(!el||mobile&&!reduced)return;const travel=mobile||reduced?0:range(p,.76,.98);el.style.setProperty('--plan-walls',String(range(p,.07,.36)));el.style.setProperty('--plan-furniture',String(range(p,.38,.53)));el.style.setProperty('--plan-dimensions',String(range(p,.55,.7)));el.style.setProperty('--plan-ghost',String(1-range(p,.3,.45)));el.style.setProperty('--plan-travel',`${-travel*31}%`);el.style.setProperty('--plan-scale',String(1-travel*.2));el.style.setProperty('--principle-reveal',String(mobile||reduced?1:range(p,.78,.92)));el.style.setProperty('--scene-progress',`${p*100}%`);const next=p<.16?0:p<.38?1:p<.55?2:p<.78?3:4;if(next!==lastStage.current){lastStage.current=next;setStage(next);}});
 useEffect(()=>{const el=section.current;if(!el)return;const timers:ReturnType<typeof setTimeout>[]=[];const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting||innerWidth>760||matchMedia('(prefers-reduced-motion: reduce)').matches)return;observer.disconnect();[500,1700,2800].forEach((delay,index)=>timers.push(setTimeout(()=>{if(!manuallyControlled.current)setStage(index+1);},delay)));},{threshold:.25});observer.observe(el);return()=>{observer.disconnect();timers.forEach(clearTimeout);};},[]);
 const goTo=(index:number)=>{const el=section.current;if(!el||!scrollTo)return;if(innerWidth<=760||matchMedia('(prefers-reduced-motion: reduce)').matches){manuallyControlled.current=true;setStage(index);return;}scrollTo(scrollY+el.getBoundingClientRect().top+(el.offsetHeight-innerHeight)*stages[index].at);};
 return <section ref={section} id="design-process" className={styles.planJourney} data-studio-section="principles" data-mobile-stage={stage} tabIndex={-1} aria-labelledby="plan-journey-heading">
  <div className={styles.planSticky} data-drawing-surface><CornerMarks/>
   <div className={styles.sceneTop}><span>{content?.principlesKicker||'Studio principles'} / A—02</span><StudioJump href={nextSection}>Continue through the studio <ArrowDown size={13}/></StudioJump></div>
   <h2 id="plan-journey-heading" className={styles.planIntro}>{content?.principlesHeading||'Design, strategy, and execution.'}</h2>
   <div className={styles.planViewport}><div className={styles.planDrawing} role="group" aria-label="An illustrative floor plan assembles wall by wall before furniture and coordinated dimensions appear">
    <StudioImage className={styles.planGhost} src="/studio/plan-furniture.svg" alt="" width="2312" height="2234" loading="lazy"/>
    <svg className={styles.planWalls} viewBox="0 0 1156 1117" aria-hidden="true">{planPaths.map((d,index)=><path key={index} d={d} style={{'--part-delay':index*.014,'--part-x':index%4===0?'-1000px':index%4===1?'1000px':'0px','--part-y':index%4===2?'-1000px':index%4===3?'1000px':'0px'} as CSSProperties}/>)}</svg>
    <StudioImage className={styles.planFurniture} src="/studio/plan-furniture.svg" alt="" width="2312" height="2234" loading="lazy"/><StudioImage className={styles.planDimensions} src="/studio/plan-dimensions.svg" alt="" width="2312" height="2234" loading="lazy"/>
    <div className={styles.planHotspots} role="group" aria-label="Explore the design principles" inert={stage<3}>{principles.slice(0,3).map((item,index)=><button key={item.title} className={styles.hotspot} type="button" aria-label={`Explore ${item.label.toLowerCase()}`} aria-pressed={focus===index} onClick={()=>setFocus(focus===index?null:index)}>{String(index+1).padStart(2,'0')}</button>)}</div>
   </div><aside className={styles.connectedDesign} inert={stage<4}><span className={styles.eyebrow}>From vision to execution</span><p>{content?.principlesText||'Design, strategy, and execution work as one — moving every project from early vision toward coordinated, buildable, and enduring outcomes.'}</p>{principles.map((item,index)=><button type="button" key={item.title} className={styles.principleRow} onClick={()=>setFocus(focus===index?null:index)} aria-expanded={focus===index} aria-controls={`principle-${index}`}><span>{String(index+1).padStart(2,'0')} / {item.label}</span><strong>{item.title}</strong><span id={`principle-${index}`} hidden={focus!==index}>{item.text}</span><ArrowRight size={16} aria-hidden="true"/></button>)}<Link className={styles.textLink} href="/services">Explore our services <ArrowUpRight size={16}/></Link></aside></div>
   <div className={styles.planCaption}><span>{String(stage+1).padStart(2,'0')} / {stages[stage].label}</span><p>{focus!==null&&principles[focus]?principles[focus].text:stages[stage].text}</p><small>Illustrative drawing study</small></div>
   <div className={styles.sceneBottom}><span>Architecture / Spatial planning</span><div className={styles.stageButtons} role="group" aria-label="Drawing sequence navigation">{stages.map((item,index)=><button type="button" key={item.label} aria-label={`Go to ${item.label.toLowerCase()}`} aria-pressed={stage===index} onClick={()=>goTo(index)}>{String(index+1).padStart(2,'0')}</button>)}</div><span>Scroll to develop the design <ArrowRight size={13}/></span></div><div className={styles.sceneProgress} aria-hidden="true"/>
  </div>
  <div className={styles.mobilePrinciples}><p>{content?.principlesText||'Design, strategy, and execution work as one — moving every project from early vision toward coordinated, buildable, and enduring outcomes.'}</p>{principles.map(item=><article key={item.title}><span className={styles.eyebrow}>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}<Link className={styles.textLink} href="/services">Explore our services <ArrowUpRight size={16}/></Link></div>
 </section>;
}
