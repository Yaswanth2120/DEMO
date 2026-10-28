import {useEffect,useRef,useState} from 'react';
import {process as stages} from '../../content.js';
import {reducedMotion,useInView} from '../motion.js';
import Glyph from '../Glyph.jsx';

const icons=['search','flask','gear','layers','factory'];
export default function FiveStageMethod(){
 const [active,setActive]=useState(0),[manual,setManual]=useState(false),root=useRef(null),buttons=useRef([]),visible=useInView(root,.2);
 useEffect(()=>{if(manual||!visible||reducedMotion())return;const timer=setInterval(()=>{if(!document.hidden)setActive(i=>(i+1)%stages.length)},4800);return()=>clearInterval(timer)},[manual,visible]);
 const choose=i=>{setManual(true);setActive(i)};
 const keyboard=(event,i)=>{let next;if(['ArrowRight','ArrowDown'].includes(event.key))next=(i+1)%5;else if(['ArrowLeft','ArrowUp'].includes(event.key))next=(i+4)%5;else if(event.key==='Home')next=0;else if(event.key==='End')next=4;else return;event.preventDefault();choose(next);buttons.current[next]?.focus()};
 return <section id="process" className="vp-method" ref={root}><div className="n5-wrap"><div className="vp-method-heading"><div><p className="n5-eyebrow">The method / Five connected stages</p><h2>Find the cause.<br/><span>Follow it through.</span></h2></div><p>Our corrosion-resolution approach connects investigation and engineering with validation and implementation. The work continues beyond the diagnosis.</p></div>
  <div className="vp-stage-track" role="tablist" aria-label="Five-step engineering process">{stages.map(([title],i)=><button ref={e=>{buttons.current[i]=e}} type="button" key={title} role="tab" id={`about-stage-${i}`} aria-controls={`about-stage-panel-${i}`} aria-selected={active===i} tabIndex={active===i?0:-1} onClick={()=>choose(i)} onKeyDown={event=>keyboard(event,i)}><span className="vp-stage-dot">0{i+1}</span><strong>{title}</strong><span className="vp-stage-segment" aria-hidden="true"/></button>)}</div>
  {stages.map(([title,text],i)=><article className="vp-stage-panel" role="tabpanel" tabIndex={0} id={`about-stage-panel-${i}`} aria-labelledby={`about-stage-${i}`} key={title} hidden={active!==i}><span className="vp-stage-number" aria-hidden="true">0{i+1}</span><div><span className="vp-stage-kicker">Stage 0{i+1} / 05</span><h3>{title}</h3><p>{text}</p></div><div className="vp-stage-instrument" aria-hidden="true"><span/><span/><Glyph name={icons[i]}/><i>0{i+1}</i></div></article>)}
 </div></section>;
}
