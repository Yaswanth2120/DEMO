import {useEffect,useState} from 'react';

export function useSelection(items,aliasPrefix=''){
 const [active,setActive]=useState(0);
 useEffect(()=>{
  const apply=index=>{if(index>=0&&index<items.length){setActive(index);return true}return false};
  const sync=()=>{const hash=location.hash.slice(1);apply(items.findIndex((item,index)=>item.slug===hash||(aliasPrefix&&hash===aliasPrefix+index)))};
  const capability=event=>{if(!aliasPrefix&&apply(items.findIndex(item=>item.slug===event.detail))){history.replaceState(null,'','#'+event.detail);document.getElementById('pillars')?.scrollIntoView({behavior:'smooth',block:'start'})}};
  const industry=event=>{if(aliasPrefix&&Number.isInteger(event.detail)&&apply(event.detail))history.replaceState(null,'','#'+items[event.detail].slug)};
  sync();window.addEventListener('hashchange',sync);window.addEventListener('n5:capability',capability);window.addEventListener('n5:industry',industry);
  return()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('n5:capability',capability);window.removeEventListener('n5:industry',industry)};
 },[items,aliasPrefix]);
 const select=index=>{setActive(index);history.replaceState(null,'','#'+items[index].slug)};
 return [active,select];
}
