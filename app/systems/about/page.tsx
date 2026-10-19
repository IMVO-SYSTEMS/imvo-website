import SystemsScreen from "../SystemsScreen";
import {systemsMetadata} from "../routeInfo";
export const metadata=systemsMetadata('about');
export default function Page(){return <SystemsScreen route='about'/>}
