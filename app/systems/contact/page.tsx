import SystemsScreen, {type SystemsSearchParams} from "../SystemsScreen";
import {systemsMetadata} from "../routeInfo";
export const metadata=systemsMetadata('contact');
export default function Page({searchParams}:{searchParams:SystemsSearchParams}){return <SystemsScreen searchParams={searchParams} route='contact'/>}
