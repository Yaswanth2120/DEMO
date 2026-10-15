import {useEffect,useRef,useState} from 'react';
import {services} from '../content.js';
import Glyph from './Glyph.jsx';
import Illustration from './Illustrations.jsx';
import {enquire} from './Enquiry.jsx';
import {reducedMotion,useInView,pad,scrollToHash} from './motion.js';

const subjectFor={'battery-engineering':'Energy / BEV engineering','lightweight-automotive':'Engineering consultation','tooling-manufacturing':'Manufacturing and tooling support','ai-optimization':'AI/ML platform inquiry','corrosion-mitigation':'Corrosion testing and mitigation'};

export default function Capabilities(){
 const [active,setActive]=useState(0);
 const [playing,setPlaying]=useState(true);
 const section=useRef(null),tabs=useRef([]);
 const inView=useInView(section,.35);

 useEffect(()=>{
  if(reducedMotion())setPlaying(false);
  const open=slug=>{const index=services.findIndex(service=>service.slug===slug);if(index>=0){setActive(index);setPlaying(false);return true}return false};
  const fromHash=()=>open(location.hash.slice(1));
  const fromEvent=event=>{if(open(event.detail))scrollToHash('#pillars')};
  fromHash();
  window.addEventListener('hashchange',fromHash);
  window.addEventListener('n5:capability',fromEvent);
  return()=>{window.removeEventListener('hashchange',fromHash);window.removeEventListener('n5:capability',fromEvent)};
 },[]);

 const choose=(index,focus=false)=>{setPlaying(false);setActive(index);if(focus)tabs.current[index]?.focus()};
 const onKeyDown=event=>{
  const keys={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1};
  let next;
  if(event.key in keys)next=(active+keys[event.key]+services.length)%services.length;
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=services.length-1;
  else return;
  event.preventDefault();choose(next,true);
 };

 return <section id="pillars" ref={section} className="n5-cap n5-dark" data-tone="dark" data-playing={playing&&inView}>
  <div className="n5-wrap">
   <header className="n5-head n5-head-row n5-r">
    <div><p className="n5-eyebrow">Capabilities</p><h2>Five capabilities.<br/><span>One connected system.</span></h2></div>
    <div className="n5-head-side"><p>A shared understanding of how materials, processes, and performance depend on each other — from a single cell to a full production line.</p>
     <button type="button" className="n5-play" onClick={()=>setPlaying(value=>!value)} aria-pressed={!playing} aria-label={playing?'Pause automatic tour':'Resume automatic tour'}><Glyph name={playing?'pause':'play'}/><span>{playing?'Pause tour':'Play tour'}</span></button>
    </div>
   </header>
   <div className="n5-cap-stage n5-r">
    <div className="n5-cap-tabs" role="tablist" aria-label="NexaFive capabilities" onKeyDown={onKeyDown}>
     {services.map((service,i)=><button key={service.slug} ref={node=>{tabs.current[i]=node}} type="button" role="tab" id={`tab-${service.slug}`} aria-selected={i===active} aria-controls={service.slug} tabIndex={i===active?0:-1} className="n5-cap-tab" onClick={()=>choose(i)}>
      <span className="n5-cap-num">{pad(i)}</span>
      <span className="n5-cap-name"><small>{service.category}</small>{service.title}</span>
      <span className="n5-cap-bar" aria-hidden="true"><span key={i===active?`run-${active}`:'idle'} onAnimationEnd={i===active?()=>setActive(index=>(index+1)%services.length):undefined}/></span>
     </button>)}
    </div>
    <div className="n5-cap-panels n5-glow">
     {services.map((service,i)=><article key={service.slug} id={service.slug} role="tabpanel" aria-labelledby={`tab-${service.slug}`} className="n5-cap-panel" data-active={i===active} inert={i!==active}>
      <div className="n5-cap-art"><Illustration slug={service.slug}/><span className="n5-cap-art-tag">Concept illustration</span></div>
      <div className="n5-cap-copy">
       <h3>{service.title}</h3>
       <p className="n5-cap-short">{service.short}</p>
       <p>{service.description}</p>
       <ul>{service.applications.map(item=><li key={item}>{item}</li>)}</ul>
       <a className="n5-link" href="#contact" onClick={()=>enquire(subjectFor[service.slug])}>Discuss this capability<Glyph name="arrow"/></a>
      </div>
     </article>)}
    </div>
   </div>
  </div>
 </section>;
}
