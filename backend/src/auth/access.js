import {memoryAuthStore} from './store.js';
import express from 'express';
import {createHash,randomBytes} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {verifySiteCredentials} from './credentials.js';
import {loginPage} from '../../../frontend/src/login/page.js';
import {publicFiles,safeNext} from './policy.js';

const cookieName='nexafive_session',lifetime=8*60*60*1000;
const digest=value=>createHash('sha256').update(value).digest('hex');
function tokenFrom(req){const value=(req.headers.cookie||'').split(';').map(part=>part.trim()).find(part=>part.startsWith(cookieName+'='))?.slice(cookieName.length+1);return /^[a-f0-9]{64}$/.test(value||'')?value:null}
function sameOrigin(req){try{return !req.headers.origin||new URL(req.headers.origin).host===req.headers.host}catch{return false}}

export function installAccess(app,{verifyCredentials=verifySiteCredentials,now=Date.now,store=memoryAuthStore(now),assetDirectory}={}){
 const authenticated=async req=>{const token=tokenFrom(req);return token?Boolean(await store.get('session:'+digest(token))):false};
 const cookie=(req,value,age)=>`${cookieName}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${age}${req.secure||process.env.NODE_ENV==='production'?'; Secure':''}`;
 app.use((req,res,next)=>{res.setHeader('Cache-Control','private, no-store');res.setHeader('X-Robots-Tag','noindex, nofollow');next()});
 app.get('/auth/login.css',(_req,res)=>res.sendFile(assetDirectory?assetDirectory+'/login.css':fileURLToPath(new URL('../../../frontend/public/auth/login.css',import.meta.url))));
 app.get('/auth/login.js',(_req,res)=>res.type('text/javascript').sendFile(assetDirectory?assetDirectory+'/login.js':fileURLToPath(new URL('../../../frontend/public/auth/login.js',import.meta.url))));
 app.get('/auth/session',async(req,res)=>{const valid=await authenticated(req);res.status(valid?200:401).json({authenticated:valid})});
 app.get('/login',async(req,res)=>{if(await authenticated(req))return res.redirect(303,safeNext(req.query.next));res.type('html').send(loginPage({next:safeNext(req.query.next)}))});
 app.post('/auth/login',express.urlencoded({extended:false,limit:'4kb'}),async(req,res,next)=>{
  try{
   if(!sameOrigin(req))return res.status(403).type('html').send(loginPage({error:'Please sign in from this website.'}));
   const address=digest(req.ip||'unknown'),attempt=await store.get('failure:'+address);
   if(attempt?.count>=10){res.setHeader('Retry-After',String(Math.ceil((attempt.until-now())/1000)));return res.status(429).type('html').send(loginPage({next:safeNext(req.body?.next),error:'Too many attempts. Please try again in 15 minutes.'}))}
   const valid=await verifyCredentials(req.body?.username,req.body?.password);
   if(!valid){const until=attempt?.until||now()+15*60*1000;await store.set('failure:'+address,{count:(attempt?.count||0)+1,until},until-now());return res.status(401).type('html').send(loginPage({next:safeNext(req.body?.next),error:'Username or password is incorrect.'}))}
   await store.delete('failure:'+address);const previous=tokenFrom(req);if(previous)await store.delete('session:'+digest(previous));
   const token=randomBytes(32).toString('hex');await store.set('session:'+digest(token),true,lifetime);
   res.setHeader('Set-Cookie',cookie(req,token,lifetime/1000));res.redirect(303,safeNext(req.body?.next));
  }catch(error){next(error)}
 });
 app.post('/auth/logout',async(req,res)=>{if(!sameOrigin(req))return res.status(403).send('Invalid request');const token=tokenFrom(req);if(token)await store.delete('session:'+digest(token));res.setHeader('Set-Cookie',cookie(req,'',0));res.redirect(303,'/login')});
 app.use(async(req,res,next)=>{
  if(publicFiles.has(req.path)||await authenticated(req))return next();
  if(req.path.startsWith('/api/')||req.path.startsWith('/assets/')||req.path.startsWith('/src/')||req.path.startsWith('/fonts/'))return res.status(401).json({error:'Authentication required'});
  if(!['GET','HEAD'].includes(req.method))return res.status(401).json({error:'Authentication required'});
  res.redirect(302,'/login?next='+encodeURIComponent(safeNext(req.originalUrl)));
 });
}
