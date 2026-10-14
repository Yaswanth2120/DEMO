import {useEffect,useRef,useState} from 'react';
import Icon from './Icons.jsx';
import {Logo} from './UI.jsx';
const links=[['#hero','Home'],['#about','About Us'],['#pillars','Services'],['#solutions','Solutions'],['#industries','Industries'],['#process','Process'],['#partners','Research'],['#faq','FAQ']];
export default function Header({path}){
 const [open,setOpen]=useState(false),[active,setActive]=useState('#hero');
 const toggle=useRef(null),nav=useRef(null);
 useEffect(()=>{
  const escape=e=>{if(e.key==='Escape'&&open){setOpen(false);toggle.current?.focus()}};
  const outside=e=>{if(open&&!nav.current?.contains(e.target)&&!toggle.current?.contains(e.target))setOpen(false)};
  document.addEventListener('keydown',escape);document.addEventListener('click',outside);
  return()=>{document.removeEventListener('keydown',escape);document.removeEventListener('click',outside)};
 },[open]);
 useEffect(()=>{const query=window.matchMedia('(min-width: 1101px)');const reset=()=>{if(query.matches)setOpen(false)};query.addEventListener('change',reset);return()=>query.removeEventListener('change',reset)},[]);
 useEffect(()=>{const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActive('#'+entry.target.id)},{rootMargin:'-15% 0px -65% 0px'});for(const [hash] of links){const section=document.querySelector(hash);if(section)observer.observe(section)}return()=>observer.disconnect()},[]);
 const prefix=path==='/'?'':'/';
 return <header><div className="header-inner container"><Logo/><button ref={toggle} className="menu-toggle" type="button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="navigation" aria-label={open?'Close navigation':'Open navigation'}><Icon name={open?'close':'menu'}/></button><nav id="navigation" ref={nav} className={open?'open':''} aria-label="Main navigation">{links.map(([url,text])=><a key={url} href={prefix+url} aria-current={active===url?'location':undefined} onClick={()=>{setOpen(false);setActive(url)}}>{text}</a>)}<a className="button" href={prefix+'#contact'} onClick={()=>{setOpen(false);setActive('#contact')}}>Start a Project<Icon name="arrow"/></a></nav></div></header>;
}
