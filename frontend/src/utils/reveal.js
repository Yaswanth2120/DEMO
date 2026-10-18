// Replay reveals on viewport re-entry; watch cards mounted after filtering.
export function revealOnScroll(){
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(motion.matches||!('IntersectionObserver' in window))return;
 const selector='.v2-reveal,.hero-copy,.hero-visual,.about-section .image-frame,.section-heading,.strength-grid article,.service-card,.service-enquiry,.solutions-picture,.solution-list article,.industry-grid article,.process-grid article,.partner-grid article,.faq-list details,.cta-section .section';
 const seen=new WeakSet();
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)entry.target.classList.toggle('is-revealed',entry.isIntersecting)},{threshold:0,rootMargin:'0px 0px -32px 0px'});
 const scan=()=>{document.querySelectorAll(selector).forEach(element=>{if(seen.has(element))return;seen.add(element);element.classList.add('will-reveal');observer.observe(element)})};
 document.documentElement.classList.add('motion-enabled');scan();
 const mutations=new MutationObserver(scan);const main=document.getElementById('main');if(main)mutations.observe(main,{childList:true,subtree:true});
 const disable=()=>{if(motion.matches)document.documentElement.classList.remove('motion-enabled')};
 motion.addEventListener('change',disable);
 return()=>{observer.disconnect();mutations.disconnect();motion.removeEventListener('change',disable);document.documentElement.classList.remove('motion-enabled')};
}
