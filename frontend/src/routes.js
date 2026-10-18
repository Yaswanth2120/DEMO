import {company,services} from './content.js';
export const routes=['/','/v3','/backup','/boardmembers'];
export const legacyRedirects={
 '/v2':'/',
 '/about':'/#about','/services':'/#pillars','/solutions':'/#solutions','/industries':'/#industries','/research':'/#partners','/contact':'/#contact','/privacy':'/#privacy',
 ...Object.fromEntries(services.map(service=>[`/services/${service.slug}`,`/#${service.slug}`]))
};
const titles={'/':'NexaFive Global — Engineering What’s Next','/v3':'NexaFive Global — Dark Theme Concept','/backup':'NexaFive Global — Innovate Beyond Boundaries','/boardmembers':'Board Members | NexaFive Global'};
export function getPageMeta(path){return {title:titles[path]||'Page Not Found | NexaFive Global',description:company.overview,notFound:!titles[path]}}
