"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { StructuredTestimonial } from "@/sanity/types/cmsBackend";
import styles from "./StudioCanvas.module.css";
type Review={text:string;author:string;detail?:string};
export default function StudioReviews({items}:{items:StructuredTestimonial[]}){
 const reviews:Review[]=items.filter(x=>x.active!==false && Boolean(x.quote?.trim()) && Boolean(x.author?.trim())).map(x=>({text:x.quote!.trim(),author:x.author!.trim(),detail:[x.role,x.company,x.source].filter(Boolean).join(" · ")}));
 const [index,setIndex]=useState(0),[paused,setPaused]=useState(false);
 const count=reviews.length;
 useEffect(()=>{if(paused||count<2||typeof window==="undefined"||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const timer=window.setInterval(()=>setIndex(i=>(i+1)%count),6800);return ()=>window.clearInterval(timer);},[paused,count]);
 if(!count)return null;
 const active=reviews[index%count];
 return <section className={styles.studioReviews} id="client-perspectives" data-studio-section="reviews" aria-labelledby="studio-reviews-heading">
  <header className={styles.reviewsHeader}><span>CLIENT PERSPECTIVES / {String(index+1).padStart(2,"0")}—{String(count).padStart(2,"0")}</span><h2 id="studio-reviews-heading">TRUSTED BY PEOPLE WE DESIGN FOR.</h2></header>
  <div className={styles.reviewStage} aria-live="polite">
   <div className={styles.reviewIndex}>{String(index+1).padStart(2,"0")} / {String(count).padStart(2,"0")}</div>
   <blockquote><span aria-hidden="true">“</span>{active.text}<span aria-hidden="true">”</span></blockquote>
   <div className={styles.reviewAuthor}><strong>{active.author}</strong>{active.detail&&<span>{active.detail}</span>}</div>
  </div>
  <footer className={styles.reviewControls}><span>REAL CLIENT FEEDBACK / IMVO</span><div>
   <button type="button" aria-label="Previous review" onClick={()=>setIndex(i=>(i+count-1)%count)}><ArrowLeft size={17}/></button>
   <button type="button" aria-label={paused?"Play testimonial slideshow":"Pause testimonial slideshow"} aria-pressed={paused} onClick={()=>setPaused(p=>!p)}>{paused?<Play size={15}/>:<Pause size={15}/>}</button>
   <button type="button" aria-label="Next review" onClick={()=>setIndex(i=>(i+1)%count)}><ArrowRight size={17}/></button>
  </div></footer>
 </section>;
}
