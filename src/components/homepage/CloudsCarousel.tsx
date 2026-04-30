"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const clouds = [
    {
    id: 7,
    imagen: {
      url: "/logospixelados/next.webp",
      alternativeText: "nube",
    },
    width: 175,
    height: 98,
    imageClassName: "invert",
  },
  {
    id: 1,
    imagen: {
      url: "/logospixelados/astro.png",
      alternativeText: "nube",
    },
    width: 175,
    height: 98,
  },
  {
    id: 2,
    imagen: {
      url: "/logospixelados/css.webp",
      alternativeText: "nube",
    },
    width: 175,
    height: 98,
  },
  {
    id: 3,
    imagen: {
      url: "/logospixelados/gsap.webp",
      alternativeText: "nube",
    },
    width: 175,
    height: 98,
  },
  {
    id: 4,
    imagen: {
      url: "/logospixelados/html.png",
      alternativeText: "nube",
    },
    width: 175,
    height: 98,
  },
  {
    id: 5,
    imagen: {
      url: "/logospixelados/javascript.png",
      alternativeText: "nube",
    },
    width: 175,
    height: 98,
  },
  {
    id: 6,
    imagen: {
      url: "/logospixelados/mui.png",
      alternativeText: "nube",
    },
    width: 175,
    height: 98,
  },
  {
    id: 8,
    imagen: {
      url: "/logospixelados/nodejs.webp",
      alternativeText: "nube",
    },
    width: 175,
    height: 98,
  },
  {
    id: 9,
    imagen: {
      url: "/logospixelados/react.png",
      alternativeText: "nube",
    },
    width: 175,
    height: 98,
  },
  {
    id: 10,
    imagen: {
      url: "/logospixelados/tailwind.png",
      alternativeText: "nube",
    },
    width: 175,
    height: 98,
  },
  {
    id: 11,
    imagen: {
      url: "/logospixelados/typescript.png",
      alternativeText: "nube",
    },
    width: 175,
    height: 98,
  },
];

const duplicatedBrands = [ ...clouds, ...clouds, ...clouds, ...clouds, ...clouds, ...clouds, ...clouds, ...clouds];

export default function Clouds() {
  const [translateX, setTranslateX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const [isMobile, setIsMobile] = useState(false);

  const spacing = isMobile ? 20 : 60;
  const itemWidth = isMobile ? 40 : 60;
  const totalItemWidth = itemWidth + spacing;
  const totalWidth = duplicatedBrands.length * totalItemWidth;

  const speed = isMobile ? 15 : 25;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);


  useEffect(() => {
    const animate = () => {
      const now = performance.now();

      if (!isPaused) {
        const deltaTime = now - lastTimeRef.current;

        setTranslateX(prev => {
          const next = prev - (speed * deltaTime) / 1000;

          if (Math.abs(next) >= totalWidth / 3) {
            return 0;
          }
          return next;
        });
      }

      lastTimeRef.current = now;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, totalWidth]);

  return (
    <section className="flex flex-col bg-[#000000] items-center gap-4 md:pt-10">
      <div>
        <h3 className="text-white">Technological stack</h3>
      </div>
      <div className="w-full overflow-hidden"
        onMouseLeave={() => {
          setIsPaused(false);
          lastTimeRef.current = performance.now();
        }}
      >
        <div className="flex" style={{ transform: `translateX(${translateX}px)`, width: totalWidth, gap: spacing,}}>
            {duplicatedBrands.map((cloud, idx) => (
              <div key={`${cloud.id}-${idx}`} className="flex-shrink-0 flex  justify-center" style={{ width: cloud.width }}>
                  <div className="relative" style={{width: cloud.width, height: cloud.height,}}>
                  <Image
                      src={cloud.imagen.url}
                      alt={cloud.imagen.alternativeText}
                      fill
                      className={`object-contain ${"imageClassName" in cloud ? cloud.imageClassName : ""}`}
                  />
                  </div>
              </div>
            ))}

        </div>
      </div>
    </section>
  );
}