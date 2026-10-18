import {useEffect} from 'react';

// Native anchor scrolling can run before hydration, fonts, and the loader settle.
export function useSectionArrival(path){
 useEffect(()=>{
  let disposed=false,revision=0,frame=0,timer=0,observer;
  const align=async()=>{
   const current=++revision,hash=window.location.hash;
   if(!hash)return;
   try{await document.fonts?.ready}catch{/* Keep anchor navigation available. */}
   const finish=()=>{
    if(disposed||current!==revision||location.hash!==hash)return;
    frame=requestAnimationFrame(()=>{frame=requestAnimationFrame(()=>{
     if(disposed||current!==revision)return;
     let target;try{target=document.getElementById(decodeURIComponent(hash.slice(1)))}catch{return}
     target?.scrollIntoView({behavior:'instant',block:'start'});
    })});
   };
   observer?.disconnect();clearTimeout(timer);
   const loader=document.getElementById('page-loader');
   if(!loader||loader.hidden){finish();return}
   const ready=()=>{observer?.disconnect();clearTimeout(timer);finish()};
   observer=new MutationObserver(()=>{if(loader.hidden)ready()});
   observer.observe(loader,{attributes:true,attributeFilter:['hidden']});
   timer=setTimeout(ready,5500);
  };
  align();
  return()=>{disposed=true;revision++;observer?.disconnect();clearTimeout(timer);cancelAnimationFrame(frame)};
 },[path]);
}
