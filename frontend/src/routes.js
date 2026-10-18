import {company,services} from './content.js';
export const routes=['/','/v2','/v3','/backup','/boardmembers','/v2/boardmembers','/v3/boardmembers'];
export const legacyRedirects={
 '/about':'/#about','/services':'/#pillars','/solutions':'/#solutions','/industries':'/#industries','/research':'/#partners','/contact':'/#contact','/privacy':'/#privacy',
 ...Object.fromEntries(services.map(service=>[`/services/${service.slug}`,`/#${service.slug}`]))
};
const titles={'/':'NexaFive Global — Engineering What’s Next','/v2':'NexaFive Global — Dark Edition','/v3':'NexaFive Global — Light, Dark & Device Theme','/v2/boardmembers':'Board Members | NexaFive Global — Dark Edition','/v3/boardmembers':'Board Members | NexaFive Global — Light, Dark & Device Theme','/backup':'NexaFive Global — Innovate Beyond Boundaries','/boardmembers':'Board Members | NexaFive Global'};
export function getPageMeta(path){return {title:titles[path]||'Page Not Found | NexaFive Global',description:company.overview,notFound:!titles[path]}}
