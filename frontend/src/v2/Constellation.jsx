import {useEffect,useRef,useState} from 'react';
import {disciplines} from '../content.js';
import Glyph from './Glyph.jsx';
import {reducedMotion,pad} from './motion.js';

// Five discipline nodes on a pentagon (radius 190 around 260,260). Node buttons use matching CSS positions.
const points=[[260,70],[440.7,201.3],[371.7,413.7],[148.3,413.7],[79.3,201.3]];
const glyphs=['atom','gear','flask','layers','leaf'];
const star=`M${points[0]}L${points[2]}L${points[4]}L${points[1]}L${points[3]}Z`;

export default function Constellation({onSelect,initialActive=null}){
 const [active,setActive]=useState(initialActive??0);
 useEffect(()=>{if(initialActive!==null)setActive(initialActive)},[initialActive]);
 const [held,setHeld]=useState(false);
 const root=useRef(null);

 useEffect(()=>{
  if(held||reducedMotion())return;
  let visible=true;
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting});
  observer.observe(root.current);
  const timer=setInterval(()=>{if(visible&&!document.hidden)setActive(index=>(index+1)%points.length)},3600);
  return()=>{clearInterval(timer);observer.disconnect()};
 },[held]);

 useEffect(()=>{
  const element=root.current;
  if(reducedMotion()||!window.matchMedia('(hover: hover)').matches)return;
  let frame=0;
  const move=event=>{
   cancelAnimationFrame(frame);
   frame=requestAnimationFrame(()=>{
    const rect=element.getBoundingClientRect();
    element.style.setProperty('--tx',((event.clientX-rect.left)/rect.width-.5).toFixed(3));
    element.style.setProperty('--ty',((event.clientY-rect.top)/rect.height-.5).toFixed(3));
   });
  };
  const leave=()=>{cancelAnimationFrame(frame);element.style.setProperty('--tx','0');element.style.setProperty('--ty','0')};
  element.addEventListener('pointermove',move);
  element.addEventListener('pointerleave',leave);
  return()=>{cancelAnimationFrame(frame);element.removeEventListener('pointermove',move);element.removeEventListener('pointerleave',leave)};
 },[]);

 const [name,text]=disciplines[active];
 return <figure id="about" className="n5-const" ref={root} data-active={active}
  onPointerEnter={()=>setHeld(true)} onPointerLeave={()=>setHeld(false)}
  onFocus={()=>setHeld(true)} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setHeld(false)}}>
  <div className="n5-const-stage">
   <svg className="n5-const-svg" viewBox="0 0 520 520" aria-hidden="true" focusable="false">
    <defs>
     <radialGradient id="n5-core-fill" cx="50%" cy="38%" r="70%"><stop offset="0" stopColor="#ffffff"/><stop offset="1" stopColor="#e6f0f9"/></radialGradient>
     <linearGradient id="n5-star-stroke" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0e579e"/><stop offset="1" stopColor="#5fa8e6"/></linearGradient>
    </defs>
    <circle className="n5-orbit n5-orbit-outer" cx="260" cy="260" r="240"/>
    <circle className="n5-orbit n5-orbit-mid" cx="260" cy="260" r="190"/>
    <polygon className="n5-penta" points={points.join(' ')}/>
    <path className="n5-star" d={star}/>
    <path className="n5-star-pulse" d={star} pathLength="1"/>
    {points.map(([x,y],i)=><line key={i} className={`n5-spoke${i===active?' is-on':''}`} x1="260" y1="260" x2={x} y2={y}/>)}
    <circle className="n5-core-halo" cx="260" cy="260" r="122"/>
    <circle className="n5-core-disc" cx="260" cy="260" r="104" fill="url(#n5-core-fill)"/>
   </svg>
   {disciplines.map(([discipline],i)=><button key={discipline} type="button" className={`n5-node n5-node-${i}`} aria-pressed={active===i} onClick={()=>{setActive(i);onSelect?.(i)}}>
    <span className="n5-node-ring"><Glyph name={glyphs[i]}/></span><span className="n5-node-label">{discipline}</span>
   </button>)}
   <div className="n5-core" aria-hidden="true"><span className="n5-core-index">{pad(active)}<i>/05</i></span><strong key={active}>{name}</strong></div>
  </div>
  <figcaption className="n5-const-caption" aria-live="polite"><span>{pad(active)} · {name}</span><p key={active}>{text}</p></figcaption>
 </figure>;
}
