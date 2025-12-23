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
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);
  const isTouching = useRef(false);
  const liveRef = useRef<HTMLDivElement | null>(null);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "Home") {
      e.preventDefault();
      setIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setIndex(images.length - 1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isTouching.current = true;
    hoverRef.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isTouching.current || touchStartX.current == null) return;
    const curX = e.touches[0].clientX;
    touchDeltaX.current = curX - touchStartX.current;
  };

  const onTouchEnd = () => {
    isTouching.current = false;
    hoverRef.current = false;
    const delta = touchDeltaX.current;
    const threshold = 50; // px
    if (Math.abs(delta) > threshold) {
      if (delta > 0) prev();
      else next();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Bakery images carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={liveRef}
      className="relative rounded-2xl overflow-hidden shadow-xl h-56 md:h-72"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
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

      <div className="sr-only" aria-live="polite">
        {`${index + 1} of ${images.length}: ${images[index]?.alt ?? "image"}`}
      </div>

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
