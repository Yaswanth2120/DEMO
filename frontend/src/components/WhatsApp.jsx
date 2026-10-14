import {useEffect,useRef,useState} from 'react';
import {WhatsAppIcon} from './Icons.jsx';
import {company} from '../content.js';
export default function WhatsApp({number=''}){
 const [notice,setNotice]=useState(false);const timer=useRef();
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 function open(){if(/^\d{8,15}$/.test(number)){window.open(`https://wa.me/${number}?text=${encodeURIComponent('Hello NexaFive Global, I visited your website and would like to know more about your services.')}`,'_blank','noopener,noreferrer');return}setNotice(!notice);clearTimeout(timer.current);timer.current=setTimeout(()=>setNotice(false),12000)}
 return <aside className="floating-contact" aria-label="WhatsApp support"><div className="whatsapp-notice" role="status">{notice&&<div><strong>Let’s start a conversation.</strong><p>WhatsApp is not configured yet. Reach our engineering team directly:</p><a href={`mailto:${company.email}`}>{company.email}</a><a href={`tel:${company.phone}`}>{company.phoneDisplay}</a><button type="button" onClick={()=>setNotice(false)} aria-label="Close contact notice">✕</button></div>}</div><button className="whatsapp-button" type="button" onClick={open} aria-label="Chat with NexaFive Global on WhatsApp"><WhatsAppIcon/></button></aside>
}
