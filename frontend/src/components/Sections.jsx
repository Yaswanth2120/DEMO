import {useEffect,useState} from 'react';
import {company,services,disciplines,industries,process,claims} from '../content.js';
import {Button,Eyebrow,SectionHeading} from './UI.jsx';
import Icon from './Icons.jsx';

export function Hero(){
 const [paused,setPaused]=useState(false);
 return <section className="hero-band" id="hero"><div className="hero section">
  <div className="hero-copy"><Eyebrow>Science · Engineering · Possibility</Eyebrow>
   <h1>Innovate Beyond<br/><em>Boundaries.</em></h1>
   <p>Advanced materials science, engineering consultancy, and manufacturing innovation — connected from concept through production.</p>
   <div className="hero-chips"><span><Icon name="shield"/>Materials expertise</span><span><Icon name="nodes"/>Connected engineering</span><span><Icon name="tool"/>Research-led solutions</span></div>
   <div className="hero-actions"><Button>Start a Project</Button><Button href="#pillars" secondary>Explore Our Services</Button></div>
   <div className="hero-facts"><div><strong>5</strong><small>Core disciplines</small></div><div><strong>E2E</strong><small>Concept to production</small></div><div><strong>R&D</strong><small>Research & validation</small></div></div>
  </div>
  <div className="hero-visual"><img src="/assets/engineering.png" alt="Precision bearings and materials on engineering drawings" width="362" height="440" fetchPriority="high"/>
   <div className="visual-badge badge-top"><span><Icon name="shield"/></span><div><small>MATERIALS SCIENCE</small><strong>Expertise at every interface</strong></div></div>
   <div className="visual-badge badge-left"><span><Icon name="nodes"/></span><div><small>CONNECTED THINKING</small><strong>Science meets engineering</strong></div></div>
   <div className="visual-badge badge-bottom"><span><Icon name="tool"/></span><div><strong>From concept to production</strong><small>One integrated approach</small></div></div>
  </div>
 </div><div className="discipline-strip" data-paused={paused} aria-label="Five core disciplines">
  <div className="discipline-viewport" tabIndex={0} aria-label="Core disciplines ticker"><div className="discipline-track">{[0,1,2].map(copy=><div className="discipline-group" key={copy} role={copy===0?'list':undefined} aria-hidden={copy>0?true:undefined}>{disciplines.map(([name],i)=><span key={name} role={copy===0?'listitem':undefined}><Icon name={['nodes','tool','shield','battery','car'][i]}/>{name}</span>)}</div>)}</div></div>
  <button className="discipline-toggle" type="button" aria-label={paused?'Resume disciplines scrolling':'Pause disciplines scrolling'} aria-pressed={paused} onClick={()=>setPaused(!paused)}><svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">{paused?<path d="m7 4 8 6-8 6z"/>:<path d="M7 4v12M13 4v12"/>}</svg></button>
 </div></section>;
}

