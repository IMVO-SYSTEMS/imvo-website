import SystemsScreen, {type SystemsSearchParams} from "./SystemsScreen";
import {systemsMetadata} from "./routeInfo";
export const metadata=systemsMetadata('');
export default function Page({searchParams}:{searchParams:SystemsSearchParams}){return <>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
 "@context":"https://schema.org","@graph":[
  {"@type":"Service","@id":"https://www.imvogroup.com/systems#service",
   name:"IMVO Systems",alternateName:"IMVO Systems Rwanda",
   serviceType:"Software development and digital product engineering",
   description:"Websites, web and mobile applications, custom business software, systems integrations and AI automation in Kigali, Rwanda.",
   provider:{"@id":"https://www.imvogroup.com/#organization"},
   areaServed:{"@type":"Place",name:"Kigali, Rwanda"},
   url:"https://www.imvogroup.com/systems"},
  {"@type":"WebPage","@id":"https://www.imvogroup.com/systems#webpage",
   url:"https://www.imvogroup.com/systems",name:"IMVO Systems | Software Development in Kigali, Rwanda",
   isPartOf:{"@id":"https://www.imvogroup.com/#website"},
   about:{"@id":"https://www.imvogroup.com/systems#service"}}
 ]}).replace(/</g,"\\u003c")}} />
<SystemsScreen searchParams={searchParams} route=''/>
</>}
