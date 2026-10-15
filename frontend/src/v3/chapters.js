import {services,disciplines,industries,process} from '../content.js';

// One chapter per scene. Copy comes from the shared content module; nothing here adds business claims.
const serviceShapes={'battery-engineering':'battery','lightweight-automotive':'vehicle','tooling-manufacturing':'tooling','ai-optimization':'network','corrosion-mitigation':'coating'};
const serviceViews={
 'battery-engineering':{rx:.5,ry:-.55,spin:.06},
 'lightweight-automotive':{rx:.16,ry:-.5,spin:.07},
 'tooling-manufacturing':{rx:.22,ry:-.6,spin:.06},
 'ai-optimization':{rx:.1,ry:-.9,spin:.08},
 'corrosion-mitigation':{rx:.34,ry:-.5,spin:.05}
};
export const subjectFor={'battery-engineering':'Energy / BEV engineering','lightweight-automotive':'Engineering consultation','tooling-manufacturing':'Manufacturing and tooling support','ai-optimization':'AI/ML platform inquiry','corrosion-mitigation':'Corrosion testing and mitigation'};
const industryNotes=['Lightweight structures. Lasting performance.','A stronger link in the supply chain.','Energy systems, considered as a whole.','Engineering for connected care.','From process insight to production.'];

export const chapters=[
 {id:'hero',type:'hero',shape:'boundary',nav:'Beyond',title:'Innovate beyond boundaries.',view:{rx:.35,ry:.6,spin:.05,zoom:.92}},
 {id:'about',type:'disciplines',shape:'disciplines',nav:'Disciplines',title:'Five disciplines. One perspective.',view:{rx:0,ry:0,spin:0},
  points:disciplines.map(([label,text])=>({label,text}))},
 ...services.map((service,i)=>({id:service.slug,type:'service',shape:serviceShapes[service.slug],nav:service.category,title:service.title,index:i,service,view:serviceViews[service.slug],
  points:service.applications.map(label=>({label}))})),
 {id:'process',type:'process',shape:'method',nav:'Method',title:'Find the cause. Follow it through.',view:{rx:.32,ry:0,spin:.05},
  points:process.map(([label,text],i)=>({label:`${i+1}. ${label}`,text}))},
 {id:'industries',type:'industries',shape:'industries',nav:'Industries',title:'Different industries. Shared fundamentals.',view:{rx:.25,ry:.2,spin:.06},
  points:industries.map(([label,text],i)=>({label,text,note:industryNotes[i]}))},
 {id:'partners',type:'research',shape:'lattice',nav:'Research',title:'Curiosity, backed by evidence.',view:{rx:.6,ry:.75,spin:.06,zoom:1.1},
  points:[{label:'SEM / EDX'},{label:'EIS'},{label:'Cross-section metallography'},{label:'Galvanic testing'}]},
 {id:'contact',type:'contact',shape:'contact',nav:'Contact',title:'Bring the challenge.',view:{rx:.2,ry:.3,spin:.07,center:true}}
];
