import {useEffect,useState} from 'react';

export const reducedMotion=()=>typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Re-arm only after a block leaves view, avoiding flicker near the reveal threshold.
export function useReveal(resetKey){
 useEffect(()=>{
  if(!('IntersectionObserver' in window))return;
  const root=document.documentElement,query=window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets=[...document.querySelectorAll('.n5-r')];
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting&&entry.intersectionRatio>=.08)entry.target.classList.add('is-in');else if(!entry.isIntersecting)entry.target.classList.remove('is-in')}},{rootMargin:'0px 0px -6% 0px',threshold:[0,.08]});
  const configure=()=>{observer.disconnect();root.classList.toggle('n5-motion',!query.matches);for(const target of targets){target.classList.remove('is-in');if(!query.matches)observer.observe(target)}};
  configure();query.addEventListener('change',configure);
  return()=>{observer.disconnect();query.removeEventListener('change',configure);root.classList.remove('n5-motion')};
 },[resetKey]);
}

export function useInView(ref,threshold=.3){
 const [inView,setInView]=useState(false);
 useEffect(()=>{
  const element=ref.current;
  if(!element||!('IntersectionObserver' in window)){setInView(true);return}
  const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting),{threshold});
  observer.observe(element);
  return()=>observer.disconnect();
 },[ref,threshold]);
 return inView;
}

// Pointer-following light on cards. CSSOM custom properties are permitted by the style-src CSP.
export function usePointerGlow(){
 useEffect(()=>{
  if(!window.matchMedia('(hover: hover)').matches)return;
  const move=event=>{
   const card=event.target.closest?.('.n5-glow');
   if(!card)return;
   const rect=card.getBoundingClientRect();
   card.style.setProperty('--mx',`${event.clientX-rect.left}px`);
   card.style.setProperty('--my',`${event.clientY-rect.top}px`);
  };
  document.addEventListener('pointermove',move,{passive:true});
  return()=>document.removeEventListener('pointermove',move);
 },[]);
}

export function scrollToHash(hash){
 const target=document.querySelector(hash);
 if(!target)return;
 target.scrollIntoView({behavior:reducedMotion()?'auto':'smooth',block:'start'});
 history.replaceState(null,'',hash);
}

export const pad=index=>String(index+1).padStart(2,'0');
