import {useEffect,useState} from 'react';

export const reducedMotion=()=>typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Register content blocks on every page, including panels mounted after selection.
// A reveal resets only once its block has completely left the viewport.
export function useReveal(resetKey){
 useEffect(()=>{
  if(!('IntersectionObserver' in window))return;
  const root=document.documentElement,query=window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets=new Set(),automatic=new Set();
  let frame=0;
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)entry.target.classList.add('is-in');else entry.target.classList.remove('is-in')}},{threshold:0});
  const register=()=>{
   const candidates=[...document.querySelectorAll('.v2 main section > .n5-wrap > *, .v2 main > .n5-wrap > *, .v2 .n5-member-layout > *')].filter(element=>!element.matches('script,style,[hidden]')&&!element.closest('[aria-hidden="true"]'));
   // Animate one level of content, never a parent and its child together.
   for(const element of candidates){if(element.matches('.n5-r')||element.closest('.n5-r')||element.querySelector('.n5-r')||candidates.some(child=>child!==element&&element.contains(child)))continue;element.classList.add('n5-r');automatic.add(element)}
   for(const target of targets){if(!target.isConnected){observer.unobserve(target);targets.delete(target);automatic.delete(target)}}
   for(const target of document.querySelectorAll('.v2 .n5-r')){if(targets.has(target))continue;targets.add(target);if(!query.matches)observer.observe(target)}
  };
  const configure=()=>{observer.disconnect();root.classList.toggle('n5-motion',!query.matches);register();for(const target of targets){target.classList.remove('is-in');if(!query.matches)observer.observe(target)}};
  const mutations=new MutationObserver(()=>{if(!frame)frame=requestAnimationFrame(()=>{frame=0;register()})});
  configure();mutations.observe(document.querySelector('.v2 main')||document.body,{childList:true,subtree:true});query.addEventListener('change',configure);
  return()=>{cancelAnimationFrame(frame);mutations.disconnect();observer.disconnect();query.removeEventListener('change',configure);root.classList.remove('n5-motion');for(const target of targets)target.classList.remove('is-in');for(const target of automatic)target.classList.remove('n5-r')};
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
