import {spawn} from 'node:child_process';
const children=['backend','frontend'].map(workspace=>spawn('npm',['run','dev','--workspace',workspace],{stdio:'inherit'}));
let stopping=false;
function stop(code=0){if(stopping)return;stopping=true;for(const child of children)child.kill('SIGTERM');setTimeout(()=>process.exit(code),250).unref()}
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>stop());
for(const child of children)child.on('exit',code=>{if(!stopping)stop(code||0)});
