// Shared contract also used by the persistent Netlify adapter.
export function memoryAuthStore(now=Date.now){
 const entries=new Map();
 return {
  async get(key){const item=entries.get(key);if(!item)return null;if(item.expiresAt<=now()){entries.delete(key);return null}return item.value},
  async set(key,value,ttl){for(const [id,item] of entries)if(item.expiresAt<=now())entries.delete(id);if(entries.size>=2000&&!entries.has(key))entries.delete(entries.keys().next().value);entries.set(key,{value,expiresAt:now()+ttl})},
  async delete(key){entries.delete(key)}
 };
}
