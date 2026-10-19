import {Suspense} from 'react';
import {getAboutPageContent} from '@/sanity/lib/siteContent';
import SystemsExperience from './experience/SystemsExperience.jsx';
import publishedReviews from './experience/published-reviews.json';
export default async function SystemsScreen({route=''}:{route?:string}){
 const content=['','testimonials'].includes(route)?await getAboutPageContent():undefined;
 const authors=new Set(['Eric IRANKUNDA','Umutoni Leon Clement','Nkuliye Stewart','Bahiga Jean Claude']);
 const reviews=(content===null?publishedReviews.reviews:content?.testimonials||[])
 .filter(review=>review.active!==false&&review.text?.trim()&&review.author?.trim()&&(review.featured===true||authors.has(review.author||'')))
 .sort((a,b)=>Number(Boolean(b.featured))-Number(Boolean(a.featured))||(a.order??100)-(b.order??100))
 .map(({text,author,role,company})=>({text,author,role:role||undefined,company:company||undefined}));
 return <Suspense><SystemsExperience key={route} route={route} reviews={reviews}/></Suspense>
}
