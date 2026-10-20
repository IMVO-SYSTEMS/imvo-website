import type {Metadata} from 'next';
import {services,industries,projects,articles} from './experience/data.js';
const mainPages:Record<string,[string,string]>={
 '':['Software Development & Digital Systems in Kigali, Rwanda','IMVO Systems is a Kigali-based technology practice developing websites, web and mobile apps, custom software, business platforms and practical AI automation.'],
 services:['Services','Explore product design, web and mobile development, enterprise integration, cloud, AI and support from IMVO Systems.'],
 industries:['Industries','Useful technology for commerce, hospitality, property, education, healthcare and the organisations behind them.'],
 projects:['Projects','Selected IMVO product directions, connected platforms and demonstration concepts.'],
 about:['About','Meet the IMVO Systems approach to product thinking, software engineering and collaboration, as part of IMVO Group.'],
 contact:['Contact','Discuss your software product, website, integration or business system with IMVO Systems in Kigali, Rwanda.'],
 testimonials:['Client Perspectives','Feedback shared with IMVO Group, in our clients’ own words.'],
 stories:['Project Stories','The business problem, the experience and the system behind IMVO product directions.'],
 careers:['Careers & Collaboration','Introduce your experience and explore future collaboration with IMVO Systems.'],
 insights:['Technology Insights','Practical product thinking, software engineering and ideas for the systems behind a business.']};
export function getSystemsRoute(route:string){
 if(mainPages[route])return {title:mainPages[route][0],description:mainPages[route][1]};
 const [type,id,extra]=route.split('/');if(extra||!id)return null;
 if(type==='services'){const item=services.find(e=>e.id===id);return item?{title:item.name,description:item.description}:null}
 if(type==='industries'){const item=industries.find(e=>e.id===id);return item?{title:item.name,description:item.text}:null}
 if(type==='projects'){const item=projects.find(e=>e.id===id);return item?{title:item.name,description:item.description}:null}
 if(type==='insights'){const item=articles.find(e=>e.id===id);return item?{title:item.title,description:item.summary}:null}
 return null;
}
export function systemsMetadata(route:string):Metadata{const page=getSystemsRoute(route);if(!page)return {title:'Page not found'};const path=`/systems${route?'/'+route:''}`,title=`${page.title} | IMVO Systems`;return {title:{absolute:title},description:page.description,keywords:route===''?['IMVO Systems','IMVO Systems Rwanda','IMVO software development','software development Kigali','custom software Rwanda','web development Kigali','business systems Rwanda','mobile app development Rwanda']:undefined,alternates:{canonical:path},openGraph:{type:'website',title,description:page.description,url:path,siteName:'IMVO Systems',images:[{url:'/imvo-team-main.webp',alt:'The IMVO Group team'}]},twitter:{card:'summary_large_image',title,description:page.description,images:['/imvo-team-main.webp']}}}
export const systemsRoutes=[...Object.keys(mainPages),...services.map(x=>`services/${x.id}`),...industries.map(x=>`industries/${x.id}`),...projects.map(x=>`projects/${x.id}`),...articles.map(x=>`insights/${x.id}`)];
