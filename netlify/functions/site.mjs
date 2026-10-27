import {resolve} from 'node:path';
import serverless from 'serverless-http';
import {createApp} from '../../backend/src/app.js';
import {netlifyAuthStore} from '../../backend/src/auth/netlify-store.js';
import * as renderer from '../../frontend/dist/server/entry-server.js';

const clientDirectory=resolve(process.cwd(),'frontend/dist/client');
const app=await createApp({
 clientDirectory,renderer,trustProxy:1,
 authOptions:{assetDirectory:resolve(clientDirectory,'auth'),store:netlifyAuthStore({name:`nexafive-access-${process.env.CONTEXT||'local'}`})}
});
const serve=serverless(app,{binary:['image/*','font/*','application/font-woff','application/octet-stream']});

// Netlify's modern Request API keeps ESM and Blobs context intact. Adapt only
// the HTTP boundary; the same Express application handles local and hosted use.
export default async function site(request,context){
 const url=new URL(request.url),headers=Object.fromEntries(request.headers);
 headers['x-forwarded-for']=context.ip||'unknown';
 headers['x-forwarded-proto']=url.protocol.slice(0,-1);
 headers.host=url.host;
 const bytes=Buffer.from(await request.arrayBuffer());
 const path=url.pathname.replace(/^\/\.netlify\/functions\/site(?=\/|$)/,'')||'/';
 const result=await serve({httpMethod:request.method,path,rawUrl:request.url,
  headers,queryStringParameters:Object.fromEntries(url.searchParams),
  multiValueQueryStringParameters:Object.fromEntries([...new Set(url.searchParams.keys())].map(key=>[key,url.searchParams.getAll(key)])),
  body:bytes.length?bytes.toString('base64'):null,isBase64Encoded:true,
  requestContext:{identity:{sourceIp:context.ip||'unknown'}}
 },{});
 const responseHeaders=new Headers(result.headers);
 for(const [name,values] of Object.entries(result.multiValueHeaders||{})){
  responseHeaders.delete(name);for(const value of values)responseHeaders.append(name,value);
 }
 const body=request.method==='HEAD'||[204,304].includes(result.statusCode)?null:Buffer.from(result.body||'',result.isBase64Encoded?'base64':'utf8');
 return new Response(body,{status:result.statusCode,headers:responseHeaders});
}
