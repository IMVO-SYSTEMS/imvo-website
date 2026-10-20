"use client";
import { useEffect, type ReactNode } from "react";
import styles from "../studio-canvas/StudioCanvas.module.css";
import DivisionFrame from "../studio-canvas/DivisionFrame";
import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import BackToTop from "./BackToTop";
import SmoothScrollProvider from "./SmoothScrollProvider";
import StudioFrame from "../studio-canvas/StudioFrame";
import type { SiteSettings } from "@/sanity/types/siteContent";
import type { StudioStatusContent } from "@/sanity/types/cmsBackend";
export default function SiteShell({ children, settings, studioStatus }: { children: ReactNode; settings?: SiteSettings | null; studioStatus?: StudioStatusContent | null }) {
 const pathname = usePathname();
 const independent = pathname.startsWith("/studio") || pathname.startsWith("/systems") || pathname.startsWith("/domicile");
 const innerStudioPage = pathname !== "/" && !independent;
 useEffect(() => { if(independent)return;document.documentElement.dataset.imvoIntroComplete="true";try{sessionStorage.setItem("imvo:intro-seen","1");}catch{} },[independent]);
 if(pathname.startsWith("/studio"))return children;
 if(independent)return <DivisionFrame>{children}</DivisionFrame>;
 return <MotionConfig reducedMotion="user"><SmoothScrollProvider><StudioFrame settings={settings} studioStatus={studioStatus}>
  {innerStudioPage?<div className={styles.innerPage} data-inner-page>{children}</div>:children}
  <BackToTop />
 </StudioFrame></SmoothScrollProvider></MotionConfig>;
}
