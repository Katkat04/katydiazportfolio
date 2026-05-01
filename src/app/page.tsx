import Greetings from "../components/ui/Greetings";
import AboutMe from "../components/homepage/AboutMe";
import Projects from "../components/homepage/Projects";
import TechnologicalCarousel from "../components/homepage/TechnologicalCarousel";
import Ending from "../components/ui/Ending";
import HeroAnimation from "../components/ui/HeroAnimation";

export default function Home() {
  return (
    <>
      <HeroAnimation/>
      <Greetings/>
      <AboutMe/>
      <TechnologicalCarousel/>
      <Projects/>
      <Ending/>
    </>
  );
}