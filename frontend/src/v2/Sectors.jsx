import {useEffect,useState} from 'react';
import {industries} from '../content.js';
import Glyph from './Glyph.jsx';
import {enquire} from './Enquiry.jsx';
import {pad} from './motion.js';

const notes=['Lightweight structures. Lasting performance.','A stronger link in the supply chain.','Energy systems, considered as a whole.','Engineering for connected care.','From process insight to production.'];
const icons=['car','link','battery','pulse','factory'];
const subjects=['Engineering consultation','Corrosion testing and mitigation','Energy / BEV engineering','General inquiry','Manufacturing and tooling support'];

export default function Sectors({dark=false}){
 const [open,setOpen]=useState(0);
 useEffect(()=>{
  const onIndustry=event=>{if(Number.isInteger(event.detail))setOpen(event.detail)};
  window.addEventListener('n5:industry',onIndustry);
  return()=>window.removeEventListener('n5:industry',onIndustry);
 },[]);
 const preview=index=>{if(window.matchMedia('(hover: hover) and (min-width: 961px)').matches)setOpen(index)};

 return <section id="industries" className="n5-sectors" data-tone={dark?'dark':'light'}>
  <div className="n5-wrap">
   <header className="n5-head n5-head-row n5-r">
    <div><p className="n5-eyebrow">Industries</p><h2>Different industries.<br/><span>Shared fundamentals.</span></h2></div>
    <p>Specialized expertise for the teams building what comes next in mobility, energy, healthcare technology, and industry.</p>
   </header>
   <div className="n5-acc n5-r">
    {industries.map(([title,description],i)=><article key={title} className="n5-acc-item" data-open={open===i} onPointerEnter={()=>preview(i)}>
     <h3 className="n5-acc-heading"><button type="button" id={`n5-ind-${i}`} aria-expanded={open===i} aria-controls={`n5-ind-panel-${i}`} onClick={()=>setOpen(i)}>
      <span className="n5-acc-num">{pad(i)}</span><span className="n5-acc-icon"><Glyph name={icons[i]}/></span><span className="n5-acc-title">{title}</span><span className="n5-acc-plus" aria-hidden="true"/>
     </button></h3>
     <div className="n5-acc-body" id={`n5-ind-panel-${i}`} role="region" aria-labelledby={`n5-ind-${i}`} inert={open!==i}>
      <div className="n5-acc-inner">
       <p className="n5-acc-note">{notes[i]}</p>
       <p>{description}</p>
       <a className="n5-link" href="#contact" onClick={()=>enquire(subjects[i])}>Discuss your program<Glyph name="arrow"/></a>
      </div>
     </div>
     <Glyph name={icons[i]} className="n5-acc-art"/>
    </article>)}
   </div>
  </div>
 </section>;
}
