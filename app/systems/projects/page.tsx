import SystemsScreen from "../SystemsScreen";
import {systemsMetadata} from "../routeInfo";
export const metadata=systemsMetadata('projects');
export default function Page(){return <SystemsScreen route='projects'/>}
