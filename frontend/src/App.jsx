import {useEffect} from 'react';
import ScrollProgress from './components/ScrollProgress.jsx';
import {revealOnScroll} from './utils/reveal.js';
import {revealWhenReady} from './utils/loading.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsApp from './components/WhatsApp.jsx';
import PageContent from './pages/PageContent.jsx';
import VersionTwo from './v2/VersionTwo.jsx';
import BoardMembers from './v2/BoardMembers.jsx';
import VersionThree,{DarkVersion} from './v3/VersionThree.jsx';
import {useSectionArrival} from './utils/section-arrival.js';
export default function App({path='/',config={}}){
 useEffect(revealWhenReady,[]);
 useSectionArrival(path);
 useEffect(revealOnScroll,[]);
 useEffect(()=>{
  const reveal=()=>{if(window.location.hash==='#privacy'){const details=document.getElementById('privacy');if(details)details.open=true}};
  const click=event=>{if(event.target.closest('a[href="#privacy"]')){const details=document.getElementById('privacy');if(details)details.open=true}};
  reveal();window.addEventListener('hashchange',reveal);document.addEventListener('click',click);return()=>{window.removeEventListener('hashchange',reveal);document.removeEventListener('click',click)};
 },[]);
 if(path==='/')return <><VersionTwo config={config}/><WhatsApp number={config.whatsapp}/></>;
 if(path==='/v2')return <><DarkVersion config={config}/><WhatsApp number={config.whatsapp}/></>;
 if(path==='/v2/boardmembers')return <div className="v3-preview"><BoardMembers basePath="/v2"/><WhatsApp number={config.whatsapp}/></div>;
 if(path==='/v3/boardmembers')return <div className="n5-mixed"><BoardMembers basePath="/v3"/><WhatsApp number={config.whatsapp}/></div>;
 if(path==='/v3')return <><VersionThree config={config}/><WhatsApp number={config.whatsapp}/></>;
 if(path==='/boardmembers')return <><BoardMembers/><WhatsApp number={config.whatsapp}/></>;
 return <><ScrollProgress/><a className="skip-link" href="#main">Skip to content</a><Header path={path}/><main id="main"><PageContent path={path} config={config}/></main><Footer/><WhatsApp number={config.whatsapp}/></>;
}
