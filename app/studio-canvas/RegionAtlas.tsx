"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, LocateFixed, Minus, Plus } from "lucide-react";
import { africaCountryOutlines } from "./africaCountryOutlines";
import { additionalAfricaCities } from "./africaCityPoints";
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
type City={name:string;iso:string;lon:number;lat:number;capital?:boolean};
const curatedCities:City[]=[
 ["RWA","Kigali",30.0619,-1.9441,1],["RWA","Musanze",29.634,-1.499,0],["RWA","Rubavu",29.26,-1.679,0],["RWA","Huye",29.74,-2.596,0],["RWA","Rusizi",28.908,-2.484,0],["RWA","Rwamagana",30.434,-1.948,0],
 ["UGA","Kampala",32.5825,.3476,1],["UGA","Entebbe",32.44,.06,0],["UGA","Jinja",33.203,.424,0],["UGA","Gulu",32.299,2.779,0],
 ["KEN","Nairobi",36.8219,-1.2921,1],["KEN","Mombasa",39.668,-4.043,0],["KEN","Kisumu",34.761,-.092,0],["KEN","Nakuru",36.066,-.303,0],
 ["TZA","Dodoma",35.75,-6.172,1],["TZA","Dar es Salaam",39.283,-6.793,0],["TZA","Arusha",36.684,-3.386,0],["TZA","Mwanza",32.9,-2.516,0],
 ["BDI","Gitega",29.925,-3.426,1],["BDI","Bujumbura",29.367,-3.361,0],
 ["COD","Kinshasa",15.266,-4.442,1],["COD","Goma",29.22,-1.679,0],["COD","Bukavu",28.857,-2.49,0],["COD","Lubumbashi",27.48,-11.665,0],["COD","Kisangani",25.196,.516,0],
 ["ZMB","Lusaka",28.28,-15.416,1],["ZMB","Ndola",28.633,-12.966,0],["AGO","Luanda",13.234,-8.838,1],["AGO","Benguela",13.405,-12.576,0],
 ["MOZ","Maputo",32.573,-25.969,1],["MOZ","Beira",34.838,-19.843,0],["MWI","Lilongwe",33.774,-13.963,1],["ZWE","Harare",31.054,-17.829,1],
 ["ZAF","Pretoria",28.188,-25.747,1],["ZAF","Johannesburg",28.048,-26.204,0],["ZAF","Cape Town",18.424,-33.925,0],
 ["ETH","Addis Ababa",38.757,8.98,1],["SDS","Juba",31.582,4.859,1],["SDN","Khartoum",32.56,15.5,1],
 ["SOM","Mogadishu",45.319,2.046,1],["DJI","Djibouti",43.145,11.588,1],["EGY","Cairo",31.235,30.044,1],
 ["MAR","Rabat",-6.836,34.021,1],["DZA","Algiers",3.058,36.753,1],["TUN","Tunis",10.181,36.807,1],
 ["NGA","Abuja",7.398,9.076,1],["NGA","Lagos",3.379,6.524,0],["GHA","Accra",-.188,5.603,1],
 ["SEN","Dakar",-17.467,14.717,1],["CMR","Yaoundé",11.502,3.848,1],["MDG","Antananarivo",47.507,-18.879,1],
 ["CAF","Bangui",18.562,4.394,1],["COG","Brazzaville",15.283,-4.263,1],["ERI","Asmara",38.931,15.322,1],
 ["CPV","Praia",-23.512,14.921,1],["STP","São Tomé",6.727,.336,1],["COM","Moroni",43.255,-11.704,1],["MUS","Port Louis",57.499,-20.161,1],["SYC","Victoria",55.45,-4.62,1]
].map(([iso,name,lon,lat,capital])=>({iso:String(iso),name:String(name),lon:Number(lon),lat:Number(lat),capital:!!capital}));
const cities:City[]=[...curatedCities,...additionalAfricaCities.filter(city=>!curatedCities.some(c=>c.iso===city.iso&&c.name.toLowerCase()===city.name.toLowerCase()))];
const index=new Map(countries.map(c=>[c.name,c]));
const outlines=africaCountryOutlines;
// Fit the *entire selected country's outline* within the map, without
// clipping its southern/northern edges. Coordinates are projected SVG pixels.
const bounds=new Map<string,{x0:number;x1:number;y0:number;y1:number}>(outlines.map(country=>{
 const nums=(country.path.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number);
 const xx:number[]=[],yy:number[]=[];for(let i=0;i+1<nums.length;i+=2){xx.push(nums[i]);yy.push(nums[i+1]);}
 return [country.iso,{x0:Math.min(...xx),x1:Math.max(...xx),y0:Math.min(...yy),y1:Math.max(...yy)}] as const;
}));
function cameraFor(iso:string){
 const b=bounds.get(iso);if(!b)return {center:[30.0619,-1.9441] as [number,number],zoom:2.15};
 const x=(b.x0+b.x1)/2,y=(b.y0+b.y1)/2;
 return {center:[(x-20)/920*72-18,38-(y-20)/710*74] as [number,number],
 zoom:Math.max(1.1,Math.min(32,700/Math.max(12,b.x1-b.x0),525/Math.max(12,b.y1-b.y0)))};
}
function point(lon:number,lat:number){return {x:20+(lon+18)/72*920,y:20+(38-lat)/74*710};}
const kigali=point(30.0619,-1.9441);

