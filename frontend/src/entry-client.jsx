import {createRoot,hydrateRoot} from 'react-dom/client';
import App from './App.jsx';
import {getPageMeta,legacyRedirects} from './routes.js';
import './styles.css';
async function mount(){
const root=document.getElementById('root'),bootstrap=document.getElementById('site-config');
if(bootstrap){const {path,config}=JSON.parse(bootstrap.textContent);hydrateRoot(root,<App path={path} config={config}/>)}
else{const path=window.location.pathname.replace(/\/$/,'')||'/';if(legacyRedirects[path]){window.location.replace(legacyRedirects[path]);return}const meta=getPageMeta(path);document.title=meta.title;let config={};try{const response=await fetch('/api/config',{signal:AbortSignal.timeout(3000)});if(response.ok)config=await response.json()}catch{/* Local preview still renders when backend is not running. */}createRoot(root).render(<App path={path} config={config}/>)}

}
mount();
