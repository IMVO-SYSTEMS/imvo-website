import SystemsScreen, {type SystemsSearchParams} from "../SystemsScreen";
import {systemsMetadata} from "../routeInfo";
export const metadata=systemsMetadata('projects');
export default function Page({searchParams}:{searchParams:SystemsSearchParams}){return <SystemsScreen searchParams={searchParams} route='projects'/>}
