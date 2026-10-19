import {notFound} from 'next/navigation';
import SystemsScreen, {type SystemsSearchParams} from '../SystemsScreen';
import {getSystemsRoute,systemsMetadata} from '../routeInfo';
type RouteProps={params:Promise<{segments:string[]}>;searchParams:SystemsSearchParams};
export async function generateMetadata({params}:RouteProps){const {segments}=await params;return systemsMetadata(segments.join('/'))}
export default async function Page({params,searchParams}:RouteProps){const {segments}=await params;const route=segments.join('/');if(!getSystemsRoute(route))notFound();return <SystemsScreen route={route} searchParams={searchParams}/>}
