import {spawn} from 'node:child_process';
const args=process.argv.slice(2);const index=args.indexOf('--port');const port=index>=0?args[index+1]:'4173';
const child=spawn(process.execPath,['node_modules/wrangler/bin/wrangler.js','dev','--config','dist/server/wrangler.json','--ip','0.0.0.0','--port',port,'--local','--show-interactive-dev-session=false'],{stdio:'inherit',env:{...process.env,WRANGLER_SEND_METRICS:'false'}});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));child.on('exit',code=>process.exit(code||0));
