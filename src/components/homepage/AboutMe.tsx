import Image from "next/image";
import Clouds from "./CloudsCarousel";
import Link from "next/link";

export default function AboutMe() {
  return (
    <section className="relative bg-[#de489e]">
      <div>
        <Clouds/>
      </div>
      <div className="sticky top-0 h-screen md:h-[528px] flex flex-col px-8 py-10 items-center lg:flex-row-reverse lg:py-16 z-50 max-w-[1142px] md:mx-auto">
        <div className="flex-1 relative w-[365px] h-[243px]  lg:w-[789px] lg:h-[500px] z-[100]">
          <Image src="/yo.png" alt="yo" fill className="object-contain z-50" />
        </div>
        <div className="text-white text-[28px] md:text-[36px] flex-1 md:text-left whitespace-pre-line">
          <div className="flex flex-col justify-end gap-2">
            <span>Hi there!</span>
            <span>I’m Katy Diaz — a frontend developer who builds modern, responsive interfaces and brings ideas to life through code.</span>
          </div>
          <Link href="/about" className="pixel-btn inline-block px-6 py-3 text-white font-bold uppercase">
            more about me
          </Link>
        </div>
      </div>
    </section>
  );
}