import {useState} from 'react';
const views=[
 ['Material','Start with the interface.','Metals, composites, coatings, and the connections between them.'],
 ['System','See how it comes together.','Thermal, structural, and manufacturing decisions considered as one system.'],
 ['Performance','Follow the evidence.','Connect testing and validation with durability and production decisions.']
];
export default function SystemSculpture(){
 const [view,setView]=useState(1);
 return <div className="n5-sculpture" data-view={view}>
  <div className="n5-sculpture-caption"><span>THE CONNECTED SYSTEM</span><span>Concept illustration / battery architecture</span></div>
  <svg className="n5-assembly" viewBox="0 0 640 540" role="img" aria-label="Exploded engineering illustration of a battery system: protective surface, battery cells, and structural base">
   <defs>
    <linearGradient id="n5-top" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#edf4fa"/><stop offset="1" stopColor="#92adc3"/></linearGradient>
    <linearGradient id="n5-blue" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3b8cce"/><stop offset="1" stopColor="#0e579e"/></linearGradient>
    <linearGradient id="n5-side" x1="0" x2="1"><stop stopColor="#0a355b"/><stop offset="1" stopColor="#0e579e"/></linearGradient>
    <pattern id="n5-grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0v36" fill="none" stroke="#0e579e" strokeOpacity=".07"/></pattern>
   </defs>
   <path fill="url(#n5-grid)" d="M20 20h600v500H20z"/>
   <g fill="none" stroke="#a2b7c7" strokeWidth=".8"><ellipse cx="320" cy="377" rx="280" ry="133"/><ellipse cx="320" cy="377" rx="245" ry="113" strokeDasharray="3 7"/><path d="M35 377h570M320 230v293"/></g>
   <ellipse cx="320" cy="397" rx="190" ry="70" fill="#0e579e" opacity=".06"/>
   <g className="n5-layer n5-base">
    <path d="m110 351 238-119 198 99-238 119z" fill="#101c26"/>
    <path d="m110 351 198 99v22l-198-99z" fill="#080a0b"/>
    <path d="m308 450 238-119v22L308 472z" fill="#263b4c"/>
    <path d="m132 350 216-108 176 88-216 108z" fill="#1e3d54" stroke="#6d98b7"/>
    {[0,1,2,3,4,5].map(i=><path key={i} d={`m${149+i*32} ${356+i*16} 190-95`} stroke="#83a7c0" strokeWidth="2" opacity=".55"/>)}
   </g>
   <g className="n5-layer n5-cells">
    <path d="m121 270 228-114 185 93-228 114z" fill="url(#n5-side)" stroke="#0e579e"/>
    {[0,1,2,3,4,5].map(row=>[0,1,2,3,4,5,6].map(col=>{
     const x=147+col*29+row*26,y=270-col*14.5+row*13;
     return <g key={`${row}-${col}`}><path d={`M${x} ${y}v-39l19-9.5v39z`} fill="#0d4576" stroke="#74a9d1" strokeWidth=".7"/><path d={`m${x} ${y-39} 19-9.5 15 7.5-19 9.5z`} fill="url(#n5-blue)" stroke="#9fc7e5" strokeWidth=".7"/><path d={`m${x+19} ${y-48.5} 15 7.5v39l-15-7.5z`} fill="#1875b8"/><path d={`m${x+11} ${y-41} 8-4`} stroke="#d4e8f6" strokeWidth="2"/></g>
    }))}
   </g>
   <g className="n5-layer n5-surface">
    <path d="m112 149 237-118 198 99-237 118z" fill="url(#n5-top)" stroke="#91a8ba"/>
    <path d="m112 149 198 99v12L112 161z" fill="#6c8ba2"/>
    <path d="m310 248 237-118v12L310 260z" fill="#b4c9da"/>
    <path d="m134 149 215-107 175 88-215 107z" fill="none" stroke="white" strokeWidth="1.2"/>
    {[0,1,2,3,4].map(i=><path key={i} d={`m${167+i*30} ${149+i*15} 152-76`} stroke="#6a8ea9" strokeWidth="1" opacity=".5"/>)}
    <path d="m274 145 68-34 44 22-68 34z" fill="#0e579e" opacity=".85"/>
    <path d="m296 145 34-17m-26 21 34-17" stroke="#d2e6f5" strokeWidth="2"/>
   </g>
   <g className="n5-guides" fill="none" stroke="#0e579e" strokeWidth="1"><path d="M350 32V14h158M526 229h67v-41M140 376H43v-52" strokeDasharray="3 5"/><circle cx="508" cy="14" r="3" fill="#0e579e"/><circle cx="593" cy="188" r="3" fill="#0e579e"/><circle cx="43" cy="324" r="3" fill="#0e579e"/></g>
   <g className="n5-annotations" fill="#0e579e" fontFamily="Jakarta,Arial,sans-serif" fontSize="9" letterSpacing="1"><text x="422" y="37">01 / SURFACE</text><text x="476" y="181">02 / ENERGY</text><text x="28" y="312">03 / STRUCTURE</text></g>
  </svg>
  <div className="n5-lens-controls" role="group" aria-label="Explore the engineering perspective">{views.map(([name],i)=><button key={name} type="button" aria-pressed={view===i} aria-controls="n5-lens-description" onClick={()=>setView(i)}><span>0{i+1}</span>{name}</button>)}</div>
  <div id="n5-lens-description" className="n5-lens-description" aria-live="polite" aria-atomic="true"><strong>{views[view][1]}</strong><p>{views[view][2]}</p></div>
 </div>;
}
