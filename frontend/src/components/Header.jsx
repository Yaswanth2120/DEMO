import {useEffect,useRef,useState} from 'react';
import {company} from '../content.js';
import Icon from './Icons.jsx';
import {Button,Logo} from './UI.jsx';
const links=[['/','Home'],['/about','About Us'],['/services','Services'],['/solutions','Solutions'],['/industries','Industries'],['/research','Research']];
export default function Header({path}){
 const [open,setOpen]=useState(false);const toggle=useRef(null),nav=useRef(null);
 useEffect(()=>{const escape=e=>{if(e.key==='Escape'&&open){setOpen(false);toggle.current?.focus()}};const outside=e=>{if(open&&!nav.current?.contains(e.target)&&!toggle.current?.contains(e.target))setOpen(false)};document.addEventListener('keydown',escape);document.addEventListener('click',outside);return()=>{document.removeEventListener('keydown',escape);document.removeEventListener('click',outside)}},[open]);
 useEffect(()=>{const query=window.matchMedia('(min-width: 1101px)');const reset=()=>{if(query.matches)setOpen(false)};query.addEventListener('change',reset);return()=>query.removeEventListener('change',reset)},[]);
 return <><div className="topbar"><div className="container"><span>SCIENCE. ENGINEERING. POSSIBILITY.</span><a href={`mailto:${company.email}`}>{company.email} ↗</a><span>{company.location}</span></div></div><header><div className="header-inner container"><Logo/><button ref={toggle} className="menu-toggle" type="button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="navigation" aria-label={open?'Close navigation':'Open navigation'}><Icon name={open?'close':'menu'}/></button><nav id="navigation" ref={nav} className={open?'open':''} aria-label="Main navigation">{links.map(([url,text])=><a key={url} href={url} aria-current={(path===url||(url==='/services'&&path.startsWith('/services/')))?'page':undefined} onClick={()=>setOpen(false)}>{text}</a>)}<Button>Start a Project</Button></nav></div></header></>;
}
