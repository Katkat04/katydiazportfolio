import Greetings from "../components/ui/Greetings";
import AboutMe from "../components/homepage/AboutMe";
import Projects from "../components/homepage/Projects";
import TechnologicalCarousel from "../components/homepage/TechnologicalCarousel";
import Ending from "../components/ui/Ending";

export default function Home() {
  return (
    <>
      <Greetings/>
      <AboutMe/>
      <TechnologicalCarousel/>
      <Projects/>
      <Ending/>
    </>
  );
}