import {company,services} from './content.js';
export const routes=['/'];
export const legacyRedirects={
 '/about':'/#about','/services':'/#pillars','/solutions':'/#solutions','/industries':'/#industries','/research':'/#partners','/contact':'/#contact','/privacy':'/#privacy',
 ...Object.fromEntries(services.map(service=>[`/services/${service.slug}`,`/#${service.slug}`]))
};
// The alternate design is directly accessible, but stays out of the main sitemap.
export function getPageMeta(path){return {title:path==='/v2'?'NexaFive Global — Engineering What’s Next':path==='/'?'NexaFive Global — Innovate Beyond Boundaries':'Page Not Found | NexaFive Global',description:company.overview,notFound:!['/','/v2'].includes(path)}}
