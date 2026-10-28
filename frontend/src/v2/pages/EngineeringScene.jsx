import {useId} from 'react';

// Layered, code-native engineering drawings. No stock imagery or invented metrics.
export default function EngineeringScene({kind=0}){
 const id=useId().replaceAll(':',''),metal=id+'-metal',blue=id+'-blue';
 return <svg className={`vp-engineering-scene vp-scene-${kind}`} viewBox="0 0 640 480" fill="none" aria-hidden="true">
  <defs><linearGradient id={metal} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f5f9fc"/><stop offset=".5" stopColor="#9fb5c8"/><stop offset="1" stopColor="#486b8a"/></linearGradient><linearGradient id={blue} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8bd0ff"/><stop offset=".5" stopColor="#237ab9"/><stop offset="1" stopColor="#0b3256"/></linearGradient></defs>
  <g className="vp-scene-grid" stroke="#94bbda"><path d="m70 320 260 130 270-140M70 260l260 130 270-140M70 200l260 130 270-140M150 120l260 130M220 85l260 130M290 50l260 130M150 360l260-130M220 395l260-130M290 430l260-130"/></g>
  {kind===0&&<>
   <g className="vp-layer vp-layer-bottom"><path d="m150 315 180-90 180 90-180 90Z" fill="#102f4b" stroke="#6fa3ca"/><path d="m150 315 180 90 180-90v19l-180 90-180-90Z" fill="#0c1d2d" stroke="#6fa3ca"/><path d="m180 315 150-75 150 75-150 75Z" stroke="#4098df" strokeDasharray="5 7"/></g>
   <g className="vp-layer vp-layer-middle"><path d="m150 240 180-90 180 90-180 90Z" fill={`url(#${blue})`} stroke="#b6e1ff"/>{[0,1,2,3,4].map(i=><g key={i}><path d={`m${190+i*28} ${239-i*14} 115 57 17-9-115-57Z`} fill="#123d60" stroke="#80b9e2"/><path d={`m${190+i*28} ${239-i*14} 115 57v-28l-115-57Z`} fill="#3e8dc0" stroke="#b0dcfa"/></g>)}</g>
   <g className="vp-layer vp-layer-top"><path d="m150 145 180-90 180 90-180 90Z" fill={`url(#${metal})`} stroke="#e5f4ff"/><path d="m150 145 180 90 180-90v10l-180 90-180-90Z" fill="#557b9a" stroke="#b5d1e7"/><path d="m190 145 140-70 140 70-140 70Z" stroke="#ffffff70"/><path d="m240 120 70 35m20-75 70 35" stroke="#102e4c30"/></g>
   <g stroke="#9dd7ff" strokeDasharray="3 8" opacity=".5"><path d="M150 156v148M510 156v148M330 245v140"/></g>
  </>}
  {kind===1&&<>
   <g className="vp-layer vp-layer-bottom"><path d="m100 315 210-105 235 80-210 105Z" fill="#12314b" stroke="#5b98c5"/><path d="m145 300 172-86 167 60-172 86Z" stroke="#8ac5f2" strokeDasharray="5 9"/></g>
   <g className="vp-layer vp-layer-middle" stroke="#a9dcff" strokeWidth="2"><path d="m125 255 74-37 39-72 108-54 85 26 30 68 68 24-7 36-190 96-205-54Z" fill={`url(#${blue})`}/><path d="m199 218 193 63 69-35M238 146l108-54 31 65-97 49ZM280 206l52 136M377 157l84 29M139 268l187 59M158 244l173 58"/><ellipse cx="200" cy="286" rx="29" ry="39" fill="#0b1722" transform="rotate(-25 200 286)"/><ellipse cx="440" cy="271" rx="29" ry="39" fill="#0b1722" transform="rotate(-25 440 271)"/></g>
   <g className="vp-layer vp-layer-top" stroke="#d6edff" strokeWidth="1.5"><path d="m196 154 67-84 100-30 83 46-70 87-97 33Z" fill="#c4d9e845"/><path d="m263 70 100 103M196 154l167-114M279 206l167-120"/></g>
  </>}
  {kind===2&&<>
   <g className="vp-layer vp-layer-bottom"><path d="m130 325 200-100 200 100-200 100Z" fill="#143750" stroke="#8fb5d1"/><path d="m130 325 200 100 200-100v20l-200 100-200-100Z" fill="#0b1d2c" stroke="#6d96b4"/></g>
   <g className="vp-layer vp-layer-middle"><path d="m165 240 165-82 165 82-165 83Z" fill={`url(#${metal})`} stroke="#e2f0fa"/><path d="m165 240 165 83 165-83v28l-165 83-165-83Z" fill="#3b6585" stroke="#a6cce6"/><ellipse cx="330" cy="240" rx="79" ry="39" fill="#102e4c" stroke="#b8def8"/><ellipse cx="330" cy="232" rx="54" ry="26" fill={`url(#${blue})`}/></g>
   <g className="vp-layer vp-layer-top"><path d="m165 125 165-82 165 82-165 83Z" fill={`url(#${blue})`} stroke="#c1e7ff"/><path d="m165 125 165 83 165-83v25l-165 83-165-83Z" fill="#154b73" stroke="#88bce0"/><ellipse cx="330" cy="125" rx="70" ry="34" fill="#0e2b43" stroke="#c1e7ff"/></g>
   <g stroke="#8ac5f2" strokeDasharray="4 8"><path d="M185 155v142M475 155v142M330 225v96"/></g>
  </>}
  {kind===3&&<>
   <g className="vp-layer vp-layer-bottom"><path d="m115 310 215-108 215 108-215 108Z" fill="#102e4c" stroke="#72a8d0"/><path d="m158 310 172-86 172 86-172 86Z" stroke="#8ac5f2" strokeDasharray="3 8"/></g>
   <g className="vp-data-field" stroke="#5298ce" strokeWidth="1.5">{[0,1,2,3].map(i=><path key={i} d={`M${170+i*40} ${265-i*20}l160 80V${200+i*16}`}/>)}<path d="m170 180 80 25 80-80 80 35 80-65" stroke="#b5e6ff" strokeWidth="3"/>{[[170,180],[250,205],[330,125],[410,160],[490,95]].map(([x,y],i)=><g className={`vp-data-node vp-data-node-${i}`} key={i}><circle cx={x} cy={y} r="8" fill="#79c7ff"/><circle cx={x} cy={y} r="18" stroke="#8ac5f240"/></g>)}</g>
   <g className="vp-layer vp-layer-top"><path d="m255 83 75-38 75 38-75 38Z" fill={`url(#${metal})`} stroke="#daf0ff"/><path d="m255 83 75 38 75-38v35l-75 38-75-38Z" fill="#145e9d" stroke="#8ac5f2"/></g>
  </>}
  {kind===4&&<>
   <g className="vp-layer vp-layer-bottom"><path d="m120 325 210-105 210 105-210 105Z" fill="#415b70" stroke="#b2cbdc"/><path d="m120 325 210 105 210-105v16l-210 105-210-105Z" fill="#253a4b" stroke="#708fa8"/></g>
   <g className="vp-layer vp-layer-middle"><path d="m120 250 210-105 210 105-210 105Z" fill={`url(#${metal})`} stroke="#e4f4ff"/><path d="m120 250 210 105 210-105v8l-210 105-210-105Z" fill="#507a9b" stroke="#b9d7eb"/></g>
   <g className="vp-layer vp-layer-top"><path d="m120 155 210-105 210 105-210 105Z" fill={`url(#${blue})`} stroke="#ccecff"/><path d="m120 155 210 105 210-105v5l-210 105-210-105Z" fill="#236ba0" stroke="#7db7e0"/>{[0,1,2,3,4,5].map(i=><path key={i} d={`m${170+i*24} ${155-i*12} 138 69`} stroke="#c7eaff60"/>)}</g>
   <path className="vp-protection-line" d="M330 28v170" stroke="#bee8ff" strokeWidth="2" strokeDasharray="5 12"/>
  </>}
  <g className="vp-scene-ticks" stroke="#9dc5e2" opacity=".45"><path d="M68 80V55h25M572 375v25h-25M95 405h90M550 75h-75"/></g>
 </svg>;
}
