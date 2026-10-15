/* Independent of React: a failed or slow application bundle cannot trap visitors. */
(() => {
 const documentRoot=document.documentElement;
 const started=performance.now();
 const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let dismissed=false,prepared=false,readyTimer=0,hideTimer=0,observer;
 documentRoot.classList.add('site-loading');
 const dismiss=()=>{
  if(dismissed)return;
  dismissed=true;
  observer?.disconnect();
  clearTimeout(fallback);
  clearTimeout(readyTimer);
  const root=document.getElementById('root');
  const loader=document.getElementById('page-loader');
  const restoreFocus=loader?.contains(document.activeElement);
  root?.removeAttribute('inert');
  root?.removeAttribute('aria-busy');
  documentRoot.classList.remove('site-loading');
  documentRoot.classList.add('site-revealing');
  if(restoreFocus&&root){root.setAttribute('tabindex','-1');root.focus({preventScroll:true})}
  hideTimer=setTimeout(()=>{
   if(loader)loader.hidden=true;
   documentRoot.classList.remove('site-revealing');
  },reducedMotion?0:220);
 };
 const fallback=setTimeout(dismiss,5000);
 window.__nexafiveLoader={
  ready(){
   if(dismissed||readyTimer)return;
   // A brief normal-motion reveal avoids a distracting one-frame flash.
   const remaining=reducedMotion?0:Math.max(0,450-(performance.now()-started));
   readyTimer=setTimeout(dismiss,remaining);
  }
 };
 const prepare=()=>{
  if(dismissed||prepared)return;
  const root=document.getElementById('root');
  const skip=document.getElementById('loading-skip');
  if(!root||!skip)return;
  prepared=true;
  observer?.disconnect();
  document.getElementById('page-loader')?.removeAttribute('hidden');
  root?.setAttribute('inert','');
  root?.setAttribute('aria-busy','true');
  skip.addEventListener('click',dismiss);
 };
 // Attach controls as soon as the markup exists, even if a deferred app script stalls.
 observer=new MutationObserver(prepare);
 observer.observe(documentRoot,{childList:true,subtree:true});
 prepare();
 // Browser back/forward cache restores an already-ready page; never replay an intro.
 window.addEventListener('pageshow',event=>{if(event.persisted){dismiss();clearTimeout(hideTimer);documentRoot.classList.remove('site-revealing');const loader=document.getElementById('page-loader');if(loader)loader.hidden=true}});
})();
