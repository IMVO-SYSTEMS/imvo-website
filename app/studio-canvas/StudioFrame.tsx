"use client";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type AnchorHTMLAttributes, type Ref } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PageNavigator from "./PageNavigator";
import { ArrowUp, ArrowUpRight, Menu, Moon, Plus, Sun, X } from "lucide-react";
import type { SiteSettings } from "@/sanity/types/siteContent";
import type { StudioStatusContent } from "@/sanity/types/cmsBackend";
import { useStudioScroll } from "../components/SmoothScrollProvider";
import StudioImage from "./StudioImage";
import styles from "./StudioCanvas.module.css";
const StatusContext=createContext<StudioStatusContent>({});
export const useStudioStatus=()=>useContext(StatusContext);
const nav=[['Projects','/projects'],['Services','/services'],['About','/about'],['Contact','/contact']];
const defaultSocials=[{label:'Instagram',url:'https://www.instagram.com/imvo_group/'},{label:'LinkedIn',url:'https://www.linkedin.com/company/imvo-design-group'},{label:'X',url:'https://x.com/Imvogroupafrica'},{label:'Facebook',url:'https://www.facebook.com/people/IMVO-GROUP-Africa/100087615605183/'},{label:'YouTube',url:'https://www.youtube.com/@Imvogroupafrica'}];
const defaultStatus:StudioStatusContent={timezone:'Africa/Kigali',weeklySchedule:['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].map((day,index)=>({day,enabled:index<5,openTime:'08:00',closeTime:'18:00'}))};
export function CornerMarks(){return <span className={styles.corners} aria-hidden="true">{[0,1,2,3].map(i=><Plus key={i} strokeWidth={1}/>)}</span>;}
export function StudioJump({href,children,anchorRef,...props}:AnchorHTMLAttributes<HTMLAnchorElement>&{href:string;children:ReactNode;anchorRef?:Ref<HTMLAnchorElement>}){
 const scrollTo=useStudioScroll();
 return <a {...props} ref={anchorRef} href={href} onClick={event=>{props.onClick?.(event);if(event.defaultPrevented||!href.startsWith('#'))return;const target=document.getElementById(href.slice(1));if(!target||!scrollTo)return;event.preventDefault();scrollTo(scrollY+target.getBoundingClientRect().top);target.focus({preventScroll:true});history.replaceState(null,'',href);}}>{children}</a>;
}
export function DrawingCursor(){
 const canvas=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const media=matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'),element=canvas.current,ctx=element?.getContext('2d');if(!element||!ctx)return;
  let raf=0,lastMove=0;const points:{x:number;y:number;time:number}[]=[];let point={x:0,y:0,active:false,drawing:false,interactive:false};
  const resize=()=>{element.width=innerWidth;element.height=innerHeight;};
  const paint=(time:number)=>{raf=0;ctx.clearRect(0,0,element.width,element.height);if(!point.active||!media.matches)return;const{x,y}=point;while(points.length&&time-points[0].time>340)points.shift();ctx.strokeStyle='#fff';ctx.fillStyle='#fff';ctx.lineWidth=.7;
   for(let i=1;i<points.length;i++){ctx.globalAlpha=(i/points.length)*.35;ctx.beginPath();ctx.moveTo(points[i-1].x,points[i-1].y);ctx.lineTo(points[i].x,points[i].y);ctx.stroke();}
   ctx.globalAlpha=.9;const radius=point.interactive?7:3;ctx.strokeRect(x-radius,y-radius,radius*2,radius*2);ctx.beginPath();ctx.moveTo(x-11,y);ctx.lineTo(x-6,y);ctx.moveTo(x+6,y);ctx.lineTo(x+11,y);ctx.moveTo(x,y-11);ctx.lineTo(x,y-6);ctx.moveTo(x,y+6);ctx.lineTo(x,y+11);ctx.stroke();
   if(point.drawing){ctx.globalAlpha=.13;ctx.beginPath();ctx.moveTo(0,y+.5);ctx.lineTo(element.width,y+.5);ctx.moveTo(x+.5,0);ctx.lineTo(x+.5,element.height);ctx.stroke();ctx.globalAlpha=.75;ctx.font='10px Geistmono, monospace';ctx.fillText(`X ${Math.round(x).toString().padStart(4,'0')} / Y ${Math.round(y).toString().padStart(4,'0')}`,x>innerWidth-180?x-170:x+18,y>innerHeight-45?y-20:y+20);}
   ctx.globalAlpha=1;if(time-lastMove<360)raf=requestAnimationFrame(paint);
  };
  const move=(event:PointerEvent)=>{if(!media.matches||event.pointerType!=='mouse'){clear();return;}const target=event.target instanceof Element?event.target:null;lastMove=performance.now();point={x:event.clientX,y:event.clientY,active:true,drawing:!!target?.closest('[data-drawing-surface]'),interactive:!!target?.closest('a,button,summary,input,textarea,select')};points.push({x:point.x,y:point.y,time:lastMove});document.documentElement.dataset.draftingCursor='true';if(!raf)raf=requestAnimationFrame(paint);};
  const clear=()=>{point.active=false;points.length=0;delete document.documentElement.dataset.draftingCursor;ctx.clearRect(0,0,element.width,element.height);};
  const changed=()=>{if(!media.matches)clear();};resize();window.addEventListener('resize',resize);window.addEventListener('pointermove',move,{passive:true});window.addEventListener('blur',clear);document.addEventListener('pointerleave',clear);media.addEventListener('change',changed);
  return()=>{clear();cancelAnimationFrame(raf);window.removeEventListener('resize',resize);window.removeEventListener('pointermove',move);window.removeEventListener('blur',clear);document.removeEventListener('pointerleave',clear);media.removeEventListener('change',changed);};
 },[]);
 return <canvas ref={canvas} className={styles.cursor} aria-hidden="true"/>;
}
export default function StudioFrame({children,settings,studioStatus}:{children:ReactNode;settings?:SiteSettings|null;studioStatus?:StudioStatusContent|null}){
 const pathname=usePathname();
 const [theme,setTheme]=useState<'black'|'white'>('black');const [open,setOpen]=useState(false);
 const menu=useRef<HTMLElement>(null),trigger=useRef<HTMLButtonElement>(null),brand=useRef<HTMLDivElement>(null);
 useEffect(()=>{try{if(localStorage.getItem('imvo:studio-theme')==='white')setTheme('white');}catch{}},[]);
 useEffect(()=>{const el=brand.current;if(!el)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){el.dataset.visible='true';observer.disconnect();}},{threshold:.18});observer.observe(el);return()=>observer.disconnect();},[]);
 useEffect(()=>{if(!open)return;const element=menu.current;if(!element)return;const first=element.querySelector<HTMLElement>('button,a');first?.focus();const trap=(event:KeyboardEvent)=>{if(event.key==='Escape'){event.preventDefault();setOpen(false);trigger.current?.focus();}if(event.key==='Tab'){const nodes=Array.from(element.querySelectorAll<HTMLElement>('button,a'));const first=nodes[0],last=nodes.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}}};document.addEventListener('keydown',trap);return()=>document.removeEventListener('keydown',trap);},[open]);
 const toggle=()=>{const next=theme==='black'?'white':'black';setTheme(next);try{localStorage.setItem('imvo:studio-theme',next);}catch{}};
 const close=()=>{setOpen(false);trigger.current?.focus();};
 const socials=settings?.socialLinks?.length?settings.socialLinks:defaultSocials;
 return <StatusContext.Provider value={studioStatus||defaultStatus}><link rel="preload" href="/fonts/studio/bt-grotesk-bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/studio/bt-grotesk-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><div className={styles.frame} data-studio-frame data-theme={theme}>
  <a className={styles.skipLink} href="#main-content">Skip to main content</a>
  <header className={styles.header}>
   <Link href="/" className={styles.brand} aria-label="IMVO Studio home"><StudioImage src="/brand/imvo-main.svg" alt="IMVO" width="230" height="54"/></Link>
   <nav className={styles.divisions} aria-label="IMVO divisions"><Link href="/" aria-label="IMVO Studio" aria-current={!pathname.startsWith('/systems')&&!pathname.startsWith('/domicile')?'page':undefined}><StudioImage src="/brand/imvo-studio.svg" width="110" height="28" alt="IMVO Studio"/></Link><Link href="/systems" aria-label="IMVO Systems" aria-current={pathname.startsWith('/systems')?'page':undefined}><StudioImage src="/brand/imvo-systems.svg" width="110" height="28" alt="IMVO Systems"/></Link><Link href="/domicile" aria-label="DŌMICILE" aria-current={pathname.startsWith('/domicile')?'page':undefined}><span className={styles.domicileLogo}><StudioImage src="/domicile/domicile-white.webp" width="600" height="151" alt="DŌMICILE"/></span></Link></nav>
   <div className={styles.headerActions}><nav className={styles.nav} aria-label="Main navigation">{nav.map(([label,href])=><Link key={href} href={href} aria-label={label}><span className={styles.roll}><span>{label}</span><span aria-hidden="true">{label}</span></span><span className={styles.linkCorner} aria-hidden="true"/></Link>)}</nav>
   <button className={styles.themeButton} type="button" onClick={toggle} aria-label={`Switch to ${theme==='black'?'white':'black'} theme`} title={`${theme==='black'?'White':'Black'} theme`}>{theme==='black'?<Sun/>:<Moon/>}</button>
   <button ref={trigger} className={styles.menuButton} type="button" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="studio-mobile-menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
   </div>
  </header>
  {open&&<nav ref={menu} id="studio-mobile-menu" className={styles.mobileMenu} aria-label="Mobile navigation" data-lenis-prevent><button type="button" onClick={close} aria-label="Close navigation"><X/></button>{[...nav,['IMVO Systems','/systems'],['DŌMICILE','/domicile']].map(([label,href])=><Link key={href} href={href} onClick={close}>{label}<ArrowUpRight/></Link>)}</nav>}
  <main id="main-content" tabIndex={-1} className={styles.main} data-studio-route={pathname}>{children}</main>
  <footer className={styles.footer}>
   <div className={styles.footerFeature}>
    <div><span className={styles.eyebrow}>IMVO STUDIO / YOUR NEXT PROJECT</span><h2>ENVIRONMENTS SHAPED WITH PURPOSE.</h2></div>
    <div><p>From first site questions to drawings, coordination and execution-aware design. Tell us what you are planning in Kigali or across the region.</p><div className={styles.footerFeatureActions}><Link href="/contact#quote">Start a project <ArrowUpRight size={16}/></Link><Link href="/projects">Explore selected work <ArrowUpRight size={16}/></Link></div></div>
   </div>
   <div className={styles.footerGrid}><div><span className={styles.eyebrow}>{settings?.companyName||'IMVO Group'}</span><p className={styles.footerStatement}>{settings?.tagline||'A built-environment design and development consultancy'}</p></div><nav aria-label="Studio links"><span className={styles.eyebrow}>Explore</span>{[['Studio','/'],...nav].map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav><div><span className={styles.eyebrow}>New conversations</span><a href={`mailto:${settings?.generalEmail||'info@imvogroup.com'}`}>{settings?.generalEmail||'info@imvogroup.com'} <ArrowUpRight size={14}/></a><span className={styles.eyebrow}>{settings?.location||'Kigali, Rwanda'}</span><a href={settings?.mapUrl||'https://maps.google.com/maps?q=-1.9235606,30.0709587&z=18'} target="_blank" rel="noreferrer">Find the studio <ArrowUpRight size={14}/></a></div><nav aria-label="IMVO Group and social links"><span className={styles.eyebrow}>Connected by IMVO</span><Link href="/systems">IMVO Systems <ArrowUpRight size={14}/></Link><Link href="/domicile">DŌMICILE <ArrowUpRight size={14}/></Link>{socials.filter(s=>s.label&&s.url).map(s=><a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>)}</nav></div>
   <div ref={brand} className={styles.footerBrand} data-drawing-surface><CornerMarks/><StudioImage className={styles.brandGhost} src="/brand/imvo-main.svg" width="1400" height="300" alt=""/><StudioImage className={styles.brandInk} src="/brand/imvo-main.svg" width="1400" height="300" alt=""/><span>Intellectu / Mens / Visio / Origo</span><StudioJump href="#main-content" aria-label="Return to the top"><ArrowUp/></StudioJump></div>
   <div className={styles.footerBottom}><span>{settings?.copyright||`© ${new Date().getFullYear()} IMVO Group. All rights reserved.`}</span><nav aria-label="Legal links"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link></nav><p>{settings?.legalNotice||'Regulated professional services and statutory sign-off are undertaken only by appropriately registered practitioners.'}</p></div>
  </footer><PageNavigator/><DrawingCursor/>
 </div></StatusContext.Provider>;
}
