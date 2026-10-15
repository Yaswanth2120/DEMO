// Concept illustrations for each capability. Decorative only; animation runs while the panel is active.
const frame={viewBox:'0 0 480 360','aria-hidden':'true',focusable:'false'};

function Battery(){
 const cells=[];
 for(let row=0;row<4;row++)for(let col=0;col<6;col++)cells.push([row,col]);
 cells.sort((a,b)=>a[0]+a[1]-(b[0]+b[1]));
 return <svg className="n5-art n5-art-battery" {...frame}>
  <g transform="translate(240 186) scale(1.32) translate(-260 -146)">
   <path className="n5-art-lid" d="M240 32 380 102 280 152 140 82Z"/>
   <path className="n5-art-guide" d="M140 82v40M380 102v40M280 152v40"/>
   <path d="M140 150 280 220v14L140 164Z" fill="#0a2a47"/>
   <path d="M280 220 380 170v14L280 234Z" fill="#0d3a63"/>
   <path d="M240 100 380 170 280 220 140 150Z" fill="#0b2f52" stroke="#2f86d6" strokeOpacity=".55"/>
   {cells.map(([row,col])=>{const x=240+(col-row)*20,y=96+(col+row)*10;return <g key={`${row}-${col}`} className={`n5-cell n5-w${row+col}`}>
    <path d={`M${x-18} ${y}L${x} ${y+9}V${y+31}L${x-18} ${y+22}Z`} fill="#0e4a80"/>
    <path d={`M${x} ${y+9}L${x+18} ${y}V${y+22}L${x} ${y+31}Z`} fill="#0b3a66"/>
    <path className="n5-cell-top" d={`M${x} ${y-9}L${x+18} ${y}L${x} ${y+9}L${x-18} ${y}Z`}/>
   </g>})}
  </g>
  <g className="n5-art-label"><path d="M402 104h44"/><text x="446" y="96" textAnchor="end">PACK</text><path d="M34 196h50"/><text x="34" y="188">MODULE</text><path d="M372 282h74"/><text x="446" y="274" textAnchor="end">CELLS</text></g>
 </svg>;
}

function Lightweight(){
 return <svg className="n5-art n5-art-car" {...frame}>
  <path className="n5-art-ground" d="M28 282h424"/>
  <path className="n5-draw n5-car-body" pathLength="1" d="M58 250c-6-22 4-36 30-40l66-10c26-30 64-52 112-54 48-2 86 16 116 52l40 8c22 4 30 18 28 44Z"/>
  <path className="n5-draw n5-car-glass" pathLength="1" d="M170 198c22-24 50-38 88-40v40Zm100-40c34 2 62 16 84 40h-84Z"/>
  <path className="n5-mat n5-mat-al" d="M154 200c26-30 64-52 112-54 48-2 86 16 116 52"/>
  <path className="n5-mat n5-mat-cf" d="M182 210h168v30H182z"/>
  <path className="n5-mat n5-mat-st" d="M88 238h312M162 204l26 36M352 204l-22 36"/>
  <g className="n5-wheel"><circle cx="132" cy="252" r="30"/><circle cx="132" cy="252" r="11"/><path d="M132 222v60M102 252h60"/></g>
  <g className="n5-wheel"><circle cx="370" cy="252" r="30"/><circle cx="370" cy="252" r="11"/><path d="M370 222v60M340 252h60"/></g>
  <g className="n5-art-legend"><rect x="64" y="314" width="18" height="4" className="n5-sw-st"/><text x="90" y="320">STEEL</text><rect x="186" y="314" width="18" height="4" className="n5-sw-al"/><text x="212" y="320">ALUMINIUM</text><rect x="334" y="314" width="18" height="4" className="n5-sw-cf"/><text x="360" y="320">COMPOSITE</text></g>
 </svg>;
}

