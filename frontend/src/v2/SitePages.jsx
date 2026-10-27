import {company} from '../content.js';
import {disciplinePages} from './discipline-content.js';
import Glyph from './Glyph.jsx';
import './site-pages.css';

export function PageIntro({eyebrow,title,accent,text}){
 return <section id="hero" className="n5-page-intro"><div className="n5-wrap"><p className="n5-eyebrow">{eyebrow}</p><h1>{title}<br/><span>{accent}</span></h1><p>{text}</p></div></section>;
}

export function AboutPage(){
 return <>
  <PageIntro eyebrow="About NexaFive" title="Five disciplines." accent="One connected perspective." text="An engineering and technology consultancy connecting materials science, research, and manufacturing insight to the challenges that matter to your program."/>
  <section id="about" className="n5-about-story"><div className="n5-wrap n5-about-grid"><div><p className="n5-eyebrow">Who we are</p><h2>Where science meets<br/><span>engineering intent.</span></h2></div><div><p>{company.overview}</p><p>Based in Minneapolis, Minnesota, our work brings material behavior, component design, diagnostics, and production requirements into the same conversation. The aim is a clearer path from an engineering question to an agreed next step.</p><a className="n5-link" href="/contact">Talk with our team<Glyph name="arrow"/></a></div></div></section>
  <section id="disciplines" className="n5-about-disciplines"><div className="n5-wrap"><div className="n5-page-section-head"><p className="n5-eyebrow">How we think</p><h2>Different lenses.<br/><span>A more complete picture.</span></h2></div><div className="n5-about-discipline-grid">{disciplinePages.map(page=><a key={page.slug} href={'/'+page.slug}><Glyph name={page.icon}/><h3>{page.name}</h3><p>{page.summary}</p><span>Explore {page.name}<Glyph name="arrow"/></span></a>)}</div></div></section>
  <section className="n5-about-principles"><div className="n5-wrap"><p className="n5-eyebrow">Our working principles</p><div>{[['Start with the question','Understand the application, its constraints, and the decision that needs to be made.'],['Connect the disciplines','Consider materials, engineering, testing, and manufacturing together.'],['Make the next step clear','Agree on the scope, relevant evidence, and practical deliverables for the program.']].map(([title,text],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
  <PageContact eyebrow="The people behind the work" title="Meet the team. Start a conversation."/>
 </>;
}

export function PageContact({eyebrow='Work with NexaFive',title='Bring the challenge. Let’s find the way forward.'}){
 return <section className="n5-page-contact"><div className="n5-wrap"><div><p className="n5-eyebrow">{eyebrow}</p><h2>{title}</h2></div><div><a className="n5-btn" href="/contact">Start a conversation<Glyph name="arrow"/></a><a className="n5-link" href="/team">Meet the team<Glyph name="arrow"/></a></div></div></section>;
}
