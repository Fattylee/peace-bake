"use client";

import { useEffect, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  TouchEvent as ReactTouchEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";

type ImageItem = { src: string; alt?: string };

type Props = {
  images: ImageItem[];
  interval?: number;
};

export default function ImageCarousel({ images, interval = 4000 }: Props) {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
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

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
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

  const onTouchStart = (e: ReactTouchEvent) => {
    isTouching.current = true;
    hoverRef.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setDragOffset(0);
  };

  const onTouchMove = (e: ReactTouchEvent) => {
    if (!isTouching.current || touchStartX.current == null) return;
    const curX = e.touches[0].clientX;
    touchDeltaX.current = curX - touchStartX.current;
    setDragOffset(touchDeltaX.current);
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
    setDragOffset(0);
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    isTouching.current = true;
    hoverRef.current = true;
    touchStartX.current = e.clientX;
    touchDeltaX.current = 0;
    setDragOffset(0);
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!isTouching.current || touchStartX.current == null) return;
    const curX = e.clientX;
    touchDeltaX.current = curX - touchStartX.current;
    setDragOffset(touchDeltaX.current);
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    try {
      (e.target as Element).releasePointerCapture?.(e.pointerId);
    } catch {}
    isTouching.current = false;
    hoverRef.current = false;
    const delta = touchDeltaX.current;
    const threshold = 50;
    if (Math.abs(delta) > threshold) {
      if (delta > 0) prev();
      else next();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setDragOffset(0);
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
      className="relative rounded-2xl overflow-hidden shadow-xl h-72 md:h-96 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 ${
            i === index ? "opacity-100" : "opacity-0"
          } transition-opacity ${
            dragOffset === 0 ? "duration-700" : "duration-0"
          }`}
        >
          <div className="relative h-full w-full">
            <Image
              src={img.src}
              alt={img.alt ?? `slide-${i}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={
                i === index
                  ? { transform: `translateX(${dragOffset}px)` }
                  : undefined
              }
              priority={i === 0}
            />
          </div>
        </div>
      ))}

      <div className="sr-only" aria-live="polite">
        {`Slide ${index + 1} of ${images.length} — ${
          images[index]?.alt ?? "image"
        }`}
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="pointer-events-auto bg-white/80 hover:bg-white text-amber-800 p-2 rounded-full shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="pointer-events-auto bg-white/80 hover:bg-white text-amber-800 p-2 rounded-full shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          ›
        </button>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-current={i === index}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-amber-700" : "bg-white/60"
            } focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500`}
          />
        ))}
      </div>
    </div>
  );
}
