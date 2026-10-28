import './header-navigation.css';

export const primaryNavigation=[['/','Home'],['/about','About'],['/services','Services'],['/industries','Industries'],['/collaboration','Collaboration'],['/team','Team'],['/contact','Contact']];

export default function HeaderNavigation({id='n5-nav',currentPath='/',teamPage=false,onNavigate=()=>{}}){
 const active=teamPage?'/team':currentPath;
 return <nav id={id} className="n5-nav" aria-label="Main navigation">{primaryNavigation.map(([href,label])=><a key={href} href={href} aria-current={href===active?'page':undefined} onClick={onNavigate}>{label}</a>)}</nav>;
}
