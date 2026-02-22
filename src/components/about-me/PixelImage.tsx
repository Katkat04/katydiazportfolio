'use client'
import React, { useEffect, useRef, useState } from "react";

interface PixelImageProps {
  src: string;
  size?: number;
}

export default function PixelImage({ src, size = 120 }: PixelImageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function drawImage(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
      if (!imgRef.current) return;

      const original = imgRef.current;

      canvas.width = size;
      canvas.height = size;

      ctx.clearRect(0, 0, size, size);

      if (hovered) {
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(original, 0, 0, size, size);
      } else {
        const pixelSize = 12;

        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) return;

        const scaledWidth = Math.ceil(size / pixelSize);
        const scaledHeight = Math.ceil(size / pixelSize);

        tempCanvas.width = scaledWidth;
        tempCanvas.height = scaledHeight;

        tempCtx.drawImage(original, 0, 0, scaledWidth, scaledHeight);

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tempCanvas, 0, 0, scaledWidth, scaledHeight, 0, 0, size, size);
      }
    }

    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      imgRef.current = img;
      drawImage(canvas, ctx);
    };

    drawImage(canvas, ctx);
  }, [src, hovered, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-xl cursor-pointer transition-transform duration-300"
    />
  );
}