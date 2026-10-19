"use client";
import { useRef, useState, type PointerEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Minus, Plus, X } from "lucide-react";
import StudioImage from "./StudioImage";
import { CornerMarks } from "./StudioFrame";
import styles from "./StudioCanvas.module.css";
/** Real project plans retain their image and status; selection never invents room data. */
export default function ProjectPlanViewer({src,title,label}:{src:string;title:string;label:string}){
 const [zoom,setZoom]=useState(1),[pan,setPan]=useState({x:0,y:0}),[point,setPoint]=useState<{x:number;y:number}|null>(null);
 const start=useRef<{x:number;y:number;px:number;py:number}|null>(null),trigger=useRef<HTMLButtonElement>(null);
 const reset=()=>{setZoom(1);setPan({x:0,y:0});};
 const down=(e:PointerEvent<HTMLButtonElement>)=>{start.current={x:e.clientX,y:e.clientY,px:pan.x,py:pan.y};e.currentTarget.setPointerCapture(e.pointerId);};
 const move=(e:PointerEvent<HTMLButtonElement>)=>{const s=start.current;if(!s||zoom===1)return;const rect=e.currentTarget.getBoundingClientRect(),limitX=rect.width*(zoom-1)/2,limitY=rect.height*(zoom-1)/2;setPan({x:Math.max(-limitX,Math.min(limitX,s.px+e.clientX-s.x)),y:Math.max(-limitY,Math.min(limitY,s.py+e.clientY-s.y))});};
 return <figure className={styles.projectPlan} data-drawing-surface><div className={styles.projectPlanTop}><span>{label}</span><span>Not for construction</span></div><div className={styles.projectPlanViewport}>
 <button ref={trigger} type="button" className={styles.planSelect} aria-label={`Explore ${title}, ${label}; use zoom controls to inspect the drawing`} onPointerDown={down} onPointerMove={move} onPointerCancel={()=>{start.current=null;}} onPointerUp={e=>{const s=start.current;start.current=null;if(!s||Math.hypot(e.clientX-s.x,e.clientY-s.y)>6)return;const b=e.currentTarget.getBoundingClientRect();setPoint({x:(e.clientX-b.left)/b.width*100,y:(e.clientY-b.top)/b.height*100});}} onClick={e=>{if(e.detail===0)setPoint({x:50,y:50});}} onKeyDown={e=>{if(e.key==='Escape')setPoint(null);}}><div style={{transform:`translate(${pan.x}px,${pan.y}px) scale(${zoom})`}}><StudioImage src={src} alt={`${title} — ${label}`} width="1600" height="1000" loading="lazy" draggable={false}/></div></button>
 <CornerMarks/>{point&&<><span className={styles.projectPlanPin} style={{left:`${point.x}%`,top:`${point.y}%`}} aria-hidden="true"/><aside className={styles.projectPlanNote} aria-label="Selected drawing detail"><div><strong>{title} / {label}</strong><button type="button" aria-label="Close project plan detail" onClick={()=>{setPoint(null);trigger.current?.focus();}}><X size={14}/></button></div><p>Explore the published design at this location. For project-specific dimensions, room information or a similar brief, speak with the studio.</p><Link href={`/contact?project=${encodeURIComponent(title)}#quote`}>Discuss this drawing<ArrowUpRight size={14}/></Link></aside></>}
 </div><figcaption><span>Select a detail · Zoom to inspect · Drag when enlarged</span><div className={styles.projectPlanTools}><button type="button" aria-label={`Zoom out ${label}`} disabled={zoom<=1} onClick={()=>{setZoom(z=>Math.max(1,z-.5));setPan({x:0,y:0});}}><Minus size={14}/></button><button type="button" aria-label={`Reset ${label} view`} onClick={reset}>{Math.round(zoom*100)}%</button><button type="button" aria-label={`Zoom in ${label}`} disabled={zoom>=3} onClick={()=>setZoom(z=>Math.min(3,z+.5))}><Plus size={14}/></button></div></figcaption></figure>;
}
