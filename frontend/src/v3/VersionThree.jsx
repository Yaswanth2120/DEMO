import VersionTwo from '../v2/VersionTwo.jsx';
import './v3.css';

// V3 is intentionally a visual concept route. It shares the production-ready
// V2 content and interactions, but is wrapped in a fully isolated dark system.
export default function VersionThree({config={}}){
 return <div className="v3-preview">
  <p className="v3-concept" aria-label="Version 3 dark theme concept"><span>V3</span> Dark theme concept</p>
  <VersionTwo config={config}/>
 </div>;
}
