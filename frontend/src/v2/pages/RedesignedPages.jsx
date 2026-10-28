import EngineeringScene from './EngineeringScene.jsx';
import FiveStageMethod from './FiveStageMethod.jsx';
import {useSelection} from './usePageSelection.js';
export {ServiceGallery as ServiceWorkbench} from './ServiceGallery.jsx';
import './visual-pages.css';
import {services} from '../../content.js';
import Glyph from '../Glyph.jsx';
import './redesigned-pages.css';

function Closing({eyebrow,title,text,subject}){
 return <section className="rd-closing"><div className="n5-wrap"><div><p className="n5-eyebrow">{eyebrow}</p><h2>{title}</h2><p>{text}</p></div><a className="n5-btn" href="/contact#contact-form">Start the conversation<Glyph name="arrow"/></a></div></section>;
}

export function AboutStudio(){
 return <div className="rd-pages rd-about vp-about">
  <section id="hero" className="rd-about-hero"><div className="n5-wrap rd-about-hero-grid">
   <div><p className="n5-eyebrow">About NexaFive</p><h1>See beyond<br/><em>the surface.</em></h1><p>Materials, design, and production influence each other. We bring those perspectives together to understand the whole engineering challenge.</p><a className="n5-link" href="#process">Explore our five-stage method<Glyph name="arrow"/></a></div>
   <div className="vp-about-object"><div className="vp-object-meta"><span>Perspective / in depth</span><span>Materials · Engineering · Production</span></div><EngineeringScene kind={2}/><div className="vp-object-caption"><span className="vp-object-line"/><p>From a single interface<br/><strong>to the complete picture.</strong></p></div></div>
  </div></section>
  <section className="rd-story"><div className="n5-wrap"><p className="n5-eyebrow">An engineering &amp; technology consultancy · Minneapolis</p><div className="rd-story-columns"><h2>Look beyond<br/><span>the isolated problem.</span></h2><div><p>A component does not experience its material, geometry, and operating environment separately. Neither should the engineering conversation.</p><p>NexaFive brings materials science, technical investigation, and manufacturing insight into the same room. Our role is to help make the relationships clearer, so that the next decision can be better informed.</p><p className="rd-small-note">The application defines the scope. Your team’s question gives the work direction.</p></div></div></div></section>
  <FiveStageMethod/>
  <Closing eyebrow="A question worth connecting" title="Let’s look at it together." text="You do not need a finished brief to begin. Bring the context, and we can discuss where to start."/>
 </div>;
}

const serviceLabels=['Battery systems','Lightweight structures','Tooling & production','Materials intelligence','Corrosion & durability'];

