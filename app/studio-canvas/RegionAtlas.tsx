"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, LocateFixed } from "lucide-react";
import { regionOutlinesA } from "./regionGeometryA";
import { regionOutlinesB } from "./regionGeometryB";
import styles from "./StudioCanvas.module.css";

type CountryInfo={iso:string; name:string; center:[number,number]; capital:string; pin:[number,number]; zoom:number};
const countries:CountryInfo[]=[
 {iso:"RWA",name:"Rwanda",center:[30.0619,-1.9441],capital:"Kigali",pin:[30.0619,-1.9441],zoom:2.15},
 {iso:"UGA",name:"Uganda",center:[32.45,1.0],capital:"Kampala",pin:[32.5825,.3476],zoom:1.8},
 {iso:"KEN",name:"Kenya",center:[37.85,.28],capital:"Nairobi",pin:[36.8219,-1.2921],zoom:1.55},
 {iso:"TZA",name:"Tanzania",center:[35.5,-6.2],capital:"Dodoma",pin:[35.75,-6.172],zoom:1.32},
 {iso:"BDI",name:"Burundi",center:[29.925,-3.426],capital:"Gitega",pin:[29.925,-3.426],zoom:2.05},
 {iso:"COD",name:"DRC",center:[23.7,-3.1],capital:"Kinshasa",pin:[15.266,-4.4419],zoom:1.12},
 {iso:"ZMB",name:"Zambia",center:[27.9,-13.5],capital:"Lusaka",pin:[28.28,-15.416],zoom:1.38},
 {iso:"AGO",name:"Angola",center:[17.8,-11.5],capital:"Luanda",pin:[13.2344,-8.8383],zoom:1.13},
 {iso:"MOZ",name:"Mozambique",center:[35.1,-17.3],capital:"Maputo",pin:[32.5732,-25.9692],zoom:1.22}
];
const index=new Map(countries.map(c=>[c.name,c]));
const outlines=[...regionOutlinesA,...regionOutlinesB];
function point(lon:number,lat:number){return {x:30+(lon-7)/48*900,y:28+(23-lat)/63*690};}
const kigali=point(30.0619,-1.9441);

export const regionCountryNames=countries.map(c=>c.name);
export default function RegionAtlas({country,onCountryChange}:{country:string;onCountryChange:(name:string)=>void}){
 const selected=index.get(country)||countries[0];
 const [camera,setCamera]=useState(()=>({center:country,zoom:selected.zoom}));
 const previous=useRef(country);
 useEffect(()=>{
  if(previous.current===country)return;
  previous.current=country;
  // Overview first, then approach the newly chosen country. Reset stays instant when reduced motion is requested.
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){setCamera({center:country,zoom:selected.zoom});return;}
  setCamera(current=>({center:current.center,zoom:1}));
  const t=window.setTimeout(()=>setCamera({center:country,zoom:selected.zoom}),360);
  return ()=>window.clearTimeout(t);
 },[country,selected.zoom]);
 const focused=index.get(camera.center)||countries[0];
 const c=point(...focused.center);
 const scale=camera.zoom;
 const transform=`translate(${+(480-c.x*scale).toFixed(2)}px, ${+(365-c.y*scale).toFixed(2)}px) scale(${scale})`;
 const home=country==="Rwanda";
 return <div className={styles.regionAtlas} data-drawing-surface role="group" aria-label="Interactive geographical map of IMVO's regional focus" data-country={country}>
  <header className={styles.atlasHeader}><span>REGIONAL ATLAS / 001</span><button onClick={()=>onCountryChange("Rwanda")} type="button"><LocateFixed size={13}/> KIGALI / BASE</button></header>
  <div className={styles.atlasViewport}>
   <svg viewBox="0 0 960 760" preserveAspectRatio="xMidYMid meet" role="img" aria-label={`Real geographic boundaries of East and Central African countries, currently focused on ${country}`}>
    <g className={styles.atlasGrid} aria-hidden="true">{Array.from({length:24},(_,i)=><path key={i} d={`M ${i*48} 0 V760`}/>)}{Array.from({length:19},(_,i)=><path key={i} d={`M 0 ${i*44} H960`}/>)}</g>
    <g className={styles.atlasGeography} style={{transform} as CSSProperties}>
     {outlines.map(outline=>{
      const c=countries.find(x=>x.iso===outline.iso);
      const selectable=!!c;
      return <path key={outline.iso} d={outline.path} className={selectable?styles.atlasSelectable:styles.atlasBorder} data-active={c?.name===country?"true":undefined} onClick={c?()=>onCountryChange(c.name):undefined} role={selectable?"button":undefined} tabIndex={selectable?0:undefined} aria-label={c?`Zoom to ${c.name}`:undefined} onKeyDown={c?e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onCountryChange(c.name);}}:undefined}/>;
     })}
     <g className={styles.atlasKigali} transform={`translate(${kigali.x},${kigali.y})`}>
       <circle r="16"/><circle r="5"/><path d="M-24 0H24 M0 -24V24"/><text x="22" y="-11">KIGALI / IMVO BASE</text>
     </g>
     {!home&&<g className={styles.atlasSelectedPin} transform={`translate(${point(...selected.pin).x},${point(...selected.pin).y})`}>
      <circle r="6"/><path d="M-18 0H18 M0 -18V18"/>
     </g>}
    </g>
   </svg>
   <div className={styles.atlasCoordinates} aria-hidden="true"><span>WGS84 / {selected.pin[1].toFixed(4)}°, {selected.pin[0].toFixed(4)}°</span><span>{home?"01 / BASE":"02 / REGIONAL VIEW"}</span></div>
  </div>
  <div className={styles.atlasReadout} aria-live="polite">
   <div><span className={styles.eyebrow}>SELECTED TERRITORY / {selected.iso}</span><strong>{home?"KIGALI, RWANDA":selected.name.toUpperCase()}</strong><p>{home?"IMVO Studio headquarters · Kigali, Rwanda":`${selected.capital} shown as geographic reference · regional design interests, not a claim of a local office.`}</p></div>
   <a href={home?"/contact#quote":"/about"}>{home?"Start a project":"Explore regional reach"} <ArrowUpRight size={16}/></a>
  </div>
 </div>;
}
