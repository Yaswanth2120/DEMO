import {getStore} from '@netlify/blobs';
// Strong reads ensure a sign-out is seen by every function instance immediately.
export function netlifyAuthStore({name='nexafive-access',now=Date.now}={}){
 const store=()=>getStore({name,consistency:'strong'});
 return {
  async get(key){const item=await store().get(key,{type:'json'});if(!item)return null;if(item.expiresAt<=now()){await store().delete(key);return null}return item.value},
  async set(key,value,ttl){await store().setJSON(key,{value,expiresAt:now()+ttl})},
  async delete(key){await store().delete(key)}
 };
}