const industryPrograms=[
 {slug:'automotive',name:'Automotive OEMs',icon:'car',context:'A vehicle is a connected set of material decisions.',description:'A body structure, joint, coating, or battery interface has to work in the context of the whole vehicle. Begin with the requirements that connect those systems.',pressures:['Weight versus structural performance','Mixed-material joining and exposure','Integration with production processes'],questions:['Where do materials and joining choices introduce durability concerns?','Which design trade-offs need a comparison before prototyping?'],services:[1,0,4],lens:'Component → interface → vehicle'},
 {slug:'suppliers',name:'Tier suppliers',icon:'link',context:'The component has to fit a bigger promise.',description:'A supplier program brings customer specifications, material behavior, and production capability together. The engineering question often sits between them.',pressures:['Customer requirements and part performance','Surface treatment and material formulation','Process repeatability and durability'],questions:['Which requirement is driving the material or process choice?','What evidence will support the next technical discussion?'],services:[2,4,1],lens:'Specification → process → component'},
 {slug:'energy',name:'Energy / BEV',icon:'battery',context:'Look beyond a single cell or component.',description:'Cell, module, and pack requirements interact with thermal behavior, structures, and interfaces. Frame the problem at the level your decision actually needs.',pressures:['Thermal and structural interactions','Packaging, materials, and assembly interfaces','Operating exposure and corrosion prevention'],questions:['Which system boundary should the evaluation cover?','What conditions must the next design comparison consider?'],services:[0,4,3],lens:'Cell → module → pack'},
 {slug:'healthcare',name:'Healthcare technologies',icon:'pulse',context:'Technology should fit the way care information moves.',description:'Healthcare software brings workflows, information systems, and data requirements together. Focus the conversation on the integration or development problem to be solved.',pressures:['EHR software and existing workflows','Healthcare data integration','Security and system requirements'],questions:['Where does information need to move between systems?','Which workflow and security requirements define the scope?'],services:[],lens:'Workflow → information → system'},
 {slug:'manufacturing',name:'Industrial manufacturing',icon:'factory',context:'The design meets its reality on the production floor.',description:'Tooling, material behavior, and process conditions shape what can be made. Examine the bottleneck in the context of the production system.',pressures:['Plastics and composite tooling','Process constraints and material utilization','Data-led engineering evaluations'],questions:['Is the limitation in the tooling, material, or process interaction?','What information would help compare an improvement?'],services:[2,3,1],lens:'Material → tooling → process'}
];
export function IndustryAtlas(){
 const [active,select]=useSelection(industryPrograms,'industry-'),program=industryPrograms[active];
 return <div className="rd-pages rd-industries">
  <section id="hero" className="rd-title-section"><div className="n5-wrap"><p className="n5-eyebrow">Industries / Application atlas</p><h1>The context<br/><em>changes everything.</em></h1><div className="rd-title-bottom"><p>The same engineering principle can lead to very different questions. Find the operating context closest to yours.</p><span>Five environments. Different questions.</span></div></div></section>
  <section id="industries" className="rd-atlas"><div className="n5-wrap"><div className="rd-atlas-index" role="group" aria-label="Choose an industry">{industryPrograms.map((item,i)=><button id={`industry-${i}`} key={item.slug} type="button" aria-pressed={active===i} onClick={()=>select(i)}><Glyph name={item.icon}/>{item.name}</button>)}</div>
   <div className="rd-atlas-layout"><div className="rd-atlas-map" aria-hidden="true"><span className="rd-map-label">Application / 0{active+1}</span><svg viewBox="0 0 450 390" fill="none"><path d="M40 75h370M40 195h370M40 315h370M75 40v310M225 40v310M375 40v310" className="rd-map-grid"/><path d="M75 75h150v120h150v120H75V195h150" className="rd-map-path"/><path d="M75 75h150v120h150v120H75V195h150" className="rd-map-flow"/>{[[75,75],[225,75],[375,195],[375,315],[75,315]].map(([x,y],i)=><g key={i} className={i===active?'is-selected':''}><circle cx={x} cy={y} r="20"/><text x={x} y={y+4} textAnchor="middle">0{i+1}</text></g>)}</svg><div className="rd-map-symbol"><Glyph name={program.icon}/></div><span className="rd-map-caption">{program.lens}</span></div>
    <article className="rd-atlas-brief" aria-live="polite"><p className="n5-eyebrow">0{active+1} / {program.name}</p><h2>{program.context}</h2><p>{program.description}</p><div className="rd-atlas-detail"><div><h3>What shapes the brief</h3><ul>{program.pressures.map(text=><li key={text}>{text}</li>)}</ul></div><div><h3>Questions worth asking</h3>{program.questions.map(text=><p key={text}>{text}</p>)}</div></div></article>
   </div><div className="rd-related"><span>Relevant starting points</span><div>{program.services.length?program.services.map(index=><a key={index} href={'/services#'+services[index].slug}>{serviceLabels[index]}<Glyph name="arrow"/></a>):<a href="/contact#contact-form">Discuss a healthcare software scope<Glyph name="arrow"/></a>}</div></div>
  </div></section>
  <Closing eyebrow={program.name} title="Tell us what your environment demands." text="Start with the application, the operating conditions, and the decision your team needs to make." subject={program.name}/>
 </div>;
}
