import Icon from './Icons.jsx';
export function Button({children,href='#contact',secondary=false}){return <a className={`button${secondary?' secondary':''}`} href={href}>{children}<Icon name="arrow"/></a>}
export function Eyebrow({children}){return <p className="eyebrow"><span/>{children}</p>}
export function SectionHeading({eyebrow,children,description}){return <div className="section-heading"><Eyebrow>{eyebrow}</Eyebrow><h2>{children}</h2>{description&&<p>{description}</p>}</div>}
export function PageHero({eyebrow,children,description}){return <section className="page-hero"><div className="container"><Eyebrow>{eyebrow}</Eyebrow><h1>{children}</h1><p>{description}</p></div></section>}
export function Logo({footer=false}){return <a className={`logo${footer?' footer-logo':''}`} href="#hero" aria-label="NexaFive Global home"><img src="/assets/nexafive-logo.png" alt="NexaFive Global — Innovate Beyond Boundaries" width="163" height="45"/></a>}
