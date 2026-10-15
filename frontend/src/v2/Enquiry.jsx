import {useEffect,useRef,useState} from 'react';
import {company} from '../content.js';
import {FORM_ENDPOINT,subjects,sendEnquiry} from '../components/enquiry.js';
import Glyph from './Glyph.jsx';

// Any "discuss" link can pre-select the matching enquiry subject.
export function enquire(subject){window.dispatchEvent(new CustomEvent('n5:enquire',{detail:{subject}}))}

const questions=[
 ['Where should we start?','Start with your engineering challenge: a material decision, a failed part, a battery program, or a production requirement. Share the context through the enquiry form so we can discuss the scope and next steps.'],
 ['Can you support more than one stage of a program?','Yes. The published service scope spans design and simulation, research and diagnostic testing, solution engineering, prototype validation, and implementation support. Specific deliverables are agreed for each program.'],
 ['What does the AI/ML offering involve?','Materials and manufacturing decision support, including material selection, stamping optimization, structural integrity, corrosion risk scoring, and part performance. Contact the team to confirm data requirements, validation needs, platform fit, and availability.'],
 ['Do you work in healthcare?','The healthcare technology offering focuses on EHR software development, healthcare data integration, and secure software solutions for providers and health systems.']
];

function Field({id,label,as='input',...props}){
 const Control=as;
 return <div className={`n5-field${as==='textarea'?' n5-field-area':''}`}><Control id={id} placeholder=" " {...props}/><label htmlFor={id}>{label}</label></div>;
}

export default function Enquiry(){
 const form=useRef(null),subject=useRef(null),firstField=useRef(null);
 const [state,setState]=useState({loading:false,kind:'',message:''});

 useEffect(()=>{
  let timer=0;
  const onEnquire=event=>{
   const value=event.detail?.subject;
   if(value&&subject.current)subject.current.value=value;
   clearTimeout(timer);
   timer=setTimeout(()=>firstField.current?.focus({preventScroll:true}),700);
  };
  window.addEventListener('n5:enquire',onEnquire);
  return()=>{clearTimeout(timer);window.removeEventListener('n5:enquire',onEnquire)};
 },[]);

 async function submit(event){
  event.preventDefault();
  if(state.loading||!form.current.reportValidity())return;
  setState({loading:true,kind:'',message:''});
  const sent=await sendEnquiry(Object.fromEntries(new FormData(form.current)));
  if(sent){form.current.reset();setState({loading:false,kind:'ok',message:'Thank you. Your enquiry has been sent to the NexaFive team.'})}
  else setState({loading:false,kind:'error',message:`We couldn’t send your enquiry. Please try again or email ${company.email}.`});
 }

 return <section id="contact" className="n5-contact" data-tone="light">
  <div className="n5-wrap n5-contact-grid">
   <div className="n5-contact-intro n5-r">
    <p className="n5-eyebrow">Start a conversation</p>
    <h2>Bring the challenge.<br/><span>We’ll find the way forward.</span></h2>
    <p className="n5-contact-lede">Tell us about your program, material system, failed part, or timeline. A conversation is the first step.</p>
    <ul className="n5-contact-list">
     <li><a href={`mailto:${company.email}`}><Glyph name="mail"/><span><small>Email</small>{company.email}</span></a></li>
     <li><a href={`tel:${company.phone}`}><Glyph name="phone"/><span><small>Call</small>{company.phoneDisplay}</span></a></li>
     <li><div><Glyph name="pin"/><span><small>Based in</small>{company.location}</span></div></li>
    </ul>
    <div id="faq" className="n5-faq">
     {questions.map(([question,answer])=><details key={question}><summary>{question}<span className="n5-faq-icon" aria-hidden="true"/></summary><p>{answer}</p></details>)}
    </div>
   </div>
   <form ref={form} id="contact-form" className="n5-form n5-glow n5-r" action={FORM_ENDPOINT} method="POST" onSubmit={submit} aria-busy={state.loading}>
    <div className="n5-form-head"><h3>Tell us what you’re working on.</h3><span>Fields marked * are required</span></div>
    <div className="n5-form-row">
     <Field id="n5-first" label="First name *" name="firstName" autoComplete="given-name" required maxLength={80} ref={firstField}/>
     <Field id="n5-last" label="Last name *" name="lastName" autoComplete="family-name" required maxLength={80}/>
    </div>
    <div className="n5-form-row">
     <Field id="n5-email" label="Email address *" name="email" type="email" autoComplete="email" required maxLength={254}/>
     <Field id="n5-phone" label="Phone" name="phone" type="tel" autoComplete="tel" maxLength={40}/>
    </div>
    <div className="n5-field n5-field-select"><select id="n5-subject" name="subject" ref={subject} defaultValue={subjects[0]}>{subjects.map(item=><option key={item}>{item}</option>)}</select><label htmlFor="n5-subject">How can we help?</label></div>
    <Field id="n5-message" as="textarea" label="Your project *" name="message" required minLength={10} maxLength={5000} rows={4}/>
    <input className="n5-honeypot" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
    <input type="hidden" name="_subject" value="New enquiry — NexaFive Global website"/>
    <input type="hidden" name="_captcha" value="false"/>
    <input type="hidden" name="_template" value="table"/>
    <button className="n5-btn n5-btn-block" type="submit" disabled={state.loading}>{state.loading?'Sending enquiry…':'Send enquiry'}<Glyph name="arrow"/></button>
    <p className="n5-form-status" role="status" aria-live="polite" data-kind={state.kind||undefined}>{state.message}</p>
    <p className="n5-fine">By submitting, you agree to our <a href="#privacy">privacy notice</a>. Please do not include confidential technical data.</p>
   </form>
  </div>
 </section>;
}
