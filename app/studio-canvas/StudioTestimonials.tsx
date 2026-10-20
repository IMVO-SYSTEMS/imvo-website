"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import styles from "./StudioCanvas.module.css";

export type StudioReview={
 quote:string; author:string; role?:string; company?:string;
 source?:string; rating?:number;
};
export default function StudioTestimonials({reviews}:{reviews:StudioReview[]}){
 const [index,setIndex]=useState(0),[paused,setPaused]=useState(false),[hovered,setHovered]=useState(false);
 const count=reviews.length,active=reviews[Math.min(index,count-1)];
 useEffect(()=>{
  if(count<2||paused||hovered||typeof window==="undefined")return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const timer=window.setInterval(()=>setIndex(i=>(i+1)%count),6500);
  return ()=>window.clearInterval(timer);
 },[count,paused,hovered]);
 const go=(step:number)=>setIndex(i=>(i+step+count)%count);
 return <section className={styles.studioReviews} id="studio-reviews" aria-labelledby="studio-reviews-heading"
  onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
  onFocusCapture={()=>setHovered(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setHovered(false);}}>
  <div className={styles.studioReviewsHeading}>
   <span className={styles.eyebrow}>CLIENT PERSPECTIVES / IMVO STUDIO</span>
   <h2 id="studio-reviews-heading">TRUSTED BY VISIONARIES.</h2>
  </div>
  {active?<div className={styles.studioReviewCard} aria-live={paused?"polite":"off"}
    onTouchStart={e=>{(e.currentTarget as HTMLElement).dataset.touchX=String(e.touches[0]?.clientX??0);}}
    onTouchEnd={e=>{const start=Number((e.currentTarget as HTMLElement).dataset.touchX||0);const delta=e.changedTouches[0]?.clientX-start;if(Math.abs(delta)>65)go(delta<0?1:-1);}}>
   <div className={styles.studioReviewMeta}>
    <span>{String(index+1).padStart(2,"0")} / {String(count).padStart(2,"0")}</span>
    {active.rating&&active.rating>=1&&active.rating<=5?<span aria-label={active.rating+" of 5 stars"}>{"★".repeat(Math.round(active.rating))}</span>:<span>VERIFIED CLIENT WORDS</span>}
   </div>
   <blockquote key={active.author+"-"+index} className={styles.studioReviewQuote}><span aria-hidden="true">“</span><p>{active.quote}</p></blockquote>
   <footer className={styles.studioReviewByline}>
    <div><strong>{active.author}</strong><span>{[active.role,active.company,active.source].filter(Boolean).join(" · ")||"IMVO CLIENT"}</span></div>
    <div className={styles.studioReviewControls}>
     <button type="button" aria-label="Previous testimonial" disabled={count<2} onClick={()=>go(-1)}><ArrowLeft size={18}/></button>
     <button type="button" aria-label={paused?"Resume testimonials":"Pause testimonials"} onClick={()=>setPaused(p=>!p)} disabled={count<2}>{paused?<Play size={16}/>:<Pause size={16}/>}</button>
     <button type="button" aria-label="Next testimonial" disabled={count<2} onClick={()=>go(1)}><ArrowRight size={18}/></button>
    </div>
   </footer>
   {count>1&&<div className={styles.studioReviewPagination} aria-label="Testimonial position">{reviews.map((review,i)=><button key={review.author+"-"+i} type="button" aria-label={"Show testimonial "+(i+1)} aria-current={i===index?"true":undefined} onClick={()=>setIndex(i)}/>)}</div>}
  </div>:<div className={styles.studioReviewEmpty}>
   <div><span className={styles.eyebrow}>CLIENT FEEDBACK / EDITORIAL APPROVAL</span><h3>Every project starts with trust.</h3><p>Client testimonials will appear here once an approved review has been published. Discover our work and the people behind it in the meantime.</p></div>
   <Link href="/projects">EXPLORE OUR WORK <ArrowUpRight size={18}/></Link>
  </div>}
 </section>;
}