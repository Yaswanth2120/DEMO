import {useRef} from 'react';
import {industries} from '../content.js';
import Glyph from './Glyph.jsx';
import {enquire} from './Enquiry.jsx';
import {pad,useInView} from './motion.js';
import IndustryArt from './IndustryArt.jsx';
import './sectors.css';

const icons=['car','link','battery','pulse','factory'];
const subjects=['Engineering consultation','Corrosion testing and mitigation','Energy / BEV engineering','General inquiry','Manufacturing and tooling support'];

export default function Sectors(){
 const section=useRef(null),inView=useInView(section,.1);
 return <section ref={section} id="industries" className="n5-sectors" data-in-view={inView}>
  <div className="n5-wrap">
   <header className="n5-head n5-head-row n5-r">
    <div><p className="n5-eyebrow">Industries</p><h2>Different industries.<br/><span>Shared fundamentals.</span></h2></div>
    <p>Specialized expertise for the teams building what comes next in mobility, energy, healthcare technology, and industry.</p>
   </header>
   <div className="n5-industry-bento">
    {industries.map(([title,description],i)=><article id={`industry-${i}`} className={`n5-bento-card n5-bento-card-${i}`} key={title} aria-labelledby={`industry-title-${i}`}>
     <div className="n5-bento-top"><span>{pad(i)} / 05</span><Glyph name={icons[i]}/></div>
     <h3 id={`industry-title-${i}`}>{title}</h3>
     <IndustryArt index={i}/>
     {i===0&&<p className="n5-bento-statement">Lightweight structures. Lasting performance.</p>}
     <p className="n5-bento-description">{description}</p>
     <a href="#contact" className="n5-bento-link" onClick={()=>enquire(subjects[i])}>Discuss your program<span className="sr-only"> — {title}</span><Glyph name="arrow"/></a>
    </article>)}
   </div>
  </div>
 </section>;
}
