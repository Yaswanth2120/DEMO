import {company} from '../content.js';
import Glyph from './Glyph.jsx';
import './discipline-page.css';

export default function DisciplinePage({discipline,onHome}){
 return <>
  <section id="focus" className="n5-discipline-focus">
   <div className="n5-wrap">
    <p className="n5-eyebrow">Inside {discipline.name}</p>
    <div className="n5-discipline-lead"><h2>{discipline.heading}</h2><p>{discipline.summary}</p></div>
    <div className="n5-discipline-areas">{discipline.areas.map(([title,text],i)=><article key={title}><span>0{i+1}</span><Glyph name={discipline.icon}/><h3>{title}</h3><p>{text}</p></article>)}</div>
    <div className="n5-discipline-applications"><span>Application areas</span><ul>{discipline.applications.map(text=><li key={text}>{text}</li>)}</ul></div>
   </div>
  </section>
  <section id="approach" className="n5-discipline-approach"><div className="n5-wrap">
   <p className="n5-eyebrow">From question to next step</p><h2>A focused way forward.</h2>
   <ol>{discipline.steps.map(([title,text],i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
   <aside><Glyph name={discipline.icon}/><div><span>What the conversation should establish</span><p>{discipline.deliverable}</p></div></aside>
  </div></section>
  <section id="discipline-contact" className="n5-discipline-contact"><div className="n5-wrap">
   <div><p className="n5-eyebrow">Talk about {discipline.name.toLowerCase()}</p><h2>Bring your question.<br/><span>Let’s shape the next step.</span></h2><p>Share your application, current challenge, and the decision you need to make. Scope and deliverables are agreed for each program.</p></div>
   <div className="n5-discipline-contact-actions"><a className="n5-btn" href={`mailto:${company.email}?subject=${encodeURIComponent(discipline.name+' enquiry')}`}>Discuss your project<Glyph name="arrow"/></a><a className="n5-link" href="/" onClick={event=>{if(!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();onHome()}}}>Explore the full NexaFive site<Glyph name="arrow"/></a></div>
  </div></section>
 </>;
}
