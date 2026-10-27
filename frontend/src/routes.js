import {disciplinePages} from './v2/discipline-content.js';
import {company,services} from './content.js';
export const routes=['/','/boardmembers',...disciplinePages.map(page=>'/'+page.slug)];
export const legacyRedirects={
 '/v1':'/','/v2':'/','/v3':'/','/backup':'/',
 '/v1/boardmembers':'/boardmembers','/v2/boardmembers':'/boardmembers','/v3/boardmembers':'/boardmembers',
 '/about':'/#about','/services':'/#pillars','/solutions':'/#solutions','/industries':'/#industries','/collaboration':'/#partners','/contact':'/#contact','/privacy':'/#privacy',
 ...Object.fromEntries(services.map(service=>[`/services/${service.slug}`,`/#${service.slug}`]))
};
const titles={'/':'NexaFive Global — Innovate Beyond Boundaries','/boardmembers':'Our Board | NexaFive Global',...Object.fromEntries(disciplinePages.map(page=>['/'+page.slug,page.name+' | NexaFive Global']))};
export function getPageMeta(path){return {title:titles[path]||'Page Not Found | NexaFive Global',description:company.overview,notFound:!titles[path]}}