function Tooling(){
 return <svg className="n5-art n5-art-press" {...frame}>
  <rect x="96" y="36" width="288" height="22" rx="5" fill="#0e3d66"/>
  <rect x="112" y="58" width="12" height="244" fill="#0b3157"/>
  <rect x="356" y="58" width="12" height="244" fill="#0b3157"/>
  <rect x="96" y="300" width="288" height="22" rx="5" fill="#0e3d66"/>
  <g className="n5-ram">
   <rect x="138" y="62" width="204" height="26" rx="4" fill="#14507f"/>
   <path d="M190 88h100v34l-14 20h-72l-14-20Z" fill="#2f86d6"/>
   <path d="M204 142h72" stroke="#cfe6f8" strokeWidth="2"/>
  </g>
  <path d="M148 300v-64h42l14 20h72l14-20h42v64Z" fill="#0e4a80" stroke="#5fa8e6" strokeOpacity=".45"/>
  <path className="n5-sheet n5-sheet-flat" d="M150 230h180"/>
  <path className="n5-sheet n5-sheet-formed" d="M150 230h40l14 20h72l14-20h40"/>
  <circle className="n5-flash" cx="240" cy="246" r="46"/>
  <g className="n5-art-label"><path d="M342 100h62"/><text x="410" y="96">DIE</text><path d="M330 230h74"/><text x="410" y="226">PART</text><path d="M330 280h74"/><text x="410" y="276">TOOL</text></g>
 </svg>;
}

const layers=[[100,[110,180,250]],[195,[70,125,180,235,290]],[290,[95,150,210,265]],[380,[110,180,250]]];
const edges=layers.slice(0,-1).flatMap(([x1,ys1],l)=>ys1.flatMap(y1=>layers[l+1][1].map(y2=>[x1,y1,layers[l+1][0],y2])));
function Intelligence(){
 return <svg className="n5-art n5-art-ai" {...frame}>
  {edges.map(([x1,y1,x2,y2],i)=><line key={i} className="n5-edge" x1={x1} y1={y1} x2={x2} y2={y2}/>)}
  {edges.filter((_,i)=>i%4===1).map(([x1,y1,x2,y2],i)=><line key={i} className={`n5-signal n5-s${i%6}`} pathLength="1" x1={x1} y1={y1} x2={x2} y2={y2}/>)}
  {layers.map(([x,ys],l)=>ys.map((y,i)=><circle key={`${l}-${i}`} className={`n5-neuron n5-s${(l+i)%6}`} cx={x} cy={y} r={l===0||l===3?9:7}/>))}
  <g className="n5-art-label n5-art-label-in">{['MATERIAL','PROCESS','GEOMETRY'].map((t,i)=><text key={t} x="84" y={[114,184,254][i]} textAnchor="end">{t}</text>)}</g>
  <g className="n5-art-label">{['SELECTION','RISK','PERFORMANCE'].map((t,i)=><text key={t} x="396" y={[114,184,254][i]}>{t}</text>)}</g>
 </svg>;
}

function Corrosion(){
 return <svg className="n5-art n5-art-corrosion" {...frame}>
  {[100,140,180,220,260,300].map((x,i)=><circle key={x} className={`n5-ion n5-s${i}`} cx={x} cy="40" r="5"/>)}
  <rect className="n5-coat-glow" x="66" y="112" width="268" height="12" rx="6"/>
  <rect x="70" y="118" width="260" height="18" rx="3" fill="#cfe6f8"/>
  <rect x="70" y="136" width="260" height="16" fill="#5fa8e6"/>
  <rect x="70" y="152" width="260" height="10" fill="#2f86d6"/>
  <rect x="70" y="162" width="130" height="92" fill="#1c4f7d"/>
  <rect x="200" y="162" width="130" height="92" fill="#123a5e"/>
  <path d="M200 162v92" stroke="#9cc8ee" strokeDasharray="4 5"/>
  <text className="n5-art-inner" x="135" y="214" textAnchor="middle">METAL A</text>
  <text className="n5-art-inner" x="265" y="214" textAnchor="middle">METAL B</text>
  <g className="n5-art-label"><path d="M334 127h18"/><text x="358" y="131">SEALANT</text><path d="M334 144h18"/><text x="358" y="160">ADHESIVE</text><path d="M334 157h18"/><text x="358" y="189">CONVERSION</text><path d="M334 208h18"/><text x="358" y="218">DISSIMILAR</text><text x="358" y="236">METALS</text></g>
 </svg>;
}

const art={'battery-engineering':Battery,'lightweight-automotive':Lightweight,'tooling-manufacturing':Tooling,'ai-optimization':Intelligence,'corrosion-mitigation':Corrosion};
export default function Illustration({slug}){const Art=art[slug];return Art?<Art/>:null}
