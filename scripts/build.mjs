import {mkdir,cp,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {routes,render} from '../views.mjs';
for(const file of ['server.mjs','views.mjs','content.mjs','public/app.js','public/chat.js'])execFileSync(process.execPath,['--check',file],{stdio:'inherit'});
await mkdir('dist',{recursive:true});await cp('public','dist/public',{recursive:true});for(const file of ['server.mjs','views.mjs','content.mjs','package.json'])await cp(file,'dist/'+file);
await mkdir('dist/prerender',{recursive:true});for(const route of routes){const directory='dist/prerender'+(route==='/'?'':route);await mkdir(directory,{recursive:true});await writeFile(directory+'/index.html',render(route))}
console.log('Production package ready: dist/. '+routes.length+' routes rendered. Start with node --env-file-if-exists=.env dist/server.mjs.');
