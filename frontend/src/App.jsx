import {disciplinePages} from './v2/discipline-content.js';
import {getPageMeta} from './routes.js';
import {useEffect,useState} from 'react';
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
function Site({path='/',config={},navigate}){
 useEffect(revealWhenReady,[]);
 useSectionArrival(path);
 useEffect(revealOnScroll,[]);
 useEffect(()=>{
  const reveal=()=>{if(window.location.hash==='#privacy'){const details=document.getElementById('privacy');if(details)details.open=true}};
  const click=event=>{if(event.target.closest('a[href="#privacy"]')){const details=document.getElementById('privacy');if(details)details.open=true}};
  reveal();window.addEventListener('hashchange',reveal);document.addEventListener('click',click);return()=>{window.removeEventListener('hashchange',reveal);document.removeEventListener('click',click)};
 },[]);
 const discipline=disciplinePages.find(page=>path==='/'+page.slug);
 if(['/','/about','/expertise','/contact'].includes(path)||discipline)return <><VersionThree config={config} page={path==='/'?'home':path.slice(1)} discipline={discipline} onDisciplineSelect={index=>navigate(index===null||discipline===disciplinePages[index]?'/':'/'+disciplinePages[index].slug)}/><WhatsApp number={config.whatsapp}/></>;
 if(path==='/team')return <ThemeShell><BoardMembers/><WhatsApp number={config.whatsapp}/></ThemeShell>;
 return <><ScrollProgress/><a className="skip-link" href="#main">Skip to content</a><Header path={path}/><main id="main"><PageContent path={path} config={config}/></main><Footer/><WhatsApp number={config.whatsapp}/></>;
}

export default function App({path='/',...props}){
 const [currentPath,setCurrentPath]=useState(path);
 useEffect(()=>{const back=()=>setCurrentPath(location.pathname.replace(/\/$/,'')||'/');window.addEventListener('popstate',back);return()=>window.removeEventListener('popstate',back)},[]);
 useEffect(()=>{document.title=getPageMeta(currentPath).title},[currentPath]);
 const navigate=destination=>{if(destination===currentPath)return;history.pushState(null,'',destination);setCurrentPath(destination);requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'instant'}))};
 return <><Site {...props} path={currentPath} navigate={navigate}/><SignOut/></>;
}
