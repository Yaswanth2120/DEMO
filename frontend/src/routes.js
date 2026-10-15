import {company,services} from './content.js';
export const routes=['/'];
export const legacyRedirects={
 '/about':'/#about','/services':'/#pillars','/solutions':'/#solutions','/industries':'/#industries','/research':'/#partners','/contact':'/#contact','/privacy':'/#privacy',
 ...Object.fromEntries(services.map(service=>[`/services/${service.slug}`,`/#${service.slug}`]))
};
// The alternate designs are directly accessible, but stays out of the main sitemap.
const titles={'/':'NexaFive Global — Innovate Beyond Boundaries','/v2':'NexaFive Global — Engineering What’s Next','/v3':'NexaFive Global — A Journey Beyond Boundaries'};
export function getPageMeta(path){return {title:titles[path]||'Page Not Found | NexaFive Global',description:company.overview,notFound:!titles[path]}}