export function AboutSection(){
 const strengths=[['shield','Materials expertise','Metals, polymers, composites, and dissimilar interfaces.'],['nodes','Connected disciplines','Science, Engineering, Research, Material, and Eco.'],['tool','Research to application','Connect diagnostic evidence with practical engineering.'],['car','Lifecycle-conscious design','Lightweight materials, reduced waste, and durability.']];
 return <section className="section about-section" id="about"><div className="split">
  <div className="image-frame"><img src="/assets/research.png" alt="Microscope and materials research equipment" width="362" height="440" loading="lazy"/><div className="image-caption"><Icon name="nodes"/><span>Research-led thinking.<strong>Engineering that moves forward.</strong></span></div></div>
  <div><SectionHeading eyebrow="About NexaFive Global" description={company.overview}>Where science meets<br/><em>engineering excellence.</em></SectionHeading>
   <div className="strength-grid">{strengths.map(([icon,title,text])=><article key={title}><span className="small-icon"><Icon name={icon}/></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
   <details className="discipline-details"><summary>Explore our five core disciplines<span className="plus">+</span></summary><div className="discipline-details-grid">{disciplines.map(([name,text])=><div key={name}><h3>{name}</h3><p>{text}</p></div>)}</div></details>
  </div>
 </div></section>;
}

const groups=[['All services','all'],['Mobility & energy','mobility'],['Manufacturing & AI','manufacturing'],['Durability','durability']];
const serviceGroup=['mobility','mobility','manufacturing','manufacturing','durability'];
const pictures=[['engineering.png','Precision materials and engineering drawings'],['engineering.png','Engineered metal components and technical drawings'],['industries.png','Industrial manufacturing equipment'],['industries.png','Digital intelligence in manufacturing'],['research.png','Laboratory equipment for material research and testing']];

export function ServicesSection(){
 const [group,setGroup]=useState('all'),[target,setTarget]=useState('');
 useEffect(()=>{
  const select=hash=>{if(services.some(s=>s.slug===hash)){setGroup('all');setTarget(hash);const card=document.getElementById(hash);if(card)card.querySelector('details').open=true}};
  const reveal=()=>{try{select(decodeURIComponent(window.location.hash.slice(1)))}catch{/* Ignore malformed fragments. */}};
  const click=event=>{const anchor=event.target.closest('a[href^="#"]');if(anchor)select(anchor.getAttribute('href').slice(1))};
  reveal();window.addEventListener('hashchange',reveal);document.addEventListener('click',click);
  return()=>{window.removeEventListener('hashchange',reveal);document.removeEventListener('click',click)};
 },[]);
 useEffect(()=>{if(!target)return;const card=document.getElementById(target);if(card){card.querySelector('details').open=true;card.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})}},[target,group]);
 const visible=services.filter((_,i)=>group==='all'||serviceGroup[i]===group);
 return <section className="services-band" id="pillars"><div className="section">
  <SectionHeading eyebrow="Our engineering services" description="Five specialized capabilities. One connected approach to the challenges in mobility, materials, manufacturing, and durability.">Specialized expertise.<br/><em>Connected engineering.</em></SectionHeading>
  <div className="service-filters" role="group" aria-label="Filter engineering services">{groups.map(([label,key])=><button type="button" key={key} className={group===key?'active':''} aria-pressed={group===key} onClick={()=>setGroup(key)}>{label}{key==='all'&&<span>5</span>}</button>)}</div>
  <p className="sr-only" aria-live="polite">Showing {visible.length} services.</p>
  <div className="services-grid">{visible.map(s=>{const i=services.indexOf(s);return <article className="service-card" id={s.slug} key={s.slug}>
   <div className={`service-image service-image-${i}`}><img src={`/assets/${pictures[i][0]}`} alt={pictures[i][1]} loading="lazy" width="558" height="330"/><span className="service-icon"><Icon name={s.icon}/></span></div>
   <div className="service-content"><p className="category">{s.category}</p><h3>{s.title}</h3><p className="service-short">{s.short}</p><p>{s.description}</p>
    <details className="service-details"><summary>Explore capability<Icon name="arrow"/></summary><div className="service-expanded"><p>{s.detail}</p><h4>Applications & capabilities</h4><ul>{s.applications.map(a=><li key={a}>{a}</li>)}</ul><Button>Discuss this project</Button></div></details>
   </div>
  </article>})}</div>
  <div className="service-enquiry"><div><h3>A challenge that crosses disciplines?</h3><p>Let’s connect the right materials, research, and engineering expertise for your program.</p></div><Button>Discuss your requirements</Button></div>
 </div></section>;
}

