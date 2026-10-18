import test from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from '../src/app.js';

test('compact content is limited to V3 and remains present for server rendering',async()=>{
 const app=await createApp(),server=app.listen(0,'127.0.0.1');
 await new Promise(resolve=>server.on('listening',resolve));
 try{
  const base='http://127.0.0.1:'+server.address().port;
  for(const route of ['/','/v2','/v3/boardmembers']){
   const html=await(await fetch(base+route)).text();assert(!html.includes('n5-mobile-compact'),route);
  }
  const html=await(await fetch(base+'/v3')).text();assert.match(html,/n5-mobile-compact/);
  for(const id of ['contact-form','faq','about','solutions','battery-engineering','corrosion-mitigation'])assert.match(html,new RegExp(`id="${id}"`));
  assert.match(html,/Send a project enquiry/);assert.match(html,/Testing methods &amp; standards/);
  assert.match(html,/data-ready="false"/,'server content remains accessible before enhancement');
 }finally{await new Promise(resolve=>server.close(resolve))}
});
