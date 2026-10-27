export function getConfig(){
 let siteUrl='https://nexafiveglobal.com';try{const candidate=new URL(process.env.SITE_URL||process.env.DEPLOY_PRIME_URL||process.env.URL||siteUrl);if(!['http:','https:'].includes(candidate.protocol))throw new Error();siteUrl=candidate.origin}catch{/* Safe default for invalid configuration. */}
 return {siteUrl,verified:process.env.PUBLISH_VERIFIED_CLAIMS==='true',whatsapp:/^\d{8,15}$/.test(process.env.WHATSAPP_NUMBER||'')?process.env.WHATSAPP_NUMBER:''};
}
