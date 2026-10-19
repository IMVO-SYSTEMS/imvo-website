import {getAboutPageContent} from '@/sanity/lib/siteContent';
import SystemsExperience from './experience/SystemsExperience.jsx';
import publishedReviews from './experience/published-reviews.json';
export type SystemsSearchParams=Promise<Record<string,string|string[]|undefined>>;
export default async function SystemsScreen({route='',searchParams}:{route?:string;searchParams?:SystemsSearchParams}){
 const values=await searchParams||{};
 const query=new URLSearchParams();
 for(const [key,value] of Object.entries(values)){if(Array.isArray(value))value.forEach(item=>query.append(key,item));else if(value!==undefined)query.set(key,value)}
 const content=['','testimonials'].includes(route)?await getAboutPageContent():undefined;
 const authors=new Set(['Eric IRANKUNDA','Umutoni Leon Clement','Nkuliye Stewart','Bahiga Jean Claude']);
 const reviews=(content===null?publishedReviews.reviews:content?.testimonials||[])
 .filter(review=>review.active!==false&&review.text?.trim()&&review.author?.trim()&&(review.featured===true||authors.has(review.author||'')))
 .sort((a,b)=>Number(Boolean(b.featured))-Number(Boolean(a.featured))||(a.order??100)-(b.order??100))
 .map(({text,author,role,company})=>({text,author,role:role||undefined,company:company||undefined}));
 return <SystemsExperience key={route} route={route} query={query.toString()} reviews={reviews}/>
}