export const regionCountryNames=regionalCountries.map(c=>c.name);
export default function RegionAtlas({country,onCountryChange}:{country:string;onCountryChange:(name:string)=>void}){
 const selected=index.get(country)||countries[0];
 const [camera,setCamera]=useState(()=>({center:country,zoom:cameraFor(selected.iso).zoom}));
 const [selectedCity,setSelectedCity]=useState<string|null>(null);
 const [showCities,setShowCities]=useState(true);
 const cityList=cities.filter(c=>c.iso===selected.iso).slice(0,12);
 const activeCity=cityList.find(c=>c.name===selectedCity)||cityList.find(c=>c.capital)||cityList[0];
 const focusCountry=(name:string)=>{setSelectedCity(null);onCountryChange(name);};
 const focusCity=(name:string)=>{setSelectedCity(name);setCamera(current=>({center:country,zoom:Math.min(5,Math.max(current.zoom,cameraFor(selected.iso).zoom+1))}));};
 const homeReset=()=>{setSelectedCity("Kigali");setCamera({center:"Rwanda",zoom:cameraFor("RWA").zoom});onCountryChange("Rwanda");};
 const zoomBy=(value:number)=>setCamera(c=>({...c,zoom:Math.max(.9,Math.min(36,Math.round((c.zoom+value*Math.max(1,c.zoom*.13))*100)/100))}));
 const previous=useRef(country);
 useEffect(()=>{
  if(previous.current===country)return;
  previous.current=country;
  // Overview first, then approach the newly chosen country. Reset stays instant when reduced motion is requested.
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){setCamera({center:country,zoom:cameraFor(selected.iso).zoom});return;}
  setCamera(current=>({center:current.center,zoom:1}));
  const t=window.setTimeout(()=>setCamera({center:country,zoom:cameraFor(selected.iso).zoom}),360);
  return ()=>window.clearTimeout(t);
 },[country,selected.zoom]);
 const focused=index.get(camera.center)||countries[0];
 const cityTarget=selectedCity&&activeCity?activeCity:null;
 const c=cityTarget?point(cityTarget.lon,cityTarget.lat):point(...cameraFor(focused.iso).center);
 const scale=camera.zoom;
 const transform=`translate(${+(480-c.x*scale).toFixed(2)}px, ${+(365-c.y*scale).toFixed(2)}px) scale(${scale})`;
 const home=country==="Rwanda";
 return <div className={styles.regionAtlas} data-drawing-surface role="group" aria-label="Interactive geographical map of IMVO's regional focus" data-country={country}>
  <header className={styles.atlasHeader}><span>AFRICA / INTERACTIVE ATLAS</span><div className={styles.atlasHeaderControls}>
 <button onClick={homeReset} type="button"><LocateFixed size={13}/> KIGALI / BASE</button>
 <button type="button" aria-label="Zoom out map" onClick={()=>zoomBy(-.4)}><Minus size={13}/></button>
 <button type="button" aria-label="Zoom in map" onClick={()=>zoomBy(.4)}><Plus size={13}/></button>
 </div></header>
 <div className={styles.atlasOptions}><label htmlFor="imvo-africa-country">COUNTRY</label><select id="imvo-africa-country" value={selected.name} onChange={e=>focusCountry(e.target.value)}>{countries.slice().sort((a,b)=>a.name.localeCompare(b.name)).map(c=><option key={c.iso} value={c.name}>{c.name}</option>)}</select>
 <label className={styles.atlasShowCities}><input type="checkbox" checked={showCities} onChange={e=>setShowCities(e.target.checked)}/> CITY LABELS</label></div>
  <div className={styles.atlasViewport}>
   <svg viewBox="0 0 960 760" preserveAspectRatio="xMidYMid meet" role="img" aria-label={`Africa map of national borders and cities, currently focused on ${country}`}>
    <g className={styles.atlasGrid} aria-hidden="true">{Array.from({length:24},(_,i)=><path key={i} d={`M ${i*48} 0 V760`}/>)}{Array.from({length:19},(_,i)=><path key={i} d={`M 0 ${i*44} H960`}/>)}</g>
    <g className={styles.atlasGeography} style={{transform} as CSSProperties}>
     {outlines.map(outline=>{
      const c=countries.find(x=>x.iso===outline.iso);
      const selectable=!!c;
      return <path key={outline.iso} d={outline.path} className={selectable?styles.atlasSelectable:styles.atlasBorder} data-active={c?.name===country?"true":undefined} data-regional-focus={c&&regionalCountries.some(x=>x.iso===c.iso)?"true":undefined} onClick={c?()=>focusCountry(c.name):undefined} role={selectable?"button":undefined} tabIndex={selectable?0:undefined} aria-label={c?`Zoom to ${c.name}`:undefined} onKeyDown={c?e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();focusCountry(c.name);}}:undefined}/>;
     })}
     {outlines.map(outline=>{const p=point(outline.lon,outline.lat),inv=1/Math.max(1,camera.zoom);return <g key={"label-"+outline.iso}
       className={styles.atlasCountryLabel} data-active={outline.iso===selected.iso?"true":undefined}
       transform={"translate("+p.x+","+p.y+") scale("+inv+")"} aria-hidden="true">
       <text textAnchor="middle">{outline.name.toUpperCase()}</text></g>})}
     <g className={styles.atlasKigali} transform={`translate(${kigali.x},${kigali.y})`}>
       <circle r="16"/><circle r="5"/><path d="M-24 0H24 M0 -24V24"/><text x="22" y="-11">KIGALI / IMVO BASE</text>
     </g>
     {!home&&<g className={styles.atlasSelectedPin} transform={`translate(${point(...selected.pin).x},${point(...selected.pin).y})`}>
      <circle r="6"/><path d="M-18 0H18 M0 -18V18"/>
     </g>}
     {showCities&&cityList.map(city=>{const p=point(city.lon,city.lat),inverse=1/Math.max(1,camera.zoom);return <g key={city.name} className={styles.atlasCity} data-active={city.name===activeCity?.name?"true":undefined}
      transform={"translate("+p.x+","+p.y+") scale("+inverse+")"} role="button" tabIndex={0} aria-label={"Show "+city.name+", "+selected.name}
      onClick={()=>focusCity(city.name)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();focusCity(city.name);}}}>
      <circle r={city.capital?5:3.5}/><circle r={city.capital?11:8} className={styles.atlasCityHalo}/>
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
