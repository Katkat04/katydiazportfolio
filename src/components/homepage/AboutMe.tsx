import Image from "next/image";
import Clouds from "./CloudsCarousel";
import Link from "next/link";

export default function AboutMe() {
  return (
    <section className="relative bg-[#8fedff]">
      <div>
        <Clouds/>
      </div>
      <div className="sticky top-0 h-screen lg:h-[528px] flex flex-col px-8 pb-10 items-center lg:flex-row-reverse lg:pb-16 z-50 max-w-[1142px] md:mx-auto">
        <div className="flex-1 relative w-[365px] h-[243px] md:w-[530px] md:h-[380px] lg:w-[769px] lg:h-[480px] z-[100]">
          <Image src="/katy.png" alt="Katy Diaz" fill className="object-contain z-50" />
        </div>
        <div className="text-white text-[28px] md:text-[36px] flex-1 md:text-left whitespace-pre-line">
          <div className="flex flex-col justify-end gap-6">
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