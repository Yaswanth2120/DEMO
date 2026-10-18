import VersionTwo from '../v2/VersionTwo.jsx';
import './v3.css';
import './mixed.css';

export function DarkVersion({config={}}){return <div className="v3-preview"><p className="v3-concept" aria-label="Version 2 dark theme"><span>V2</span> Dark edition</p><VersionTwo config={config} basePath="/v2"/></div>}

export default function VersionThree({config={}}){return <div className="n5-mixed"><VersionTwo config={config} basePath="/v3" mixed/></div>}
