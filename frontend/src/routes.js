import {company,services} from './content.js';
export const routes=['/','/boardmembers'];
export const legacyRedirects={
 '/v1':'/','/v2':'/','/v3':'/','/backup':'/',
 '/v1/boardmembers':'/boardmembers','/v2/boardmembers':'/boardmembers','/v3/boardmembers':'/boardmembers',
 '/about':'/#about','/services':'/#pillars','/solutions':'/#solutions','/industries':'/#industries','/research':'/#partners','/contact':'/#contact','/privacy':'/#privacy',
 ...Object.fromEntries(services.map(service=>[`/services/${service.slug}`,`/#${service.slug}`]))
};
const titles={'/':'NexaFive Global — Innovate Beyond Boundaries','/boardmembers':'Our Board | NexaFive Global'};
export function getPageMeta(path){return {title:titles[path]||'Page Not Found | NexaFive Global',description:company.overview,notFound:!titles[path]}}
