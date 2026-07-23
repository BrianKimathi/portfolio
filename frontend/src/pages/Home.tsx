import Hero from "../components/Hero";
import Projects from "../components/Projects";
import ExperiencePreview from "../components/ExperiencePreview";
import Skills from "../components/Skills";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <ExperiencePreview />
      <Contact />
    </>
  );
}
