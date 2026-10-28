import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createApp} from '../src/app.js';
import {safeNext} from '../src/auth/policy.js';
import {verifySiteCredentials} from '../src/auth/credentials.js';

// Inject an isolated test account; the real review password never enters test source.
const testUser='test-reviewer',testPassword='test-only-password';
async function withAccess(callback,options={}){
 const app=await createApp({authOptions:{verifyCredentials:async(name,password)=>name===testUser&&password===testPassword,...options}});
 const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.on('listening',resolve));
 const base='http://127.0.0.1:'+server.address().port;
 const login=(extra={})=>fetch(base+'/auth/login',{method:'POST',body:new URLSearchParams({username:testUser,password:testPassword,next:'/',...extra}),redirect:'manual'});
 try{await callback({base,login})}finally{await new Promise(resolve=>server.close(resolve))}
}

test('anonymous visitors cannot read pages, API data, or the application bundle',()=>withAccess(async({base})=>{
 for(const path of ['/','/v1','/v2','/v1/boardmembers','/v2/boardmembers','/v3','/backup','/science','/engineering','/research','/material','/eco','/about','/expertise','/team','/contact']){
  const response=await fetch(base+path,{redirect:'manual'});assert.equal(response.status,302,path);assert.match(response.headers.get('location'),/^\/login\?next=/);assert.match(response.headers.get('cache-control'),/no-store/);
 }
 const template=await readFile(new URL('../../frontend/dist/client/index.html',import.meta.url),'utf8');
 const bundle=template.match(/src="(\/assets\/[^" ]+\.js)"/)[1];
 for(const path of ['/api/config','/api/health','/assets/engineering.png',bundle])assert.equal((await fetch(base+path)).status,401,path);
 for(const path of ['/login','/auth/login.css','/auth/login.js','/assets/nexafive-logo.png'])assert.equal((await fetch(base+path)).status,200,path);
}));

test('wrong credentials fail and valid credentials create a protected session',()=>withAccess(async({base,login})=>{
 const invalid=await login({password:'wrong'});assert.equal(invalid.status,401);assert.equal(invalid.headers.get('set-cookie'),null);assert.match(await invalid.text(),/Username or password is incorrect/);
 const response=await login();assert.equal(response.status,303);assert.equal(response.headers.get('location'),'/');
 const setCookie=response.headers.get('set-cookie');assert.match(setCookie,/HttpOnly/);assert.match(setCookie,/SameSite=Lax/);assert.match(setCookie,/Max-Age=28800/);
 const cookie=setCookie.split(';')[0];
 const page=await fetch(base+'/',{headers:{cookie}});assert.equal(page.status,200);assert.match(await page.text(),/n5-mobile-compact/);
 assert.equal((await fetch(base+'/api/config',{headers:{cookie}})).status,200);
 assert.equal((await fetch(base+'/auth/session',{headers:{cookie}})).status,200);
 const tampered=cookie.slice(0,-1)+(cookie.endsWith('a')?'b':'a');assert.equal((await fetch(base+'/auth/session',{headers:{cookie:tampered}})).status,401);
 const logout=await fetch(base+'/auth/logout',{method:'POST',headers:{cookie},redirect:'manual'});assert.equal(logout.status,303);assert.match(logout.headers.get('set-cookie'),/Max-Age=0/);
 assert.equal((await fetch(base+'/auth/session',{headers:{cookie}})).status,401);
}));

test('sessions expire after eight hours',async()=>{let time=Date.now();await withAccess(async({base,login})=>{
 const response=await login(),cookie=response.headers.get('set-cookie').split(';')[0];
 time+=8*60*60*1000+1;assert.equal((await fetch(base+'/auth/session',{headers:{cookie}})).status,401);
},{now:()=>time})});

test('login rejects foreign origins and external return destinations',()=>withAccess(async({base,login})=>{
 const response=await fetch(base+'/auth/login',{method:'POST',headers:{Origin:'https://foreign.example'},body:new URLSearchParams({username:testUser,password:testPassword}),redirect:'manual'});assert.equal(response.status,403);
 const redirect=await login({next:'https://foreign.example'});assert.equal(redirect.headers.get('location'),'/');
 for(const next of ['//foreign.example','/\\foreign.example','/auth/logout','/login','/v1\r\nLocation: https://foreign.example'])assert.equal(safeNext(next),'/');
 assert.equal(safeNext('/v2/boardmembers#board-content'),'/v2/boardmembers#board-content');
}));

test('repeated failed logins are limited and recover after the window',async()=>{let time=Date.now();await withAccess(async({login})=>{
 for(let i=0;i<10;i++)assert.equal((await login({password:'wrong'})).status,401);
 const limited=await login({password:'wrong'});assert.equal(limited.status,429);assert(limited.headers.get('retry-after'));
 time+=15*60*1000+1;assert.equal((await login()).status,303);
},{now:()=>time})});

test('default account rejects other credentials',async()=>{
 assert.equal(await verifySiteCredentials('someone-else','incorrect'),false);
 assert.equal(await verifySiteCredentials('nexafivellc','incorrect'),false);
 assert.equal(await verifySiteCredentials(['nexafivellc'],'incorrect'),false);
});

test('oversized login requests are rejected',()=>withAccess(async({base})=>{
 const response=await fetch(base+'/auth/login',{method:'POST',body:new URLSearchParams({username:'a'.repeat(5000),password:'test'}),redirect:'manual'});
 assert.equal(response.status,413);
}));

test('shared sessions survive separate app instances and logout revokes both',async()=>{
 const {memoryAuthStore}=await import('../src/auth/store.js');
 const store=memoryAuthStore();
 await withAccess(async first=>withAccess(async second=>{
  const response=await first.login(),cookie=response.headers.get('set-cookie').split(';')[0];
  assert.equal((await fetch(second.base+'/auth/session',{headers:{cookie}})).status,200);
  await fetch(second.base+'/auth/logout',{method:'POST',headers:{cookie},redirect:'manual'});
  assert.equal((await fetch(first.base+'/auth/session',{headers:{cookie}})).status,401);
 },{store}),{store});
});

test('shared storage retains failed attempts across app instances',async()=>{
 const {memoryAuthStore}=await import('../src/auth/store.js');const store=memoryAuthStore();
 await withAccess(async first=>withAccess(async second=>{
  for(let i=0;i<5;i++)assert.equal((await first.login({password:'wrong'})).status,401);
  for(let i=0;i<5;i++)assert.equal((await second.login({password:'wrong'})).status,401);
  assert.equal((await first.login()).status,429);
 },{store}),{store});
});

test('discipline return URLs survive login and are protected',()=>withAccess(async({base,login})=>{
 assert.equal(safeNext('/science#focus'),'/science#focus');
 assert.equal(safeNext('/research'),'/research');
 const response=await login({next:'/science#focus'});assert.equal(response.headers.get('location'),'/science#focus');
 const cookie=response.headers.get('set-cookie').split(';')[0];
 const page=await fetch(base+'/science',{headers:{cookie}});assert.equal(page.status,200);assert.match(await page.text(),/Science into solutions/);
}));

test('standalone page URLs survive the login gate',()=>withAccess(async({base,login})=>{
 for(const path of ['/about','/services','/industries']){
  const anonymous=await fetch(base+path,{redirect:'manual'});assert.equal(anonymous.headers.get('location'),'/login?next='+encodeURIComponent(path));
  const signedIn=await login({next:path});assert.equal(signedIn.headers.get('location'),path);
 }
}));
