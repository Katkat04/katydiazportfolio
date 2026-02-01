"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const clouds = [
  {
    id: 1,
    imagen: {
      url: "/cloud4.png",
      alternativeText: "nube",
    },
    width: 175,
    height: 98,
  },
  {
    id: 2,
    imagen: {
      url: "/cloud8.png",
      alternativeText: "nube",
    },
    width: 288,
    height: 188,
  },
  {
    id: 3,
    imagen: {
      url: "/cloud7.png",
      alternativeText: "nube",
    },
    width: 249,
    height: 150,
  },
  {
    id: 4,
    imagen: {
      url: "/cloud1.png",
      alternativeText: "nube",
    },
    width: 267,
    height: 181,
  },
];

const duplicatedBrands = [ ...clouds, ...clouds, ...clouds, ...clouds, ...clouds, ...clouds, ...clouds, ...clouds];

export default function Clouds() {
  const [translateX, setTranslateX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const [isMobile, setIsMobile] = useState(false);

  const spacing = isMobile ? 40 : 120;
  const itemWidth = isMobile ? 80 : 120;
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
    <section className="flex flex-col items-center gap-8 md:pt-10">
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
                      className="object-contain"
                  />
                  </div>
              </div>
            ))}

        </div>
      </div>
    </section>
  );
}