"use client";
import React, { useEffect, useState } from "react";
import PixelImage from "./PixelImage";

const images = [
  "/pimage.png",
  "/pimage.png",
  "/pimage.png",
  "/pimage.png",
  "/pimage.png",
  "/pimage.png",
];

export default function ImagesAside() {
  const radius = 150;
  const total = images.length - 1;

  const [mounted, setMounted] = useState(false);
  const [positions, setPositions] = useState<
    { x: number; y: number; rotation: number }[]
  >([]);

  useEffect(() => {
    const newPositions = images.slice(0, total).map((_, index) => {
      const baseAngle = (index / total) * 2 * Math.PI;
      const randomOffset = (Math.random() - 0.5) * 0.6;
      const angle = baseAngle + randomOffset;

      const randomRadius = radius + (Math.random() - 0.5) * 40;

      const x = randomRadius * Math.cos(angle);
      const y = randomRadius * Math.sin(angle);

      const rotation = (Math.random() - 0.5) * 40;

      return { x, y, rotation };
    });

    setPositions(newPositions);

    // pequeña espera para que el browser pinte primero
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center overflow-visible">
      {positions.map(({ x, y, rotation }, index) => (
        <div
          key={index}
          className="
            absolute
            transition-all
            duration-700
            ease-[cubic-bezier(.34,1.56,.64,1)]
          "
          style={{
            transform: mounted
              ? `translate(${x}px, ${y}px) rotate(${rotation}deg)`
              : `translate(0px, -200px) rotate(${rotation * 2}deg) scale(1.5)`,
            opacity: mounted ? 1 : 0,
            transitionDelay: `${index * 120}ms`,
            zIndex: index,
          }}
        >
          <PixelImage src={images[index]} size={120} />
        </div>
      ))}

      {/* Centro entra último */}
      {positions.length > 0 && (
        <div
          className="absolute transition-all duration-700 ease-out"
          style={{
            transform: mounted
              ? "scale(1)"
              : "translateY(-300px) scale(0.4)",
            opacity: mounted ? 1 : 0,
            transitionDelay: `${positions.length * 120}ms`,
            zIndex: 50,
          }}
        >
          <PixelImage src={images[images.length - 1]} size={160} />
        </div>
      )}
    </div>
  );
}
