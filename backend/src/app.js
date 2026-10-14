import express from 'express';
import {readFile,access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {getConfig} from './config.js';
import api from './routes/api.js';
import {securityHeaders} from './middleware/security.js';
const clientDirectory=fileURLToPath(new URL('../../frontend/dist/client',import.meta.url));
const serverEntry=new URL('../../frontend/dist/server/entry-server.js',import.meta.url);
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeJson=value=>JSON.stringify(value).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
export async function createApp(){
 const app=express();app.disable('x-powered-by');app.use(securityHeaders);app.use('/api',api);
 let template,renderer;try{await access(resolve(clientDirectory,'index.html'));template=await readFile(resolve(clientDirectory,'index.html'),'utf8');renderer=await import(serverEntry.href)}catch{/* Dev API runs independently of the frontend build. */}
 if(template){
  app.get('/robots.txt',(_req,res)=>res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${getConfig().siteUrl}/sitemap.xml\n`));
  app.get('/sitemap.xml',(_req,res)=>{const {siteUrl}=getConfig();res.type('application/xml').send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+renderer.routes.map(route=>`<url><loc>${escape(siteUrl+route)}</loc></url>`).join('')+'</urlset>')});
  app.use((req,res,next)=>{if(req.path==='/index.html')return res.redirect(301,'/');if(req.path.startsWith('//'))return res.status(400).send('Invalid path');next()});
  app.use('/assets',express.static(resolve(clientDirectory,'assets'),{maxAge:'1d',index:false}));
  app.use(express.static(clientDirectory,{index:false,maxAge:'1h'}));
  app.use((req,res)=>{
   if(!['GET','HEAD'].includes(req.method))return res.status(405).send('Method not allowed');
   let path;try{path=decodeURIComponent(req.path)}catch{return res.status(400).send('Invalid URL')}
   if(path==='/index.html')return res.redirect(301,'/');
   if(path.endsWith('/')&&path!=='/')return res.redirect(308,path.slice(0,-1));
   if(path.startsWith('/assets/'))return res.status(404).send('Asset not found');
   const config=getConfig(),meta=renderer.getPageMeta(path),canonical=config.siteUrl+path;
   const head=`<meta name="description" content="${escape(meta.description)}"><link rel="canonical" href="${escape(canonical)}"><meta property="og:title" content="${escape(meta.title)}"><meta property="og:description" content="${escape(meta.description)}"><meta property="og:url" content="${escape(canonical)}"><meta property="og:type" content="website"><meta property="og:image" content="${config.siteUrl}/assets/engineering.png"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${safeJson({'@context':'https://schema.org','@type':'Organization',name:'NexaFive Global',url:config.siteUrl,logo:config.siteUrl+'/assets/nexafive-logo.svg',email:'info@nexafiveglobal.com',telephone:'+16514167950'})}</script>`;
   const html=template.replace(/<title>.*?<\/title>/,`<title>${escape(meta.title)}</title>`).replace('<!--app-head-->',head).replace('<!--app-html-->',renderer.render(path,config)).replace('<!--app-config-->',`<script type="application/json" id="site-config">${safeJson({path,config})}</script>`);
   res.status(meta.notFound?404:200).type('html').send(html);
  });
 }else app.use((_req,res)=>res.status(503).type('text/plain').send('Frontend build not found. Run npm run dev and open http://localhost:5173, or run npm run build before npm start.'));
 app.use((error,_req,res,_next)=>{console.error('Request failed:',error.name);res.status(500).json({error:'Something went wrong. Please try again later.'})});
 return app;
}
