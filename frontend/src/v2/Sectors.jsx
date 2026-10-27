import {useEffect,useRef,useState} from 'react';
import {industries} from '../content.js';
import Glyph from './Glyph.jsx';
import {enquire} from './Enquiry.jsx';
import {pad} from './motion.js';
import './sectors.css';

const notes=['Lightweight structures. Lasting performance.','A stronger link in the supply chain.','Energy systems, considered as a whole.','Engineering for connected care.','From process insight to production.'];
const icons=['car','link','battery','pulse','factory'];
const subjects=['Engineering consultation','Corrosion testing and mitigation','Energy / BEV engineering','General inquiry','Manufacturing and tooling support'];

export default function Sectors({dark=false}){
 const [open,setOpen]=useState(0),tabs=useRef([]);
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
 return <section id="industries" className="n5-sectors" data-tone={dark?'dark':'light'}>
  <div className="n5-wrap">
   <header className="n5-head n5-head-row n5-r">
    <div><p className="n5-eyebrow">Industries</p><h2>Different industries.<br/><span>Shared fundamentals.</span></h2></div>
    <p>Specialized expertise for the teams building what comes next in mobility, energy, healthcare technology, and industry.</p>
   </header>
   <div className="n5-sector-explorer n5-r">
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
      <span className="n5-sector-axis n5-sector-axis-x"/><span className="n5-sector-axis n5-sector-axis-y"/>
      <div className="n5-sector-orbit"><span className="n5-sector-orbit-point"/><div className="n5-sector-symbol"><Glyph name={icons[i]}/></div></div>
      <span className="n5-sector-figure">{pad(i)}<span> / 05</span></span>
      <span className="n5-sector-caption">Connected expertise.<br/>Applied to your industry.</span>
     </div>
    </div>)}
    <div className="n5-sector-footer"><span>Five industries. One connected approach.</span><span>{pad(open)} <span>/ 05</span></span></div>
   </div>
  </div>
 </section>;
}
