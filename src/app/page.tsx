import Greetings from "../components/ui/Greetings";
import AboutMe from "../components/homepage/AboutMe";
import Projects from "../components/homepage/Projects";
import TechnologicalCarousel from "../components/homepage/TechnologicalCarousel";
import Ending from "../components/ui/Ending";
import Preloader from "../components/ui/Preloader";

export default function Home() {
  return (
    <>
      <Preloader/>
      <Greetings/>
      <AboutMe/>
      <TechnologicalCarousel/>
      <Projects/>
      <Ending/>
    </>
  );
}