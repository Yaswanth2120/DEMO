export const publicFiles=new Set(['/assets/nexafive-logo.png',
 '/assets/nexafive-mark.svg','/assets/favicon.png','/fonts/outfit-latin.woff2','/fonts/jakarta-latin.woff2']);
export const isPublicAccessPath=path=>publicFiles.has(path)||['/login','/auth/login','/auth/logout','/auth/session','/auth/login.css','/auth/login.js'].includes(path);
export function safeNext(value){
 if(typeof value!=='string'||!/^\/(?:v[123](?:\/boardmembers)?|boardmembers|backup)?(?:[?#][^\r\n]*)?$/.test(value)||value.includes('\\'))return '/';
 return value;
}
