import {useEffect,useRef,useState} from 'react';
import {company,claims,demoIndustryCollaborators} from '../content.js';
import Glyph from './Glyph.jsx';
import {ThemeControl} from '../v3/Theme.jsx';
import Constellation from './Constellation.jsx';
import Capabilities from './Capabilities.jsx';
import Method from './Method.jsx';
import Sectors from './Sectors.jsx';
import Enquiry from './Enquiry.jsx';
import CommandPalette from './CommandPalette.jsx';
import {useReveal,usePointerGlow} from './motion.js';
import './v2.css';
import MobileFold from '../v3/MobileFold.jsx';

const links=[['#pillars','Capabilities'],['#process','Method'],['#industries','Industries'],['#partners','Research'],['/boardmembers','Our Board']];
const chapters=[['hero','Intro'],['pillars','Capabilities'],['process','Method'],['industries','Industries'],['partners','Research'],['contact','Contact']];

function Logo({className=''}){
 return <a className={`n5-logo ${className}`} href="#hero" aria-label="NexaFive Global home"><img src="/assets/nexafive-logo.png" alt="NexaFive Global — Innovate Beyond Boundaries" width="163" height="45"/></a>;
}

function Island({onSearch,shortcut,boardPath}){
 const [open,setOpen]=useState(false);
 const [compact,setCompact]=useState(false);
 const toggle=useRef(null);
 useEffect(()=>{
  const onScroll=()=>setCompact(window.scrollY>24);
  onScroll();
  window.addEventListener('scroll',onScroll,{passive:true});
  const wide=window.matchMedia('(min-width: 961px)');
  const onWide=()=>{if(wide.matches)setOpen(false)};
  wide.addEventListener('change',onWide);
  return()=>{window.removeEventListener('scroll',onScroll);wide.removeEventListener('change',onWide)};
 },[]);
 useEffect(()=>{
  if(!open)return;
  const onKey=event=>{if(event.key==='Escape'){setOpen(false);toggle.current?.focus()}};
  document.addEventListener('keydown',onKey);
  return()=>document.removeEventListener('keydown',onKey);
 },[open]);
 const close=()=>setOpen(false);
 return <header className="n5-island" data-compact={compact} data-open={open}>
  <div className="n5-island-bar">
   <Logo/>
   <nav id="n5-nav" className="n5-nav" aria-label="Main navigation">
    {links.map(([href,label])=><a key={href} href={href==='/boardmembers'?boardPath:href} onClick={close}>{label}</a>)}
    <a className="n5-nav-contact" href="#contact" onClick={close}>Start a project<Glyph name="arrow"/></a>
   </nav>
   <div className="n5-island-tools"><ThemeControl/>
    <button type="button" className="n5-search" onClick={onSearch} aria-label={`Search the site (${shortcut})`}><Glyph name="search"/><kbd>{shortcut}</kbd></button>
    <a className="n5-btn n5-btn-sm n5-island-cta" href="#contact">Let’s talk</a>
    <button type="button" ref={toggle} className="n5-burger" aria-expanded={open} aria-controls="n5-nav" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(value=>!value)}><span/><span/></button>
   </div>
  </div>
 </header>;
}

function Rail(){
 const [active,setActive]=useState('hero');
 const [tone,setTone]=useState('light');
 useEffect(()=>{
  const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){setActive(entry.target.id);setTone(entry.target.dataset.tone||'light')}},{rootMargin:'-48% 0px -48% 0px'});
  chapters.forEach(([id])=>{const element=document.getElementById(id);if(element)observer.observe(element)});
  return()=>observer.disconnect();
 },[]);
 return <nav className="n5-rail" data-tone={tone} aria-label="Page chapters">
  {chapters.map(([id,label])=><a key={id} href={`#${id}`} aria-current={active===id?'true':undefined}><span className="n5-rail-label">{label}</span><span className="n5-rail-dot"/></a>)}
 </nav>;
}

