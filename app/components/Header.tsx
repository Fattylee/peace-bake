"use client";

import { CALL_TO_ACTION_PHONE_NUMBER } from "../constants";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="Peace Bake Bakery Logo"
            className="w-16 h-16"
          />
          <div>
            <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-400">
              Peace Bake
            </h1>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              Freshly Baked Daily
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 items-center">
            <a
              href="#"
              className="text-amber-800 dark:text-amber-200 hover:text-amber-900 dark:hover:text-amber-400 font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#location"
              className="text-amber-800 dark:text-amber-200 hover:text-amber-900 dark:hover:text-amber-400 font-medium transition-colors"
            >
              Location
            </a>
            <a
              href={`tel:${CALL_TO_ACTION_PHONE_NUMBER}`}
              className="bg-amber-700 dark:bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-800 dark:hover:bg-amber-700 font-medium transition-colors"
            >
              Call Now
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
