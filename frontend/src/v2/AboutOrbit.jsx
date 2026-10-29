import {useEffect,useId,useRef,useState} from 'react';
import {disciplinePages} from './discipline-content.js';
import {useInView,pad} from './motion.js';
import Glyph from './Glyph.jsx';
import './about-orbit.css';

const orbits=[
 {rx:194,ry:76,angle:-30},
 {rx:185,ry:100,angle:32},
 {rx:194,ry:91,angle:88}
];
function orbitPath({rx,ry,angle}){
 const radians=angle*Math.PI/180,x=rx*Math.cos(radians),y=rx*Math.sin(radians);
 return `M ${240+x} ${240+y} A ${rx} ${ry} ${angle} 1 1 ${240-x} ${240-y} A ${rx} ${ry} ${angle} 1 1 ${240+x} ${240+y}`;
}
const paths=orbits.map(orbitPath);
const particles=[{orbit:0,duration:26,start:0},{orbit:1,duration:32,start:-7},{orbit:2,duration:29,start:-14},{orbit:0,duration:26,start:-13},{orbit:1,duration:32,start:-23}];

export default function AboutOrbit(){
 const root=useRef(null),svg=useRef(null),inView=useInView(root,.15);
 const [active,setActive]=useState(0),[hovered,setHovered]=useState(false),[focused,setFocused]=useState(false),[reduced,setReduced]=useState(false),[visible,setVisible]=useState(true);
 const unique=useId().replace(/:/g,'');
 const moving=inView&&visible&&!hovered&&!focused&&!reduced;
 const discipline=disciplinePages[active];

 useEffect(()=>{
  const query=window.matchMedia('(prefers-reduced-motion: reduce)');
  const preference=()=>setReduced(query.matches),visibility=()=>setVisible(!document.hidden);
  preference();visibility();
  query.addEventListener('change',preference);document.addEventListener('visibilitychange',visibility);
  return()=>{query.removeEventListener('change',preference);document.removeEventListener('visibilitychange',visibility)};
 },[]);
 useEffect(()=>{
  if(moving)svg.current?.unpauseAnimations?.();else svg.current?.pauseAnimations?.();
 },[moving]);
 useEffect(()=>{
  if(!moving)return;
  const timer=setTimeout(()=>setActive(index=>(index+1)%disciplinePages.length),3800);
  return()=>clearTimeout(timer);
 },[moving,active]);

 return <figure ref={root} className="n5-about-orbit" data-moving={moving} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false)}}>
  <div className="n5-about-orbit-stage" aria-hidden="true">
   <svg ref={svg} viewBox="0 0 480 480" focusable="false">
    <defs><radialGradient id={`orbit-core-${unique}`} cx="40%" cy="30%" r="80%"><stop offset="0" stopColor="var(--orbit-core-light)"/><stop offset="1" stopColor="var(--orbit-core-shade)"/></radialGradient></defs>
    <circle className="n5-about-orbit-perimeter" cx="240" cy="240" r="218"/>
    <circle className="n5-about-orbit-inner-ring" cx="240" cy="240" r="202"/>
    {paths.map((path,index)=><path key={path} d={path} className="n5-about-orbit-track" data-highlight={index===active%3}/>)}
    {particles.map((particle,index)=><g key={index} className="n5-about-orbit-particle" data-active={index===active}><circle className="n5-about-orbit-particle-halo" r="12"/><circle className="n5-about-orbit-particle-dot" r="5"/><animateMotion path={paths[particle.orbit]} dur={`${particle.duration}s`} begin={`${particle.start}s`} repeatCount="indefinite" calcMode="paced"/></g>)}
    <circle className="n5-about-orbit-core-ring" cx="240" cy="240" r="91"/>
    <circle className="n5-about-orbit-core-disc" cx="240" cy="240" r="79" fill={`url(#orbit-core-${unique})`}/>
   </svg>
   <div className="n5-about-orbit-core" key={discipline.slug}><span>{pad(active)} <i>/ 05</i></span><Glyph name={discipline.icon}/><strong>{discipline.name}</strong></div>
  </div>
  <figcaption className="sr-only">Science, Engineering, Research, Material, and Eco: five disciplines connected in one perspective.</figcaption>
  <div className="n5-about-orbit-legend" role="group" aria-label="Explore the five disciplines in the animation">{disciplinePages.map((page,index)=><button type="button" key={page.slug} aria-pressed={active===index} onClick={()=>setActive(index)}><span/>{page.name}</button>)}</div>
 </figure>;
}