export function SolutionsSection(){
 const solutions=[['Engineering','Battery systems, lightweight structures, tooling, and multi-material assemblies — from concept to production.'],['Research & validation','Corrosion, surface treatment, adhesion, sealing, and failure analysis.'],['Manufacturing intelligence','AI/ML guidance for material selection, stamping, structural integrity, corrosion risk, and part performance.']];
 return <section className="solutions-band" id="solutions"><div className="section split"><div className="solutions-picture"><img src="/assets/industries.png" alt="Connected digital and industrial manufacturing systems" loading="lazy" width="558" height="330"/><div className="image-caption"><Icon name="tool"/><span>Materials. Processes. Products.<strong>Engineered as one connected system.</strong></span></div></div><div>
  <SectionHeading eyebrow="Integrated solutions" description="Materials, processes, and products are connected. We bring engineering, research, and manufacturing intelligence together to support your whole program.">The whole challenge.<br/><em>One integrated approach.</em></SectionHeading>
  <div className="solution-list">{solutions.map(([title,text],i)=><article key={title}><span className="small-icon"><Icon name={['tool','shield','nodes'][i]}/></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><Button>Talk to our engineering team</Button>
 </div></div></section>;
}

export function IndustriesSection(){return <section className="section industries-section" id="industries"><SectionHeading eyebrow="Industries we serve" description="Purposeful engineering across mobility, energy, technology, and manufacturing.">Expertise for industries<br/><em>that keep the world moving.</em></SectionHeading><div className="industry-grid">{industries.map(([title,text],i)=><article key={title}><span className="small-icon"><Icon name={['car','tool','battery','nodes','tool'][i]}/></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>}

export function ProcessSection(){return <section className="process-section" id="process"><div className="section"><SectionHeading eyebrow="Our engineering journey" description="A clear five-step corrosion-resolution process, from the first conversation through validated implementation.">From first question<br/><em>to a practical solution.</em></SectionHeading><div className="process-grid">{process.map(([title,text],i)=><article key={title}><span className="step">0{i+1}</span><small>{i===4?'IMPLEMENTATION':`STEP ${i+1}`}</small><h3>{title}</h3><p>{text}</p></article>)}</div><div className="section-action"><Button>Start your engineering project</Button></div></div></section>}

export function ResearchSection({verified=false}){return <section className="research-section" id="partners"><div className="section"><SectionHeading eyebrow="Research & collaboration" description="Connecting academic insight, diagnostic evidence, and industrial application.">Better questions.<br/><em>Stronger engineering.</em></SectionHeading><div className="partner-grid"><article><span className="partner-mark">M</span><div><h3>Missouri S&T</h3><p>Missouri University of Science & Technology</p></div></article><article><span className="partner-mark">K</span><div><h3>Kansas State University</h3><p>College of Engineering</p></div></article></div><p className="research-note">{verified?claims.partnerships:'The published NexaFive research network identifies Missouri S&T and Kansas State University. Contact our team to confirm current collaboration scope for your program.'}</p><details className="testing-details"><summary>Research, diagnostic testing & validation<span className="plus">+</span></summary><p>Programs can include SEM/EDX, EIS, cross-section metallography, galvanic testing, accelerated corrosion testing, surface treatment, adhesion, sealing, and failure analysis.</p><p>{verified?claims.testing:'Confirm applicable laboratory accreditation, test scope, standards, and OEM procedures with our team for your program.'}</p></details></div></section>}

export function FAQSection(){const questions=[['What services does NexaFive Global offer?','Our five capability pillars are battery module and pack engineering, lightweight automotive solutions, tooling and manufacturing, AI/ML optimization, and corrosion mitigation. Explore each capability in the services section above.'],['Can you support battery and EV engineering?','Yes. The published service scope includes design, simulation, and consulting for BEV cells, modules, and packs, with thermal management, structural integrity, and corrosion prevention.'],['How do you approach corrosion problems?','We connect problem intake and diagnostic testing with solution engineering, prototype validation, and implementation support. The five-step process above describes this approach.'],['Which industries do you support?','Automotive OEMs, Tier suppliers, Energy / BEV, Healthcare Technologies, and Industrial Manufacturing. Healthcare technology work includes EHR software development and data integration.'],['How can I start a project or get a quotation?','Use the enquiry form below, email info@nexafiveglobal.com, or call (651) 416-7950. Pricing, project scope, and timelines are discussed directly with the team.']];return <section className="section faq-section" id="faq"><SectionHeading eyebrow="Frequently asked questions" description="A few helpful answers before we start the conversation.">Engineering questions.<br/><em>Clear answers.</em></SectionHeading><div className="faq-list">{questions.map(([question,answer],i)=><details key={question}><summary><span>0{i+1}</span>{question}<span className="plus">+</span></summary><p>{answer}</p></details>)}</div></section>}

export function ProjectCTA(){return <section className="cta-section"><div className="section"><Eyebrow>Let’s engineer what’s next</Eyebrow><h2>Your next challenge.<br/><em>Our next conversation.</em></h2><p>Bring us your material, process, or product challenge.<br/>Let’s find a way forward, together.</p><div className="cta-actions"><Button>Start a Project</Button><a className="button secondary" href={`tel:${company.phone}`}>Call our team<Icon name="arrow"/></a></div></div></section>}
