import {useEffect} from 'react';
import './sign-out.css';
export default function SignOut(){
 useEffect(()=>{const check=event=>{if(event.persisted)location.reload()};window.addEventListener('pageshow',check);return()=>window.removeEventListener('pageshow',check)},[]);
 return <form className="site-sign-out" method="post" action="/auth/logout"><button type="submit">Sign out <span aria-hidden="true">↗</span></button></form>;
}
