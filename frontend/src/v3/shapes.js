// Procedural point clouds for each chapter. Every shape returns exactly `count` points so the
// particle system can morph between any two. Kinds: 0 structure, 1 highlight, 2 falling ion, 3 signal.

function random(seed){return()=>{seed=seed+0x6d2b79f5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const TAU=Math.PI*2;
const lerp=(a,b,t)=>a+(b-a)*t;

const sphere=(r,R,c=[0,0,0])=>{const u=r()*2-1,a=r()*TAU,s=Math.sqrt(1-u*u);return[c[0]+R*s*Math.cos(a),c[1]+R*u,c[2]+R*s*Math.sin(a)]};
const ball=(r,R,c=[0,0,0])=>{const p=sphere(r,R*Math.cbrt(r()),[0,0,0]);return[c[0]+p[0],c[1]+p[1],c[2]+p[2]]};
const line=(r,a,b,j=0)=>{const t=r();return[lerp(a[0],b[0],t)+(r()-.5)*j,lerp(a[1],b[1],t)+(r()-.5)*j,lerp(a[2],b[2],t)+(r()-.5)*j]};
function boxSurface(r,[cx,cy,cz],w,h,d){
 const faces=[[w*h,'z'],[w*h,'z'],[w*d,'y'],[w*d,'y'],[h*d,'x'],[h*d,'x']];
 let pick=r()*faces.reduce((s,f)=>s+f[0],0),f=0;while(pick>faces[f][0]){pick-=faces[f][0];f++}
 const sign=f%2?1:-1,x=(r()-.5)*w,y=(r()-.5)*h,z=(r()-.5)*d;
 if(faces[f][1]==='z')return[cx+x,cy+y,cz+sign*d/2];
 if(faces[f][1]==='y')return[cx+x,cy+sign*h/2,cz+z];
 return[cx+sign*w/2,cy+y,cz+z];
}
function boxEdges(r,[cx,cy,cz],w,h,d){
 const sx=[-1,1],e=Math.floor(r()*12),t=r()-.5,a=sx[e&1],b=sx[(e>>1)&1];
 if(e<4)return[cx+t*w,cy+a*h/2,cz+b*d/2];
 if(e<8)return[cx+a*w/2,cy+t*h,cz+b*d/2];
 return[cx+a*w/2,cy+b*h/2,cz+t*d];
}
function cylinder(r,[cx,cy,cz],R,h){
 const a=r()*TAU;
 if(r()<.28){const rr=R*Math.sqrt(r());return[cx+rr*Math.cos(a),cy+h/2,cz+rr*Math.sin(a)]}
 return[cx+R*Math.cos(a),cy+(r()-.5)*h,cz+R*Math.sin(a)];
}
// Circle in the XZ plane, then rotated about X and Y.
function ring(r,R,c=[0,0,0],tilt=0,spin=0,j=0,t=r()*TAU){
 let x=R*Math.cos(t)+(r()-.5)*j,y=(r()-.5)*j,z=R*Math.sin(t)+(r()-.5)*j;
 const ct=Math.cos(tilt),st=Math.sin(tilt);[y,z]=[y*ct-z*st,y*st+z*ct];
 const cs=Math.cos(spin),ss=Math.sin(spin);[x,z]=[x*cs+z*ss,-x*ss+z*cs];
 return[c[0]+x,c[1]+y,c[2]+z];
}
function torusZ(r,[cx,cy,cz],R,tube){const u=r()*TAU,v=r()*TAU;return[cx+(R+tube*Math.cos(v))*Math.cos(u),cy+(R+tube*Math.cos(v))*Math.sin(u),cz+tube*Math.sin(v)]}
function polyline(points){
 const lengths=[0];for(let i=1;i<points.length;i++)lengths.push(lengths[i-1]+Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]));
 const total=lengths[lengths.length-1];
 return r=>{const target=r()*total;let i=1;while(lengths[i]<target)i++;const t=(target-lengths[i-1])/(lengths[i]-lengths[i-1]||1);return[lerp(points[i-1][0],points[i][0],t),lerp(points[i-1][1],points[i][1],t)]};
}

