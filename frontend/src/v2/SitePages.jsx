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
  <section className="n5-about-principles"><div className="n5-wrap"><p className="n5-eyebrow">What to expect</p><div>{[['Start with the context','We begin with the application, its constraints, and the decision your team needs to make.'],['Bring the right perspectives together','Materials, engineering, research, and manufacturing are considered together when they affect the outcome.'],['Leave with a clear next step','We align on scope, relevant evidence, and practical deliverables before the work moves forward.']].map(([title,text],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
 </>;
}

const universities=[
 {name:'Missouri S&T',detail:'Missouri University of Science and Technology',image:'/assets/missouri-st-logo.png'},
 {name:'Kansas State University',detail:'College of Engineering',image:'/assets/university-1.jpg'}
];

const collaborationOpportunities=[
 {icon:'layers',title:'Materials & interfaces',text:'Discuss material compatibility, coatings, joining, and the behavior of dissimilar interfaces.'},
 {icon:'gear',title:'Manufacturing & validation',text:'Connect process constraints, tooling requirements, and the evidence needed to evaluate a change.'},
 {icon:'shield',title:'Durability & failure investigation',text:'Frame an observed failure or durability question and identify relevant investigation needs.'}
];

export function CollaborationPage(){
 return <div className="n5-collaboration-page">
  <section id="hero" className="n5-collab-hero"><div className="n5-wrap"><p className="n5-eyebrow">Collaboration</p><h1>Connect research with<br/><span>real-world challenges.</span></h1><p>Discuss industrial challenges and applied research opportunities with NexaFive. Start with the question, the context, and what you need to understand next.</p><nav className="n5-collab-anchors" aria-label="Collaboration sections"><a href="#industrial-collaboration">Industrial collaboration<Glyph name="arrow"/></a><a href="#academic-collaboration">Academic research &amp; collaboration<Glyph name="arrow"/></a></nav></div></section>
  <section className="n5-collaboration" aria-labelledby="industrial-collaboration"><div className="n5-wrap">
   <div className="n5-page-section-head"><p className="n5-eyebrow">01 / Industrial collaboration</p><h2 id="industrial-collaboration">Work on the challenges behind the product.</h2><p>Explore focused collaboration around materials, manufacturing, and durability. Scope and deliverables are agreed for each program.</p></div>
   <div className="n5-collab-cards">{collaborationOpportunities.map(opportunity=><article className="n5-collab-card" key={opportunity.title}><Glyph name={opportunity.icon}/><h3>{opportunity.title}</h3><p>{opportunity.text}</p><a href="/contact">Discuss this opportunity<span className="sr-only"> — {opportunity.title}</span><Glyph name="arrow"/></a></article>)}</div>
  </div></section>
  <section className="n5-collaboration n5-collaboration-academic" aria-labelledby="academic-collaboration"><div className="n5-wrap">
   <div className="n5-page-section-head"><p className="n5-eyebrow">02 / Academic research &amp; collaboration</p><h2 id="academic-collaboration">Bring a research question into application.</h2><p>Explore applied investigations that connect research questions with material, component, and process decisions.</p></div>
   <div className="n5-collab-cards">{universities.map(university=><article className="n5-collab-card n5-collab-university" key={university.name}><div className="n5-collab-logo"><img src={university.image} alt={`${university.name} logo`} loading="lazy"/></div><h3>{university.name}</h3><p>{university.detail}</p></article>)}</div>
   <p className="n5-partner-section-note">Ask our team about the current collaboration scope for your program.</p>
  </div></section>
  <section className="n5-collab-invitation"><div className="n5-wrap"><div><h2>Have a question worth exploring together?</h2><p>Share the application, the question you are trying to answer, and the outcome you need to support.</p></div><a className="n5-btn" href="/contact">Discuss a collaboration<Glyph name="arrow"/></a></div></section>
 </div>;
}

export function PageContact({eyebrow='Work with NexaFive',title='Bring the challenge. Let’s find the way forward.'}){
 return <section className="n5-page-contact"><div className="n5-wrap"><div><p className="n5-eyebrow">{eyebrow}</p><h2>{title}</h2></div><div><a className="n5-btn" href="/contact">Start a conversation<Glyph name="arrow"/></a><a className="n5-link" href="/team">Meet the team<Glyph name="arrow"/></a></div></div></section>;
}