function Hero({mobileCompact}){
 return <section id="hero" className="n5-hero" data-tone="light">
  <div className="n5-hero-sky" aria-hidden="true"><span/><span/><span/></div>
  <div className="n5-wrap n5-hero-grid">
   <div className="n5-hero-copy">
    <p className="n5-kicker"><span className="n5-live" aria-hidden="true"/>Engineering &amp; technology consultancy · Minneapolis</p>
    <h1 className="n5-title" aria-label="Innovate beyond boundaries.">
     <span className="n5-line" aria-hidden="true"><span>Innovate</span></span>
     <span className="n5-line" aria-hidden="true"><span>beyond</span></span>
     <span className="n5-line" aria-hidden="true"><span className="n5-shine">boundaries.</span></span>
    </h1>
    <p className="n5-lede">{company.overview}</p>
    <div className="n5-actions">
     <a className="n5-btn" href="#contact">Start a project<Glyph name="arrow"/></a>
     <a className="n5-btn n5-btn-quiet" href="#pillars">Explore capabilities</a>
    </div>
    <dl className="n5-facts">
     <div><dt>05</dt><dd>Disciplines</dd></div>
     <div><dt>05</dt><dd>Capabilities</dd></div>
     <div><dt>E2E</dt><dd>Concept to production</dd></div>
    </dl>
   </div>
   <MobileFold enabled={mobileCompact} kind="disciplines" label="Explore our five disciplines"><Constellation/></MobileFold>
  </div>
 </section>;
}

function Research({verified,mobileCompact}){
 const methods=['SEM / EDX','EIS','Cross-section metallography','Galvanic testing','Accelerated corrosion testing'];
 const industryCards=[...demoIndustryCollaborators,...demoIndustryCollaborators];
 return <section id="partners" className="n5-research n5-dark" data-tone="dark">
  <div className="n5-wrap">
   <div className="n5-research-intro n5-r">
    <p className="n5-eyebrow">Research &amp; collaboration</p>
    <h2>Curiosity,<br/><span>backed by evidence.</span></h2>
    <p>Academic insight, industrial perspective, and diagnostic testing bring a different depth to complex questions.</p>
    <p className="n5-fine">{verified?claims.partnerships:'Ask our team about the current collaboration scope for your program.'}</p>
   </div>
   <div className="n5-research-subsections">
    <section className="n5-universities n5-r" aria-labelledby="universities-title">
     <div className="n5-subsection-heading"><p className="n5-eyebrow">Universities</p><h3 id="universities-title">Academic collaboration</h3></div>
     <div className="n5-partners">
      <article className="n5-partner"><div className="n5-partner-logo"><img src="/assets/missouri-st-logo.png" alt="Missouri S&T university logo" width="2315" height="1880" loading="lazy"/></div><div><h4>Missouri S&amp;T</h4><p>Missouri University of Science and Technology</p></div></article>
      <article className="n5-partner"><div className="n5-partner-logo"><img src="/assets/university-1.jpg" alt="Kansas State University wordmark" width="300" height="158" loading="lazy"/></div><div><h4>Kansas State University</h4><p>College of Engineering</p></div></article>
     </div>
    </section>
    <MobileFold enabled={mobileCompact} kind="network" label="Explore the industry network"><section className="n5-industrial-network n5-r" aria-labelledby="industries-title">
     <div className="n5-subsection-heading"><p className="n5-eyebrow">Industries</p><h3 id="industries-title">Industry network</h3><p>Illustrative collaborators shown for design review. Confirmed partners will replace these examples.</p></div>
     <div className="n5-industry-marquee" tabIndex="0" aria-label="Scrolling illustrative industry collaborator cards; animation pauses on hover or focus"><div className="n5-industry-track">{industryCards.map((industry,index)=><article className="n5-industry-card" key={`${industry.name}-${index}`} aria-hidden={index>=demoIndustryCollaborators.length?'true':undefined}><img src={industry.image} alt="" loading={index<demoIndustryCollaborators.length?'lazy':undefined}/><div><strong>{industry.name}</strong><span>{industry.focus}</span></div></article>)}</div></div>
    </section></MobileFold>
   </div>
   <MobileFold enabled={mobileCompact} kind="testing" label="Testing methods & standards"><div className="n5-lab n5-glow n5-r">
    <p className="n5-eyebrow">Diagnostic methods</p>
    <ul className="n5-chips">{methods.map(method=><li key={method}>{method}</li>)}</ul>
    <div className="n5-standards" aria-label="Standards"><span>ASTM</span><span>SAE</span><span>ISO</span></div>
    <p className="n5-fine">{verified?claims.testing:'Confirm applicable standards, laboratory accreditation, and OEM procedures for your test program.'}</p>
   </div></MobileFold>
  </div>
 </section>;
}

