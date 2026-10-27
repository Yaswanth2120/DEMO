import {useEffect,useRef,useState} from 'react';
import {industries} from '../content.js';
import Glyph from './Glyph.jsx';
import {enquire} from './Enquiry.jsx';
import {pad} from './motion.js';
import './sectors.css';
import './industry-comparison.css';
import IndustryArt from './IndustryArt.jsx';
import {useInView} from './motion.js';

const notes=['Lightweight structures. Lasting performance.','A stronger link in the supply chain.','Energy systems, considered as a whole.','Engineering for connected care.','From process insight to production.'];
const icons=['car','link','battery','pulse','factory'];
const subjects=['Engineering consultation','Corrosion testing and mitigation','Energy / BEV engineering','General inquiry','Manufacturing and tooling support'];

export default function Sectors({dark=false}){
 const [open,setOpen]=useState(0),[design,setDesign]=useState('tabbed'),tabs=useRef([]),section=useRef(null);
 const inView=useInView(section,.1);
 useEffect(()=>{
  const onIndustry=event=>{if(Number.isInteger(event.detail)&&event.detail>=0&&event.detail<industries.length)setOpen(event.detail)};
  window.addEventListener('n5:industry',onIndustry);
  return()=>window.removeEventListener('n5:industry',onIndustry);
 },[]);
 const onKey=(event,index)=>{
  const next={ArrowRight:(index+1)%industries.length,ArrowLeft:(index+industries.length-1)%industries.length,Home:0,End:industries.length-1}[event.key];
  if(next===undefined)return;
  event.preventDefault();setOpen(next);tabs.current[next]?.focus();
 };
 return <section ref={section} id="industries" className="n5-sectors" data-in-view={inView} data-tone={dark?'dark':'light'}>
  <div className="n5-wrap">
   <header className="n5-head n5-head-row n5-r">
    <div><p className="n5-eyebrow">Industries</p><h2>Different industries.<br/><span>Shared fundamentals.</span></h2></div>
    <p>Specialized expertise for the teams building what comes next in mobility, energy, healthcare technology, and industry.</p>
   </header>
   <div className="n5-industry-views" aria-label="Industry design comparison">
    <span>Choose a view</span><div role="group" aria-label="Industry layout">{[['tabbed','01','Tabbed'],['bento','02','Bento grid'],['wheel','03','Industry wheel']].map(([value,number,label])=><button key={value} type="button" aria-pressed={design===value} onClick={()=>setDesign(value)}><small>{number}</small>{label}</button>)}</div>
   </div>
   <div className="n5-industry-view" hidden={design!=='tabbed'}>
   <div className="n5-sector-explorer">
    <div className="n5-sector-tabs" role="tablist" aria-label="Explore industries">
     {industries.map(([title],i)=><button key={title} ref={element=>{tabs.current[i]=element}} className="n5-sector-tab" type="button" role="tab" id={`n5-ind-${i}`} aria-selected={open===i} aria-controls={`n5-ind-panel-${i}`} tabIndex={open===i?0:-1} onClick={()=>setOpen(i)} onKeyDown={event=>onKey(event,i)}><span className="n5-sector-index">{pad(i)}</span><Glyph name={icons[i]}/><span>{title}</span><span className="n5-sector-selected" aria-hidden="true"/></button>)}
    </div>
    {industries.map(([title,description],i)=><div key={title} id={`n5-ind-panel-${i}`} className="n5-sector-panel" role="tabpanel" aria-labelledby={`n5-ind-${i}`} hidden={open!==i} tabIndex={0}>
     <div className="n5-sector-copy">
      <p className="n5-sector-label"><span/>{title}</p>
      <h3>{notes[i]}</h3>
      <p className="n5-sector-description">{description}</p>
      <a className="n5-sector-cta" href="#contact" onClick={()=>enquire(subjects[i])}>Discuss your program<Glyph name="arrow"/></a>
     </div>
     <div className="n5-sector-drawing" aria-hidden="true">
      <IndustryArt index={i}/>
      <span className="n5-sector-figure">{pad(i)}<span> / 05</span></span>
      <span className="n5-sector-caption">Connected expertise.<br/>Applied to your industry.</span>
     </div>
    </div>)}
    <div className="n5-sector-footer"><span>Five industries. One connected approach.</span><span>{pad(open)} <span>/ 05</span></span></div>
   </div>
   </div>
   <div className="n5-industry-view" hidden={design!=='bento'}>
    <div className="n5-industry-bento">
     {industries.map(([title,description],i)=><article className={`n5-bento-card n5-bento-card-${i}`} key={title}>
      <div className="n5-bento-top"><span>{pad(i)} / 05</span><Glyph name={icons[i]}/></div>
      <h3>{title}</h3>
      <IndustryArt index={i}/>
      {i===0&&<p className="n5-bento-statement">{notes[i]}</p>}
      <p className="n5-bento-description">{description}</p>
      <a href="#contact" className="n5-bento-link" onClick={()=>enquire(subjects[i])}>Discuss your program<span className="sr-only"> — {title}</span><Glyph name="arrow"/></a>
     </article>)}
    </div>
   </div>
   <div className="n5-industry-view" hidden={design!=='wheel'}>
    <div className="n5-industry-wheel-layout">
     <div className="n5-industry-wheel" role="group" aria-label="Select an industry">
      <svg className="n5-wheel-lines" viewBox="0 0 520 520" fill="none" aria-hidden="true"><circle cx="260" cy="260" r="174"/><circle cx="260" cy="260" r="120" strokeDasharray="3 9"/>{industries.map((_,i)=>{const angle=(i*72-90)*Math.PI/180;return <path key={i} data-active={open===i} d={`M260 260L${260+174*Math.cos(angle)} ${260+174*Math.sin(angle)}`}/>})}</svg>
      <div className="n5-wheel-center"><img src="/assets/nexafive-mark.svg" width="56" height="56" alt=""/><strong>Connected<br/>expertise</strong></div>
      {industries.map(([title],i)=>{const angle=(i*72-90)*Math.PI/180;return <button type="button" className={`n5-wheel-node n5-wheel-node-${i}`} key={title} aria-pressed={open===i} onClick={()=>setOpen(i)}><span className="n5-wheel-node-icon"><Glyph name={icons[i]}/></span><span className="n5-wheel-node-name">{title}</span></button>})}
     </div>
     <div className="n5-wheel-detail">
      <p className="n5-eyebrow">{pad(open)} / 05 · {industries[open][0]}</p>
      <h3>{notes[open]}</h3>
      <p>{industries[open][1]}</p>
      <a className="n5-link" href="#contact" onClick={()=>enquire(subjects[open])}>Discuss your program<Glyph name="arrow"/></a>
      <div className="n5-wheel-controls"><button type="button" aria-label="Previous industry" onClick={()=>setOpen((open+4)%5)}>←</button><span>{pad(open)} <span>/ 05</span></span><button type="button" aria-label="Next industry" onClick={()=>setOpen((open+1)%5)}>→</button></div>
     </div>
    </div>
   </div>
  </div>
 </section>;
}
