import {useEffect,useState} from 'react';
import './board-intro.css';

// Opening sequence for the board page: a round table draws, each member takes a seat,
// the N5 mark settles in the centre, then the scene opens like doors onto the page.
// Pure CSS timing so it plays from first paint; JavaScript only adds Skip and Escape.
const R=128,C=200;

export default function BoardIntro({members}){
 const [done,setDone]=useState(false);
 const seats=members.slice(0,8).map((member,i,list)=>{
  const angle=-Math.PI/2+i*Math.PI*2/list.length;
  return{x:+(C+R*Math.cos(angle)).toFixed(1),y:+(C+R*Math.sin(angle)).toFixed(1),initials:member.name.split(/\s+/).map(part=>part[0]).slice(0,2).join('')};
 });
 useEffect(()=>{
  if(done)return;
  const skip=event=>{if(event.key==='Escape')setDone(true)};
  document.addEventListener('keydown',skip);
  return()=>document.removeEventListener('keydown',skip);
 },[done]);
 useEffect(()=>{if(done)document.querySelector('.n5-board-page')?.classList.add('n5-board-intro-skipped')},[done]);

 return <div className="n5-board-intro" data-done={done} aria-hidden={done?'true':undefined}>
  <span className="n5-board-door n5-board-door-top"/>
  <span className="n5-board-door n5-board-door-bottom"/>
  <div className="n5-board-intro-stage">
   <svg className="n5-board-intro-art" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
    <defs><path id="n5-board-orbit" d={`M${C} ${C}m-172 0a172 172 0 1 1 344 0a172 172 0 1 1-344 0`}/></defs>
    <circle className="n5-bi-glow" cx={C} cy={C} r="150"/>
    <g className="n5-bi-words"><text><textPath href="#n5-board-orbit">BOARD OF DIRECTORS · NEXAFIVE GLOBAL · GOVERNANCE · BOARD OF DIRECTORS · NEXAFIVE GLOBAL · GOVERNANCE ·</textPath></text></g>
    <circle className="n5-bi-table" cx={C} cy={C} r={R} pathLength="1"/>
    <circle className="n5-bi-inner" cx={C} cy={C} r={R-34}/>
    {seats.map((seat,i)=><line key={`l${i}`} className={`n5-bi-link n5-bi-d${i}`} x1={C} y1={C} x2={seat.x} y2={seat.y} pathLength="1"/>)}
    {seats.map((seat,i)=><g key={`s${i}`} className={`n5-bi-seat n5-bi-d${i}`}><circle cx={seat.x} cy={seat.y} r="23"/><circle className="n5-bi-ping" cx={seat.x} cy={seat.y} r="23"/><text x={seat.x} y={seat.y+5} textAnchor="middle">{seat.initials}</text></g>)}
    <g className="n5-bi-mark"><circle cx={C} cy={C} r="46"/><image href="/assets/favicon.png" x={C-24} y={C-24} width="48" height="48"/></g>
   </svg>
   <p className="n5-board-intro-kicker" aria-hidden="true">NexaFive Global</p>
   <p className="n5-board-intro-title" aria-hidden="true"><span>The</span> <span>Board</span></p>
  </div>
  <button type="button" className="n5-board-intro-skip" onClick={()=>setDone(true)}>Skip intro</button>
 </div>;
}
