import SystemsScreen, {type SystemsSearchParams} from "../SystemsScreen";
import {systemsMetadata} from "../routeInfo";
export const metadata=systemsMetadata('about');
export default function Page({searchParams}:{searchParams:SystemsSearchParams}){return <SystemsScreen searchParams={searchParams} route='about'/>}
