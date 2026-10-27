import CommandPalette from './CommandPalette.jsx';
import BrandMark from '../components/BrandMark.jsx';
import {useEffect,useRef,useState} from 'react';
import {boardMembers,company} from '../content.js';
import Glyph from './Glyph.jsx';
import BoardIntro from './BoardIntro.jsx';
import {ThemeControl} from '../v3/Theme.jsx';
import {useReveal} from './motion.js';
import './v2.css';

const links=[['/#pillars','Capabilities'],['/#process','Method'],['/#industries','Industries'],['/#partners','Research'],['/boardmembers','Our Board']];

function BoardHeader({basePath}){
 const destination=href=>href==='/boardmembers'?`${basePath}/boardmembers`:`${basePath||'/'}${href.slice(1)}`;
 const [open,setOpen]=useState(false);
 const [palette,setPalette]=useState(false);
 useEffect(()=>{const search=event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();setPalette(value=>!value)}};window.addEventListener('keydown',search);return()=>window.removeEventListener('keydown',search)},[]);
 const toggle=useRef(null);
 useEffect(()=>{
  const escape=event=>{if(event.key==='Escape'&&open){setOpen(false);toggle.current?.focus()}};
  document.addEventListener('keydown',escape);
  return()=>document.removeEventListener('keydown',escape);
 },[open]);
 return <><header className="n5-island n5-board-island" data-open={open}>
  <div className="n5-island-bar">
   <a className="n5-logo" href={`${basePath||'/'}#hero`} aria-label="NexaFive Global home"><BrandMark/></a>
   <nav id="board-navigation" className="n5-nav" aria-label="Main navigation">{links.map(([href,label])=><a key={href} href={destination(href)} aria-current={href==='/boardmembers'?'page':undefined} onClick={()=>setOpen(false)}>{label}</a>)}<a className="n5-nav-contact" href={`${basePath||'/'}#contact`} onClick={()=>setOpen(false)}>Start a project<Glyph name="arrow"/></a></nav>
   <div className="n5-island-tools"><ThemeControl/><button type="button" className="n5-search" onClick={()=>setPalette(true)} aria-label="Search the site"><Glyph name="search"/></button><a className="n5-btn n5-btn-sm n5-island-cta" href={`${basePath||'/'}#contact`}>Let’s talk</a><button ref={toggle} className="n5-burger" type="button" aria-expanded={open} aria-controls="board-navigation" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(value=>!value)}><span/><span/></button></div>
  </div>
 </header><CommandPalette open={palette} onClose={()=>setPalette(false)} boardPath={`${basePath}/boardmembers`}/></>;
}

function BoardCard({member}){
 const initials=member.name.split(/\s+/).map(part=>part[0]).slice(0,2).join('');
 return <article className="n5-board-card n5-r">
  {member.image?<img className="n5-board-portrait" src={member.image} alt={`Portrait of ${member.name}`} loading="lazy" width="720" height="840"/>:<div className="n5-board-initials" aria-hidden="true">{initials}</div>}
  <div className="n5-board-card-copy">{member.demo&&<span className="n5-demo-badge">Demo profile</span>}<p className="n5-board-role">{member.role}</p><h2>{member.name}</h2><p>{member.bio}</p><div className="n5-board-contact">{member.email&&<a href={`mailto:${member.email}`}><Glyph name="mail"/>{member.email}</a>}{member.phone&&<a href={`tel:${member.phone.replace(/[^+\d]/g,'')}`}><Glyph name="phone"/>{member.phone}</a>}</div></div>
 </article>;
}

export default function BoardMembers({basePath=''}){
 useReveal();
 const destination=href=>href==='/boardmembers'?`${basePath}/boardmembers`:`${basePath||'/'}${href.slice(1)}`;
 return <div className="v2 n5-board-page">
  <BoardIntro members={boardMembers}/>
  <a className="n5-skip" href="#board-content">Skip to our board</a>
  <BoardHeader basePath={basePath}/>
  <main id="board-content">
   <section className="n5-board-hero"><div className="n5-wrap n5-board-hero-grid"><div><p className="n5-kicker"><span className="n5-live" aria-hidden="true"/>NexaFive Global · Governance</p><h1>Leadership for the work that matters next.</h1><p>Our board helps guide NexaFive Global with long-term perspective across science, engineering, manufacturing, and responsible growth.</p></div><aside className="n5-board-hero-note"><Glyph name="layers"/><p>Grounded in technical rigor. Focused on durable impact.</p></aside></div></section>
   <section className="n5-board-list"><div className="n5-wrap"><header className="n5-board-heading"><p className="n5-eyebrow">Our Board</p><h2>Guidance informed by<br/><span>experience and evidence.</span></h2><p>Meet the people who support the company’s long-term direction and governance.</p>{boardMembers.some(member=>member.demo)&&<p className="n5-demo-notice">Demo profiles and contact details are shown for layout review only. Replace them with approved board information before launch.</p>}</header>{boardMembers.length?<div className="n5-board-grid">{boardMembers.map(member=><BoardCard key={member.email||member.name} member={member}/>)}</div>:<section className="n5-board-pending" aria-labelledby="board-pending-title"><Glyph name="layers"/><div><p className="n5-eyebrow">Board profiles</p><h2 id="board-pending-title">Board member details are being confirmed.</h2><p>For board-related correspondence, please contact the NexaFive Global team directly.</p><a className="n5-link" href={`mailto:${company.email}`}><Glyph name="mail"/>{company.email}</a></div></section>}</div></section>
   <section className="n5-board-cta"><div className="n5-wrap"><p className="n5-eyebrow">Work with NexaFive</p><h2>Bring a challenging question.<br/><span>We’ll help find a practical way forward.</span></h2><a className="n5-btn" href={`${basePath||'/'}#contact`}>Start a project<Glyph name="arrow"/></a></div></section>
  </main>
  <footer className="n5-foot"><div className="n5-wrap"><div className="n5-foot-top"><a className="n5-logo n5-logo-foot" href={`${basePath||'/'}#hero`} aria-label="NexaFive Global home"><BrandMark/></a><p className="n5-foot-tag">Connected expertise.<br/><span>Boundless possibilities.</span></p><nav className="n5-foot-nav" aria-label="Footer navigation">{links.map(([href,label])=><a key={href} href={destination(href)}>{label}</a>)}<a href={`${basePath||'/'}#contact`}>Contact</a></nav></div><div className="n5-foot-bottom"><span>© {new Date().getFullYear()} NexaFive Global. {company.tagline}</span><a href={`${basePath||'/'}#hero`}>Back to site<Glyph name="up"/></a></div></div></footer>
 </div>;
}
