"use client";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import StudioImage from "./StudioImage";
import { DrawingCursor } from "./StudioFrame";
import styles from "./StudioCanvas.module.css";
/** Marketing-only visual shell; native division navigation and integrations remain mounted. */
export default function DivisionFrame({children}:{children:ReactNode}){
 const pathname=usePathname(),[theme,setTheme]=useState<'black'|'white'>('black');
 useEffect(()=>{try{if(localStorage.getItem('imvo:studio-theme')==='white')setTheme('white');}catch{}},[]);
 const toggle=()=>{const next=theme==='black'?'white':'black';setTheme(next);try{localStorage.setItem('imvo:studio-theme',next);}catch{}};
 return <div className={`${styles.frame} ${styles.divisionFrame}`} data-studio-frame data-theme={theme} data-division={pathname.startsWith('/systems')?'systems':'domicile'}><div className={styles.divisionHeader}><nav className={styles.divisions} aria-label="IMVO divisions"><Link href="/" aria-label="IMVO Studio"><StudioImage src="/brand/imvo-studio.svg" width="110" height="28" alt="IMVO Studio"/></Link><Link href="/systems" aria-label="IMVO Systems" aria-current={pathname.startsWith('/systems')?'page':undefined}><StudioImage src="/brand/imvo-systems.svg" width="110" height="28" alt="IMVO Systems"/></Link><Link href="/domicile" aria-label="DŌMICILE" aria-current={pathname.startsWith('/domicile')?'page':undefined}><span className={styles.domicileLogo}><StudioImage src="/domicile/domicile-white.webp" width="600" height="151" alt="DŌMICILE"/></span></Link></nav><button className={styles.themeButton} type="button" aria-label={`Switch to ${theme==='black'?'white':'black'} theme`} onClick={toggle}>{theme==='black'?<Sun/>:<Moon/>}</button></div>{children}<DrawingCursor/></div>;
}
