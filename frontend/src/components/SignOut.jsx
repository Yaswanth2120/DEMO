import {useEffect} from 'react';
export default function SignOut(){
 useEffect(()=>{const check=event=>{if(event.persisted)location.reload()};window.addEventListener('pageshow',check);return()=>window.removeEventListener('pageshow',check)},[]);
 return null;
}
