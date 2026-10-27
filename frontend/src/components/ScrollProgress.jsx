import {useEffect,useRef} from 'react';

export default function ScrollProgress(){
 const progress=useRef(null);
 useEffect(()=>{
  let frame=0;
  const update=()=>{
   frame=0;
   const range=document.documentElement.scrollHeight-window.innerHeight;
   const fraction=range>0?Math.max(0,Math.min(1,window.scrollY/range)):0;
   const percent=Math.round(fraction*100);
   progress.current.style.setProperty('--reading-progress',String(fraction));
   progress.current.dataset.started=String(fraction>0);
   progress.current.setAttribute('aria-valuenow',String(percent));
   progress.current.setAttribute('aria-valuetext',`${percent}% of page scrolled`);
  };
  const schedule=()=>{if(!frame)frame=window.requestAnimationFrame(update)};
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  window.visualViewport?.addEventListener('resize',schedule);
  document.addEventListener('toggle',schedule,true);
  const observer=typeof ResizeObserver==='function'?new ResizeObserver(schedule):null;
  observer?.observe(document.body);
  observer?.observe(document.documentElement);
  update();
  return()=>{
   window.cancelAnimationFrame(frame);
   window.removeEventListener('scroll',schedule);
   window.removeEventListener('resize',schedule);
   window.visualViewport?.removeEventListener('resize',schedule);
   document.removeEventListener('toggle',schedule,true);
   observer?.disconnect();
  };
 },[]);
 return <div ref={progress} className="scroll-progress" role="progressbar" aria-label="Page scroll progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} aria-valuetext="0% of page scrolled"><div className="scroll-progress-fill"/><span className="scroll-progress-tip" aria-hidden="true"/></div>;
}