function build(count,seed,parts){
 const r=random(seed),positions=new Float32Array(count*3),kinds=new Float32Array(count);
 const total=parts.reduce((sum,part)=>sum+part.weight,0);
 let index=0;
 parts.forEach((part,p)=>{
  const n=p===parts.length-1?count-index:Math.round(count*part.weight/total);
  for(let k=0;k<n&&index<count;k++,index++){const v=part.at(r,k,n);positions.set(v,index*3);kinds[index]=part.kind}
 });
 // Shuffle so each particle travels between unrelated parts of consecutive shapes.
 for(let i=count-1;i>0;i--){const j=Math.floor(r()*(i+1));for(let a=0;a<3;a++){const t=positions[i*3+a];positions[i*3+a]=positions[j*3+a];positions[j*3+a]=t}const t=kinds[i];kinds[i]=kinds[j];kinds[j]=t}
 return{positions,kinds};
}

/* ---------- Geometry shared by shapes and their hotspot anchors ---------- */
const pentagon=Array.from({length:5},(_,i)=>{const a=Math.PI/2+i*TAU/5;return[2.1*Math.cos(a),2.1*Math.sin(a),0]});

const cells=[];for(let row=0;row<4;row++)for(let col=0;col<8;col++)cells.push([-1.82+col*.52,-.14,-.78+row*.52]);

const carTop=[[-2.45,-.15],[-2.4,.18],[-2.1,.32],[-1.2,.42],[-.7,.86],[.45,.92],[1.05,.8],[1.45,.45],[2.25,.34],[2.45,.12],[2.45,-.18]];
const arch=(cx)=>Array.from({length:13},(_,i)=>{const a=i/12*Math.PI;return[cx+.5*Math.cos(a),-.2+.5*Math.sin(a)]});
const carOutline=[...carTop,[1.95,-.2],...arch(1.45),[-.95,-.2],...arch(-1.45),[-2.45,-.15]];
const carWindow=[[-.62,.8],[.42,.86],[.95,.76],[1.25,.47],[-.95,.45],[-.62,.8]];

const layers=[[-2.3,4,.9],[-.8,7,1.5],[.8,7,1.5],[2.3,3,.7]];
const neurons=layers.map(([x,n,R],l)=>Array.from({length:n},(_,j)=>{const a=j/n*TAU+l*.4;return[x,R*Math.cos(a),R*Math.sin(a)]}));
const synapses=neurons.slice(0,-1).flatMap((layer,l)=>layer.flatMap(a=>neurons[l+1].map(b=>[a,b])));

const spiral=s=>{const a=s*2.4*Math.PI-Math.PI/2;return[2*Math.cos(a),-1.6+s*3.2,2*Math.sin(a)]};
const stations=Array.from({length:5},(_,i)=>spiral(.06+i*.22));

const orbits=Array.from({length:5},(_,i)=>({R:1.15+i*.4,tilt:.35+i*.32,spin:i*1.1,phase:i*1.7+.6}));
const planetAt=o=>ring(()=>.5,o.R,[0,0,0],o.tilt,o.spin,0,o.phase);

const H=.55,lattice=[];
for(let i=0;i<7;i++)for(let j=0;j<7;j++)for(let k=0;k<7;k++)if((i+j+k)%2===0)lattice.push([i,j,k]);
const atom=([i,j,k])=>[(i-3)*H,(j-3)*H,(k-3)*H];
const bonds=[];lattice.forEach((a,x)=>lattice.forEach((b,y)=>{if(y>x){const d=[b[0]-a[0],b[1]-a[1],b[2]-a[2]];if(d.every(v=>Math.abs(v)<=1)&&Math.abs(d[0])+Math.abs(d[1])+Math.abs(d[2])===2)bonds.push([atom(a),atom(b)])}}));

// Approximate visual radius of each shape, used by the engine to frame the camera.
export const radii={boundary:2.9,disciplines:2.7,battery:2.35,vehicle:2.55,tooling:2.2,network:2.45,coating:2.25,method:2.45,industries:2.9,lattice:2.5,contact:2.6};

