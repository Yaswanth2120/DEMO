import Glyph from './Glyph.jsx';
import {AboutOrbit} from './Dev3AboutFeatures.jsx';
import {AboutStory,AboutZoom} from './AboutLower.jsx';
import {PageContact} from './SitePages.jsx';
export function AboutPage(){
 return <div className="dev3-about">
  <section id="hero" className="n5-page-intro n5-about-intro n5-contained-intro" aria-labelledby="about-title"><div className="n5-wrap n5-about-hero" id="about"><div className="n5-about-hero-copy"><p className="n5-eyebrow">About NexaFive</p><h1 id="about-title">Five disciplines.<br/><span>One connected perspective.</span></h1><div className="n5-about-intro-copy"><p>We are an engineering and technology consultancy connecting advanced materials science, research, and manufacturing innovation—from concept through production.</p><p>Based in Minneapolis, Minnesota, we bring material behavior, component design, diagnostics, and production requirements together to help teams in mobility and industry turn complex engineering questions into practical next steps.</p><a className="n5-link" href="/contact">Talk with our team<Glyph name="arrow"/></a></div></div><AboutOrbit/></div></section>
  <AboutStory/>
  <AboutZoom/>
  <PageContact eyebrow="Work with NexaFive" title="Bring the challenge. Let’s find the way forward."/>
 </div>;
}

