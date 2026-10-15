import {useEffect} from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsApp from './components/WhatsApp.jsx';
import PageContent from './pages/PageContent.jsx';
export default function App({path='/',config={}}){
 useEffect(()=>{
  const reveal=()=>{if(window.location.hash==='#privacy'){const details=document.getElementById('privacy');if(details)details.open=true}};
  const click=event=>{if(event.target.closest('a[href="#privacy"]')){const details=document.getElementById('privacy');if(details)details.open=true}};
  reveal();window.addEventListener('hashchange',reveal);document.addEventListener('click',click);return()=>{window.removeEventListener('hashchange',reveal);document.removeEventListener('click',click)};
 },[]);
 useEffect(()=>{
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealGroups=[
   ['.hero-copy','reveal-from-left',0,0],['.hero-visual','reveal-from-right',0,120],['.discipline-strip','reveal-from-bottom',0,200],
   ['.about-section .image-frame','reveal-from-left',0,0],['.about-section .section-heading','reveal-from-right',0,70],['.strength-grid article','reveal-from-bottom',70,130],['.discipline-details','reveal-from-bottom',0,250],
   ['.services-band .section-heading','reveal-from-bottom',0,0],['.service-filters','reveal-from-bottom',0,80],['.service-card','reveal-from-bottom',70,100],['.service-enquiry','reveal-from-bottom',0,170],
   ['.solutions-picture','reveal-from-left',0,0],['.solutions-band .section-heading','reveal-from-right',0,70],['.solution-list article','reveal-from-right',60,140],['.solutions-band .button','reveal-from-bottom',0,240],
   ['.industries-section .section-heading, .process-section .section-heading, .research-section .section-heading, .faq-section .section-heading','reveal-from-bottom',0,0],['.industry-grid article','reveal-from-bottom',65,70],['.process-grid article','reveal-from-bottom',65,70],['.partner-grid article','reveal-from-bottom',90,70],['.research-note, .testing-details','reveal-from-bottom',70,160],['.faq-list details','reveal-from-bottom',55,50],
   ['.cta-section .section','reveal-from-bottom reveal-scale',0,0],['.contact-layout > div','reveal-from-left',0,0],['.contact-layout form','reveal-from-right',0,90]
  ];
  const targets=[];
  const seen=new Set();
  revealGroups.forEach(([selector,classes,stagger,baseDelay])=>{
   document.querySelectorAll(selector).forEach((element,index)=>{
    if(seen.has(element))return;
    seen.add(element);
    element.classList.add('will-reveal',...classes.split(' '));
    element.style.setProperty('--reveal-delay',`${baseDelay+(index*stagger)}ms`);
    targets.push(element);
   });
  });
  if(reduceMotion.matches){targets.forEach(element=>element.classList.add('is-revealed'));return;}
  document.documentElement.classList.add('motion-enabled');
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    entry.target.classList.toggle('is-revealed',entry.isIntersecting);
   });
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  targets.forEach(element=>observer.observe(element));
  return()=>{observer.disconnect();document.documentElement.classList.remove('motion-enabled');};
 },[]);
 return <><a className="skip-link" href="#main">Skip to content</a><Header path={path}/><main id="main"><PageContent path={path} config={config}/></main><Footer/><WhatsApp number={config.whatsapp}/></>;
}
