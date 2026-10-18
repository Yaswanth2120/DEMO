import {useEffect,useId,useState} from 'react';

// Desktop uses display:contents; only the V3 phone layout becomes a disclosure.
export default function MobileFold({enabled=false,label,kind='',children}){
 const [open,setOpen]=useState(false),[ready,setReady]=useState(false),id=useId();
 useEffect(()=>{
  if(!enabled)return;
  setReady(true);
  let frame=0;
  const align=fragment=>{if(!matchMedia('(max-width:700px)').matches)return;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{frame=requestAnimationFrame(()=>document.getElementById(fragment.slice(1))?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'}))})};
  const reveal=()=>{if(kind==='form')setOpen(true)};
  const hash=()=>{if((kind==='faq'&&location.hash==='#faq')||(kind==='form'&&location.hash==='#contact-form')||(kind==='solutions'&&location.hash==='#solutions')||(kind==='disciplines'&&location.hash==='#about')){setOpen(true);align(location.hash)}};
  const click=event=>{const link=event.target.closest?.('a[href^="#"]');if(link&&((kind==='faq'&&link.hash==='#faq')||(kind==='form'&&link.hash==='#contact-form')||(kind==='solutions'&&link.hash==='#solutions')||(kind==='disciplines'&&link.hash==='#about'))){setOpen(true);align(link.hash)}};
  hash();window.addEventListener('n5:enquire',reveal);window.addEventListener('hashchange',hash);document.addEventListener('click',click);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('n5:enquire',reveal);window.removeEventListener('hashchange',hash);document.removeEventListener('click',click)};
 },[enabled,kind]);
 if(!enabled)return children;
 return <div className={`n5-mobile-fold n5-mobile-${kind}`} data-open={open} data-ready={ready}><button className="n5-mobile-fold-toggle" type="button" aria-expanded={open} aria-controls={id} onClick={()=>setOpen(value=>!value)}>{label}<span aria-hidden="true">{open?'−':'+'}</span></button><div className="n5-mobile-fold-body" id={id}>{children}</div></div>;
}
