"use client";
import { useEffect, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import BackToTop from "./BackToTop";
import DomicileWidget from "./DomicileWidget";
import SmoothScrollProvider from "./SmoothScrollProvider";
import StudioFrame from "../studio-canvas/StudioFrame";
import type { SiteSettings } from "@/sanity/types/siteContent";
import type { StudioStatusContent } from "@/sanity/types/cmsBackend";
const ContactEnhancements = dynamic(() => import("./ContactEnhancements"), { ssr: false });
const IMVOPreviewExperience = dynamic(() => import("./IMVOPreviewExperience"), { ssr: false });
const IMVOPreviewCorrections = dynamic(() => import("./IMVOPreviewCorrections"), { ssr: false });
const IMVOStudioPhotography = dynamic(() => import("./IMVOStudioPhotography"), { ssr: false });
const IMVOFinalRefinements = dynamic(() => import("./IMVOFinalRefinements"), { ssr: false });
export default function SiteShell({ children, settings, studioStatus }: { children: ReactNode; settings?: SiteSettings | null; studioStatus?: StudioStatusContent | null }) {
 const pathname = usePathname();
 const independent = pathname.startsWith("/studio") || pathname.startsWith("/systems") || pathname.startsWith("/domicile");
 const innerStudioPage = pathname !== "/" && !independent;
 useEffect(() => { if(independent)return;document.documentElement.dataset.imvoIntroComplete="true";try{sessionStorage.setItem("imvo:intro-seen","1");}catch{} },[independent]);
 if(independent)return children;
 return <MotionConfig reducedMotion="user"><SmoothScrollProvider><StudioFrame settings={settings} studioStatus={studioStatus}>
  {innerStudioPage && <DomicileWidget />}
  {pathname === "/contact" && <ContactEnhancements />}
  {innerStudioPage && (["/about","/services"].includes(pathname)||pathname.startsWith("/projects")) && <IMVOPreviewExperience />}
  {innerStudioPage && ["/about","/services"].includes(pathname) && <IMVOPreviewCorrections />}
  {children}
  {innerStudioPage && ["/about","/services"].includes(pathname) && <IMVOStudioPhotography />}
  {pathname === "/services" && <IMVOFinalRefinements />}
  <BackToTop />
 </StudioFrame></SmoothScrollProvider></MotionConfig>;
}
