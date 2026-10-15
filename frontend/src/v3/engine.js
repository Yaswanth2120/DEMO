import {AdditiveBlending,BufferAttribute,BufferGeometry,Group,PerspectiveCamera,Points,Scene,ShaderMaterial,Vector3,WebGLRenderer} from 'three';
import {generate,anchors as shapeAnchors,radii} from './shapes.js';

const vertexShader=`
uniform float uMix;uniform float uTime;uniform float uSize;uniform float uPixelRatio;uniform float uMotion;
attribute vec3 aFrom;attribute float aSeed;attribute float aKindFrom;attribute float aKindTo;
varying float vKind;varying float vFade;varying float vPulse;
void main(){
 float t=clamp(uMix*1.5-aSeed*.5,0.,1.);t=t*t*(3.-2.*t);
 vec3 p=mix(aFrom,position,t);
 float flight=sin(3.14159265*t);
 p+=vec3(sin(aSeed*91.7+uTime*.7),cos(aSeed*53.1+uTime*.6),sin(aSeed*27.3+uTime*.8))*flight*1.15;
 float kind=t<.5?aKindFrom:aKindTo;
 vFade=1.;
 if(kind>1.5&&kind<2.5){float f=fract(uTime*.22*uMotion+aSeed*13.);p.y+=(1.-f)*1.7*t;vFade=smoothstep(0.,.12,f)*smoothstep(1.,.86,f);}
 vPulse=kind>2.5?pow(fract(aSeed*7.-uTime*.35*uMotion),10.):0.;
 p+=uMotion*.018*vec3(sin(uTime*1.3+aSeed*40.),cos(uTime*1.1+aSeed*30.),sin(uTime*.9+aSeed*20.));
 vec4 mv=modelViewMatrix*vec4(p,1.);
 gl_Position=projectionMatrix*mv;
 float size=uSize*(.55+aSeed*.9)*(1.+vPulse*1.8)*((kind>.5&&kind<1.5)?1.25:1.);
 gl_PointSize=size*uPixelRatio/-mv.z;
 vKind=kind;
}`;

const fragmentShader=`
uniform float uAlpha;varying float vKind;varying float vFade;varying float vPulse;
void main(){
 float d=length(gl_PointCoord-.5);if(d>.5)discard;
 float a=smoothstep(.5,0.,d);a*=a;
 vec3 color=vec3(.24,.52,.86);float strength=.5;
 if(vKind>.5&&vKind<1.5){color=vec3(.72,.86,1.);strength=.8;}
 else if(vKind>1.5&&vKind<2.5){color=vec3(1.);strength=.95*vFade;}
 else if(vKind>2.5){color=mix(vec3(.16,.46,.9),vec3(.92,.97,1.),vPulse);strength=.45+vPulse*.55;}
 gl_FragColor=vec4(color*a*strength*uAlpha,1.);
}`;

const ease=t=>1-Math.pow(1-t,3);

