import {useEffect,useRef,useState} from 'react';
import {services} from '../content.js';
import Glyph from './Glyph.jsx';
import {useInView,pad,reducedMotion} from './motion.js';
import './about-lower.css';

// Everything below the About hero. Copy is the company's own wording from nexafiveglobal.com;
// claims that still need verification (OEM approval, accreditation, partnerships) are left out.

const serviceBySlug=Object.fromEntries(services.map(service=>[service.slug,service]));

/* ---------------- Where science meets engineering excellence ---------------- */

const commitments=[
 ['layers','End-to-end, without gaps','From first concept to a production-validated fix, with no discontinuity between diagnosis and implementation.'],
 ['atom','Science, engineering & research together','The three are combined at every critical decision point rather than handed off in sequence.'],
 ['leaf','Lifecycle-conscious by design','Lightweight design, reduced waste, and materials chosen for the life of the product.']
];

export function AboutStory(){
 return <section id="story" className="n5-story"><div className="n5-wrap n5-story-grid">
  <div className="n5-story-lead n5-r">
   <p className="n5-eyebrow">Who we are</p>
   <h2>Where science meets<br/><span>engineering excellence.</span></h2>
   <p>We deliver end-to-end solutions for the most demanding challenges in mobility, energy, and industry — from concept through production. As the technical partner at every critical decision point, we combine Science, Engineering, and Research to push the boundaries of what’s possible.</p>
  </div>
  <ol className="n5-story-points">{commitments.map(([icon,title,text],i)=><li key={title}>
   <span className="n5-story-num">{pad(i)}</span>
   <span className="n5-story-icon"><Glyph name={icon}/></span>
   <div><h3>{title}</h3><p>{text}</p></div>
  </li>)}</ol>
 </div></section>;
}

/* ---------------- From the surface to the whole lifecycle: zoom lens ---------------- */

const scales=[
 {label:'Surface',zoom:'Atomic & surface',title:'Surface & chemistry',text:'Corrosion chemistry, surface treatment, conversion coatings, and adhesion — where many durability questions begin.',services:['corrosion-mitigation']},
 {label:'Interface',zoom:'Cross-section',title:'Materials & interfaces',text:'Metals, polymers, composites, and the dissimilar-material joints, coatings, and seals between them.',services:['lightweight-automotive','corrosion-mitigation']},
 {label:'Component',zoom:'Part',title:'Parts & tooling',text:'Formed, cast, and molded parts — and the tooling and process decisions that shape them.',services:['tooling-manufacturing','ai-optimization']},
 {label:'System',zoom:'Assembly',title:'Modules, packs & structures',text:'Battery modules and packs, multi-material body structures, and their thermal and structural integrity.',services:['battery-engineering','lightweight-automotive']},
 {label:'Lifecycle',zoom:'Over time',title:'Performance over time',text:'Weight, durability, and environmental impact considered across the life of the product.',services:['lightweight-automotive','corrosion-mitigation']}
];

function LensArt({index}){
 if(index===0){ // atomic lattice under a coating, with a pit forming
  const atoms=[];for(let r=0;r<6;r++)for(let c=0;c<8;c++){const x=62+c*25+(r%2?12.5:0),y=110+r*22;if(Math.hypot(x-150,y-118)<20)continue;atoms.push(<circle key={`${r}-${c}`} cx={x} cy={y} r="8" className={r===0?'n5-lens-accent':undefined}/>)}
  return <g><rect x="40" y="70" width="220" height="16" rx="4" className="n5-lens-coat"/>{atoms}<circle cx="150" cy="118" r="20" className="n5-lens-pit"/></g>;
 }
 if(index===1)return <g>{/* dissimilar metals joined under coating, adhesive and seal */}
  <rect x="40" y="76" width="220" height="14" rx="3" className="n5-lens-coat"/>
  <rect x="40" y="94" width="220" height="10" className="n5-lens-accent-fill"/>
  <rect x="40" y="108" width="108" height="120" rx="4"/><rect x="152" y="108" width="108" height="120" rx="4" className="n5-lens-alt"/>
  <path d="M150 104v128" className="n5-lens-seam"/><path d="M70 150h50M70 170h40M182 150h50M182 170h40" className="n5-lens-hatch"/>
 </g>;
 if(index===2)return <g>{/* formed bracket with dimension lines */}
  <path d="M60 210h180v-24h-40l-20-70H120l-20 70H60z" />
  <circle cx="150" cy="160" r="12" className="n5-lens-hole"/>
  <path d="M60 236h180M60 230v12M240 230v12M260 116v94M254 116h12M254 210h12" className="n5-lens-dim"/>
  <path d="M100 186h100" className="n5-lens-accent-line"/>
 </g>;
 if(index===3)return <g>{/* battery module: cells, busbars and tray */}
  <rect x="52" y="86" width="196" height="150" rx="10" className="n5-lens-tray"/>
  {[0,1,2].flatMap(r=>[0,1,2,3,4].map(c=><rect key={`${r}-${c}`} x={66+c*36} y={100+r*42} width="28" height="34" rx="5" className={r===1&&c===2?'n5-lens-accent-fill':undefined}/>))}
  <path d="M66 96h168M66 240h168" className="n5-lens-accent-line"/>
 </g>;
 return <g>{/* lifecycle loop: design, build, use, renew */}
  <circle cx="150" cy="160" r="78" className="n5-lens-loop"/>
  <path d="m214 112 14 6-4 15" className="n5-lens-loop"/>
  {[[150,82],[228,160],[150,238],[72,160]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===1?13:10} className={i===1?'n5-lens-accent-fill':undefined}/>)}
  <circle cx="150" cy="160" r="26" className="n5-lens-accent-fill"/>
 </g>;
}

