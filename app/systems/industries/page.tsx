import SystemsScreen from "../SystemsScreen";
import {systemsMetadata} from "../routeInfo";
export const metadata=systemsMetadata('industries');
export default function Page(){return <SystemsScreen route='industries'/>}