export const anchors={
 boundary:[],
 disciplines:pentagon,
 battery:[[-.25,.4,.25],[1.9,-.75,1.4],[-2.1,1.0,-1.3]],
 vehicle:[[0,.95,0],[.15,.18,.9],[1.45,.32,.9]],
 tooling:[[-1.2,1.05,.82],[.35,-.58,.92],[1.45,.7,.92]],
 network:[neurons[0][1],neurons[1][2],neurons[3][0]],
 coating:[[0,-1.05,1.02],[-1.65,.1,1.02],[1.45,.6,1.02]],
 method:stations,
 industries:orbits.map(planetAt),
 lattice:[atom([0,0,0]),atom([6,0,6]),atom([0,6,6]),atom([6,6,0])],
 contact:[]
};

/* ---------- Shapes ---------- */
const shapes={
 boundary:count=>build(count,11,[
  {weight:.16,kind:1,at:r=>boxEdges(r,[0,0,0],3.4,3.4,3.4)},
  {weight:.3,kind:0,at:r=>ball(r,1.15)},
  {weight:.44,kind:3,at:r=>{const d=sphere(r,1),R=1.25+Math.pow(r(),.65)*3.9;return[d[0]*R,d[1]*R,d[2]*R]}},
  {weight:.1,kind:0,at:r=>sphere(r,4.8)}
 ]),
 disciplines:count=>build(count,12,[
  {weight:.4,kind:1,at:(r,k)=>ball(r,.34,pentagon[k%5])},
  {weight:.22,kind:3,at:(r,k)=>line(r,pentagon[k%5],pentagon[(k+2)%5],.03)},
  {weight:.14,kind:0,at:(r,k)=>line(r,pentagon[k%5],pentagon[(k+1)%5],.04)},
  {weight:.1,kind:1,at:r=>sphere(r,.55)},
  {weight:.14,kind:0,at:r=>ring(r,2.9,[0,0,0],Math.PI/2,0,.06)}
 ]),
 battery:count=>build(count,13,[
  {weight:.18,kind:0,at:r=>boxSurface(r,[0,-.75,0],4.4,.22,2.8)},
  {weight:.62,kind:1,at:r=>cylinder(r,cells[Math.floor(r()*cells.length)],.17,1)},
  {weight:.1,kind:3,at:(r,k)=>{const z=-.75+(k%4)*.5;return line(r,[-1.75,.38,z],[1.75,.38,z],.02)}},
  {weight:.1,kind:0,at:r=>boxEdges(r,[0,1,0],4.4,.05,2.8)}
 ]),
 vehicle:count=>{const side=polyline(carOutline),top=polyline(carTop),glass=polyline(carWindow);return build(count,14,[
  {weight:.3,kind:1,at:r=>{const[x,y]=side(r);return[x,y,r()<.5?-.88:.88]}},
  {weight:.22,kind:0,at:r=>{const[x,y]=top(r),z=(r()*2-1)*.88,f=1-.12*(z/.88)**2;return[x*(1-.03*(z/.88)**2),-.2+(y+.2)*f,z]}},
  {weight:.1,kind:3,at:r=>{const[x,y]=glass(r);return[x,y,r()<.5?-.86:.86]}},
  {weight:.3,kind:1,at:(r,k)=>torusZ(r,[k%2?1.45:-1.45,-.2,(k>>1)%2?.85:-.85],.38,.08)},
  {weight:.08,kind:0,at:r=>{const a=r()*TAU,s=Math.sqrt(r());return[2.9*s*Math.cos(a),-.62,1.5*s*Math.sin(a)]}}
 ])},
 tooling:count=>build(count,15,[
  {weight:.12,kind:0,at:r=>boxSurface(r,[0,1.55,0],3.2,.35,2)},
  {weight:.14,kind:0,at:r=>boxSurface(r,[0,1.05,0],2.4,.6,1.6)},
  {weight:.1,kind:1,at:r=>boxSurface(r,[0,.55,0],1.1,.4,1.1)},
  {weight:.16,kind:0,at:r=>boxSurface(r,[0,-1,0],2.4,.9,1.6)},
  {weight:.06,kind:3,at:r=>boxEdges(r,[0,-.62,0],1.2,.2,1.2)},
  {weight:.2,kind:1,at:r=>{const x=(r()-.5)*2.8,z=(r()-.5)*1.8,b=s=>Math.abs(s)<.6?1:Math.max(0,1-(Math.abs(s)-.6)/.25);return[x,-.4-.22*b(x)*b(z),z]}},
  {weight:.12,kind:3,at:(r,k)=>cylinder(r,[k%2?1.45:-1.45,.2,(k>>1)%2?.9:-.9],.07,3.2)},
  {weight:.1,kind:0,at:r=>boxEdges(r,[0,-1.62,0],3.4,.3,2.2)}
 ]),
 network:count=>build(count,16,[
  {weight:.3,kind:1,at:r=>{const layer=neurons[Math.floor(r()*neurons.length)];return ball(r,.11,layer[Math.floor(r()*layer.length)])}},
  {weight:.55,kind:3,at:r=>{const[a,b]=synapses[Math.floor(r()*synapses.length)];return line(r,a,b,.015)}},
  {weight:.15,kind:0,at:r=>sphere(r,3.3)}
 ]),
 coating:count=>build(count,17,[
  {weight:.15,kind:0,at:r=>boxSurface(r,[-.82,-1.05,0],1.6,.6,2)},
  {weight:.15,kind:0,at:r=>boxSurface(r,[.82,-1.05,0],1.6,.6,2)},
  {weight:.04,kind:3,at:r=>[0,-1.35+r()*.6,(r()-.5)*2]},
  {weight:.15,kind:1,at:r=>[(r()-.5)*3.3,-.38+(r()-.5)*.03,(r()-.5)*2]},
  {weight:.16,kind:3,at:r=>{const x=(r()-.5)*3.3;return[x,.1+.05*Math.sin(x*5)+(r()-.5)*.03,(r()-.5)*2]}},
  {weight:.18,kind:1,at:r=>[(r()-.5)*3.3,.6+(r()-.5)*.03,(r()-.5)*2]},
  {weight:.12,kind:2,at:r=>[(r()-.5)*3.1,.64,(r()-.5)*1.8]},
  {weight:.05,kind:0,at:r=>sphere(r,3.6)}
 ]),
 method:count=>build(count,18,[
  {weight:.3,kind:0,at:r=>{const p=spiral(r());return[p[0]+(r()-.5)*.04,p[1]+(r()-.5)*.04,p[2]+(r()-.5)*.04]}},
  {weight:.35,kind:1,at:(r,k)=>{const c=stations[k%5],a=r()*TAU,R=.3;return[c[0]+R*Math.cos(a),c[1]+R*Math.sin(a),c[2]+(r()-.5)*.03]}},
  {weight:.15,kind:3,at:(r,k)=>ball(r,.12,stations[k%5])},
  {weight:.05,kind:0,at:r=>[0,-1.8+r()*3.6,0]},
  {weight:.15,kind:0,at:r=>ring(r,2.5,[0,-1.8,0],0,0,.05)}
 ]),
 industries:count=>build(count,19,[
  {weight:.12,kind:3,at:r=>sphere(r,.55)},
  {weight:.5,kind:0,at:(r,k)=>{const o=orbits[k%5];return ring(r,o.R,[0,0,0],o.tilt,o.spin,.03)}},
  {weight:.3,kind:1,at:(r,k)=>ball(r,.17,planetAt(orbits[k%5]))},
  {weight:.08,kind:0,at:r=>sphere(r,4.2)}
 ]),
 lattice:count=>build(count,20,[
  {weight:.55,kind:1,at:r=>ball(r,.09,atom(lattice[Math.floor(r()*lattice.length)]))},
  {weight:.35,kind:0,at:r=>{const[a,b]=bonds[Math.floor(r()*bonds.length)];return line(r,a,b,.01)}},
  {weight:.1,kind:3,at:r=>{const plane=lattice.filter(([i,j,k])=>i+j+k===10);return ball(r,.14,atom(plane[Math.floor(r()*plane.length)]))}}
 ]),
 contact:count=>build(count,21,[
  {weight:.55,kind:0,at:r=>sphere(r,1.9)},
  {weight:.2,kind:1,at:(r,k)=>line(r,pentagon[k%5].map(v=>v*1.25),pentagon[(k+1)%5].map(v=>v*1.25),.03)},
  {weight:.15,kind:3,at:r=>ring(r,3.05,[0,0,0],1.15,.4,.04)},
  {weight:.1,kind:1,at:r=>ball(r,.5)}
 ])
};

export function generate(name,count){return shapes[name](count)}