export function createEngine(canvas,{chapters,onFrame,mobile=false,reduced=false}){
 const renderer=new WebGLRenderer({canvas,antialias:false,alpha:false,powerPreference:'high-performance'});
 const pixelRatio=Math.min(window.devicePixelRatio||1,mobile?1.6:2);
 renderer.setPixelRatio(pixelRatio);
 // Opaque canvas: additive light needs a solid ground; CSS glow is screened on top.
 renderer.setClearColor(0x04070b,1);

 const scene=new Scene();
 const camera=new PerspectiveCamera(mobile?46:38,1,.1,100);
 const group=new Group();scene.add(group);

 const count=mobile?11000:24000;
 const shapes=chapters.map(chapter=>generate(chapter.shape,count));
 const seeds=new Float32Array(count);for(let i=0;i<count;i++)seeds[i]=Math.random();

 const geometry=new BufferGeometry();
 const to=new Float32Array(shapes[0].positions),from=new Float32Array(shapes[0].positions);
 const kindTo=new Float32Array(shapes[0].kinds),kindFrom=new Float32Array(shapes[0].kinds);
 geometry.setAttribute('position',new BufferAttribute(to,3));
 geometry.setAttribute('aFrom',new BufferAttribute(from,3));
 geometry.setAttribute('aSeed',new BufferAttribute(seeds,1));
 geometry.setAttribute('aKindFrom',new BufferAttribute(kindFrom,1));
 geometry.setAttribute('aKindTo',new BufferAttribute(kindTo,1));

 const uniforms={uMix:{value:1},uTime:{value:0},uSize:{value:mobile?20:24},uPixelRatio:{value:pixelRatio},uMotion:{value:reduced?0:1},uAlpha:{value:0}};
 const material=new ShaderMaterial({vertexShader,fragmentShader,uniforms,transparent:true,depthWrite:false,blending:AdditiveBlending});
 const points=new Points(geometry,material);points.frustumCulled=false;group.add(points);

 const state={chapter:0,mix:1,duration:reduced?.25:1.9,spin:0,dragX:0,dragY:0,velX:0,velY:0,px:0,py:0,rx:0,ry:0,z:10,ox:0,oy:0,wide:true};
 let view=chapters[0].view,anchorList=shapeAnchors[chapters[0].shape]||[];
 const projected=new Vector3();

 function resize(){
  const width=canvas.clientWidth||window.innerWidth,height=canvas.clientHeight||window.innerHeight;
  renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();
  state.wide=width>960;
 }
 resize();

 function setChapter(index){
  if(index===state.chapter)return;
  // Freeze the current visual blend as the new start so interrupted morphs never jump.
  const t0=Math.min(1,state.mix);
  for(let i=0;i<count;i++){
   let t=Math.min(1,Math.max(0,t0*1.5-seeds[i]*.5));t=t*t*(3-2*t);
   for(let a=0;a<3;a++){const k=i*3+a;from[k]=from[k]+(to[k]-from[k])*t}
   kindFrom[i]=t<.5?kindFrom[i]:kindTo[i];
  }
  to.set(shapes[index].positions);kindTo.set(shapes[index].kinds);
  for(const name of ['position','aFrom','aKindFrom','aKindTo'])geometry.attributes[name].needsUpdate=true;
  state.mix=0;state.chapter=index;view=chapters[index].view;anchorList=shapeAnchors[chapters[index].shape]||[];
  state.dragX*=.3;state.dragY*=.3;
 }

 let frame=0,last=performance.now(),running=true;
 function tick(now){
  frame=requestAnimationFrame(tick);
  if(!running)return;
  const dt=Math.min(.05,(now-last)/1000);last=now;
  uniforms.uTime.value+=dt;
  uniforms.uAlpha.value=Math.min(1,uniforms.uAlpha.value+dt*.8);
  state.mix=Math.min(1.0001,state.mix+dt/state.duration);
  uniforms.uMix.value=ease(Math.min(1,state.mix));
  if(!reduced)state.spin+=dt*(view.spin||0);
  state.dragX+=state.velX;state.dragY+=state.velY;state.velX*=.92;state.velY*=.92;
  state.dragY=Math.max(-.9,Math.min(.9,state.dragY));
  const targetY=view.ry+state.spin+state.dragX+(reduced?0:state.px*.25);
  const targetX=view.rx+state.dragY+(reduced?0:state.py*.15);
  state.ry+=(targetY-state.ry)*.06;state.rx+=(targetX-state.rx)*.06;
  // Frame the model in the free area: right of the panel on wide screens, above the sheet on phones.
  const half=Math.tan(camera.fov*Math.PI/360),aspect=camera.aspect;
  let fit,ox,oy;
  if(!state.wide){fit=Math.min(.44,.95*aspect);ox=0;oy=view.center?.1:.44}
  else if(view.center){fit=.8;ox=0;oy=0}
  else{fit=Math.min(.8,.5*aspect);ox=.33*aspect;oy=-.02}
  const targetZ=radii[chapters[state.chapter].shape]*(view.zoom||1)/(fit*half);
  state.z+=(targetZ-state.z)*.05;state.ox+=(ox-state.ox)*.05;state.oy+=(oy-state.oy)*.05;
  const visible=half*state.z;
  group.rotation.set(state.rx,state.ry,0);
  group.position.set(state.ox*visible,state.oy*visible,0);
  camera.position.set(0,0,state.z);camera.lookAt(0,0,0);
  renderer.render(scene,camera);
  if(onFrame&&anchorList.length){
   const width=canvas.clientWidth,height=canvas.clientHeight;
   group.updateMatrixWorld();
   onFrame(anchorList.map(a=>{projected.set(a[0],a[1],a[2]).applyMatrix4(group.matrixWorld);const depth=projected.z;projected.project(camera);return{x:(projected.x*.5+.5)*width,y:(-projected.y*.5+.5)*height,front:depth>group.position.z-.4}}),Math.min(1,state.mix));
  }
 }
 frame=requestAnimationFrame(tick);

 const onVisibility=()=>{running=!document.hidden;last=performance.now()};
 document.addEventListener('visibilitychange',onVisibility);

 return{
  setChapter,
  resize,
  setPointer(x,y){state.px=x;state.py=y},
  drag(dx,dy){state.velX=dx*.004;state.velY=dy*.003},
  dispose(){cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',onVisibility);geometry.dispose();material.dispose();renderer.dispose()}
 };
}
