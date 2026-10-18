import {createContext,useContext,useEffect,useState} from 'react';
const ThemeContext=createContext(null);
const key='nexafive-theme';
const valid=value=>['light','dark','device'].includes(value);

export function ThemeShell({children}){
 const [preference,setPreference]=useState('device'),[deviceDark,setDeviceDark]=useState(false);
 useEffect(()=>{
  const media=window.matchMedia('(prefers-color-scheme: dark)');
  const update=()=>setDeviceDark(media.matches);
  update();media.addEventListener('change',update);
  try{const saved=localStorage.getItem(key);if(valid(saved))setPreference(saved)}catch{/* Theme controls still work when storage is unavailable. */}
  const sync=event=>{if(event.key===key||event.key===null)setPreference(valid(event.newValue)?event.newValue:'device')};
  window.addEventListener('storage',sync);
  return()=>{media.removeEventListener('change',update);window.removeEventListener('storage',sync)};
 },[]);
 const choose=value=>{if(!valid(value))return;setPreference(value);try{localStorage.setItem(key,value)}catch{/* Keep the selection for this page. */}};
 const dark=preference==='dark'||(preference==='device'&&deviceDark);
 return <ThemeContext.Provider value={{preference,choose}}><div className={`n5-theme-shell${dark?' v3-preview':''}`} data-theme={dark?'dark':'light'} data-theme-preference={preference}>{children}</div></ThemeContext.Provider>;
}

export function ThemeControl(){
 const theme=useContext(ThemeContext);
 if(!theme)return null;
 return <label className="n5-theme-control"><span className="sr-only">Color theme</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg><select aria-label="Color theme" value={theme.preference} onChange={event=>theme.choose(event.target.value)}><option value="light">Light</option><option value="dark">Dark</option><option value="device">Device</option></select></label>;
}