export function AboutZoom(){
 const [active,setActive]=useState(0);
 const [auto,setAuto]=useState(true);
 const section=useRef(null),inView=useInView(section,.35);
 useEffect(()=>{if(reducedMotion())setAuto(false)},[]);
 useEffect(()=>{
  if(!auto||!inView)return;
  const timer=setInterval(()=>{if(!document.hidden)setActive(index=>(index+1)%scales.length)},4500);
  return()=>clearInterval(timer);
 },[auto,inView]);
 const choose=index=>{setAuto(false);setActive(index)};
 const current=scales[active];
 return <section ref={section} id="scale" className="n5-zoom" data-playing={auto&&inView}><div className="n5-wrap">
  <div className="n5-zoom-head n5-r"><div><p className="n5-eyebrow">Where we work</p><h2>From the surface<br/><span>to the whole lifecycle.</span></h2></div><p>Many engineering questions cross scales. We follow a problem from the chemistry of a surface to the behavior of a full system over time.</p></div>
  <div className="n5-zoom-stage n5-r">
   <figure className="n5-lens" aria-hidden="true">
    <svg className="n5-lens-ring" viewBox="0 0 400 400" focusable="false">
     <circle cx="200" cy="200" r="194"/>
     {Array.from({length:72},(_,i)=>{const a=i/72*Math.PI*2,long=i%6===0,r1=long?176:184;return <line key={i} x1={200+r1*Math.cos(a)} y1={200+r1*Math.sin(a)} x2={200+190*Math.cos(a)} y2={200+190*Math.sin(a)} className={long?'is-long':undefined}/>})}
    </svg>
    <div className="n5-lens-glass">
     {scales.map((scale,i)=><svg key={scale.label} viewBox="0 0 300 300" className="n5-lens-art" data-active={i===active} data-dir={i<active?'out':'in'} focusable="false"><LensArt index={i}/></svg>)}
     <span className="n5-lens-tag">{current.zoom}</span>
    </div>
   </figure>
   <div className="n5-zoom-copy" key={current.label} aria-live="polite">
    <p className="n5-zoom-kicker">{pad(active)} / 05 · {current.label}</p>
    <h3>{current.title}</h3>
    <p>{current.text}</p>
    <p className="n5-zoom-label">Related services</p>
    <div className="n5-zoom-services">{current.services.map(slug=><a key={slug} href={'/services#'+slug}><Glyph name={serviceBySlug[slug].icon}/>{serviceBySlug[slug].title}<Glyph name="arrow"/></a>)}</div>
   </div>
  </div>
  <div className="n5-ruler n5-r" data-active={active}>
   <div className="n5-ruler-scale" aria-hidden="true">{Array.from({length:41},(_,i)=><i key={i} className={i%10===0?'is-major':undefined}/>)}<span className="n5-ruler-marker"/></div>
   <div className="n5-ruler-stops" role="group" aria-label="Scales of engineering work">
    {scales.map((scale,i)=><button key={scale.label} type="button" aria-pressed={i===active} onClick={()=>choose(i)}>
     <strong>{scale.label}</strong>
     <i className="n5-ruler-progress" aria-hidden="true"><b key={i===active?`run-${active}`:'idle'}/></i>
    </button>)}
   </div>
  </div>
 </div></section>;
}
