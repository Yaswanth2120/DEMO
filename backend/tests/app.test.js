import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createApp} from '../src/app.js';
import {getConfig} from '../src/config.js';

async function withServer(callback){const app=await createApp({requireLogin:false});const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.on('listening',resolve));try{await callback('http://127.0.0.1:'+server.address().port)}finally{await new Promise(resolve=>server.close(resolve))}}

test('WhatsApp stays unset unless configured with valid international digits',()=>{const old=process.env.WHATSAPP_NUMBER;try{for(const value of ['', '+16514167950','invalid']){process.env.WHATSAPP_NUMBER=value;assert.equal(getConfig().whatsapp,'')}process.env.WHATSAPP_NUMBER='16514167950';assert.equal(getConfig().whatsapp,'16514167950')}finally{if(old===undefined)delete process.env.WHATSAPP_NUMBER;else process.env.WHATSAPP_NUMBER=old}});

test('health and public configuration work without AI credentials',()=>withServer(async base=>{assert.equal((await fetch(base+'/api/health')).status,200);const config=await(await fetch(base+'/api/config')).json();assert.deepEqual(Object.keys(config).sort(),['siteUrl','verified','whatsapp']);assert(!JSON.stringify(config).includes('OPENAI'));assert.equal((await fetch(base+'/api/chat',{method:'POST'})).status,404);assert.equal((await fetch(base+'/api/chat/status')).status,404)}));

test('homepage opens the light-only V1 experience',()=>withServer(async base=>{const response=await fetch(base+'/');assert.equal(response.status,200);const html=await response.text();assert.equal((html.match(/<h1/g)||[]).length,1);assert.match(html,/aria-label="Innovate beyond boundaries\."/);assert.match(html,/class="v2"/);assert.match(html,/role="tablist" aria-label="NexaFive capabilities"/);assert.match(html,/Our Board/);assert.match(html,/href="\/v1\/boardmembers"/);assert.match(html,/rel="canonical"/);assert.match(html,/nexafive-logo\.png/);assert(!html.includes('OPENAI_API_KEY'));assert.equal((await fetch(base+'/missing')).status,404)}));

test('former backup redirects to V1 and board route is available',()=>withServer(async base=>{const backup=await fetch(base+'/backup',{redirect:'manual'});assert.equal(backup.status,301);assert.equal(backup.headers.get('location'),'/v1');const board=await fetch(base+'/boardmembers');assert.equal(board.status,200);const boardHtml=await board.text();assert.match(boardHtml,/class="v2 n5-board-page"/);assert.match(boardHtml,/Elena Martin/);assert.match(boardHtml,/Demo profile/);assert.match(boardHtml,/canonical" href="[^"]+\/boardmembers"/)}));

test('light and theme-selectable editions preserve section navigation through board pages',()=>withServer(async base=>{
 for(const prefix of ['/v1','/v2']){
  const response=await fetch(base+(prefix||'/'),{redirect:'manual'});assert.equal(response.status,200);
  const html=await response.text();assert.match(html,new RegExp(`href="${prefix}/boardmembers"`));
  if(prefix==='/v1')assert(!html.includes('aria-label="Color theme"'));
  if(prefix==='/v2')assert.match(html,/n5-theme-shell/);
  const board=await fetch(base+prefix+'/boardmembers');assert.equal(board.status,200);const boardHtml=await board.text();
  if(prefix==='/v2'){for(const value of ['light','dark'])assert(html.includes(`value="${value}"`));assert(!html.includes('value="device"'));assert(html.includes('data-theme="light"'));assert.match(boardHtml,/aria-label="Color theme"/)}
  for(const hash of ['pillars','process','industries','partners','contact'])assert(boardHtml.includes(`href="${prefix||'/'}#${hash}"`),`${prefix} board link to ${hash}`);
 }
 const {legacyRedirects,routes}=await import('../../frontend/dist/server/entry-server.js');
 for(const [route,destination] of Object.entries(legacyRedirects)){const response=await fetch(base+route,{redirect:'manual'});assert.equal(response.status,301);assert.equal(response.headers.get('location'),destination)}
 for(const path of ['/v2/','/v3/','/v3/boardmembers/'])assert.equal((await fetch(base+path,{redirect:'manual'})).status,308);
 const sitemap=await(await fetch(base+'/sitemap.xml')).text();assert.equal((sitemap.match(/<url>/g)||[]).length,routes.length);
}));

test('served logo is the approved transparent N5 artwork',()=>withServer(async base=>{const response=await fetch(base+'/assets/nexafive-logo.png');assert.equal(response.status,200);const bytes=Buffer.from(await response.arrayBuffer());assert.equal(createHash('sha256').update(bytes).digest('hex'),'16cc0d6f5682c340dbb11c6def4ac62594d9bb804d11ee8316d74d975df54dad');assert.match(response.headers.get('content-type'),/image\/png/);assert.equal((await fetch(base+'/assets/nexafive-logo.svg')).status,404)}));

test('security headers, self-hosted fonts and redirects',()=>withServer(async base=>{const response=await fetch(base+'/fonts/outfit-latin.woff2');assert.equal(response.status,200);assert.match(response.headers.get('content-security-policy'),/script-src 'self'/);assert.equal(response.headers.get('x-powered-by'),null);assert.equal((await fetch(base+'/fonts/jakarta-latin.woff2')).status,200);assert.equal((await fetch(base+'/assets/no-such-image.png')).status,404);const redirect=await fetch(base+'/index.html',{redirect:'manual'});assert.equal(redirect.status,301);assert.equal(redirect.headers.get('location'),'/')}));
