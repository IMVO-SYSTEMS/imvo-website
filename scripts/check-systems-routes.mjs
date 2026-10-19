import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
import {systemsRoutes} from '../app/systems/routeInfo.ts';
const origin='http://127.0.0.1:4185';
const worker=spawn(process.execPath,['node_modules/wrangler/bin/wrangler.js','dev','--config','dist/server/wrangler.json','--ip','127.0.0.1','--port','4185','--local','--show-interactive-dev-session=false'],{stdio:['ignore','pipe','pipe'],env:{...process.env,WRANGLER_SEND_METRICS:'false'}});
let logs='',exited=false;
worker.stdout.on('data',data=>{logs=(logs+data).slice(-12000)});worker.stderr.on('data',data=>{logs=(logs+data).slice(-12000)});worker.on('exit',()=>{exited=true});
try{
 let ready=false;
 for(let attempt=0;attempt<60;attempt++){if(exited)throw new Error(`Worker exited before startup.\n${logs}`);try{const r=await fetch(origin+'/systems/media/systems.svg',{signal:AbortSignal.timeout(2000)});if(r.ok){ready=true;break}}catch{}await delay(1000)}
 if(!ready)throw new Error(`Worker did not start.\n${logs}`);
 const paths=systemsRoutes.map(route=>'/systems'+(route?'/'+route:''));
 for(let offset=0;offset<paths.length;offset+=4)await Promise.all(paths.slice(offset,offset+4).map(async path=>{const r=await fetch(origin+path,{signal:AbortSignal.timeout(30000)});const html=await r.text();if(r.status!==200||!html.includes('systems-site')||!/<h1[\s>]/.test(html))throw new Error(`${path}: HTTP ${r.status} or incomplete page`);if(!html.includes('https://www.imvogroup.com/domicile')||!html.includes('IMVO Studio'))throw new Error(`${path}: missing division footer links`)}));
 for(const path of ['/systems/media/world-map.svg','/systems/media/tools/react.svg','/systems/media/hero-poster.jpg','/team.webp','/imvo-team-main.webp','/partners/partner-1.png']){const r=await fetch(origin+path);if(!r.ok||(await r.arrayBuffer()).byteLength<100)throw new Error(`Missing asset: ${path}`)}
 for(const path of ['/','/domicile','/privacy','/terms','/cookies']){const r=await fetch(origin+path,{signal:AbortSignal.timeout(30000)});if(!r.ok)throw new Error(`Group route ${path}: HTTP ${r.status}`);await r.text()}
 const missing=await fetch(origin+'/systems/does-not-exist');if(missing.status!==404)throw new Error(`Unknown route returned ${missing.status}`);
 console.log(`Passed: ${paths.length} Systems pages, division footer links, six media assets, five Group routes and 404 handling.`);
}finally{worker.kill('SIGTERM')}
