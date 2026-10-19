import SystemsScreen from "../SystemsScreen";
import {systemsMetadata} from "../routeInfo";
export const metadata=systemsMetadata('services');
export default function Page(){return <SystemsScreen route='services'/>}