function Footer({boardPath}){
 return <footer className="n5-foot">
  <div className="n5-wrap">
   <div className="n5-foot-top">
    <Logo className="n5-logo-foot"/>
    <p className="n5-foot-tag">Connected expertise.<br/><span>Boundless possibilities.</span></p>
    <nav className="n5-foot-nav" aria-label="Footer">{[...links,['#faq','Questions'],['#contact','Contact']].map(([href,label])=><a key={href} href={href==='/boardmembers'?boardPath:href}>{label}</a>)}</nav>
   </div>
   <details id="privacy" className="n5-privacy">
    <summary>Privacy notice<span className="n5-faq-icon" aria-hidden="true"/></summary>
    <div>
     <h3>Project enquiries</h3>
     <p>Your name, email, optional phone, subject, and message are sent to FormSubmit to deliver your enquiry to {company.email}. Contact the team to request access or deletion. Please do not submit confidential project data.</p>
     <h3>Website data &amp; WhatsApp</h3>
     <p>This website does not add tracking cookies or analytics. Your hosting provider may keep access logs under its own policy. Opening WhatsApp leaves this website and uses WhatsApp’s privacy terms. Its link is available only after the official business number is configured.</p>
     <p>Privacy questions: <a href={`mailto:${company.email}`}>{company.email}</a>.</p>
    </div>
   </details>
   <div className="n5-foot-bottom">
    <span>© {new Date().getFullYear()} NexaFive Global. {company.tagline}</span>
    <a href="#hero">Back to top<Glyph name="up"/></a>
   </div>
  </div>
 </footer>;
}

export default function VersionTwo({config={},basePath='',mobileCompact=false}){
 const boardPath=`${basePath}/boardmembers`;
 const [palette,setPalette]=useState(false);
 const [shortcut,setShortcut]=useState('⌘K');
 useReveal();
 usePointerGlow();
 useEffect(()=>{
  if(!/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent))setShortcut('Ctrl K');
  const onKey=event=>{
   const typing=event.target.closest?.('input, textarea, select, [contenteditable="true"]');
   if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();setPalette(value=>!value)}
   else if(event.key==='/'&&!typing&&!event.metaKey&&!event.ctrlKey){event.preventDefault();setPalette(true)}
  };
  document.addEventListener('keydown',onKey);
  return()=>document.removeEventListener('keydown',onKey);
 },[]);
 return <div className={`v2${mobileCompact?' n5-mobile-compact':''}`}>
  <a className="n5-skip" href="#main">Skip to content</a>
  <Island boardPath={boardPath} onSearch={()=>setPalette(true)} shortcut={shortcut}/>
  <Rail/>
  <main id="main">
   <Hero mobileCompact={mobileCompact}/>
   <Capabilities mobileCompact={mobileCompact}/>
   <Method mobileCompact={mobileCompact}/>
   <Sectors/>
   <Research verified={config.verified} mobileCompact={mobileCompact}/>
   <Enquiry mobileCompact={mobileCompact}/>
  </main>
  <Footer boardPath={boardPath}/>
  <CommandPalette boardPath={boardPath} open={palette} onClose={()=>setPalette(false)}/>
 </div>;
}
