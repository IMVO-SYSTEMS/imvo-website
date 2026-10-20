"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, LocateFixed, Minus, Plus } from "lucide-react";
import { africaCountryOutlines } from "./africaCountryOutlines";
import { atlasCityPairs } from "./africaCityPairs";
import styles from "./StudioCanvas.module.css";

type CountryInfo={iso:string; name:string; center:[number,number]; capital:string; pin:[number,number]; zoom:number};
const regionalCountries:CountryInfo[]=[
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
const countries:CountryInfo[]=[...regionalCountries,...africaCountryOutlines
 .filter(c=>!regionalCountries.some(a=>a.iso===c.iso))
 .map(c=>({iso:c.iso,name:c.name,center:[c.lon,c.lat] as [number,number],
 capital:c.name,pin:[c.lon,c.lat] as [number,number],zoom:1.7}))];
const index=new Map(countries.map(c=>[c.name,c]));
const outlines=africaCountryOutlines;
const countryBounds:Map<string,{cx:number;cy:number;width:number;height:number}>=new Map(outlines.map(outline=>{
 const pairs=Array.from(outline.path.matchAll(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g),m=>[Number(m[1]),Number(m[2])]);
 const xs=pairs.map(p=>p[0]),ys=pairs.map(p=>p[1]);
 const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
 const width=Math.max(5,maxX-minX),height=Math.max(5,maxY-minY);
 return [outline.iso,{cx:(minX+maxX)/2,cy:(minY+maxY)/2,width,height}] as const;
}));
function countryFit(iso:string){
 const b=countryBounds.get(iso);
 return b?Math.min(22,Math.max(1,Math.min(790/b.width,575/b.height))):1.5;
}
function point(lon:number,lat:number){return {x:20+(lon+18)/72*920,y:20+(38-lat)/74*710};}
const kigali=point(30.0619,-1.9441);
const REGIONAL_CAMERA={center:"__REGION__",zoom:2.45};

export const regionCountryNames=regionalCountries.map(c=>c.name);
export default function RegionAtlas({country,onCountryChange}:{country:string;onCountryChange:(name:string)=>void}){
 const selected=index.get(country)||countries[0];
 const [camera,setCamera]=useState(()=>REGIONAL_CAMERA);
 const [selectedCity,setSelectedCity]=useState<string|null>(null);
 const [showCities,setShowCities]=useState(true);
 const cityList=atlasCityPairs[selected.iso]||[];
 const activeCity=cityList.find(c=>c.name===selectedCity)||cityList.find(c=>c.primary)||cityList[0];
 const idleTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const previous=useRef(country);
 const returnToRegion=()=>{
  previous.current="Rwanda";
  setSelectedCity(null);
  onCountryChange("Rwanda");
  setCamera(REGIONAL_CAMERA);
 };
 const armReturn=()=>{
  if(idleTimer.current)clearTimeout(idleTimer.current);
  idleTimer.current=setTimeout(returnToRegion,8000);
 };
 useEffect(()=>()=>{if(idleTimer.current)clearTimeout(idleTimer.current);},[]);
 const focusCountry=(name:string)=>{
  setSelectedCity(null);
  if(name===country)setCamera({center:name,zoom:countryFit(index.get(name)?.iso||"RWA")});
  onCountryChange(name);
  armReturn();
 };
 const focusCity=(name:string)=>{setSelectedCity(name);setCamera({center:country,zoom:Math.min(23,countryFit(selected.iso)*1.45)});armReturn();};
 const homeReset=()=>{setSelectedCity(null);previous.current="Rwanda";onCountryChange("Rwanda");setCamera({center:"Rwanda",zoom:countryFit("RWA")});armReturn();};
 const africaOverview=()=>{setSelectedCity(null);setCamera({center:"__AFRICA__",zoom:.72});armReturn();};
 const zoomBy=(value:number)=>{setCamera(c=>({...c,zoom:Math.max(.65,Math.min(24,Math.round((c.zoom+value)*100)/100))}));armReturn();};
 useEffect(()=>{
  if(previous.current===country)return;
  previous.current=country;
  // Overview first, then approach the newly chosen country. Reset stays instant when reduced motion is requested.
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){setCamera({center:country,zoom:countryFit(selected.iso)});return;}
  setCamera(current=>({center:current.center,zoom:1}));
  const t=window.setTimeout(()=>setCamera({center:country,zoom:countryFit(selected.iso)}),360);
  return ()=>window.clearTimeout(t);
 },[country,selected.iso]);
 const focused=index.get(camera.center)||countries[0];
 const cityTarget=selectedCity&&activeCity?activeCity:null;
 const countryBox=countryBounds.get(focused.iso);
 const c=camera.center==="__AFRICA__"?point(17,0):camera.center==="__REGION__"?point(29,-3.8):cityTarget?point(cityTarget.lon,cityTarget.lat):countryBox?{x:countryBox.cx,y:countryBox.cy}:point(...focused.center);
 const scale=camera.zoom;
 const transform=`translate(${+(480-c.x*scale).toFixed(2)}px, ${+(365-c.y*scale).toFixed(2)}px) scale(${scale})`;
 const home=country==="Rwanda";
 return <div className={styles.regionAtlas} data-drawing-surface role="group" aria-label="Interactive geographical map of IMVO's regional focus" data-country={country}>
  <header className={styles.atlasHeader}><span>AFRICA / INTERACTIVE ATLAS</span><div className={styles.atlasHeaderControls}>
 <button onClick={homeReset} type="button"><LocateFixed size={13}/> KIGALI / BASE</button>
 <button onClick={africaOverview} type="button" aria-label="Show entire African continent">AFRICA VIEW</button>
 <button type="button" aria-label="Zoom out map" onClick={()=>zoomBy(-.4)}><Minus size={13}/></button>
 <button type="button" aria-label="Zoom in map" onClick={()=>zoomBy(.4)}><Plus size={13}/></button>
 </div></header>
 <div className={styles.atlasOptions}><label htmlFor="imvo-africa-country">COUNTRY</label><select id="imvo-africa-country" value={selected.name} onChange={e=>focusCountry(e.target.value)}>{countries.slice().sort((a,b)=>a.name.localeCompare(b.name)).map(c=><option key={c.iso} value={c.name}>{c.name}</option>)}</select>
 <label className={styles.atlasShowCities}><input type="checkbox" checked={showCities} onChange={e=>setShowCities(e.target.checked)}/> 2 CITIES</label></div>
  <div className={styles.atlasViewport}>
   <svg viewBox="0 0 960 760" preserveAspectRatio="xMidYMid meet" role="img" aria-label={`Africa map of named countries and two cities per country, currently focused on ${country}`}>
    <g className={styles.atlasGrid} aria-hidden="true">{Array.from({length:24},(_,i)=><path key={i} d={`M ${i*48} 0 V760`}/>)}{Array.from({length:19},(_,i)=><path key={i} d={`M 0 ${i*44} H960`}/>)}</g>
    <g className={styles.atlasGeography} style={{transform} as CSSProperties}>
     {outlines.map(outline=>{
      const c=countries.find(x=>x.iso===outline.iso);
      const selectable=!!c;
      return <path key={outline.iso} d={outline.path} className={selectable?styles.atlasSelectable:styles.atlasBorder} data-active={c?.name===country?"true":undefined} data-regional-focus={c&&regionalCountries.some(x=>x.iso===c.iso)?"true":undefined} onClick={c?()=>focusCountry(c.name):undefined} role={selectable?"button":undefined} tabIndex={selectable?0:undefined} aria-label={c?`Zoom to ${c.name}`:undefined} onKeyDown={c?e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();focusCountry(c.name);}}:undefined}/>;
     })}
     {outlines.map(outline=>{
       const b=countryBounds.get(outline.iso);if(!b)return null;
       const visible=camera.zoom<1.65||outline.iso===selected.iso;
       if(!visible)return null;
       const unit=1/Math.max(1,camera.zoom);
       return <g key={"name-"+outline.iso} className={styles.atlasCountryLabel}
        data-selected={outline.iso===selected.iso?"true":undefined}
        transform={"translate("+b.cx+","+b.cy+") scale("+unit+")"}>
        <text textAnchor="middle">{outline.name.toUpperCase()}</text>
       </g>;
      })}
      <g className={styles.atlasKigali} transform={`translate(${kigali.x},${kigali.y}) scale(${1/Math.max(1,camera.zoom)})`}>
       <circle r="16"/><circle r="5"/><path d="M-24 0H24 M0 -24V24"/><text x="22" y="-11">KIGALI / IMVO BASE</text>
     </g>
     {!home&&<g className={styles.atlasSelectedPin} transform={`translate(${point(...selected.pin).x},${point(...selected.pin).y})`}>
      <circle r="6"/><path d="M-18 0H18 M0 -18V18"/>
     </g>}
     {showCities&&cityList.map(city=>{const p=point(city.lon,city.lat),inverse=1/Math.max(1,camera.zoom);return <g key={city.name} className={styles.atlasCity} data-active={city.name===activeCity?.name?"true":undefined}
      transform={"translate("+p.x+","+p.y+") scale("+inverse+")"} role="button" tabIndex={0} aria-label={"Show "+city.name+", "+selected.name}
      onClick={()=>focusCity(city.name)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();focusCity(city.name);}}}>
      <circle r={city.primary?5:3.5}/><circle r={city.primary?11:8} className={styles.atlasCityHalo}/>
      <text x="12" y="-8">{city.name.toUpperCase()}</text></g>})}
    </g>
   </svg>
   <div className={styles.atlasCoordinates} aria-hidden="true"><span>WGS84 / {(activeCity?.lat??selected.pin[1]).toFixed(4)}°, {(activeCity?.lon??selected.pin[0]).toFixed(4)}°</span><span>{home?"01 / BASE":"02 / REGIONAL VIEW"}</span></div>
  </div>
  <div className={styles.atlasLegend}><span><i className={styles.atlasLegendBase}/> IMVO BASE</span><span><i className={styles.atlasLegendFocus}/> REGIONAL FOCUS</span><span><i className={styles.atlasLegendBorder}/> COUNTRY OUTLINES</span></div>
  <div className={styles.atlasReadout} aria-live="polite">
   <div><span className={styles.eyebrow}>SELECTED TERRITORY / {selected.iso}</span><strong>{home?"KIGALI, RWANDA":selected.name.toUpperCase()}</strong><p>{home?"IMVO Studio is based in Kigali, Rwanda. Select a city or travel to another country."
 :regionalCountries.some(c=>c.iso===selected.iso)?"Regional design interests. Cities are geographic references, not IMVO offices."
 :"Explore African geography. No IMVO office or project presence is implied."}</p>
 {cityList.length>0&&<div className={styles.atlasCityList} aria-label={"Cities in "+selected.name}>{cityList.map(city=><button type="button" key={city.name} aria-pressed={city.name===activeCity?.name} onClick={()=>focusCity(city.name)}>{city.name}</button>)}</div>}</div>
   <a href={home?"/contact#quote":"/about"}>{home?"Start a project":"Explore regional reach"} <ArrowUpRight size={16}/></a>
  </div>
  <div className={styles.atlasAttribution}>COUNTRY BOUNDARIES: <a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer">NATURAL EARTH</a> · PUBLIC DOMAIN · IMVO ORIGINAL MAP INTERACTIONS</div>
 </div>;
}
