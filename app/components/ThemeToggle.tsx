"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ThemeToggleClient = dynamic(() => import("./ThemeToggleClient"), {
  ssr: false,
});

export function ThemeToggle() {
  return (
    <Suspense fallback={<div className="p-2 w-9 h-9" />}>
      <ThemeToggleClient />
    </Suspense>
  );
}
