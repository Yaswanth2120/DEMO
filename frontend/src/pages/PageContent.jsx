import {Button,PageHero} from '../components/UI.jsx';
import ContactForm from '../components/ContactForm.jsx';
import {Hero,AboutSection,ServicesSection,SolutionsSection,IndustriesSection,ProcessSection,ResearchSection,ProjectCTA,FAQSection} from '../components/Sections.jsx';
export default function PageContent({path,config}){
 if(path==='/')return <><Hero/><AboutSection/><ServicesSection/><SolutionsSection/><IndustriesSection/><ProcessSection/><ResearchSection verified={config.verified}/><FAQSection/><ProjectCTA/><ContactForm/></>;
 return <><PageHero eyebrow="404" description="The page you requested could not be found.">A different direction.</PageHero><section className="section"><Button href="/">Back to home</Button></section></>;
}
