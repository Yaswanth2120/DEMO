import {disciplinePages} from './v2/discipline-content.js';
import {company,services} from './content.js';
export const routes=['/','/about','/expertise','/team','/contact',...disciplinePages.map(page=>'/'+page.slug)];
export const legacyRedirects={
 '/v1':'/','/v2':'/','/v3':'/','/backup':'/',
 '/v1/boardmembers':'/team','/v2/boardmembers':'/team','/v3/boardmembers':'/team','/boardmembers':'/team',
 '/services':'/expertise#pillars','/solutions':'/expertise#solutions','/industries':'/expertise#industries','/collaboration':'/expertise#partners','/privacy':'/#privacy',
 ...Object.fromEntries(services.map(service=>[`/services/${service.slug}`,`/expertise#${service.slug}`]))
};
const titles={'/':'NexaFive Global — Innovate Beyond Boundaries','/about':'About | NexaFive Global','/expertise':'Expertise | NexaFive Global','/team':'Team | NexaFive Global','/contact':'Contact | NexaFive Global',...Object.fromEntries(disciplinePages.map(page=>['/'+page.slug,page.name+' | NexaFive Global']))};
export function getPageMeta(path){return {title:titles[path]||'Page Not Found | NexaFive Global',description:company.overview,notFound:!titles[path]}}
