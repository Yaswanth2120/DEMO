import {useEffect,useRef,useState} from 'react';
import {services} from '../../content.js';
import Glyph from '../Glyph.jsx';

// Hero visual for Services: the five services feeding one application. Cycles through the services,
// pauses on hover, and selecting one opens it in the service panel below.
const C={x:240,y:200},R=150;
const nodes=services.map((_,i)=>{const a=-Math.PI/2+i*Math.PI*2/5;return{x:+(C.x+R*Math.cos(a)).toFixed(1),y:+(C.y+R*Math.sin(a)).toFixed(1)}});
const curve=({x,y})=>{const mx=(x+C.x)/2,my=(y+C.y)/2,dx=C.y-y,dy=x-C.x;return`M${x} ${y}Q${(mx+dx*.18).toFixed(1)} ${(my+dy*.18).toFixed(1)} ${C.x} ${C.y}`};

export default function ServiceHub({onSelect}){
 const [active,setActive]=useState(0);
 const [held,setHeld]=useState(false);
 const [moving,setMoving]=useState(false);
 const root=useRef(null);
 useEffect(()=>{setMoving(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)},[]);
 useEffect(()=>{
  if(!moving||held)return;
  let visible=true;const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting});observer.observe(root.current);
  const timer=setInterval(()=>{if(visible&&!document.hidden)setActive(i=>(i+1)%services.length)},2800);
  return()=>{clearInterval(timer);observer.disconnect()};
 },[moving,held]);
 const service=services[active];
 return <figure ref={root} className="sh" data-moving={moving} onPointerEnter={()=>setHeld(true)} onPointerLeave={()=>setHeld(false)}>
  <div className="sh-stage">
   <svg viewBox="0 0 480 400" aria-hidden="true" focusable="false">
    <circle className="sh-orbit" cx={C.x} cy={C.y} r={R}/>
    <circle className="sh-orbit sh-orbit-outer" cx={C.x} cy={C.y} r={R+28}/>
    {nodes.map((n,i)=><g key={i} className={`sh-link${i===active?' is-on':''}`}>
     <path d={curve(n)} className="sh-path"/>
     <path d={curve(n)} className="sh-pulse" pathLength="1"/>
    </g>)}
    <circle className="sh-core-halo" cx={C.x} cy={C.y} r="62"/>
    <circle className="sh-core" cx={C.x} cy={C.y} r="50"/>
   </svg>
   <div className="sh-core-label" aria-hidden="true"><small>Your</small>application</div>
   {services.map((item,i)=><button key={item.slug} type="button" className={`sh-node sh-node-${i}`} aria-pressed={i===active} aria-label={item.title} onClick={()=>{setActive(i);onSelect?.(i)}} onFocus={()=>setActive(i)}>
    <Glyph name={item.icon}/><span>{item.category}</span>
   </button>)}
  </div>
  <figcaption className="sh-caption" aria-live="polite" key={service.slug}><span>0{active+1} / 05 · {service.category}</span><strong>{service.title}</strong><p>{service.short}</p></figcaption>
 </figure>;
}
