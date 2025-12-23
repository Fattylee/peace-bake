"use client";

import { useEffect, useRef, useState } from "react";

type ImageItem = { src: string; alt?: string };

type Props = {
  images: ImageItem[];
  interval?: number;
};

export default function ImageCarousel({ images, interval = 4000 }: Props) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const start = () => {
      timerRef.current = window.setInterval(() => {
        if (!hoverRef.current) setIndex((i) => (i + 1) % images.length);
      }, interval);
    };
    start();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [images.length, interval]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  if (!images || images.length === 0) return null;

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-xl h-56 md:h-72"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt ?? `slide-${i}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
        <button
          onClick={prev}
          aria-label="Previous"
          className="pointer-events-auto bg-white/80 hover:bg-white text-amber-800 p-2 rounded-full shadow-md"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="pointer-events-auto bg-white/80 hover:bg-white text-amber-800 p-2 rounded-full shadow-md"
        >
          ›
        </button>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-current={i === index}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-amber-700" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
