import {useRef} from 'react';
import {services} from '../../content.js';
import Glyph from '../Glyph.jsx';
import EngineeringScene from './EngineeringScene.jsx';
import {useSelection} from './usePageSelection.js';
import './visual-pages.css';

const presentations=[
 {label:'Battery systems',headline:'Energy, engineered as a system.',text:'Connect cells, modules, and packs with the thermal, structural, and material decisions that shape the whole assembly.',domains:['Module & pack architecture','Thermal and structural considerations','Interfaces and corrosion prevention'],focus:'From cell to system'},
 {label:'Lightweight structures',headline:'Less mass. More engineering thought.',text:'Explore lighter structures through the relationship between material choice, geometry, joining, and the way a component is made.',domains:['Multi-material structures','Joining and forming considerations','Coatings and durability'],focus:'Performance through material choice'},
 {label:'Tooling & production',headline:'Precision starts before production.',text:'Bring component intent and process reality together, from plastics and composites to precision forming and die-casting applications.',domains:['Plastics and composite tooling','Precision forming and die casting','Process and fluid-flow considerations'],focus:'Design intent meets manufacturing'},
 {label:'Materials intelligence',headline:'Make the trade-offs visible.',text:'Connect engineering data with material and process decisions. Discuss the application, data quality, and evaluation needed to establish a useful approach.',domains:['Material and process selection','Structural and stamping variables','Corrosion and performance evaluation'],focus:'Engineering data, with direction'},
 {label:'Corrosion & durability',headline:'Protection is a system decision.',text:'Consider the material, surface, joint, and environment together. Connect investigation with mitigation options and their validation.',domains:['Coatings and surface treatments','Dissimilar-material interfaces','Sealing, diagnostics, and validation'],focus:'From surface to service performance'}
];

export function ServiceGallery(){
 const [active,select]=useSelection(services),tabs=useRef([]),presentation=presentations[active],service=services[active];
 const keyboard=(event,i)=>{let next;if(['ArrowRight','ArrowDown'].includes(event.key))next=(i+1)%5;else if(['ArrowLeft','ArrowUp'].includes(event.key))next=(i+4)%5;else if(event.key==='Home')next=0;else if(event.key==='End')next=4;else return;event.preventDefault();select(next);tabs.current[next]?.focus()};
 return <div className="rd-pages vp-services">
  <section id="hero" className="vp-services-heading"><div className="n5-wrap"><p className="n5-eyebrow">Services / Engineering in depth</p><div><h1>Complex challenges.<br/><em>Tangible possibilities.</em></h1><p>Materials science, engineering, and manufacturing knowledge—brought into focus around your application.</p></div></div></section>
  <section id="pillars" className="vp-service-showcase"><div className="n5-wrap">
   <div className="vp-service-tabs" role="tablist" aria-label="Explore engineering services">{services.map((item,i)=><button ref={e=>{tabs.current[i]=e}} type="button" role="tab" id={`visual-service-tab-${i}`} aria-selected={active===i} aria-controls="visual-service-panel" tabIndex={active===i?0:-1} key={item.slug} onClick={()=>select(i)} onKeyDown={event=>keyboard(event,i)}><span>0{i+1}</span><Glyph name={item.icon}/><strong>{presentations[i].label}</strong></button>)}</div>
   <div className="vp-service-stage" id="visual-service-panel" role="tabpanel" tabIndex={0} aria-labelledby={`visual-service-tab-${active}`}>
    {services.map(item=><span className="vp-service-anchor" id={item.slug} key={item.slug}/>)}
    <div className="vp-service-stage-meta"><span>{service.category}</span><span>0{active+1} / 05</span></div>
    <div className="vp-service-stage-grid"><div className="vp-service-scene" key={service.slug+'-art'}><EngineeringScene kind={active}/><span className="vp-scene-caption">{presentation.focus}</span></div><div className="vp-service-copy" key={service.slug+'-copy'}><span className="vp-service-overline">{service.title}</span><h2>{presentation.headline}</h2><p>{presentation.text}</p><a className="vp-service-link" href="/contact#contact-form">Discuss your application<Glyph name="arrow"/></a></div></div>
    <div className="vp-service-domains">{presentation.domains.map((domain,i)=><div key={domain}><span>0{i+1}</span><p>{domain}</p></div>)}</div>
   </div>
   <div className="vp-service-stage-foot"><span>One application. Connected disciplines.</span><a className="n5-link" href="/industries">Explore the industry context<Glyph name="arrow"/></a></div>
  </div></section>
  <section className="vp-service-bridge"><div className="n5-wrap"><div><p className="n5-eyebrow">The work behind the outcome</p><h2>Built around<br/><span>your application.</span></h2></div><div><p>Support can begin with a material decision, a design requirement, a production constraint, or an observed failure. The scope is shaped by what your team needs to understand and where the program stands.</p><p className="vp-service-small">Methods, deliverables, and validation requirements are agreed for each program.</p><a className="n5-btn" href="/contact#contact-form">Talk through your project<Glyph name="arrow"/></a></div></div></section>
 </div>;
}
