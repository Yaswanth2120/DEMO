// Reveal only after React is interactive and critical visual assets have settled.
// The standalone boot script also has a deadline if this bundle cannot run.
export function revealWhenReady(){
 const loader=window.__nexafiveLoader;
 if(!loader)return()=>{};
 let cancelled=false;
 const hero=document.querySelector('.hero-visual img');
 const assets=[document.fonts?.ready||Promise.resolve()];
 if(hero?.decode)assets.push(hero.decode());
 const deadline=window.setTimeout(()=>{if(!cancelled)loader.ready()},2500);
 Promise.allSettled(assets).then(()=>{
  window.clearTimeout(deadline);
  if(!cancelled)loader.ready();
 });
 return()=>{cancelled=true;window.clearTimeout(deadline)};
}
