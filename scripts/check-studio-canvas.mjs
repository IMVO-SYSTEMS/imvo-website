import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
const origin=process.env.IMVO_STUDIO_TEST_ORIGIN||'http://127.0.0.1:4186';
const worker=process.env.IMVO_STUDIO_TEST_ORIGIN?null:spawn(process.execPath,['node_modules/wrangler/bin/wrangler.js','dev','--config','dist/server/wrangler.json','--ip','127.0.0.1','--port','4186','--local','--show-interactive-dev-session=false'],{stdio:['ignore','pipe','pipe'],env:{...process.env,WRANGLER_SEND_METRICS:'false'}});
let logs='',exited=false;worker?.stdout.on('data',data=>{logs=(logs+data).slice(-10000)});worker?.stderr.on('data',data=>{logs=(logs+data).slice(-10000)});worker?.on('exit',()=>{exited=true});
try{
 let html='';for(let attempt=0;attempt<60;attempt++){if(exited)throw new Error(`Worker exited. ${logs}`);try{const response=await fetch(origin+'/',{signal:AbortSignal.timeout(10000)});if(response.ok){html=await response.text();break}}catch{}await delay(1000)}
 if(!html)throw new Error(`Homepage unavailable. ${logs}`);
 if((html.match(/<h1[\s>]/g)||[]).length!==1)throw new Error('Expected one H1');
 if(/<video[\s>]/i.test(html))throw new Error('Video remains on the homepage');
 if(!html.includes('data-studio-frame')||!html.includes('studio-opening')||!html.includes('design-process'))throw new Error('Drawing experience missing');
 if(!html.includes('aria-label="House drawing completion"')||!html.includes('aria-valuenow="1"'))throw new Error('Hero completion control missing');
 if(html.includes('Replay drawing')||html.includes('Close studio signal'))throw new Error('Obsolete replay or dismissible studio status remains');
 if((html.match(/id="studio-services"/g)||[]).length!==1)throw new Error('Expected one compact service scene');
 if((html.match(/data-detail=/g)||[]).length<18)throw new Error('Interactive study details missing');
 const anchors=[...new Set([...html.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]))];
 for(const id of anchors)if(!html.includes(`id="${id}"`))throw new Error(`Missing section #${id}`);
 const assets=[...new Set([...html.matchAll(/<img\b[^>]*\bsrc="(\/[^\"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&')))];
 for(let offset=0;offset<assets.length;offset+=5)await Promise.all(assets.slice(offset,offset+5).map(async path=>{const r=await fetch(origin+path,{signal:AbortSignal.timeout(20000)});const type=r.headers.get('content-type')||'';if(!r.ok||!type.includes('image')||(await r.arrayBuffer()).byteLength<100)throw new Error(`Image ${path}: HTTP ${r.status}, ${type}`)}));
 const destinations=['/projects','/services','/services/design','/services/consultancy','/services/site-coordination','/about','/contact','/systems','/domicile','/privacy','/terms','/cookies','/careers','/projects/project-01'];
 for(const path of destinations){const r=await fetch(origin+path,{signal:AbortSignal.timeout(30000)});if(!r.ok)throw new Error(`Navigation ${path}: HTTP ${r.status}`);const body=await r.text();if(path.startsWith('/systems')||path==='/domicile'){if(body.includes('data-studio-frame')||body.includes('data-division='))throw new Error(`Unexpected Studio shell on ${path}`);if(path.startsWith('/systems')&&!body.includes('systems-site'))throw new Error(`Independent Systems experience missing on ${path}`);if(path==='/domicile'&&!body.includes('DŌMICILE'))throw new Error('Independent Domicile experience missing')}else if(!body.includes('data-studio-frame')||!body.includes('data-inner-page'))throw new Error(`Studio shell missing on ${path}`);if(path==='/projects/project-01'&&!body.includes('Zoom in Ground floor'))throw new Error('Published project plans have no inspection controls');}
 for(const name of ['bt-grotesk-regular','bt-grotesk-medium','bt-grotesk-semibold','bt-grotesk-bold','geist-mono-medium']){const response=await fetch(origin+'/fonts/studio/'+name+'.woff2');const bytes=new Uint8Array(await response.arrayBuffer());if(!response.ok||String.fromCharCode(...bytes.slice(0,4))!=='wOF2')throw new Error(`Reference font missing: ${name}`);}

 console.log(`Passed: drawing homepage, one H1, no video hero, ${anchors.length} valid section anchors, ${assets.length} real image assets, ${destinations.length} verified destinations, published plan controls, and five verified WOFF2 reference fonts.`);
}finally{worker?.kill('SIGTERM')}
