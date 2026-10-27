// Native form submission also works without JavaScript.
const form=document.querySelector('form');
const reveal=document.querySelector('.reveal');
reveal?.addEventListener('click',()=>{
 const field=document.getElementById('password'),shown=field.type==='password';
 field.type=shown?'text':'password';reveal.textContent=shown?'Hide':'Show';reveal.setAttribute('aria-label',shown?'Hide password':'Show password');
});
if(location.hash&&form?.elements.next)form.elements.next.value=form.elements.next.value.split('#')[0]+location.hash;
form?.addEventListener('submit',()=>{const button=form.querySelector('[type="submit"]');button.disabled=true;button.textContent='Signing in…'});
