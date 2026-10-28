import HeaderNavigation,{primaryNavigation} from './HeaderNavigation.jsx';
import CommandPalette from './CommandPalette.jsx';
import BrandMark from '../components/BrandMark.jsx';
import {useEffect,useRef,useState} from 'react';
import {boardMembers,leadershipMembers,company,memberSlug} from '../content.js';
import Glyph from './Glyph.jsx';
import BoardIntro from './BoardIntro.jsx';
import {ThemeControl} from '../v3/Theme.jsx';
import {useReveal} from './motion.js';
import './v2.css';
import './member-profile.css';

const links=primaryNavigation;

function BoardHeader({basePath}){
 const destination=href=>href;
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
   <HeaderNavigation id="board-navigation" boardPath="/team" teamPage onNavigate={()=>setOpen(false)}/>
   <div className="n5-island-tools"><ThemeControl/><button type="button" className="n5-search" onClick={()=>setPalette(true)} aria-label="Search the site"><Glyph name="search"/></button><a className="n5-btn n5-btn-sm n5-island-cta" href="/contact">Let’s talk</a><button ref={toggle} className="n5-burger" type="button" aria-expanded={open} aria-controls="board-navigation" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(value=>!value)}><span/><span/></button></div>
  </div>
 </header><CommandPalette open={palette} onClose={()=>setPalette(false)} boardPath="/team"/></>;
}

function BoardCard({member}){
 const initials=member.name.split(/\s+/).map(part=>part[0]).slice(0,2).join('');
 return <a href={`/team/${memberSlug(member)}`} className="n5-board-card n5-r" aria-label={`View ${member.name}’s profile`}>
  {member.image?<img className="n5-board-portrait" src={member.image} alt={`Portrait of ${member.name}`} loading="lazy" width="720" height="840"/>:<div className="n5-board-initials" aria-hidden="true">{initials}</div>}
  <div className="n5-board-card-copy">{member.demo&&<span className="n5-demo-badge">Demo profile</span>}<p className="n5-board-role">{member.role}</p><h2>{member.name}</h2><p>{member.bio}</p><span className="n5-team-profile-link">View profile<Glyph name="arrow"/></span></div>
 </a>;
}

function MemberPortrait({member}){
 return <figure className="n5-member-image n5-profile-portrait">{member.image?<img src={member.image} alt={`Portrait of ${member.name}`} width="630" height="640"/>:<div className="n5-profile-photo-placeholder" aria-hidden="true">{member.name.split(/\s+/).map(part=>part[0]).slice(0,2).join('')}</div>}<figcaption><span>{member.demo?'Demo profile':'NexaFive Global'}</span><strong>{member.name}</strong><small>{member.role}</small></figcaption></figure>;
}

export function MemberProfile({member}){
 useReveal(memberSlug(member));
 return <div className="v2 n5-board-page n5-member-page" data-profile={memberSlug(member)}><BoardHeader/><main className="n5-member-main"><div className="n5-wrap"><a className="n5-link" href="/team">← All leadership &amp; advisors</a><div className="n5-member-layout"><MemberPortrait member={member}/><div>{member.demo&&<span className="n5-demo-badge">Demo profile</span>}<p className="n5-eyebrow">{member.role}</p><h1>{member.name}</h1><p className="n5-member-summary">{member.bio}</p><h2>About {member.name.split(' ')[0]}</h2>{(member.details||[member.bio]).map(text=><p key={text}>{text}</p>)}{member.areas&&<><h2>Areas of focus</h2><ul>{member.areas.map(area=><li key={area}>{area}</li>)}</ul></>}<a className="n5-btn" href="/contact">Contact NexaFive<Glyph name="arrow"/></a></div></div></div></main></div>;
}

export default function BoardMembers({basePath=''}){
 useReveal();
 const destination=href=>href;
 return <div className="v2 n5-board-page">
  <BoardIntro members={boardMembers}/>
  <a className="n5-skip" href="#team-content">Skip to team content</a>
  <BoardHeader basePath={basePath}/>
  <main id="team-content">
   <section className="n5-leadership-intro"><div className="n5-wrap"><h1 className="n5-team-title">Leadership &amp; Advisory Board</h1><p className="n5-team-tagline">Experience that guides. Vision that moves us forward.</p></div></section>
   <section className="n5-board-list" aria-labelledby="leadership-title"><div className="n5-wrap"><h2 className="n5-team-group-title" id="leadership-title">Leadership</h2><div className="n5-board-grid">{leadershipMembers.map(member=><BoardCard key={member.name} member={member}/>)}</div></div></section>
   <section className="n5-board-list n5-board-advisors" aria-labelledby="advisors-title"><div className="n5-wrap"><h2 className="n5-team-group-title" id="advisors-title">Board of Advisors</h2>{boardMembers.length?<div className="n5-board-grid">{boardMembers.map(member=><BoardCard key={member.email||member.name} member={member}/>)}</div>:<section className="n5-board-pending" aria-labelledby="board-pending-title"><Glyph name="layers"/><div><p className="n5-eyebrow">Advisor profiles</p><h2 id="board-pending-title">Advisor details are being confirmed.</h2><p>For advisor-related correspondence, please contact the NexaFive Global team directly.</p><a className="n5-link" href={`mailto:${company.email}`}><Glyph name="mail"/>{company.email}</a></div></section>}</div></section>
   <section className="n5-board-cta"><div className="n5-wrap"><p className="n5-eyebrow">Work with NexaFive</p><h2>Bring a challenging question.<br/><span>We’ll help find a practical way forward.</span></h2><a className="n5-btn" href="/contact">Start a project<Glyph name="arrow"/></a></div></section>
  </main>
  <footer className="n5-foot"><div className="n5-wrap"><div className="n5-foot-top"><a className="n5-logo n5-logo-foot" href={`${basePath||'/'}#hero`} aria-label="NexaFive Global home"><BrandMark/></a><p className="n5-foot-tag">Connected expertise.<br/><span>Boundless possibilities.</span></p><nav className="n5-foot-nav" aria-label="Footer navigation">{links.map(([href,label])=><a key={href} href={destination(href)}>{label}</a>)}</nav></div><div className="n5-foot-bottom"><span>© {new Date().getFullYear()} NexaFive Global. {company.tagline}</span><a href={`${basePath||'/'}#hero`}>Back to site<Glyph name="up"/></a></div></div></footer>
 </div>;
}
