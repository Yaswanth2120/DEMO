import {useEffect,useRef} from 'react';
import './header-navigation.css';

const expertise=[['Services','#pillars','Engineering and technical support'],['Industries','#industries','Where we apply our expertise'],['Our method','#process','From concept through delivery'],['Research & collaboration','#partners','Insight grounded in evidence']];

export default function HeaderNavigation({id='n5-nav',homepage=false,boardPath='/boardmembers',teamPage=false,onNavigate=()=>{}}){
 const disclosure=useRef(null);
 const home=hash=>homepage?hash:'/'+hash;
 const close=()=>{if(disclosure.current)disclosure.current.open=false;onNavigate()};
 useEffect(()=>{
  const outside=event=>{const element=disclosure.current;if(element?.open&&!element.contains(event.target))element.open=false};
  document.addEventListener('pointerdown',outside);
  return()=>document.removeEventListener('pointerdown',outside);
 },[]);
 return <nav id={id} className="n5-nav" aria-label="Main navigation">
  <a href={home('#hero')} onClick={close}>Home</a>
  <a href={home('#about')} onClick={close}>About</a>
  <details ref={disclosure} className="n5-expertise-nav" onKeyDown={event=>{if(event.key==='Escape'&&disclosure.current?.open){event.preventDefault();event.stopPropagation();disclosure.current.open=false;disclosure.current.querySelector('summary').focus()}}}>
   <summary>Expertise<span className="n5-nav-chevron" aria-hidden="true"/></summary>
   <div className="n5-expertise-menu"><span className="n5-expertise-caption">Services &amp; industries</span>{expertise.map(([label,hash,description])=><a key={hash} href={home(hash)} onClick={close}><strong>{label}</strong><span>{description}</span><span className="n5-expertise-arrow" aria-hidden="true">↗</span></a>)}</div>
  </details>
  <a href={boardPath} aria-current={teamPage?'page':undefined} onClick={close}>Team</a>
  <a href={home('#contact')} onClick={close}>Contact</a>
 </nav>;
}
