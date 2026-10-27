import HeaderNavigation from './HeaderNavigation.jsx';
import DisciplinePage from './DisciplinePage.jsx';
import {disciplinePages} from './discipline-content.js';
import Research from './Research.jsx';
import BrandMark from '../components/BrandMark.jsx';
import {useEffect,useRef,useState} from 'react';
import {company} from '../content.js';
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
const disciplineLinks=[['#hero','Overview'],['#focus','Focus areas'],['#approach','Approach'],['#discipline-contact','Discuss a project'],['/boardmembers','Our Board']];
const disciplineChapters=[['hero','Intro'],['focus','Focus areas'],['approach','Approach'],['discipline-contact','Contact']];
const chapters=[['hero','Intro'],['pillars','Capabilities'],['process','Method'],['industries','Industries'],['partners','Research'],['contact','Contact']];

function Logo({className='',homePath='#hero'}){
 return <a className={`n5-logo ${className}`} href={homePath} aria-label="NexaFive Global home"><BrandMark/></a>;
}

function Island({onSearch,shortcut,boardPath,discipline}){
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
   <Logo homePath={discipline?'/':'#hero'}/>
   <HeaderNavigation homepage={!discipline} boardPath={boardPath} onNavigate={close}/>
   <div className="n5-island-tools"><ThemeControl/>
    <button type="button" className="n5-search" onClick={onSearch} aria-label={`Search the site (${shortcut})`}><Glyph name="search"/><kbd>{shortcut}</kbd></button>
    <a className="n5-btn n5-btn-sm n5-island-cta" href={discipline?'#discipline-contact':'#contact'}>Let’s talk</a>
    <button type="button" ref={toggle} className="n5-burger" aria-expanded={open} aria-controls="n5-nav" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(value=>!value)}><span/><span/></button>
   </div>
  </div>
 </header>;
}

function Rail({discipline}){
 const items=discipline?disciplineChapters:chapters;
 const [active,setActive]=useState('hero');
 const [tone,setTone]=useState('light');
 useEffect(()=>{
  const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){setActive(entry.target.id);setTone(entry.target.dataset.tone||'light')}},{rootMargin:'-48% 0px -48% 0px'});
  items.forEach(([id])=>{const element=document.getElementById(id);if(element)observer.observe(element)});
  return()=>observer.disconnect();
 },[items]);
 return <nav className="n5-rail" data-tone={tone} aria-label="Page chapters">
  {items.map(([id,label])=><a key={id} href={`#${id}`} aria-current={active===id?'true':undefined}><span className="n5-rail-label">{label}</span><span className="n5-rail-dot"/></a>)}
 </nav>;
}

function Hero({mobileCompact,discipline,onDisciplineSelect}){
 const message=discipline?{lines:discipline.lines,text:discipline.intro}:{lines:['Innovate','beyond','boundaries.'],text:company.overview};
 return <section id="hero" className="n5-hero" data-tone="light">
  <div className="n5-hero-sky" aria-hidden="true"><span/><span/><span/></div>
  <div className="n5-wrap n5-hero-grid">
   <div className="n5-hero-copy">
    {discipline&&<a className="n5-discipline-breadcrumb" href="/" onClick={event=>{if(!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();onDisciplineSelect(null)}}}><Glyph name="arrow"/>NexaFive / {discipline.name}</a>}
    <p className="n5-kicker"><span className="n5-live" aria-hidden="true"/>Engineering &amp; technology consultancy · Minneapolis</p>
    <div className="n5-hero-message" aria-live="polite" aria-atomic="true">
     <h1 className="n5-title" aria-label={message.lines.join(' ')}>{message.lines.map((line,i)=><span className="n5-line" aria-hidden="true" key={i}><span className={i===2?'n5-shine':undefined}>{line}</span></span>)}</h1>
     <p className="n5-lede">{message.text}</p>
    </div>
    <div className="n5-actions">
     <a className="n5-btn" href={discipline?'#discipline-contact':'#contact'}>Start a project<Glyph name="arrow"/></a>
     <a className="n5-btn n5-btn-quiet" href={discipline?'#focus':'#pillars'}>{discipline?'Explore '+discipline.name:'Explore capabilities'}</a>
    </div>
    {discipline?<p className="n5-discipline-hint">Choose another discipline, or select {discipline.name} again to return to the full NexaFive site.</p>:<dl className="n5-facts">
     <div><dt>05</dt><dd>Disciplines</dd></div>
     <div><dt>05</dt><dd>Capabilities</dd></div>
     <div><dt>E2E</dt><dd>Concept to production</dd></div>
    </dl>}
   </div>
   <MobileFold enabled={mobileCompact} kind="disciplines" label="Explore our five disciplines"><Constellation initialActive={discipline?disciplinePages.indexOf(discipline):null} onSelect={onDisciplineSelect}/></MobileFold>
  </div>
 </section>;
}

function Footer({boardPath,discipline}){
 return <footer className="n5-foot">
  <div className="n5-wrap">
   <div className="n5-foot-top">
    <Logo className="n5-logo-foot" homePath={discipline?'/':'#hero'}/>
    <p className="n5-foot-tag">Connected expertise.<br/><span>Boundless possibilities.</span></p>
    <nav className="n5-foot-nav" aria-label="Footer">{(discipline?disciplineLinks:[...links,['#faq','Questions'],['#contact','Contact']]).map(([href,label])=><a key={href} href={href==='/boardmembers'?boardPath:href}>{label}</a>)}</nav>
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

export default function VersionTwo({config={},basePath='',mobileCompact=false,discipline,onDisciplineSelect}){
 const boardPath=`${basePath}/boardmembers`;
 const [palette,setPalette]=useState(false);
 const [shortcut,setShortcut]=useState('⌘K');
 useReveal(discipline?.slug);
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
  <Island boardPath={boardPath} onSearch={()=>setPalette(true)} shortcut={shortcut} discipline={discipline}/>
  <Rail discipline={discipline}/>
  <main id="main">
   <Hero mobileCompact={mobileCompact} discipline={discipline} onDisciplineSelect={onDisciplineSelect}/>
   {discipline?<DisciplinePage discipline={discipline} onHome={()=>onDisciplineSelect(null)}/>:<>
   <Capabilities mobileCompact={mobileCompact}/>
   <Method mobileCompact={mobileCompact}/>
   <Sectors/>
   <Research verified={config.verified} mobileCompact={mobileCompact}/>
   <Enquiry mobileCompact={mobileCompact}/></>}
  </main>
  <Footer boardPath={boardPath} discipline={discipline}/>
  <CommandPalette boardPath={boardPath} open={palette} onClose={()=>setPalette(false)}/>
 </div>;
}
