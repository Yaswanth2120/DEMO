import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createApp} from '../src/app.js';
import {getConfig} from '../src/config.js';

async function withServer(callback){const app=await createApp();const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.on('listening',resolve));try{await callback('http://127.0.0.1:'+server.address().port)}finally{await new Promise(resolve=>server.close(resolve))}}

test('WhatsApp stays unset unless configured with valid international digits',()=>{const old=process.env.WHATSAPP_NUMBER;try{for(const value of ['', '+16514167950','invalid']){process.env.WHATSAPP_NUMBER=value;assert.equal(getConfig().whatsapp,'')}process.env.WHATSAPP_NUMBER='16514167950';assert.equal(getConfig().whatsapp,'16514167950')}finally{if(old===undefined)delete process.env.WHATSAPP_NUMBER;else process.env.WHATSAPP_NUMBER=old}});

test('health and public configuration work without AI credentials',()=>withServer(async base=>{assert.equal((await fetch(base+'/api/health')).status,200);const config=await(await fetch(base+'/api/config')).json();assert.deepEqual(Object.keys(config).sort(),['siteUrl','verified','whatsapp']);assert(!JSON.stringify(config).includes('OPENAI'));assert.equal((await fetch(base+'/api/chat',{method:'POST'})).status,404);assert.equal((await fetch(base+'/api/chat/status')).status,404)}));

test('homepage keeps all exploration and privacy links on the same page',()=>withServer(async base=>{const response=await fetch(base+'/');assert.equal(response.status,200);const html=await response.text();assert.equal((html.match(/<h1/g)||[]).length,1);for(const id of ['hero','about','pillars','solutions','industries','process','partners','faq','contact','privacy','battery-engineering','corrosion-mitigation'])assert.match(html,new RegExp(`id="${id}"`));for(const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g))assert.match(match[1],/^(#|mailto:|tel:)/,match[1]);assert.match(html,/service-filters/);assert.match(html,/service-details/);assert.match(html,/rel="canonical"/);assert.match(html,/nexafive-logo\.png/);assert(!html.includes('ai-launch'));assert(!html.includes('OPENAI_API_KEY'));assert.equal((await fetch(base+'/missing')).status,404);const sitemap=await(await fetch(base+'/sitemap.xml')).text();assert.equal((sitemap.match(/<url>/g)||[]).length,1)}));

test('former page URLs redirect to corresponding homepage sections',()=>withServer(async base=>{const {legacyRedirects}=await import('../../frontend/dist/server/entry-server.js');for(const [route,destination] of Object.entries(legacyRedirects)){const response=await fetch(base+route,{redirect:'manual'});assert.equal(response.status,301,route);assert.equal(response.headers.get('location'),destination,route)}assert.equal((await fetch(base+'/about/',{redirect:'manual'})).status,308)}));

test('served logo is byte-for-byte the original N5 artwork',()=>withServer(async base=>{const response=await fetch(base+'/assets/nexafive-logo.png');assert.equal(response.status,200);const bytes=Buffer.from(await response.arrayBuffer());assert.equal(createHash('sha256').update(bytes).digest('hex'),'dc55a5e5693956f24b6dc353549b4ad57e16b31d2037eac60e408f183cf03a5f');assert.match(response.headers.get('content-type'),/image\/png/);assert.equal((await fetch(base+'/assets/nexafive-logo.svg')).status,404)}));

test('second design renders independently with complete inline business content',()=>withServer(async base=>{
 const response=await fetch(base+'/v2');assert.equal(response.status,200);const html=await response.text();
 assert.equal((html.match(/<h1/g)||[]).length,1);assert.match(html,/aria-label="Innovate beyond boundaries\."/);assert.match(html,/class="v2"/);assert.match(html,/role="tablist" aria-label="NexaFive capabilities"/);assert.match(html,/Healthcare Technologies/);
 for(const id of ['about','pillars','solutions','industries','process','partners','faq','contact','privacy','battery-engineering','lightweight-automotive','tooling-manufacturing','ai-optimization','corrosion-mitigation'])assert.match(html,new RegExp(`id="${id}"`));
 for(const match of html.matchAll(/<a\b[^>]*href="#([^"]+)"/g))assert.match(html,new RegExp(`id="${match[1]}"`));
 assert.match(html,/missouri-st-logo\.png/);assert.match(html,/nexafive-logo\.png/);assert.match(html,/formsubmit\.co\/ajax\/info@nexafiveglobal\.com/);
 assert.match(html,/canonical" href="[^"]+\/v2"/);assert.match(html,/View the original design/);
 const original=await(await fetch(base+'/')).text();assert.match(original,/class="hero-band"/);assert(!original.includes('class="v2"'));
 assert.equal((await fetch(base+'/v2/',{redirect:'manual'})).status,308);
}));

test('third design renders a complete, readable server document for the WebGL journey',()=>withServer(async base=>{
 const response=await fetch(base+'/v3');assert.equal(response.status,200);const html=await response.text();
 assert.equal((html.match(/<h1/g)||[]).length,1);assert.match(html,/aria-label="Innovate beyond boundaries\."/);assert.match(html,/class="v3"/);
 for(const id of ['hero','about','battery-engineering','lightweight-automotive','tooling-manufacturing','ai-optimization','corrosion-mitigation','process','industries','partners','contact','privacy','contact-form'])assert.match(html,new RegExp(`id="${id}"`));
 for(const match of html.matchAll(/<a\b[^>]*href="#([^"]+)"/g))assert.match(html,new RegExp(`id="${match[1]}"`));
 assert.match(html,/formsubmit\.co\/ajax\/info@nexafiveglobal\.com/);assert.match(html,/nexafive-logo\.png/);assert.match(html,/Healthcare Technologies/);
 assert.match(html,/<title>NexaFive Global — A Journey Beyond Boundaries<\/title>/);assert.match(html,/canonical" href="[^"]+\/v3"/);
 assert(!html.includes('ISO 17025'),'verified claims stay hidden by default');
}));

test('security headers, self-hosted fonts and redirects',()=>withServer(async base=>{const response=await fetch(base+'/fonts/outfit-latin.woff2');assert.equal(response.status,200);assert.match(response.headers.get('content-security-policy'),/script-src 'self'/);assert.equal(response.headers.get('x-powered-by'),null);assert.equal((await fetch(base+'/fonts/jakarta-latin.woff2')).status,200);assert.equal((await fetch(base+'/assets/no-such-image.png')).status,404);const redirect=await fetch(base+'/index.html',{redirect:'manual'});assert.equal(redirect.status,301);assert.equal(redirect.headers.get('location'),'/')}));
