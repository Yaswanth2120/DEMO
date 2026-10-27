import VersionTwo from '../v2/VersionTwo.jsx';
import './v3.css';
import './theme.css';
import './mobile.css';
import {ThemeShell} from './Theme.jsx';

export default function VersionThree({config={},discipline,onDisciplineSelect,page}){return <ThemeShell><VersionTwo config={config} page={page} discipline={discipline} onDisciplineSelect={onDisciplineSelect} mobileCompact/></ThemeShell>}
