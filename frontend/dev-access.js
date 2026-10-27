import {legacyRedirects} from './src/routes.js';
import {isPublicAccessPath,safeNext} from '../backend/src/auth/policy.js';

// Vite serves source modules itself, so it must verify the same server session.
export function developmentAccess(){return {name:'nexafive-development-access',configureServer(server){
 server.middlewares.use(async(req,res,next)=>{
  const path=(req.url||'/').split('?')[0];
  if(isPublicAccessPath(path))return next();
  try{
   const response=await fetch('http://127.0.0.1:3001/auth/session',{headers:{cookie:req.headers.cookie||''},signal:AbortSignal.timeout(3000)});
   if(response.ok){const destination=legacyRedirects[path];if(destination){res.statusCode=301;res.setHeader('Location',destination);res.end();return}return next()}
   res.setHeader('Cache-Control','no-store');
   if(path.startsWith('/api/')||path.startsWith('/src/')||path.startsWith('/node_modules/')||path.startsWith('/assets/')||path.startsWith('/@')){res.statusCode=401;res.end('Authentication required');return}
   res.statusCode=302;res.setHeader('Location','/login?next='+encodeURIComponent(safeNext(req.url)));res.end();
  }catch{res.statusCode=503;res.setHeader('Content-Type','text/plain');res.end('The login server is starting. Please refresh, or run npm run dev from the project root.')}
 });
}}}
