import {useEffect,useRef,useState} from 'react';
import {company,services,industries} from '../content.js';
import {disciplinePages} from './discipline-content.js';
import Glyph from './Glyph.jsx';
import {useInView,pad,reducedMotion} from './motion.js';
import './dev3-about.css';

// Sections unique to the About, Services and Industries pages. Copy is drawn from the shared
// content modules; nothing here adds clients, metrics or claims.

const serviceBySlug=Object.fromEntries(services.map(service=>[service.slug,service]));
const shortName={'battery-engineering':'Battery','lightweight-automotive':'Lightweight','tooling-manufacturing':'Tooling','ai-optimization':'AI / ML','corrosion-mitigation':'Corrosion'};

/* ---------------- About: gyroscope of five disciplines ---------------- */

// Three tilted rings with the five disciplines gliding along them. Decorative; the hero copy carries the meaning.
const C=300,RX=250;
const rings=[{ry:88,tilt:-26,dur:28},{ry:150,tilt:34,dur:36},{ry:214,tilt:92,dur:46}];
const riders=[{ring:0,at:0},{ring:1,at:.2},{ring:2,at:.42},{ring:0,at:.55},{ring:1,at:.74}];
const ringPath=ry=>`M${C-RX} ${C}a${RX} ${ry} 0 1 0 ${RX*2} 0a${RX} ${ry} 0 1 0 ${-RX*2} 0`;
const pointOn=(ry,at)=>{const a=Math.PI+at*Math.PI*2;return[+(C+RX*Math.cos(a)).toFixed(1),+(C-ry*Math.sin(a)).toFixed(1)]};

export function AboutOrbit(){
 const [active,setActive]=useState(0);
 const [moving,setMoving]=useState(false);
 const [held,setHeld]=useState(false);
 const root=useRef(null);
 useEffect(()=>{setMoving(!reducedMotion())},[]);
 useEffect(()=>{
  if(!moving||held)return;
  const timer=setInterval(()=>{if(!document.hidden)setActive(index=>(index+1)%disciplinePages.length)},2800);
  return()=>clearInterval(timer);
 },[moving,held]);
 useEffect(()=>{
  const element=root.current;
  if(!moving||!window.matchMedia('(hover: hover)').matches)return;
  let frame=0;
  const move=event=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const rect=element.getBoundingClientRect();element.style.setProperty('--tx',((event.clientX-rect.left)/rect.width-.5).toFixed(3));element.style.setProperty('--ty',((event.clientY-rect.top)/rect.height-.5).toFixed(3))})};
  const leave=()=>{element.style.setProperty('--tx','0');element.style.setProperty('--ty','0')};
  element.addEventListener('pointermove',move);element.addEventListener('pointerleave',leave);
  return()=>{cancelAnimationFrame(frame);element.removeEventListener('pointermove',move);element.removeEventListener('pointerleave',leave)};
 },[moving]);
 const current=disciplinePages[active];
 return <figure ref={root} className="n5-orbit" data-moving={moving} aria-hidden="true" onPointerEnter={()=>setHeld(true)} onPointerLeave={()=>setHeld(false)}>
  <svg viewBox="0 0 600 600" focusable="false">
   <defs><radialGradient id="n5-orbit-core" cx="50%" cy="38%" r="70%"><stop offset="0" stopColor="var(--orbit-core-a, #ffffff)"/><stop offset="1" stopColor="var(--orbit-core-b, #e6f0f9)"/></radialGradient></defs>
   <circle className="n5-orbit-dust" cx={C} cy={C} r="292"/>
   <circle className="n5-orbit-frame" cx={C} cy={C} r={RX+18}/>
   {rings.map((ring,r)=><g key={r} transform={`rotate(${ring.tilt} ${C} ${C})`}>
    <path className={`n5-orbit-ring n5-orbit-ring-${r}`} d={ringPath(ring.ry)}/>
    {riders.map((rider,i)=>{if(rider.ring!==r)return null;const page=disciplinePages[i];const [x,y]=pointOn(ring.ry,rider.at);
     return <g key={page.slug} className={`n5-orbit-rider${i===active?' is-on':''}`} transform={moving?undefined:`translate(${x} ${y})`}>
      {moving&&<animateMotion dur={`${ring.dur}s`} begin={`${-rider.at*ring.dur}s`} repeatCount="indefinite" path={ringPath(ring.ry)}/>}
      <g transform={`rotate(${-ring.tilt})`}>
       <circle className="n5-orbit-halo" r="20"/><circle className="n5-orbit-dot" r="7"/>
       <text x="16" y="-14">{page.name}</text>
      </g>
     </g>})}
   </g>)}
   <circle className="n5-orbit-glow" cx={C} cy={C} r="120"/>
   <circle className="n5-orbit-core" cx={C} cy={C} r="96" fill="url(#n5-orbit-core)"/>
  </svg>
  <div className="n5-orbit-label"><span>{pad(active)} / 05</span><strong key={current.slug}>{current.name}</strong></div>
 </figure>;
}

/* ---------------- About: scales of work ---------------- */

