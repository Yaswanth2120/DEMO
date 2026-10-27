import {company,services} from './content.js';
export const routes=['/v1','/v2','/v1/boardmembers','/v2/boardmembers'];
export const legacyRedirects={
 '/':'/v1','/v3':'/v2','/v3/boardmembers':'/v2/boardmembers','/boardmembers':'/v1/boardmembers','/backup':'/v1',
 '/about':'/v1#about','/services':'/v1#pillars','/solutions':'/v1#solutions','/industries':'/v1#industries','/research':'/v1#partners','/contact':'/v1#contact','/privacy':'/v1#privacy',
 ...Object.fromEntries(services.map(service=>[`/services/${service.slug}`,`/v1#${service.slug}`]))
};
const titles={'/v1':'NexaFive Global — Light Edition','/v2':'NexaFive Global — Light, Dark & Device Theme','/v1/boardmembers':'Our Board | NexaFive Global — Light Edition','/v2/boardmembers':'Our Board | NexaFive Global — Light, Dark & Device Theme'};
export function getPageMeta(path){return {title:titles[path]||'Page Not Found | NexaFive Global',description:company.overview,notFound:!titles[path]}}
