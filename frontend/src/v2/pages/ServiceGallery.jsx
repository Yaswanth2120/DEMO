import {useRef} from 'react';
import {services} from '../../content.js';
import Glyph from '../Glyph.jsx';
import EngineeringScene from './EngineeringScene.jsx';
import ServiceHub from './ServiceHub.jsx';
import {useSelection} from './usePageSelection.js';
import './visual-pages.css';
import './services-page.css';

const presentations=[
 {label:'Battery systems',headline:'Energy, engineered as a system.',text:'Connect cells, modules, and packs with the thermal, structural, and material decisions that shape the whole assembly.',domains:['Module & pack architecture','Thermal and structural considerations','Interfaces and corrosion prevention'],focus:'From cell to system'},
 {label:'Lightweight structures',headline:'Less mass. More engineering thought.',text:'Explore lighter structures through the relationship between material choice, geometry, joining, and the way a component is made.',domains:['Multi-material structures','Joining and forming considerations','Coatings and durability'],focus:'Performance through material choice'},
 {label:'Tooling & production',headline:'Precision starts before production.',text:'Bring component intent and process reality together, from plastics and composites to precision forming and die-casting applications.',domains:['Plastics and composite tooling','Precision forming and die casting','Process and fluid-flow considerations'],focus:'Design intent meets manufacturing'},
 {label:'Materials intelligence',headline:'Make the trade-offs visible.',text:'Connect engineering data with material and process decisions. Discuss the application, data quality, and evaluation needed to establish a useful approach.',domains:['Material and process selection','Structural and stamping variables','Corrosion and performance evaluation'],focus:'Engineering data, with direction'},
 {label:'Corrosion & durability',headline:'Protection is a system decision.',text:'Consider the material, surface, joint, and environment together. Connect investigation with mitigation options and their validation.',domains:['Coatings and surface treatments','Dissimilar-material interfaces','Sealing, diagnostics, and validation'],focus:'From surface to service performance'}
];


const appliesTo={'battery-engineering':[['automotive','Automotive OEMs'],['energy','Energy / BEV']],'lightweight-automotive':[['automotive','Automotive OEMs'],['suppliers','Tier suppliers']],'tooling-manufacturing':[['suppliers','Tier suppliers'],['manufacturing','Industrial manufacturing']],'ai-optimization':[['manufacturing','Industrial manufacturing']],'corrosion-mitigation':[['automotive','Automotive OEMs'],['suppliers','Tier suppliers'],['energy','Energy / BEV']]};
const steps=[
 ['Start with the context','We begin with the application, its constraints, and the decision your team needs to make.'],
 ['Bring the right perspectives together','Materials, engineering, research, and manufacturing are considered together when they affect the outcome.'],
 ['Leave with a clear next step','We align on scope, relevant evidence, and practical deliverables before the work moves forward.']
];

export function ServiceGallery(){
 const [active,select]=useSelection(services),rows=useRef([]);
 const keyboard=(event,i)=>{let next;if(['ArrowRight','ArrowDown'].includes(event.key))next=(i+1)%5;else if(['ArrowLeft','ArrowUp'].includes(event.key))next=(i+4)%5;else if(event.key==='Home')next=0;else if(event.key==='End')next=4;else return;event.preventDefault();select(next);rows.current[next]?.focus()};
 const preview=(event,i)=>{if(event.pointerType==='mouse'&&window.matchMedia('(min-width: 901px)').matches&&i!==active)select(i)};
 return <div className="rd-pages vp-services">
  <section id="hero" className="sx-hero"><div className="n5-wrap sx-hero-grid">
   <div className="sx-hero-copy"><p className="n5-eyebrow">Services / Engineering in depth</p><h1>Engineering services,<br/><em>from battery packs to corrosion.</em></h1><p className="sx-hero-lede">Battery module and pack engineering, lightweight automotive structures, tooling and manufacturing, AI/ML-guided materials decisions, and corrosion mitigation — supported from concept through production.</p><a className="n5-btn" href="#pillars">Explore the services<Glyph name="arrow"/></a></div>
   <ServiceHub onSelect={i=>{select(i);document.getElementById('pillars')?.scrollIntoView({behavior:'smooth',block:'start'})}}/>
  </div></section>
  <section id="pillars" className="sx-index"><div className="n5-wrap">
   <div className="sx-layout n5-r">
    <div className="sx-list" role="tablist" aria-label="Explore engineering services" aria-orientation="vertical">
     {services.map((item,i)=><button key={item.slug} ref={e=>{rows.current[i]=e}} type="button" role="tab" id={`visual-service-tab-${i}`} aria-selected={active===i} aria-controls={`sx-panel-${i}`} tabIndex={active===i?0:-1} onClick={()=>select(i)} onKeyDown={event=>keyboard(event,i)} onPointerEnter={event=>preview(event,i)}>
      <span className="sx-num">0{i+1}</span><span className="sx-icon"><Glyph name={item.icon}/></span><span className="sx-name"><small>{item.category}</small>{item.title}</span><Glyph name="arrow"/>
     </button>)}
    </div>
    <div className="sx-panels">{services.map((item,i)=>{const p=presentations[i];return <article key={item.slug} id={`sx-panel-${i}`} role="tabpanel" aria-labelledby={`visual-service-tab-${i}`} className="sx-panel" data-active={active===i} inert={active!==i}>
     <span className="vp-service-anchor" id={item.slug}/>
     <div className="sx-art"><EngineeringScene kind={i}/><span>{p.focus}</span></div>
     <div className="sx-copy">
      <p className="sx-kicker">{item.category} · 0{i+1} / 05</p>
      <h3>{item.title}</h3>
      <p className="sx-headline">{p.headline}</p>
      <p>{item.description}</p>
      <div className="sx-cols">
       <div><p className="sx-label">What it covers</p><ul>{item.applications.map(x=><li key={x}>{x}</li>)}</ul></div>
       <div><p className="sx-label">Where it applies</p><div className="sx-chips">{appliesTo[item.slug].map(([slug,name])=><a key={slug} href={'/industries#'+slug}>{name}</a>)}</div></div>
      </div>
      <a className="n5-btn" href="/contact">Discuss this service<Glyph name="arrow"/></a>
     </div>
    </article>})}</div>
   </div>
  </div></section>
  <section className="sx-steps"><div className="n5-wrap">
   <div className="sx-head n5-r"><div><p className="n5-eyebrow">How an engagement starts</p><h2>Built around<br/><span>your application.</span></h2></div><p>Support can begin with a material decision, a design requirement, a production constraint, or an observed failure. Methods, deliverables, and validation are agreed for each program.</p></div>
   <ol className="sx-step-list">{steps.map(([title,text],i)=><li key={title} className="n5-r"><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
   <div className="sx-cta n5-r"><p>Have a challenge in mind?</p><a className="n5-btn" href="/contact">Talk through your project<Glyph name="arrow"/></a><a className="n5-link" href="/industries">Explore industries<Glyph name="arrow"/></a></div>
  </div></section>
 </div>;
}
