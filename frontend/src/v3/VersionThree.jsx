import VersionTwo from '../v2/VersionTwo.jsx';
import './v3.css';
import './theme.css';
import {ThemeShell} from './Theme.jsx';

export function DarkVersion({config={}}){return <div className="v3-preview"><p className="v3-concept" aria-label="Version 2 dark theme"><span>V2</span> Dark edition</p><VersionTwo config={config} basePath="/v2"/></div>}

export default function VersionThree({config={}}){return <ThemeShell><VersionTwo config={config} basePath="/v3"/></ThemeShell>}
