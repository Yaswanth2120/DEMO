import {useCallback,useEffect,useRef,useState} from 'react';
import {company,claims} from '../content.js';
import {FORM_ENDPOINT,subjects,sendEnquiry} from '../components/enquiry.js';
import {chapters,subjectFor} from './chapters.js';
import './v3.css';

const total=chapters.length;
const pad=n=>String(n+1).padStart(2,'0');
const legacy={pillars:2,solutions:1,faq:total-1,privacy:total-1,'contact-form':total-1,main:0};
const indexFromHash=hash=>{const id=decodeURIComponent(hash.replace('#',''));const found=chapters.findIndex(c=>c.id===id);return found>=0?found:(legacy[id]??-1)};

const icons={
 arrow:'M5 12h14M13 6l6 6-6 6',down:'M12 5v14M6 13l6 6 6-6',up:'M12 19V5M6 11l6-6 6 6',ext:'M7 17 17 7M8 7h9v9',close:'m6 6 12 12M18 6 6 18',
 grid:'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
 soundOn:'M4 9v6h4l5 4V5L8 9zM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12',soundOff:'M4 9v6h4l5 4V5L8 9zM17 9l5 6m0-6-5 6',
 mail:'M3 6h18v12H3zM3.5 6.5 12 13l8.5-6.5',phone:'M6.6 3.5h2.6l1.4 4-2 1.4a12 12 0 0 0 6.5 6.5l1.4-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z',pin:'M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21zM12 7.5a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6z'
};
function Icon({name}){return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={icons[name]}/></svg>}

function createSound(){
 const Context=window.AudioContext||window.webkitAudioContext;if(!Context)return null;
 const ctx=new Context(),master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination);
 [110,164.81,220].forEach((frequency,i)=>{const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type='sine';osc.frequency.value=frequency;gain.gain.value=[.05,.03,.015][i];osc.connect(gain).connect(master);osc.start()});
 // Five-note pentatonic chimes: one note per chapter, echoing the five disciplines.
 const notes=[261.63,293.66,329.63,392,440];
 return{
  set(on){ctx.resume();master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setValueAtTime(master.gain.value,ctx.currentTime);master.gain.linearRampToValueAtTime(on?.55:0,ctx.currentTime+.5)},
  chime(index){const osc=ctx.createOscillator(),gain=ctx.createGain(),now=ctx.currentTime;osc.type='triangle';osc.frequency.value=notes[index%5]*(index>=5?2:1);gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.12,now+.02);gain.gain.exponentialRampToValueAtTime(.0001,now+1.8);osc.connect(gain).connect(master);osc.start(now);osc.stop(now+1.9)},
  close(){ctx.close()}
 };
}

function Points({points,focus,setFocus,detail=true}){
 if(!points?.length)return null;
 const current=points[focus]||points[0];
 return <>
  <ol className="v3-points">{points.map((point,k)=><li key={point.label}><button type="button" aria-pressed={focus===k} onClick={()=>setFocus(k)} onPointerEnter={event=>{if(event.pointerType==='mouse')setFocus(k)}}><span>{pad(k)}</span>{point.label}</button></li>)}</ol>
  {detail&&(current.note||current.text)&&<div className="v3-point-detail" key={current.label} aria-live="polite">{current.note&&<strong>{current.note}</strong>}{current.text&&<p>{current.text}</p>}</div>}
 </>;
}

function Foot({index}){
 return <div className="v3-foot">
  {index>0?<a href={`#${chapters[index-1].id}`} aria-label={`Previous: ${chapters[index-1].nav}`}><Icon name="up"/></a>:<span/>}
  <span>{pad(index)} / {pad(total-1)}</span>
  {index<total-1?<a href={`#${chapters[index+1].id}`} aria-label={`Next: ${chapters[index+1].nav}`}><Icon name="down"/></a>:<span/>}
 </div>;
}

