"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { HomePageContent } from "@/sanity/types/siteContent";
import { useStudioScroll } from "../components/SmoothScrollProvider";
import DrawingExplorer from "./DrawingInteraction";
import { studioServices } from "./content";
import { useScrollScene } from "./useScrollScene";
import styles from "./StudioCanvas.module.css";
const scenes=[{label:'Design',src:'/studio/study-elevation.jpg',kind:'elevation',href:'/services/design'},{label:'Strategy',src:'/studio/study-office.jpg',kind:'office',href:'/services/consultancy'},{label:'Execution',src:'/studio/study-development.jpg',kind:'development',href:'/services/site-coordination'}] as const;
export default function ServiceJourney({content}:{content?:HomePageContent|null}){
 const ref=useRef<HTMLElement>(null),last=useRef(-1),[stage,setStage]=useState(0),scrollTo=useStudioScroll();
 const services=content?.services?.length?content.services:studioServices,scene=scenes[stage],item=services[stage]||studioServices[stage];
 useScrollScene(ref,(p,reduced,mobile)=>{if(reduced||mobile)return;const next=Math.min(2,Math.floor(p*3));if(next!==last.current){last.current=next;setStage(next);}});
 const go=(index:number)=>{setStage(index);last.current=index;const el=ref.current;if(el&&innerWidth>760&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&scrollTo)scrollTo(scrollY+el.getBoundingClientRect().top+(el.offsetHeight-innerHeight)*(index+.25)/3);};
 return <section ref={ref} id="studio-services" tabIndex={-1} data-studio-section="services" className={styles.serviceJourney} aria-labelledby="services-heading"><div className={styles.serviceSticky}><div className={styles.sectionHeading}><h2 id="services-heading">{content?.servicesHeading||'Three pillars from vision to execution.'}</h2><div className={styles.serviceTabs} role="group" aria-label="Explore our three service pillars">{scenes.map((s,i)=><button key={s.label} type="button" aria-pressed={stage===i} onClick={()=>go(i)}><span>0{i+1}</span>{s.label}</button>)}</div></div><div className={styles.serviceScene} key={stage}><DrawingExplorer src={scene.src} kind={scene.kind} label={`${scene.label} — illustrative architectural study`}/><article className={styles.serviceSceneCopy}><h3>{item.title}</h3><p>{item.text}</p><Link className={styles.outlineLink} href={scene.href}>Explore {scene.label.toLowerCase()}<ArrowUpRight size={16}/></Link><div className={styles.serviceSceneStatus}><span>0{stage+1} / 03</span><span>{scene.label}</span></div></article></div></div></section>;
}
