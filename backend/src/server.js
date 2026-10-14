import {createApp} from './app.js';
const app=await createApp(),port=Number(process.env.PORT)||3001;
const server=app.listen(port,'0.0.0.0',()=>console.log(`NexaFive backend ready at http://localhost:${port}`));
server.requestTimeout=30000;server.headersTimeout=15000;
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)));