function Enquiry({subject}){
 const form=useRef(null),select=useRef(null);
 const [state,setState]=useState({loading:false,kind:'',message:''});
 useEffect(()=>{if(subject&&select.current)select.current.value=subject},[subject]);
 async function submit(event){
  event.preventDefault();
  if(state.loading||!form.current.reportValidity())return;
  setState({loading:true,kind:'',message:''});
  const sent=await sendEnquiry(Object.fromEntries(new FormData(form.current)));
  if(sent){form.current.reset();setState({loading:false,kind:'ok',message:'Thank you. Your enquiry has been sent to the NexaFive team.'})}
  else setState({loading:false,kind:'error',message:`We couldn’t send your enquiry. Please try again or email ${company.email}.`});
 }
 const field=(id,label,props,Tag='input')=><div className="v3-field"><Tag id={id} placeholder=" " {...props}/><label htmlFor={id}>{label}</label></div>;
 return <form ref={form} id="contact-form" className="v3-form" action={FORM_ENDPOINT} method="POST" onSubmit={submit} aria-busy={state.loading}>
  <div className="v3-form-row">{field('v3-first','First name *',{name:'firstName',autoComplete:'given-name',required:true,maxLength:80})}{field('v3-last','Last name *',{name:'lastName',autoComplete:'family-name',required:true,maxLength:80})}</div>
  <div className="v3-form-row">{field('v3-email','Email address *',{name:'email',type:'email',autoComplete:'email',required:true,maxLength:254})}{field('v3-phone','Phone',{name:'phone',type:'tel',autoComplete:'tel',maxLength:40})}</div>
  <div className="v3-field v3-field-select"><select id="v3-subject" name="subject" ref={select} defaultValue={subjects[0]}>{subjects.map(item=><option key={item}>{item}</option>)}</select><label htmlFor="v3-subject">How can we help?</label></div>
  {field('v3-message','Your project *',{name:'message',required:true,minLength:10,maxLength:5000,rows:3},'textarea')}
  <input className="v3-honeypot" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
  <input type="hidden" name="_subject" value="New enquiry — NexaFive Global website"/>
  <input type="hidden" name="_captcha" value="false"/>
  <input type="hidden" name="_template" value="table"/>
  <button className="v3-btn v3-btn-block" type="submit" disabled={state.loading}>{state.loading?'Sending enquiry…':'Send enquiry'}<Icon name="arrow"/></button>
  <p className="v3-status" role="status" aria-live="polite" data-kind={state.kind||undefined}>{state.message}</p>
  <p className="v3-fine">By submitting, you agree to our <a href="#privacy">privacy notice</a>. Please do not include confidential technical data.</p>
 </form>;
}

