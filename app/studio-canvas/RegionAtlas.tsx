"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, LocateFixed, Minus, Plus } from "lucide-react";
import { africaCountryOutlines } from "./africaCountryOutlines";
import styles from "./StudioCanvas.module.css";

type CountryInfo={iso:string; name:string; center:[number,number]; capital:string; pin:[number,number]; zoom:number};
const regionalCountries:CountryInfo[]=[
 {iso:"RWA",name:"Rwanda",center:[30.0619,-1.9441],capital:"Kigali",pin:[30.0619,-1.9441],zoom:2.9},
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
const cities:City[]=[
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
const extraCities:City[]=[
 ["RWA","Nyagatare",30.326,-1.292],["RWA","Muhanga",29.756,-2.085],["RWA","Kayonza",30.622,-1.936],
 ["UGA","Mbarara",30.65,-.608],["UGA","Mbale",34.175,1.077],["UGA","Masaka",31.736,-.333],["UGA","Fort Portal",30.275,.672],["UGA","Lira",32.896,2.249],
 ["KEN","Eldoret",35.272,.514],["KEN","Thika",37.069,-1.033],["KEN","Malindi",40.116,-3.218],["KEN","Garissa",39.646,-.453],["KEN","Nyeri",36.951,-.416],
 ["TZA","Mbeya",33.463,-8.9],["TZA","Morogoro",37.663,-6.827],["TZA","Tanga",39.099,-5.069],["TZA","Zanzibar City",39.193,-6.162],["TZA","Iringa",35.751,-7.77],
 ["BDI","Ngozi",29.833,-2.907],["BDI","Rumonge",29.44,-3.974],["BDI","Muyinga",30.344,-2.847],["BDI","Kayanza",29.63,-2.921],["BDI","Bururi",29.621,-3.95],["BDI","Makamba",29.804,-4.134],
 ["COD","Mbuji-Mayi",23.6,-6.15],["COD","Kananga",22.416,-5.896],["COD","Matadi",13.45,-5.823],
 ["ZMB","Kitwe",28.213,-12.802],["ZMB","Kabwe",28.446,-14.446],["ZMB","Chingola",27.854,-12.528],["ZMB","Chipata",32.649,-13.644],["ZMB","Solwezi",26.396,-12.183],["ZMB","Kasama",31.18,-10.213],
 ["AGO","Lobito",13.536,-12.364],["AGO","Lubango",13.492,-14.918],["AGO","Malanje",16.341,-9.54],["AGO","Cabinda",12.197,-5.55],["AGO","Soyo",12.368,-6.134],["AGO","Namibe",12.152,-15.197],
 ["MOZ","Nacala",40.672,-14.542],["MOZ","Quelimane",36.887,-17.878],["MOZ","Tete",33.586,-16.156],["MOZ","Pemba",40.518,-12.974],["MOZ","Chimoio",33.483,-19.116],["MOZ","Xai-Xai",33.645,-25.051]
].map(([iso,name,lon,lat])=>({iso:String(iso),name:String(name),lon:Number(lon),lat:Number(lat)}));
cities.push(...extraCities);
const index=new Map(countries.map(c=>[c.name,c]));
const outlines=africaCountryOutlines;
function point(lon:number,lat:number){return {x:20+(lon+18)/72*920,y:20+(38-lat)/74*710};}
const kigali=point(30.0619,-1.9441);

export const regionCountryNames=regionalCountries.map(c=>c.name);
export default function RegionAtlas({country,onCountryChange}:{country:string;onCountryChange:(name:string)=>void}){
 const selected=index.get(country)||countries[0];
 const [camera,setCamera]=useState(()=>({center:country,zoom:country==="Rwanda"?2.9:Math.min(4.9,selected.zoom*1.65)}));
 const [selectedCity,setSelectedCity]=useState<string|null>(null);
 const [showCities,setShowCities]=useState(true);
 const cityList=cities.filter(c=>c.iso===selected.iso);
 const activeCity=cityList.find(c=>c.name===selectedCity)||cityList.find(c=>c.capital)||cityList[0];
 const focusCountry=(name:string)=>{setSelectedCity(null);onCountryChange(name);};
 const focusCity=(name:string)=>{setSelectedCity(name);setCamera(current=>({center:country,zoom:Math.min(5,Math.max(current.zoom,selected.zoom+1))}));};
 const homeReset=()=>{setSelectedCity("Kigali");setCamera({center:"Rwanda",zoom:2.15});onCountryChange("Rwanda");};
 const zoomBy=(value:number)=>setCamera(c=>({...c,zoom:Math.max(.9,Math.min(5,Math.round((c.zoom+value)*100)/100))}));
 const previous=useRef(country);
 useEffect(()=>{
  if(previous.current===country)return;
  previous.current=country;
  // Overview first, then approach the newly chosen country. Reset stays instant when reduced motion is requested.
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){setCamera({center:country,zoom:country==="Rwanda"?2.9:Math.min(4.9,selected.zoom*1.65)});return;}
  setCamera(current=>({center:current.center,zoom:1}));
  const t=window.setTimeout(()=>setCamera({center:country,zoom:country==="Rwanda"?2.9:Math.min(4.9,selected.zoom*1.65)}),360);
  return ()=>window.clearTimeout(t);
 },[country,selected.zoom]);
 const focused=index.get(camera.center)||countries[0];
 const cityTarget=selectedCity&&activeCity?activeCity:null;
 const c=cityTarget?point(cityTarget.lon,cityTarget.lat):point(...focused.center);
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
     <g className={styles.atlasKigali} transform={`translate(${kigali.x},${kigali.y})`}>
       <circle r="16"/><circle r="5"/><path d="M-24 0H24 M0 -24V24"/><text x="22" y="-11">KIGALI / IMVO BASE</text>
     </g>
     {!home&&<g className={styles.atlasSelectedPin} transform={`translate(${point(...selected.pin).x},${point(...selected.pin).y})`}>
      <circle r="6"/><path d="M-18 0H18 M0 -18V18"/>
     </g>}
     {outlines.map(outline=>{const p=point(outline.lon,outline.lat);return <text key={"country-"+outline.iso} className={styles.atlasCountryLabel} x={p.x} y={p.y} data-active={outline.iso===selected.iso?"true":undefined}>{outline.name.toUpperCase()}</text>;})}
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
