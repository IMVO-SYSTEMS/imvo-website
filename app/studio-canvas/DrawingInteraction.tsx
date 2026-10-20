"use client";
import { useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowUpRight, Minus, Plus, X } from "lucide-react";
import StudioImage from "./StudioImage";
import styles from "./StudioCanvas.module.css";
export type DrawingKind='elevation'|'office'|'residential'|'development'|'plan'|'tower';
type Detail={title:string;text:string;href:string;action:string;x:number;y:number;area:string};
const design='/services/design',strategy='/services/consultancy',execution='/services/site-coordination';
const details:Record<DrawingKind,Detail[]>={
 elevation:[
 {title:'Light & ventilation',text:'Windows connect the interior to daylight, views and natural airflow. IMVO develops openings alongside orientation and everyday use.',href:design,action:'Explore our design approach',x:49,y:42,area:'38,26 61,26 61,62 38,62'},
 {title:'Access & circulation',text:'An entrance should make arrival and movement clear. Levels, access and the way people use a building are considered together.',href:strategy,action:'Discuss your project direction',x:34,y:71,area:'27,61 39,61 39,79 27,79'},
 {title:'Structure & coordination',text:'Structure, enclosure and technical information develop together, carrying the design intention toward coordinated delivery.',href:execution,action:'See site coordination',x:63,y:57,area:'60,27 66,27 66,79 60,79'}],
 office:[
 {title:'Rooms that support the programme',text:'We plan rooms around their intended use, balancing working space, furniture, movement and the wider project brief.',href:design,action:'Explore spatial design',x:36,y:31,area:'20,17 48,17 48,42 20,42'},
 {title:'Connected circulation',text:'Access and movement are tested early so the layout supports people and connects spaces with clarity.',href:strategy,action:'Explore feasibility & strategy',x:62,y:55,area:'21,43 78,43 78,58 21,58'},
 {title:'Coordinated delivery',text:'Design information and decisions are reviewed across the project team before they reach the site.',href:execution,action:'Explore technical coordination',x:41,y:69,area:'21,60 77,60 77,80 21,80'}],
 residential:[
 {title:'Living & gathering',text:'Proportion, furniture and natural light shape spaces that support daily life and shared moments.',href:design,action:'Explore residential design',x:56,y:53,area:'43,38 76,38 76,70 43,70'},
 {title:'Private spaces',text:'The brief guides how bedrooms, quiet spaces and everyday routines relate to the rest of the home.',href:design,action:'See our residential work',x:35,y:29,area:'22,19 52,19 52,37 22,37'},
 {title:'Arrival & movement',text:'A considered entrance establishes a clear path through the home and connects the building with its site.',href:strategy,action:'Start with your site',x:36,y:70,area:'23,53 44,53 44,75 23,75'}],
 development:[
 {title:'Development potential',text:'We examine opportunities and constraints before recommending a considered development path.',href:strategy,action:'Explore development consultancy',x:37,y:34,area:'22,18 51,18 51,47 22,47'},
 {title:'Spatial relationships',text:'Access, adjacencies and the use of each space guide the arrangement of the overall development.',href:design,action:'Explore planning & design',x:65,y:52,area:'52,33 79,33 79,69 52,69'},
 {title:'Design value on site',text:'Technical reviews, consultant coordination and site decisions help protect the intent as work progresses.',href:execution,action:'Explore execution support',x:38,y:69,area:'23,49 51,49 51,79 23,79'}],
 plan:[
 {title:'Life within the plan',text:'Furniture and room relationships test how a space works in daily use, alongside light, proportion and comfort.',href:design,action:'Explore spatial design',x:48,y:43,area:'31,30 61,30 61,64 31,64'},
 {title:'Movement & connections',text:'An integrated circulation strategy connects arrival, shared spaces and the activities within the building.',href:strategy,action:'Explore project strategy',x:69,y:47,area:'64,30 80,30 80,66 64,66'},
 {title:'Technical coordination',text:'Walls, openings and service spaces are coordinated as the design develops toward clear project information.',href:execution,action:'Explore technical coordination',x:37,y:70,area:'30,64 62,64 62,82 30,82'}],
 tower:[
 {title:'Structure & proportion',text:'The relationship between structure, façade and scale shapes a building’s architectural character.',href:design,action:'Explore the IMVO approach',x:43,y:38,area:'33,12 61,12 61,70 33,70'},
 {title:'Context at ground level',text:'Arrival, landscape and the spaces around a building connect its larger ambition with the experience of people.',href:strategy,action:'Explore context & feasibility',x:59,y:79,area:'17,70 87,70 87,92 17,92'}]
};
/** Coordinates describe illustrative studies, not surveyed project data. */
export function DrawingInteraction({kind,label='Explore the drawing',compact=false,dockId}:{kind:DrawingKind;label?:string;compact?:boolean;dockId?:string}){
 const id=useId(),[selected,setSelected]=useState<number|null>(null),[hover,setHover]=useState<number|null>(null);
 const buttons=useRef<(HTMLButtonElement|null)[]>([]),items=details[kind],active=hover??selected;
 const close=()=>{const last=selected;setSelected(null);if(last!==null)buttons.current[last]?.focus();};
 return <div className={styles.drawingInteraction} data-compact={compact} role="group" aria-label={label} onKeyDown={e=>{if(e.key==='Escape'&&selected!==null){e.preventDefault();close();}else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)&&(e.target as HTMLElement).matches('button[data-detail]')){e.preventDefault();const next=((selected??0)+(['ArrowRight','ArrowDown'].includes(e.key)?1:items.length-1))%items.length;setSelected(next);buttons.current[next]?.focus();}}}>
 <svg className={styles.detailRegions} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" onClick={e=>{const b=e.currentTarget.getBoundingClientRect(),x=(e.clientX-b.left)/b.width*100,y=(e.clientY-b.top)/b.height*100;setSelected(items.reduce((best,item,i)=>Math.hypot(item.x-x,item.y-y)<Math.hypot(items[best].x-x,items[best].y-y)?i:best,0));}}>
 {items.map((item,i)=><polygon key={item.title} points={item.area} data-active={active===i} onPointerEnter={()=>setHover(i)} onPointerLeave={()=>setHover(null)}/>)}
 {selected!==null&&<path className={styles.detailLeader} d={`M ${items[selected].x} ${items[selected].y} L ${items[selected].x} 100`}/>}</svg>
 {items.map((item,i)=><button key={item.title} ref={el=>{buttons.current[i]=el;}} data-detail type="button" className={styles.detailPoint} style={{left:`${item.x}%`,top:`${item.y}%`}} aria-label={`Explore ${item.title.toLowerCase()}`} aria-expanded={selected===i} aria-controls={selected===i?`${id}-note`:undefined} onPointerEnter={()=>setHover(i)} onPointerLeave={()=>setHover(null)} onClick={()=>setSelected(i)}>{String(i+1).padStart(2,'0')}</button>)}
 {selected!==null&&(()=>{
   const item=items[selected];
   const position=item.x<40?"start":item.x>60?"end":"middle";
   const note=<aside id={`${id}-note`} className={styles.detailNote} data-anchor-side={position} aria-label={item.title}>
      <div><strong>{String(selected+1).padStart(2,"0")} / {item.title}</strong><button type="button" aria-label="Close drawing detail" onClick={close}><X size={14}/></button></div>
      <p>{item.text}</p><Link href={item.href}>{item.action}<ArrowUpRight size={14}/></Link>
   </aside>;
   const dock=dockId&&typeof document!=="undefined"?document.getElementById(dockId):null;
   return dock?createPortal(note,dock):note;
 })()}
 </div>;
}
export default function DrawingExplorer({src,kind,label,compact=false,eager=false}:{src:string;kind:DrawingKind;label:string;compact?:boolean;eager?:boolean}){
 const [zoom,setZoom]=useState(1),dockId=useId();
 return <div className={styles.explorer} data-drawing-surface data-compact={compact} role="group" aria-label={label}><div className={styles.explorerViewport}><div className={styles.explorerArt} style={{transform:`scale(${zoom})`}}><StudioImage src={src} alt={label} width="1116" height="1116" loading={eager?"eager":"lazy"} fetchPriority={eager?"high":undefined} decoding="async"/><DrawingInteraction kind={kind} label={`Explore ${label.toLowerCase()}`} compact={compact} dockId={dockId}/></div></div><div className={styles.explorerTools} role="group" aria-label="Drawing zoom"><button type="button" aria-label="Zoom out drawing" disabled={zoom<=1} onClick={()=>setZoom(z=>Math.max(1,z-.25))}><Minus size={14}/></button><button type="button" aria-label="Reset drawing zoom" onClick={()=>setZoom(1)}>{Math.round(zoom*100)}%</button><button type="button" aria-label="Zoom in drawing" disabled={zoom>=1.5} onClick={()=>setZoom(z=>Math.min(1.5,z+.25))}><Plus size={14}/></button></div><div id={dockId} className={styles.drawingDock} aria-live="polite"/></div>;
}