function Chapter({chapter,index,active,focus,setFocus,setSubject,verified,subject}){
 const f=active?focus:0;
 let body;
 if(chapter.type==='hero')body=<div className="v3-hero v3-scroll">
  <p className="v3-kicker"><span className="v3-live" aria-hidden="true"/>NexaFive Global · Minneapolis, MN</p>
  <h1 className="v3-hero-title" aria-label="Innovate beyond boundaries."><span aria-hidden="true">Innovate</span> <span aria-hidden="true">beyond</span> <span className="v3-grad" aria-hidden="true">boundaries.</span></h1>
  <p className="v3-lede">{company.overview}</p>
  <div className="v3-actions"><a className="v3-btn" href="#about">Begin the journey<Icon name="down"/></a><a className="v3-btn v3-btn-ghost" href="#contact">Start a project</a></div>
  <p className="v3-hint" aria-hidden="true"><span className="v3-mouse"/>Scroll, swipe or use the arrow keys to travel · drag to rotate</p>
 </div>;
 else if(chapter.type==='contact')body=<div className="v3-panel v3-panel-wide v3-scroll">
  <div className="v3-contact-grid">
   <div>
    <p className="v3-eyebrow"><span>{pad(index)}</span>Start a conversation</p>
    <h2>Bring the challenge.<br/><span>We’ll find the way forward.</span></h2>
    <p>Tell us about your program, material system, failed part, or timeline. A conversation is the first step.</p>
    <ul className="v3-contact-list">
     <li><a href={`mailto:${company.email}`}><Icon name="mail"/><span><small>Email</small>{company.email}</span></a></li>
     <li><a href={`tel:${company.phone}`}><Icon name="phone"/><span><small>Call</small>{company.phoneDisplay}</span></a></li>
     <li><div><Icon name="pin"/><span><small>Based in</small>{company.location}</span></div></li>
    </ul>
    <details id="privacy" className="v3-privacy"><summary>Privacy notice<span aria-hidden="true">+</span></summary><div>
     <p>Your name, email, optional phone, subject, and message are sent to FormSubmit to deliver your enquiry to {company.email}. Contact the team to request access or deletion. Please do not submit confidential project data.</p>
     <p>This website does not add tracking cookies or analytics. Your hosting provider may keep access logs under its own policy. Opening WhatsApp leaves this website and uses WhatsApp’s privacy terms. Its link is available only after the official business number is configured.</p>
    </div></details>
    <p className="v3-versions">Also explore <a href="/">Version 1</a> · <a href="/v2">Version 2</a></p>
   </div>
   <Enquiry subject={subject}/>
  </div>
  <p className="v3-copy">© {new Date().getFullYear()} NexaFive Global. {company.tagline}</p>
 </div>;
 else{
  let eyebrow,heading,content;
  if(chapter.type==='disciplines'){eyebrow='The NexaFive perspective';heading=<>Five disciplines.<br/><span>One perspective.</span></>;content=<>
   <p>A specialized engineering and technology consultancy connecting materials science, research, and production thinking in the same conversation.</p>
   <Points points={chapter.points} focus={f} setFocus={setFocus}/>
   <p className="v3-fine">Combined as integrated solutions: engineering, research &amp; validation, and materials intelligence.</p>
  </>}
  else if(chapter.type==='service'){const s=chapter.service;eyebrow=`Capability ${pad(chapter.index)} / 05 · ${s.category}`;heading=s.title;content=<>
   <p className="v3-display">{s.short}</p>
   <p>{s.description}</p>
   <Points points={chapter.points} focus={f} setFocus={setFocus} detail={false}/>
   <p className="v3-fine">{s.detail}</p>
   <a className="v3-link" href="#contact" onClick={()=>setSubject(subjectFor[s.slug])}>Discuss this capability<Icon name="arrow"/></a>
  </>}
  else if(chapter.type==='process'){eyebrow='From question to implementation';heading=<>Find the cause.<br/><span>Follow it through.</span></>;content=<>
   <p>Our corrosion-resolution approach connects investigation and engineering with validation and implementation.</p>
   <Points points={chapter.points} focus={f} setFocus={setFocus}/>
  </>}
  else if(chapter.type==='industries'){eyebrow='Where we work';heading=<>Different industries.<br/><span>Shared fundamentals.</span></>;content=<>
   <p>Specialized expertise for the teams building what comes next in mobility, energy, healthcare technology, and industry.</p>
   <Points points={chapter.points} focus={f} setFocus={setFocus}/>
   <a className="v3-link" href="#contact">Discuss your program<Icon name="arrow"/></a>
  </>}
  else if(chapter.type==='research'){eyebrow='Research & collaboration';heading=<>Curiosity,<br/><span>backed by evidence.</span></>;content=<>
   <p>Academic insight and diagnostic testing bring a different depth to industrial questions. Our published research network identifies Missouri S&amp;T and Kansas State University.</p>
   <div className="v3-partners">
    <figure><img src="/assets/missouri-st-logo.png" alt="Missouri S&T university logo" width="2315" height="1880" loading="lazy"/><figcaption>Missouri University of Science and Technology</figcaption></figure>
    <figure><img src="/assets/university-1.jpg" alt="Kansas State University wordmark" width="300" height="158" loading="lazy"/><figcaption>Kansas State University · College of Engineering</figcaption></figure>
   </div>
   <p className="v3-fine">{verified?claims.partnerships:'Ask our team about the current collaboration scope for your program.'}</p>
   <Points points={chapter.points} focus={f} setFocus={setFocus} detail={false}/>
   <div className="v3-standards"><span>ASTM</span><span>SAE</span><span>ISO</span></div>
   <p className="v3-fine">{verified?claims.testing:'Confirm applicable standards, laboratory accreditation, and OEM procedures for your test program. Accelerated corrosion testing is also available for validation.'}</p>
  </>}
  body=<div className="v3-panel v3-scroll">
   <p className="v3-eyebrow"><span>{pad(index)}</span>{eyebrow}</p>
   <h2>{heading}</h2>
   {content}
   <Foot index={index}/>
  </div>;
 }
 return <section id={chapter.id} className={`v3-chapter v3-ch-${chapter.type}`} data-active={active} inert={active?undefined:true} aria-label={chapter.nav}>{body}</section>;
}

