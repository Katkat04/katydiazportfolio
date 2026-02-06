import Greetings from "../components/ui/Greetings";
import AboutMe from "../components/homepage/AboutMe";
import Projects from "../components/homepage/Projects";

export default function Home() {
  return (
    <>
      <AboutMe/>
      <Greetings/>
      <Projects/>
    </>
  );
}