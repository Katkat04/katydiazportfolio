import Greetings from "../components/ui/Greetings";
import AboutMe from "../components/homepage/AboutMe";
import Projects from "../components/homepage/Projects";
import Clouds from "../components/homepage/CloudsCarousel";

export default function Home() {
  return (
    <>
      <Greetings/>
      <AboutMe/>
      <Clouds/>
      <Projects/>
    </>
  );
}