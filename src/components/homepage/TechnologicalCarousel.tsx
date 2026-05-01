"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const logos = [
  { id: 7,  imagen: { url: "/logospixelados/next.webp",       alternativeText: "nube" }, imageClassName: "invert" },
  { id: 1,  imagen: { url: "/logospixelados/astro.png",       alternativeText: "nube" } },
  { id: 2,  imagen: { url: "/logospixelados/css.webp",        alternativeText: "nube" } },
  { id: 3,  imagen: { url: "/logospixelados/gsap.webp",       alternativeText: "nube" } },
  { id: 4,  imagen: { url: "/logospixelados/html.png",        alternativeText: "nube" } },
  { id: 5,  imagen: { url: "/logospixelados/javascript.png",  alternativeText: "nube" } },
  { id: 6,  imagen: { url: "/logospixelados/mui.png",         alternativeText: "nube" } },
  { id: 8,  imagen: { url: "/logospixelados/nodejs.webp",     alternativeText: "nube" } },
  { id: 9,  imagen: { url: "/logospixelados/react.png",       alternativeText: "nube" } },
  { id: 10, imagen: { url: "/logospixelados/tailwind.png",    alternativeText: "nube" } },
  { id: 11, imagen: { url: "/logospixelados/typescript.png",  alternativeText: "nube" } },
];

const duplicatedBrands = [
  ...logos, ...logos, ...logos, ...logos,
  ...logos, ...logos, ...logos, ...logos,
];

export default function TechnologicalCarousel() {
  const [translateX, setTranslateX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Tamaños responsivos
  const imgWidth = isMobile ? 120 : 175;
  const imgHeight = isMobile ? 67 : 98;
  const spacing = isMobile ? 24 : 60;
  const totalItemWidth = imgWidth + spacing;
  const totalWidth = duplicatedBrands.length * totalItemWidth;
const speed = isMobile ? 30 : 50;

  // Refs para que el useEffect de animación no dependa de estos valores
  const speedRef = useRef(speed);
  const totalWidthRef = useRef(totalWidth);
  const pausedRef = useRef(isPaused);

  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { totalWidthRef.current = totalWidth; }, [totalWidth]);
  useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);

  // Detectar mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const animate = () => {
      const now = performance.now();

      if (!pausedRef.current) {
        const deltaTime = now - lastTimeRef.current;

        setTranslateX((prev) => {
          const next = prev - (speedRef.current * deltaTime) / 1000;
          if (Math.abs(next) >= totalWidthRef.current / 3) return 0;
          return next;
        });
      }

      lastTimeRef.current = now;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section className="flex flex-col bg-[#000000] items-center gap-4 md:gap-12 md:pt-14">
      <div className="flex justify-center">
        <h3 className=" text-[28px] md:text-[40px] text-[#ffd509]">Technological stack</h3>
      </div>
      <div
        className="w-full overflow-hidden"
        onMouseLeave={() => {
          setIsPaused(false);
          lastTimeRef.current = performance.now();
        }}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(${translateX}px)`,
            width: totalWidth,
            gap: spacing,
          }}
        >
          {duplicatedBrands.map((cloud, idx) => (
            <div
              key={`${cloud.id}-${idx}`}
              className="flex-shrink-0 flex justify-center"
              style={{ width: imgWidth }}
            >
              <div
                className="relative"
                style={{ width: imgWidth, height: imgHeight }}
              >
                <Image
                  src={cloud.imagen.url}
                  alt={cloud.imagen.alternativeText}
                  fill
                  sizes={`${imgWidth}px`}
                  className={`object-contain ${
                    "imageClassName" in cloud ? cloud.imageClassName : ""
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}