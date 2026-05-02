"use client"
import Image from "next/image"
import Link from "next/link"

const ROWSMOBILE = [
  { count: 6, offset: false },
]
const ROWS = [
  { count: 4, offset: false },
  { count: 3, offset: true  },
  { count: 4, offset: false },
  { count: 3, offset: true  },
]

function DollGrid({ side }: { side: "left" | "right" }) {
  const src = side === "left" ? "/cumbia1.png" : "/cumbia2.png"
  const animClass = side === "left" ? "animate-doll-left" : "animate-doll-right"

  return (
    <>
        <div className="md:hidden flex flex-col gap-2">
            {ROWSMOBILE.map((row, ri) => (
                <div
                key={ri}
                className="flex gap-1.5"
                style={{
                    flexDirection: side === "left" ? "row-reverse" : "row",
                    ...(side === "left"  && row.offset ? { marginRight: "30px" } : {}),
                    ...(side === "right" && row.offset ? { marginLeft:  "30px" } : {}),
                }}
                >
                {Array.from({ length: row.count }).map((_, i) => (
                    <Image
                    key={i}
                    src={src}
                    alt="Cumbia"
                    width={64}
                    height={64}
                    className={`shrink-0 ${animClass}`}
                    />
                ))}
                </div>
            ))}
        </div>
        <div className="hidden md:flex flex-col gap-2">
        {ROWS.map((row, ri) => (
            <div
            key={ri}
            className="flex gap-1.5"
            style={{
                flexDirection: side === "left" ? "row-reverse" : "row",
                ...(side === "left"  && row.offset ? { marginRight: "30px" } : {}),
                ...(side === "right" && row.offset ? { marginLeft:  "30px" } : {}),
            }}
            >
            {Array.from({ length: row.count }).map((_, i) => (
                <Image
                key={i}
                src={src}
                alt="Cumbia"
                width={64}
                height={64}
                className={`shrink-0 ${animClass}`}
                />
            ))}
            </div>
        ))}
    </div>
    </>
  )
}

export default function Ending() {
  return (
    <section id="contact" className="w-full relative flex flex-col md:flex-row items-center justify-center bg-[#e4b779] text-black overflow-hidden min-h-[340px]">

      <div className="flex-1 flex justify-start overflow-hidden max-w-[340px]">
        <DollGrid side="left" />
      </div>

        <div className="shrink-0 flex flex-col items-center text-center px-10 py-12 z-10">
            <p className="font-bold leading-snug" style={{ fontSize: "clamp(30px, 4vw, 48px)" }}>
            ¡Let's work<br />together!
            </p>
            <p className="mb-4">connect with me</p>
            <div className="flex flex-row gap-2">
              <a href="mailto:diazkaty0409@gmail.com?subject=Hey, trabajemos juntos!" target="_blank" rel="noopener noreferrer">
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="inner-gmail">
                      <rect x="3.04" y="3.04" width="25.92" height="25.92"/>
                    </clipPath>
                  </defs>
                  <rect x="1.52" y="1.52" width="28.96" height="28.96" fill="#ffffff"/>
                  <g clipPath="url(#inner-gmail)">
                    <rect x="3.04" y="3.04" width="25.92" height="25.92" fill="#ffffff"/>
                    <path d="M5.5 10.5v11c0 .55.45 1 1 1h19c.55 0 1-.45 1-1v-11" fill="none"/>
                    <path d="M5.5 10.5v11c0 .55.45 1 1 1h4.5V15l5 4 5-4v7.5H25.5c.55 0 1-.45 1-1v-11" fill="#ffffff" stroke="none"/>
                    <path d="M5.5 21.5c0 .55.45 1 1 1h19c.55 0 1-.45 1-1v-11L16 17.5 5.5 10.5v11z" fill="#ffffff"/>
                    <path d="M5.5 10.5L11 15.2V22.5H6.5c-.55 0-1-.45-1-1V10.5z" fill="#C5221F"/>
                    <path d="M26.5 10.5L21 15.2V22.5h4.5c.55 0 1-.45 1-1V10.5z" fill="#C5221F"/>
                    <path d="M5.5 10.5L16 18.5l10.5-8H5.5z" fill="#EA4335"/>
                    <path d="M5.5 10.5L11 15.2 16 11.5l5 3.7 5.5-4.7" fill="none" stroke="#ffffff" strokeWidth="0.3"/>
                    <path d="M5.5 10.2L16 18l10.5-7.8-4.5 3.8L16 11l-6 3z" fill="#EA4335"/>
                    <path d="M11 15.2L16 19l5-3.8v7.3H11v-7.3z" fill="#ffffff"/>
                  </g>
                </svg>
              </a>
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
              <Link href="https://wa.me/573233774120" target="_blank">
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="inner-wa">
                      <rect x="3.04" y="3.04" width="25.92" height="25.92"/>
                    </clipPath>
                  </defs>
                  <rect x="1.52" y="1.52" width="28.96" height="28.96" fill="#ffffff"/>
                  <g clipPath="url(#inner-wa)">
                    <rect x="3.04" y="3.04" width="25.92" height="25.92" fill="#25D366"/>
                    <path fill="#ffffff" d="M16 7.5C11.31 7.5 7.5 11.31 7.5 16c0 1.49.41 2.88 1.12 4.08L7.5 24.5l4.52-1.1A8.46 8.46 0 0016 24.5c4.69 0 8.5-3.81 8.5-8.5S20.69 7.5 16 7.5zm4.9 11.72c-.2.56-1.18 1.08-1.63 1.14-.41.06-.93.08-1.5-.09-.35-.1-.79-.24-1.37-.48-2.4-1.04-3.97-3.46-4.09-3.62-.12-.16-.97-1.29-.97-2.46 0-1.17.61-1.74.83-1.98.22-.24.48-.3.64-.3.16 0 .32 0 .46.01.15.01.35-.06.55.42.2.49.68 1.67.74 1.79.06.12.1.27.02.43-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.14.24.62.99 1.33 1.6.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.56-.14 1.11z"/>
                  </g>
                </svg>
              </Link>
            </div>
        </div>

      <div className="flex-1 flex justify-end overflow-hidden max-w-[340px]">
        <DollGrid side="right" />
      </div>

    </section>
  )
}