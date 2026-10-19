"use client";
import { useEffect, useRef, type RefObject } from "react";
export const range = (n:number, start:number, end:number) => Math.max(0, Math.min(1,(n-start)/(end-start)));

export function useScrollScene<T extends HTMLElement>(ref: RefObject<T|null>, callback:(progress:number,reduced:boolean,mobile:boolean)=>void) {
  const paint = useRef(callback);
  useEffect(()=>{paint.current=callback;},[callback]);
  useEffect(()=>{
    const element=ref.current;
    if(!element)return;
    const motion=matchMedia("(prefers-reduced-motion: reduce)");
    let frame=0, nearby=false;
    const update=()=>{
      frame=0;
      if(!nearby)return;
      const rect=element.getBoundingClientRect();
      const progress=motion.matches ? 1 : Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height-innerHeight)));
      paint.current(progress,motion.matches,innerWidth<=760);
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    const observer=new IntersectionObserver(([entry])=>{nearby=entry.isIntersecting;if(nearby)schedule();},{rootMargin:"100% 0px"});
    observer.observe(element);
    const resize=new ResizeObserver(schedule);resize.observe(element);
    window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);motion.addEventListener("change",schedule);
    return ()=>{cancelAnimationFrame(frame);observer.disconnect();resize.disconnect();window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);motion.removeEventListener("change",schedule);};
  },[ref]);
}
