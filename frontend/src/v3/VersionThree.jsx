import VersionTwo from '../v2/VersionTwo.jsx';
import './v3.css';
import './theme.css';
import './mobile.css';
import {ThemeShell} from './Theme.jsx';

export default function VersionThree({config={},discipline,onDisciplineSelect}){return <ThemeShell><VersionTwo config={config} discipline={discipline} onDisciplineSelect={onDisciplineSelect} mobileCompact/></ThemeShell>}
