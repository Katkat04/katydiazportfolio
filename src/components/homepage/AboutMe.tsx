import Image from "next/image";

export default function AboutMe() {
  return (
    <section id="about" className="relative  bg-[#000000]">
      <div className="sticky top-0 h-fit lg:h-[528px] flex flex-col px-8 py-10 items-center lg:flex-row-reverse lg:py-16 z-50 max-w-[1142px] md:mx-auto">
        <div className="hidden md:block flex-1 relative w-[365px] h-[243px] md:w-[530px] md:h-[380px] lg:w-[769px] lg:h-[480px] z-[100]">
          <Image src="/katy.png" alt="Katy Diaz" fill className="object-contain z-[-10]" />
        </div>
        <div className="text-white text-[28px] md:text-[34px] flex-1 md:text-left whitespace-pre-line">
          <div className="flex flex-col justify-end gap-6">
            <span>Hi there!</span>
            <span>I’m Katy Diaz — a Systems Engineer specialized in frontend development. I build modern, responsive interfaces and bring ideas to life through clean, user-focused code.</span>
          </div>
        </div>
      </div>
    </section>
  );
}