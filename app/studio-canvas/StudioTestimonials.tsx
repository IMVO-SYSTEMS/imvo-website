"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { StructuredTestimonial } from "@/sanity/types/cmsBackend";
import styles from "./StudioCanvas.module.css";

export default function StudioTestimonials({entries}:{entries:StructuredTestimonial[]}){
 const items=entries.filter(r=>r.active!==false&&Boolean(r.author?.trim())&&Boolean(r.quote?.trim()));
 const [index,setIndex]=useState(0),[paused,setPaused]=useState(false),[hovered,setHovered]=useState(false);
 useEffect(()=>{
  if(items.length<2||paused||hovered)return;
  const timer=window.setInterval(()=>setIndex(i=>(i+1)%items.length),7200);
  return ()=>window.clearInterval(timer);
 },[items.length,paused,hovered]);
 if(!items.length)return null; // Never publish placeholder names, empty quotations or fabricated reviews.
 const item=items[Math.min(index,items.length-1)];
 return <section id="studio-testimonials" className={styles.studioTestimonials} aria-labelledby="studio-testimonials-heading" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
  <div className={styles.studioTestimonialsIntro}><span className={styles.eyebrow}>CLIENT PERSPECTIVES / IMVO STUDIO</span><h2 id="studio-testimonials-heading">TRUSTED BY VISIONARIES.</h2><p>Published feedback from people and organisations we have worked with.</p></div>
  <div className={styles.studioTestimonialsPanel} aria-live="polite">
   <div className={styles.studioTestimonialsQuoteMark} aria-hidden="true">“</div>
   <blockquote><p>{item.quote}</p><footer><strong>{item.author}</strong><span>{[item.role,item.company,item.source].filter(Boolean).join(" · ")}</span></footer></blockquote>
   <div className={styles.studioTestimonialsNavigation}>
    <span>{String(index+1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</span>
    <div><button type="button" aria-label="Previous client review" onClick={()=>setIndex(i=>(i+items.length-1)%items.length)} disabled={items.length<2}><ArrowLeft size={17}/></button>
     <button type="button" aria-label="Next client review" onClick={()=>setIndex(i=>(i+1)%items.length)} disabled={items.length<2}><ArrowRight size={17}/></button>
     <button type="button" aria-label={paused?"Resume review rotation":"Pause review rotation"} aria-pressed={paused} onClick={()=>setPaused(p=>!p)} disabled={items.length<2}>{paused?<Play size={16}/>:<Pause size={16}/>}</button></div>
   </div>
  </div>
 </section>;
}
