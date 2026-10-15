import {useEffect,useRef,useState} from 'react';
import {process} from '../content.js';
import Glyph from './Glyph.jsx';
import {reducedMotion,useInView,pad} from './motion.js';

const solutions=[
 ['gear','Engineering','Design with the next step in mind.','Battery systems, lightweight structures, tooling, and multi-material assemblies — with manufacturability and durability considered together.'],
 ['flask','Research & validation','Turn evidence into direction.','Diagnostic testing, root-cause analysis, surface treatment, adhesion, sealing, and failure analysis connected to practical decisions.'],
 ['nodes','Materials intelligence','Make informed trade-offs.','AI/ML guidance for material selection, stamping, structural integrity, corrosion risk, and part performance.']
];

export default function Method(){
 const [step,setStep]=useState(0);
 const [auto,setAuto]=useState(true);
 const section=useRef(null),stations=useRef([]);
 const inView=useInView(section,.4);

 useEffect(()=>{
  if(!auto||!inView||reducedMotion())return;
  const timer=setInterval(()=>{if(!document.hidden)setStep(index=>(index+1)%process.length)},4200);
  return()=>clearInterval(timer);
 },[auto,inView]);

 const choose=(index,focus=false)=>{setAuto(false);setStep(index);if(focus)stations.current[index]?.focus()};
 const onKeyDown=event=>{
  const keys={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1};
  if(!(event.key in keys))return;
  event.preventDefault();choose((step+keys[event.key]+process.length)%process.length,true);
 };

 return <section id="process" ref={section} className="n5-method" data-tone="light">
  <div className="n5-wrap">
   <header className="n5-head n5-head-row n5-r">
    <div><p className="n5-eyebrow">The method</p><h2>Find the cause.<br/><span>Follow it through.</span></h2></div>
    <p>Our corrosion-resolution approach connects investigation and engineering with validation and implementation. The work continues beyond the diagnosis.</p>
   </header>
   <div className="n5-track n5-r" data-step={step}>
    <div className="n5-track-rail" aria-hidden="true"><span/></div>
    <div className="n5-track-stations" role="tablist" aria-label="Five-step engineering process" onKeyDown={onKeyDown}>
     {process.map(([title],i)=><button key={title} ref={node=>{stations.current[i]=node}} type="button" role="tab" id={`n5-step-${i}`} aria-selected={i===step} aria-controls={`n5-step-panel-${i}`} tabIndex={i===step?0:-1} className="n5-station" data-done={i<step} onClick={()=>choose(i)}>
      <span className="n5-station-dot">{i+1}</span><span className="n5-station-label">{title}</span>
     </button>)}
    </div>
   </div>
   <div className="n5-steps n5-r">
    {process.map(([title,text],i)=><div key={title} id={`n5-step-panel-${i}`} role="tabpanel" aria-labelledby={`n5-step-${i}`} className="n5-step" data-active={i===step} inert={i!==step}>
     <span className="n5-step-num" aria-hidden="true">{pad(i)}</span>
     <div><h3>{title}</h3><p>{text}</p></div>
    </div>)}
   </div>
   <div id="solutions" className="n5-solutions">
    <p className="n5-eyebrow n5-r">Integrated solutions — think beyond a single discipline</p>
    <div className="n5-solution-grid">
     {solutions.map(([icon,label,title,text])=><article key={label} className="n5-solution n5-glow n5-r"><span className="n5-solution-icon"><Glyph name={icon}/></span><small>{label}</small><h3>{title}</h3><p>{text}</p></article>)}
    </div>
   </div>
  </div>
 </section>;
}
