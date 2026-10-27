import ScrollProgress from '../components/ScrollProgress.jsx';
import {createContext,useContext,useEffect,useState} from 'react';
const ThemeContext=createContext(null);
const key='nexafive-theme';
const valid=value=>['light','dark'].includes(value);

export function ThemeShell({children,fixed}){
 const [preference,setPreference]=useState(fixed||'light');
 useEffect(()=>{
  if(fixed)return;
  try{const saved=localStorage.getItem(key);setPreference(valid(saved)?saved:'light')}catch{/* Theme controls still work when storage is unavailable. */}
  const sync=event=>{if(event.key===key||event.key===null)setPreference(valid(event.newValue)?event.newValue:'light')};
  window.addEventListener('storage',sync);
  return()=>{window.removeEventListener('storage',sync)};
 },[fixed]);
 const choose=value=>{if(!valid(value))return;setPreference(value);try{localStorage.setItem(key,value)}catch{/* Keep the selection for this page. */}};
 const dark=preference==='dark';
 return <><ScrollProgress/><ThemeContext.Provider value={fixed?null:{preference,choose}}><div className={`n5-theme-shell${dark?' v3-preview':''}`} data-theme={dark?'dark':'light'} data-theme-preference={preference}>{children}</div></ThemeContext.Provider></>;
}

export function ThemeControl(){
 const theme=useContext(ThemeContext);
 if(!theme)return null;
 return <label className="n5-theme-control"><span className="sr-only">Color theme</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg><select aria-label="Color theme" value={theme.preference} onChange={event=>theme.choose(event.target.value)}><option value="light">Light</option><option value="dark">Dark</option></select></label>;
}
