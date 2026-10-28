import {disciplinePages} from './discipline-content.js';
import {useEffect,useMemo,useRef,useState} from 'react';
import {company,services,industries} from '../content.js';
import Glyph from './Glyph.jsx';
import {enquire} from './Enquiry.jsx';
import {scrollToHash} from './motion.js';

function buildItems(boardPath){
 const go=hash=>()=>{if(!document.getElementById(hash.slice(1)))window.location.href=(['#pillars','#process','#solutions'].includes(hash)?'/services':['#industries'].includes(hash)||hash.startsWith('#industry-')?'/industries':hash==='#contact'||hash==='#faq'?'/contact':'/')+hash;else scrollToHash(hash)};
 return [
  {group:'Account',icon:'arrow',title:'Sign out',detail:'End your preview session',run:()=>{const form=document.createElement('form');form.method='post';form.action='/auth/logout';document.body.append(form);form.submit()}},
  ...[['#hero','Home','Innovate beyond boundaries'],['#about','Five disciplines','Science · Engineering · Research · Material · Eco'],['#pillars','Services','Five connected services'],['#industries','Industries','Where we work'],['#faq','Questions','Good to know'],['#contact','Contact','Start a conversation']]
   .map(([hash,title,detail])=>({group:'Go to',icon:'arrow',title,detail,run:hash==='#hero'?()=>{window.location.href='/'}:go(hash)})),
  ...[['About','/about','Who we are and how we think'],['Services','/services','Engineering services we offer'],['Industries','/industries','Where we work'],['Collaboration','/collaboration','Industrial and academic collaboration'],['Contact','/contact','Talk with NexaFive']].map(([title,path,detail])=>({group:'Pages',icon:'arrow',title,detail,run:()=>{window.location.href=path}})),
  ...disciplinePages.map(page=>({group:'Disciplines',icon:page.icon,title:page.name,detail:'Explore '+page.name.toLowerCase(),run:()=>{window.location.href='/'+page.slug}})),
  ...services.map(service=>({group:'Services',icon:service.icon==='nodes'?'nodes':service.icon,title:service.title,detail:service.category,run:()=>{if(document.getElementById('pillars'))window.dispatchEvent(new CustomEvent('n5:capability',{detail:service.slug}));else window.location.href='/services#'+service.slug}})),
  ...industries.map(([title],index)=>({group:'Industries',icon:['car','link','battery','pulse','factory'][index],title,detail:'Industry',run:go(`#industry-${index}`)})),
  {group:'Actions',icon:'arrow',title:'Start a project enquiry',detail:'Open the enquiry form',run:()=>{if(document.getElementById('discipline-contact'))scrollToHash('#discipline-contact');else if(document.getElementById('contact')){enquire();scrollToHash('#contact')}else window.location.href='/contact#contact-form'}},
  {group:'Actions',icon:'mail',title:`Email ${company.email}`,detail:'Opens your mail app',run:()=>{window.location.href=`mailto:${company.email}`}},
  {group:'Actions',icon:'phone',title:`Call ${company.phoneDisplay}`,detail:company.location,run:()=>{window.location.href=`tel:${company.phone}`}},
  {group:'Go to',icon:'arrow',title:'Team',detail:'NexaFive Global governance and leadership',run:()=>{window.location.href=boardPath}}
 ];
}

export default function CommandPalette({open,onClose,boardPath='/team'}){
 const dialog=useRef(null),input=useRef(null),list=useRef(null);
 const [query,setQuery]=useState('');
 const [cursor,setCursor]=useState(0);
 const items=useMemo(()=>buildItems(boardPath),[boardPath]);
 const results=useMemo(()=>{
  const terms=query.toLowerCase().split(/\s+/).filter(Boolean);
  return terms.length?items.filter(item=>{const text=`${item.title} ${item.detail} ${item.group}`.toLowerCase();return terms.every(term=>text.includes(term))}):items;
 },[items,query]);

 useEffect(()=>{
  const element=dialog.current;
  if(!element)return;
  if(open&&!element.open){setQuery('');setCursor(0);element.showModal();requestAnimationFrame(()=>input.current?.focus())}
  else if(!open&&element.open)element.close();
 },[open]);
 useEffect(()=>{setCursor(0)},[query]);
 useEffect(()=>{list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({block:'nearest'})},[cursor]);

 const choose=item=>{if(!item)return;onClose();requestAnimationFrame(item.run)};
 const onKeyDown=event=>{
  if(event.key==='ArrowDown'){event.preventDefault();setCursor(index=>Math.min(index+1,results.length-1))}
  else if(event.key==='ArrowUp'){event.preventDefault();setCursor(index=>Math.max(index-1,0))}
  else if(event.key==='Enter'){event.preventDefault();choose(results[cursor])}
 };

 let lastGroup='';
 return <dialog ref={dialog} className="n5-cmd" aria-label="Search NexaFive" onCancel={event=>{event.preventDefault();onClose()}} onClick={event=>{if(event.target===dialog.current)onClose()}}>
  <div className="n5-cmd-box">
   <div className="n5-cmd-search">
    <Glyph name="search"/>
    <input ref={input} type="text" role="combobox" aria-expanded="true" aria-controls="n5-cmd-list" aria-autocomplete="list" aria-activedescendant={results[cursor]?`n5-cmd-${cursor}`:undefined} aria-label="Search services, industries and sections" placeholder="Search services, industries, sections…" value={query} onChange={event=>setQuery(event.target.value)} onKeyDown={onKeyDown} autoComplete="off" spellCheck="false"/>
    <button type="button" className="n5-cmd-close" onClick={onClose}>esc</button>
   </div>
   <ul id="n5-cmd-list" ref={list} role="listbox" aria-label="Results">
    {results.map((item,index)=>{const heading=item.group!==lastGroup?item.group:null;lastGroup=item.group;return [
     heading&&<li key={`g-${heading}`} role="presentation" className="n5-cmd-group">{heading}</li>,
     <li key={`${item.group}-${item.title}`} id={`n5-cmd-${index}`} role="option" aria-selected={index===cursor} onPointerMove={()=>setCursor(index)} onClick={()=>choose(item)}>
      <span className="n5-cmd-icon"><Glyph name={item.icon}/></span><span className="n5-cmd-text"><strong>{item.title}</strong><small>{item.detail}</small></span><Glyph name="arrow" className="n5-cmd-go"/>
     </li>
    ]})}
    {!results.length&&<li role="presentation" className="n5-cmd-empty">No results for “{query}”. Try “battery”, “corrosion” or “contact”.</li>}
   </ul>
   <div className="n5-cmd-foot" aria-hidden="true"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span></div>
  </div>
 </dialog>;
}
