import {useState} from 'react';
import {claims,demoIndustryCollaborators} from '../content.js';
import Glyph from './Glyph.jsx';
import MobileFold from '../v3/MobileFold.jsx';
import './research.css';

const methods=['SEM / EDX','EIS','Cross-section metallography','Galvanic testing','Accelerated corrosion testing'];
const universities=[
 {name:'Missouri S&T',detail:'Missouri University of Science and Technology',image:'/assets/missouri-st-logo.png'},
 {name:'Kansas State University',detail:'College of Engineering',image:'/assets/university-1.jpg'}
];

export default function Research({verified,mobileCompact}){
 const [layout,setLayout]=useState('split');
 return <section id="partners" className="n5-research-review" data-layout={layout} data-tone={layout==='lab'?'dark':'light'}>
  <div className="n5-wrap">
   <div className="n5-rc-switch"><span>Research &amp; collaboration</span><div role="group" aria-label="Research layout">{[['split','01','Split canvas'],['journal','02','Research journal'],['lab','03','Lab dashboard']].map(([value,num,label])=><button key={value} type="button" aria-pressed={layout===value} onClick={()=>setLayout(value)}><small>{num}</small>{label}</button>)}</div></div>
   <div className="n5-rc-layout">
    <header className="n5-rc-intro">
     <p className="n5-rc-eyebrow"><span/>Research &amp; collaboration</p>
     <h2>Curiosity,<br/><span>backed by evidence.</span></h2>
     <p>Academic insight, industrial perspective, and diagnostic testing bring a different depth to complex questions.</p>
     <p className="n5-rc-note">{verified?claims.partnerships:'Ask our team about the current collaboration scope for your program.'}</p>
     <div className="n5-rc-signature" aria-hidden="true"><Glyph name="flask"/><span>Observe.<br/>Understand. Apply.</span></div>
    </header>
    <section className="n5-rc-academic" aria-labelledby="rc-academic-title">
     <div className="n5-rc-heading"><span>01 / Academic insight</span><h3 id="rc-academic-title">Knowledge, connected.</h3></div>
     <div className="n5-rc-universities">{universities.map(university=><article className="n5-rc-university" key={university.name}><div className="n5-rc-logo"><img src={university.image} alt={`${university.name} university logo`} loading="lazy"/></div><div><h4>{university.name}</h4><p>{university.detail}</p></div><Glyph name="atom"/></article>)}</div>
    </section>
    <section className="n5-rc-network" aria-labelledby="rc-network-title">
     <div className="n5-rc-heading"><div><span>02 / Industrial perspective</span><h3 id="rc-network-title">Ideas meet application.</h3></div><p>Illustrative collaborators for design review.<br/>Confirmed partners will replace these examples.</p></div>
     <div className="n5-rc-collaborators">{demoIndustryCollaborators.map((industry,i)=><article className="n5-rc-collaborator" key={industry.name}><img src={industry.image} alt="" loading="lazy"/><div><span className="n5-rc-collab-number">0{i+1}</span><h4>{industry.name}</h4><p>{industry.focus}</p></div></article>)}</div>
    </section>
    <div className="n5-rc-methods"><MobileFold enabled={mobileCompact} kind="testing" label="Testing methods & standards"><section className="n5-rc-methods-inner" aria-labelledby="rc-methods-title">
     <div className="n5-rc-heading"><span>03 / Diagnostic methods</span><h3 id="rc-methods-title">Evidence before answers.</h3></div>
     <ul className="n5-rc-method-list">{methods.map((method,i)=><li key={method}><span>0{i+1}</span>{method}<Glyph name="flask"/></li>)}</ul>
     <div className="n5-rc-standards"><span>Standards framework</span><div><span>ASTM</span><span>SAE</span><span>ISO</span></div></div>
     <p className="n5-rc-note">{verified?claims.testing:'Confirm applicable standards, laboratory accreditation, and OEM procedures for your test program.'}</p>
    </section></MobileFold></div>
   </div>
  </div>
 </section>;
}