export default function VersionThree({config={}}){
 const [index,setIndex]=useState(0);
 const [live,setLive]=useState(false);
 const [gl,setGl]=useState('pending');
 const [focus,setFocus]=useState(0);
 const [subject,setSubject]=useState('');
 const [menu,setMenu]=useState(false);
 const [sound,setSound]=useState(false);
 const canvas=useRef(null),engine=useRef(null),indexRef=useRef(0),hotRefs=useRef([]),hotLayer=useRef(null),dialog=useRef(null),soundRef=useRef(null),cursor=useRef(null);

 const go=useCallback(next=>{const target=Math.max(0,Math.min(total-1,next));if(target===indexRef.current)return;indexRef.current=target;setIndex(target)},[]);

 // Boot: switch from the readable document to the immersive stage and start WebGL.
 useEffect(()=>{
  const root=document.documentElement;
  root.classList.add('v3-lock');
  setLive(true);
  const start=indexFromHash(location.hash);
  if(start>0){indexRef.current=start;setIndex(start)}
  let instance,disposed=false;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,mobile=matchMedia('(max-width: 960px)').matches;
  const onFrame=(positions,mix)=>{
   const layer=hotLayer.current;if(!layer)return;
   layer.style.setProperty('--hot-alpha',String(Math.max(0,(mix-.65)/.35)));
   const edge=window.innerWidth>960?window.innerWidth-260:window.innerWidth/2;
   positions.forEach((p,k)=>{const el=hotRefs.current[k];if(el){el.style.transform=`translate3d(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px,0)`;el.dataset.front=p.front?'true':'false';el.dataset.side=p.x>edge?'left':'right'}});
  };
  import('./engine.js').then(({createEngine})=>{
   if(disposed)return;
   try{instance=createEngine(canvas.current,{chapters,mobile,reduced,onFrame});engine.current=instance;instance.setChapter(indexRef.current);setGl('on')}
   catch{setGl('off')}
  }).catch(()=>setGl('off'));
  const onResize=()=>instance?.resize();
  window.addEventListener('resize',onResize);
  return()=>{disposed=true;window.removeEventListener('resize',onResize);instance?.dispose();root.classList.remove('v3-lock')};
 },[]);

 // React to chapter changes.
 useEffect(()=>{
  engine.current?.setChapter(index);
  setFocus(0);
  if(live)history.replaceState(null,'',index===0?location.pathname:`#${chapters[index].id}`);
  if(sound)soundRef.current?.chime(index);
 },[index]); // eslint-disable-line react-hooks/exhaustive-deps

 // Wheel, swipe, keyboard and in-page links all travel between chapters.
 useEffect(()=>{
  if(!live)return;
  let wheel=0,lock=0,touch=null;
  const canScroll=(element,dy)=>{for(let el=element;el&&el!==document.body;el=el.parentElement){if(el.classList?.contains('v3-scroll')&&el.scrollHeight>el.clientHeight+2){if(dy>0?el.scrollTop+el.clientHeight<el.scrollHeight-2:el.scrollTop>2)return true}}return false};
  const blocked=()=>dialog.current?.open;
  const step=dir=>{const now=performance.now();if(now<lock)return;lock=now+950;go(indexRef.current+dir)};
  const onWheel=event=>{
   if(blocked())return;
   if(canScroll(event.target,event.deltaY))return;
   event.preventDefault();
   if(performance.now()<lock){wheel=0;return}
   wheel+=event.deltaY;
   if(Math.abs(wheel)>45){step(wheel>0?1:-1);wheel=0}
  };
  const onTouchStart=event=>{const t=event.touches[0];touch={x:t.clientX,y:t.clientY,lastX:t.clientX,target:event.target,scroll:event.target.closest?.('.v3-scroll')?.scrollTop??null}};
  const onTouchMove=event=>{if(!touch)return;const t=event.touches[0];if(event.target.closest?.('.v3-scroll'))return;engine.current?.drag((t.clientX-touch.lastX)*1.6,0);touch.lastX=t.clientX};
  const onTouchEnd=event=>{
   if(!touch||blocked()){touch=null;return}
   const t=event.changedTouches[0],dx=t.clientX-touch.x,dy=t.clientY-touch.y;
   const scroller=touch.target.closest?.('.v3-scroll');
   const scrolled=scroller&&touch.scroll!==null&&Math.abs(scroller.scrollTop-touch.scroll)>2;
   if(!scrolled&&Math.abs(dy)>55&&Math.abs(dy)>Math.abs(dx)*1.2&&!(scroller&&canScroll(touch.target,-dy)))step(dy<0?1:-1);
   touch=null;
  };
  const onKey=event=>{
   if(blocked()||event.target.closest?.('input, textarea, select'))return;
   const keys={ArrowDown:1,PageDown:1,ArrowRight:1,' ':1,ArrowUp:-1,PageUp:-1,ArrowLeft:-1};
   if(event.key in keys){if(event.key===' '&&event.target.closest?.('button, a, summary'))return;event.preventDefault();step(keys[event.key])}
   else if(event.key==='Home'){event.preventDefault();go(0)}
   else if(event.key==='End'){event.preventDefault();go(total-1)}
   else if(event.key.toLowerCase()==='m'&&!event.metaKey&&!event.ctrlKey)setMenu(true);
  };
  const onHash=()=>{const target=indexFromHash(location.hash);if(target>=0){lock=performance.now()+600;go(target);setMenu(false)}};
  const onPointer=event=>engine.current?.setPointer(event.clientX/window.innerWidth*2-1,event.clientY/window.innerHeight*2-1);
  window.addEventListener('wheel',onWheel,{passive:false});
  window.addEventListener('touchstart',onTouchStart,{passive:true});
  window.addEventListener('touchmove',onTouchMove,{passive:true});
  window.addEventListener('touchend',onTouchEnd,{passive:true});
  window.addEventListener('keydown',onKey);
  window.addEventListener('hashchange',onHash);
  window.addEventListener('pointermove',onPointer,{passive:true});
  return()=>{window.removeEventListener('wheel',onWheel);window.removeEventListener('touchstart',onTouchStart);window.removeEventListener('touchmove',onTouchMove);window.removeEventListener('touchend',onTouchEnd);window.removeEventListener('keydown',onKey);window.removeEventListener('hashchange',onHash);window.removeEventListener('pointermove',onPointer)};
 },[live,go]);

 // Mouse drag rotates the model.
 useEffect(()=>{
  const element=canvas.current;if(!element||gl!=='on')return;
  let drag=null;
  const down=event=>{if(event.pointerType!=='mouse')return;drag={x:event.clientX,y:event.clientY};element.setPointerCapture(event.pointerId);element.classList.add('is-dragging')};
  const move=event=>{if(!drag)return;engine.current?.drag(event.clientX-drag.x,event.clientY-drag.y);drag={x:event.clientX,y:event.clientY}};
  const up=()=>{drag=null;element.classList.remove('is-dragging')};
  element.addEventListener('pointerdown',down);element.addEventListener('pointermove',move);element.addEventListener('pointerup',up);element.addEventListener('pointercancel',up);
  return()=>{element.removeEventListener('pointerdown',down);element.removeEventListener('pointermove',move);element.removeEventListener('pointerup',up);element.removeEventListener('pointercancel',up)};
 },[gl]);

 // Trailing cursor ring for fine pointers.
 useEffect(()=>{
  const ring=cursor.current;
  if(!ring||!matchMedia('(hover: hover) and (pointer: fine)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let x=-100,y=-100,tx=-100,ty=-100,frame=0;
  const move=event=>{tx=event.clientX;ty=event.clientY;ring.dataset.hot=event.target.closest?.('a, button, summary, input, select, textarea, canvas')?(event.target.tagName==='CANVAS'?'drag':'true'):'false'};
  const loop=()=>{x+=(tx-x)*.2;y+=(ty-y)*.2;ring.style.transform=`translate3d(${x}px,${y}px,0)`;frame=requestAnimationFrame(loop)};
  ring.hidden=false;window.addEventListener('pointermove',move,{passive:true});frame=requestAnimationFrame(loop);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('pointermove',move)};
 },[live]);

 useEffect(()=>{const d=dialog.current;if(!d)return;if(menu&&!d.open)d.showModal();else if(!menu&&d.open)d.close()},[menu]);
 useEffect(()=>()=>soundRef.current?.close(),[]);
 const toggleSound=()=>{if(!soundRef.current)soundRef.current=createSound();const next=!sound;soundRef.current?.set(next);setSound(next);if(next)soundRef.current?.chime(indexRef.current)};

 const current=chapters[index];
 return <div className={`v3${live?' is-live':''}`} data-gl={gl} data-chapter={current.id} data-type={current.type}>
  <a className="v3-skip" href="#contact">Skip to contact</a>
  <canvas ref={canvas} className="v3-canvas" aria-hidden="true"/>
  <div className="v3-atmosphere" aria-hidden="true"/>
  <header className="v3-top">
   <a className="v3-logo" href="#hero" aria-label="NexaFive Global — back to start"><img src="/assets/nexafive-logo.png" alt="NexaFive Global — Innovate Beyond Boundaries" width="163" height="45"/></a>
   <p className="v3-where" aria-hidden="true"><span>{pad(index)}</span>{current.nav}</p>
   <div className="v3-tools">
    <button type="button" className="v3-tool" onClick={toggleSound} aria-pressed={sound} aria-label={sound?'Turn sound off':'Turn sound on'}><Icon name={sound?'soundOn':'soundOff'}/></button>
    <button type="button" className="v3-tool" onClick={()=>setMenu(true)} aria-haspopup="dialog" aria-label="Open chapter index"><Icon name="grid"/><span>Index</span></button>
    <a className="v3-btn v3-btn-sm" href="#contact">Let’s talk</a>
   </div>
  </header>

  <div className="v3-hotspots" ref={hotLayer} aria-hidden="true">
   {(current.points||[]).map((point,k)=><button key={`${current.id}-${k}`} ref={el=>{hotRefs.current[k]=el}} type="button" tabIndex={-1} className="v3-hot" data-on={focus===k} onClick={()=>setFocus(k)} onPointerEnter={event=>{if(event.pointerType==='mouse')setFocus(k)}}><span className="v3-hot-dot"/><span className="v3-hot-label">{point.label}</span></button>)}
  </div>

  <main className="v3-stage">
   {chapters.map((chapter,i)=><Chapter key={chapter.id} chapter={chapter} index={i} active={!live||i===index} focus={focus} setFocus={setFocus} setSubject={setSubject} subject={subject} verified={config.verified}/>)}
  </main>

  <nav className="v3-rail" aria-label="Chapters">
   {chapters.map((chapter,i)=><a key={chapter.id} href={`#${chapter.id}`} aria-current={i===index?'step':undefined}><span className="v3-rail-label">{chapter.nav}</span><span className="v3-rail-tick"/></a>)}
  </nav>
  <div className="v3-progress" aria-hidden="true"><span className="v3-progress-count">{pad(index)}<i>/{pad(total-1)}</i></span><span className="v3-progress-bar"><span data-step={index}/></span></div>

  <p className="v3-sr" aria-live="polite">{live?`Chapter ${index+1} of ${total}: ${current.title}`:''}</p>

  <dialog ref={dialog} className="v3-index" aria-label="Chapter index" onClose={()=>setMenu(false)} onCancel={()=>setMenu(false)} onClick={event=>{if(event.target===dialog.current)setMenu(false)}}>
   <div className="v3-index-head"><p>Journey index</p><button type="button" className="v3-tool" onClick={()=>setMenu(false)} aria-label="Close index"><Icon name="close"/></button></div>
   <ol className="v3-index-grid">{chapters.map((chapter,i)=><li key={chapter.id}><a href={`#${chapter.id}`} aria-current={i===index?'step':undefined} onClick={()=>setMenu(false)}><span>{pad(i)}</span><strong>{chapter.nav}</strong><small>{chapter.title}</small></a></li>)}</ol>
   <p className="v3-index-foot">Keyboard: ↑ ↓ or ← → to travel · M for this index · Esc to close. Also explore <a href="/">Version 1</a> · <a href="/v2">Version 2</a></p>
  </dialog>
  <div className="v3-cursor" ref={cursor} hidden aria-hidden="true"/>
 </div>;
}
