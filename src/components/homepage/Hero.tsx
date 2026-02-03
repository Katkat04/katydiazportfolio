import Image from "next/image";
import Clouds from "./CloudsCarousel";
export default function Hero() {
  return (
    <section className="relative bg-[#de489e]">
      <div>
        <Clouds/>
      </div>
      <div className="sticky top-0 h-[528px] flex flex-col items-center lg:flex-row-reverse lg:py-16 z-50 max-w-[1142px] mx-auto">
        <div className="flex-1 relative h-[400px] z-[100]">
          <Image src="/yo.png" alt="yo" fill className="object-contain z-50" />
        </div>
        <div className="text-white text-[20px] flex-1 text-left whitespace-pre-line">
          <div className="flex flex-col gap-2">
            <span>Hi there!</span>
            <span>I’m Katy Diaz — a frontend developer who builds modern, responsive interfaces and brings ideas to life through code.</span>
          </div>
        </div>
      </div>
    </section>
  );
}