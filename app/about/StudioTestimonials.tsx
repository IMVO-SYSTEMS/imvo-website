"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import Link from "next/link";
import styles from "./StudioTestimonials.module.css";

type Review = {text:string; author:string; date?:string};
export default function StudioTestimonials({reviews, heading="Trusted by visionaries."}:{reviews:Review[];heading?:string}){
 const entries=reviews.filter(r=>r.text?.trim()&&r.author?.trim());
 const [active,setActive]=useState(0);
 const [paused,setPaused]=useState(false);
 const [reducedMotion,setReducedMotion]=useState(false);
 useEffect(()=>{
  const q=window.matchMedia("(prefers-reduced-motion: reduce)");
  const update=()=>setReducedMotion(q.matches);update();
  q.addEventListener("change",update);
  return()=>q.removeEventListener("change",update);
 },[]);
 useEffect(()=>{
  if(entries.length<2||paused||reducedMotion)return;
  const timer=window.setInterval(()=>setActive(v=>(v+1)%entries.length),7800);
  return()=>window.clearInterval(timer);
 },[entries.length,paused,reducedMotion]);
 if(!entries.length)return null;
 const review=entries[active%entries.length];
 const move=(delta:number)=>setActive(v=>(v+delta+entries.length)%entries.length);
 return <section className={styles.section} aria-label="Client perspectives" id="client-perspectives"
    onPointerEnter={()=>setPaused(true)} onPointerLeave={()=>setPaused(false)}
    onFocusCapture={()=>setPaused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setPaused(false);}}>
   <div className={styles.heading}>
    <span>CLIENT PERSPECTIVES / IMVO STUDIO</span>
    <h2>{heading}</h2>
    <span>{String(active+1).padStart(2,"0")} / {String(entries.length).padStart(2,"0")}</span>
   </div>
   <div className={styles.card}>
    <div className={styles.quoteIcon}><Quote size={26}/><span>IN THEIR WORDS</span></div>
    <blockquote aria-live={paused?"off":"polite"} key={active} className={styles.quote}>“{review.text}”</blockquote>
    <div className={styles.attribution}><div><strong>{review.author}</strong>{review.date&&<span>{review.date}</span>}</div>
      <div className={styles.controls}>
       <button type="button" disabled={entries.length===1} aria-label="Previous client review" onClick={()=>move(-1)}><ArrowLeft size={18}/></button>
       <button type="button" disabled={entries.length===1} aria-label="Next client review" onClick={()=>move(1)}><ArrowRight size={18}/></button>
      </div>
    </div>
   </div>
   <div className={styles.progress} aria-label="Testimonial navigation">{entries.map((item,index)=><button type="button" key={index} aria-label={`Show testimonial ${index+1} by ${item.author}`} aria-current={index===active} onClick={()=>setActive(index)}><span/></button>)}</div>
   <div className={styles.footer}><span>DESIGN / TRUST / DELIVERY</span><Link href="/contact#quote">Begin a conversation <ArrowUpRight size={16}/></Link></div>
 </section>;
}