const scales=[
 {label:'Surface',unit:'nm – µm',title:'Surface & chemistry',text:'Corrosion chemistry, surface treatment, conversion coatings, and adhesion — where many durability questions begin.',services:['corrosion-mitigation']},
 {label:'Interface',unit:'mm',title:'Materials & interfaces',text:'Metals, polymers, composites, and the dissimilar-material joints, coatings, and seals between them.',services:['lightweight-automotive','corrosion-mitigation']},
 {label:'Component',unit:'cm',title:'Parts & tooling',text:'Formed, cast, and molded parts — and the tooling and process decisions that shape them.',services:['tooling-manufacturing','ai-optimization']},
 {label:'System',unit:'m',title:'Modules, packs & structures',text:'Battery modules and packs, multi-material body structures, and their thermal and structural integrity.',services:['battery-engineering','lightweight-automotive']},
 {label:'Lifecycle',unit:'years',title:'Performance over time',text:'Weight, durability, and environmental impact considered across the life of the product.',services:['lightweight-automotive','corrosion-mitigation']}
];
function ScaleArt({index}){
 const art=[
  <g key="a">{[0,1,2,3].flatMap(r=>[0,1,2,3].map(c=><circle key={`${r}${c}`} cx={14+c*12} cy={14+r*12} r="3.2"/>))}</g>,
  <g key="b"><rect x="8" y="12" width="48" height="12" rx="2"/><rect x="8" y="27" width="48" height="6" rx="2" className="n5-art-accent"/><rect x="8" y="36" width="22" height="16" rx="2"/><rect x="34" y="36" width="22" height="16" rx="2"/></g>,
  <g key="c"><path d="M10 44h44M14 44V30l8-10h20l8 10v14"/><path className="n5-art-accent" d="M22 34h20"/></g>,
  <g key="d">{[0,1,2].flatMap(r=>[0,1,2,3].map(c=><rect key={`${r}${c}`} x={9+c*12} y={14+r*12} width="9" height="9" rx="2" className={r===1&&c===2?'n5-art-accent':undefined}/>))}</g>,
  <g key="e"><path d="M32 12a20 20 0 1 1-17.3 10"/><path d="m11 14 3.7 8 8-3.6"/><circle className="n5-art-accent" cx="32" cy="32" r="5"/></g>
 ];
 return <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">{art[index]}</svg>;
}

export function AboutScale(){
 const [active,setActive]=useState(1);
 const current=scales[active];
 return <section id="scale" className="n5-feature n5-scale"><div className="n5-wrap">
  <div className="n5-page-section-head n5-r"><p className="n5-eyebrow">Where we work</p><h2>From the surface<br/><span>to the whole lifecycle.</span></h2><p>Many engineering questions cross scales. We follow a problem from the chemistry of a surface to the behavior of a full system over time.</p></div>
  <div className="n5-scale-track n5-r" data-active={active}>
   <div className="n5-scale-ruler" aria-hidden="true"><span/></div>
   <div className="n5-scale-stops" role="group" aria-label="Scales of engineering work">
    {scales.map((scale,i)=><button key={scale.label} type="button" className={`n5-scale-stop n5-scale-stop-${i}`} aria-pressed={i===active} onClick={()=>setActive(i)} onPointerEnter={event=>{if(event.pointerType==='mouse')setActive(i)}}>
     <span className="n5-scale-lens"><ScaleArt index={i}/></span>
     <span className="n5-scale-label">{scale.label}</span>
     <span className="n5-scale-unit">{scale.unit}</span>
    </button>)}
   </div>
  </div>
  <div className="n5-r"><div className="n5-scale-detail" key={current.label} aria-live="polite">
   <div><p className="n5-scale-kicker">{pad(active)} / 05 · {current.unit}</p><h3>{current.title}</h3><p>{current.text}</p></div>
   <div className="n5-scale-services"><p>Related services</p>{current.services.map(slug=><a key={slug} href={'/services#'+slug}><Glyph name={serviceBySlug[slug].icon}/>{serviceBySlug[slug].title}<Glyph name="arrow"/></a>)}</div>
  </div></div>
 </div></section>;
}

/* ---------------- About: company profile title block ---------------- */

export function AboutProfile(){
 const rows=[
  ['Organization',company.name],
  ['Practice','Engineering & technology consultancy'],
  ['Location',company.location],
  ['Disciplines',disciplinePages.map(page=>page.name).join(' · ')],
  ['Services',<a href="/services">{services.length} engineering services<Glyph name="arrow"/></a>],
  ['Industries',<a href="/industries">{industries.length} sectors served<Glyph name="arrow"/></a>],
  ['Engagement','Concept through production'],
  ['Contact',<span><a href={`mailto:${company.email}`}>{company.email}</a><br/><a href={`tel:${company.phone}`}>{company.phoneDisplay}</a></span>]
 ];
 return <section id="profile" className="n5-feature n5-profile"><div className="n5-wrap">
  <div className="n5-page-section-head n5-r"><p className="n5-eyebrow">At a glance</p><h2>The essentials,<br/><span>drawn to specification.</span></h2></div>
  <div className="n5-titleblock n5-r">
   <span className="n5-titleblock-mark n5-titleblock-mark-tl" aria-hidden="true"/><span className="n5-titleblock-mark n5-titleblock-mark-tr" aria-hidden="true"/><span className="n5-titleblock-mark n5-titleblock-mark-bl" aria-hidden="true"/><span className="n5-titleblock-mark n5-titleblock-mark-br" aria-hidden="true"/>
   <div className="n5-titleblock-head" aria-hidden="true"><span>NexaFive Global — Company profile</span><span>DWG N5-001</span><span>REV A</span><span>SHEET 1 / 1</span></div>
   <dl className="n5-titleblock-grid">{rows.map(([term,value])=><div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
   <p className="n5-titleblock-foot"><span>{company.tagline}</span><span aria-hidden="true">SCALE 1 : 1 · DIMENSIONS IN POSSIBILITIES</span></p>
  </div>
 </div></section>;
}

