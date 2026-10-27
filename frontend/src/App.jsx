import {useEffect} from 'react';
import ScrollProgress from './components/ScrollProgress.jsx';
import {revealOnScroll} from './utils/reveal.js';
import {revealWhenReady} from './utils/loading.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsApp from './components/WhatsApp.jsx';
import PageContent from './pages/PageContent.jsx';
import BoardMembers from './v2/BoardMembers.jsx';
import VersionThree from './v3/VersionThree.jsx';
import {ThemeShell} from './v3/Theme.jsx';
import SignOut from './components/SignOut.jsx';
import {useSectionArrival} from './utils/section-arrival.js';
function Site({path='/',config={}}){
 useEffect(revealWhenReady,[]);
 useSectionArrival(path);
 useEffect(revealOnScroll,[]);
 useEffect(()=>{
  const reveal=()=>{if(window.location.hash==='#privacy'){const details=document.getElementById('privacy');if(details)details.open=true}};
  const click=event=>{if(event.target.closest('a[href="#privacy"]')){const details=document.getElementById('privacy');if(details)details.open=true}};
  reveal();window.addEventListener('hashchange',reveal);document.addEventListener('click',click);return()=>{window.removeEventListener('hashchange',reveal);document.removeEventListener('click',click)};
 },[]);
 if(path==='/')return <><VersionThree config={config}/><WhatsApp number={config.whatsapp}/></>;
 if(path==='/boardmembers')return <ThemeShell><BoardMembers/><WhatsApp number={config.whatsapp}/></ThemeShell>;
 return <><ScrollProgress/><a className="skip-link" href="#main">Skip to content</a><Header path={path}/><main id="main"><PageContent path={path} config={config}/></main><Footer/><WhatsApp number={config.whatsapp}/></>;
}

export default function App(props){return <><Site {...props}/><SignOut/></>}
