import {company,services} from './content.js';
export const routes=['/'];
export const legacyRedirects={
 '/about':'/#about','/services':'/#pillars','/solutions':'/#solutions','/industries':'/#industries','/research':'/#partners','/contact':'/#contact','/privacy':'/#privacy',
 ...Object.fromEntries(services.map(service=>[`/services/${service.slug}`,`/#${service.slug}`]))
};
export function getPageMeta(path){return {title:path==='/'?'NexaFive Global — Innovate Beyond Boundaries':'Page Not Found | NexaFive Global',description:company.overview,notFound:path!=='/'}}
