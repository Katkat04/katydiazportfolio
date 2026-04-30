import Image from "next/image";
import Link from "next/link";

export default function AboutMe() {
  return (
    <section className="relative  bg-gradient-to-b from-[#e4b779] via-[#7A6141] to-[#000000] ">
      <div className="sticky top-0 h-fit lg:h-[528px] flex flex-col px-8 pb-10 items-center lg:flex-row-reverse lg:py-16 z-50 max-w-[1142px] md:mx-auto">
        <div className="hidden md:block flex-1 relative w-[365px] h-[243px] md:w-[530px] md:h-[380px] lg:w-[769px] lg:h-[480px] z-[100]">
          <Image src="/katy.png" alt="Katy Diaz" fill className="object-contain z-[-10]" />
        </div>
        <div className="text-white text-[28px] md:text-[36px] flex-1 md:text-left whitespace-pre-line">
          <div className="flex flex-col justify-end gap-6">
            <span>Hi there!</span>
            <span>I’m Katy Diaz — a frontend developer who builds modern, responsive interfaces and brings ideas to life through code.</span>
            <div className="flex flex-row gap-2">
              <Link href="https://www.linkedin.com/in/kdiaz11/" target="_blank">
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="inner">
                      <rect x="3.04" y="3.04" width="25.92" height="25.92"/>
                    </clipPath>
                  </defs>
                  <rect x="1.52" y="1.52" width="28.96" height="28.96" fill="#ffffff"/>
                  <g clipPath="url(#inner)">
                    <rect x="3.04" y="3.04" width="25.92" height="25.92" fill="#0072b1"/>
                    <g fill="#ffffff">
                      <path d="M22.85 15.24H21.33V13.71H18.28V15.24H16.76V13.71H13.71V22.86H16.76V18.29H18.28V16.76H19.81V18.29H21.33V22.86H24.38V16.76H22.85V15.24Z"/>
                      <path d="M10.66 13.71H7.60999V22.86H10.66V13.71Z"/>
                      <path d="M10.66 9.14001H7.60999V12.19H10.66V9.14001Z"/>
                    </g>
                  </g>
                </svg>
              </Link>
              <Link href="https://github.com/Katkat04" target="_blank">
                <Image src="/github_icon_clean.svg" alt="GitHub" width={32} height={32} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}