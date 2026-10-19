"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { StudioJump } from "./StudioFrame";
import styles from "./StudioCanvas.module.css";
const homepage=[['studio-opening','Home'],['design-process','Process'],['selected-work','Projects'],['studio-services','Services'],['studio-team','Team'],['start-a-project','Contact']];
export default function PageNavigator(){
 const pathname=usePathname(),[items,setItems]=useState<string[][]>([]),[active,setActive]=useState(''),ref=useRef<HTMLElement>(null);
 useEffect(()=>{const main=document.getElementById('main-content');if(!main)return;const rows=pathname==='/'?homepage.filter(([id])=>document.getElementById(id)):[['main-content','Top'],...Array.from(main.querySelectorAll('section')).filter(el=>el.querySelector('h2')).slice(0,6).map((el,i)=>{if(!el.id)el.id=`page-section-${i+1}`;return [el.id,el.querySelector('h2')?.textContent?.trim().slice(0,48)||`Section ${i+1}`];})];setItems(rows);
  let raf=0;const update=()=>{raf=0;const total=document.documentElement.scrollHeight-innerHeight;ref.current?.style.setProperty('--page-progress',String(total>0?scrollY/total:0));let selected=rows[0]?.[0]||'';for(const [id] of rows){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<innerHeight*.5)selected=id;}setActive(selected);};const schedule=()=>{if(!raf)raf=requestAnimationFrame(update);};update();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);return()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
 },[pathname]);
 return <nav ref={ref} className={styles.pageNavigator} aria-label="Page progress and section shortcuts"><span className={styles.pageProgress} aria-hidden="true"/>{items.map(([id,label],i)=><StudioJump key={id} href={`#${id}`} aria-label={`Jump to ${label}`} aria-current={active===id?'location':undefined}><span>{String(i+1).padStart(2,'0')}</span><span>{label}</span></StudioJump>)}</nav>;
}
