import {disciplinePages} from './v2/discipline-content.js';
import {company,services,leadershipMembers,boardMembers,memberSlug} from './content.js';
export const routes=['/','/about','/services','/industries','/collaboration','/team','/contact',...disciplinePages.map(page=>'/'+page.slug),...[...leadershipMembers,...boardMembers].map(member=>'/team/'+memberSlug(member))];
export const legacyRedirects={
 '/v1':'/','/v2':'/','/v3':'/','/backup':'/',
 '/v1/boardmembers':'/team','/v2/boardmembers':'/team','/v3/boardmembers':'/team','/boardmembers':'/team',
 '/expertise':'/services','/solutions':'/services','/privacy':'/#privacy',
 ...Object.fromEntries(services.map(service=>[`/services/${service.slug}`,`/services#${service.slug}`]))
};
const titles={'/':'NexaFive Global — Innovate Beyond Boundaries','/about':'About | NexaFive Global','/services':'Services | NexaFive Global','/industries':'Industries | NexaFive Global','/collaboration':'Collaboration | NexaFive Global','/team':'Team | NexaFive Global','/contact':'Contact | NexaFive Global',...Object.fromEntries(disciplinePages.map(page=>['/'+page.slug,page.name+' | NexaFive Global']))};
export function getPageMeta(path){const member=[...leadershipMembers,...boardMembers].find(person=>path==='/team/'+memberSlug(person));return {title:member?`${member.name} | NexaFive Global`:titles[path]||'Page Not Found | NexaFive Global',description:member?.bio||company.overview,notFound:!titles[path]&&!member}}
