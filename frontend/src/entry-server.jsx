import {renderToString} from 'react-dom/server';
import App from './App.jsx';
export {routes,getPageMeta} from './routes.js';
export function render(path,config){return renderToString(<App path={path} config={config}/>)}
