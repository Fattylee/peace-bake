"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CALL_TO_ACTION_PHONE_NUMBER } from "../constants";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  homeHref?: string;
  locationHref?: string;
}

export default function Header({
  homeHref = "#",
  locationHref = "#location",
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href={homeHref}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
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
        </Link>
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link
              href={locationHref}
              className="text-amber-800 dark:text-amber-200 hover:text-amber-900 dark:hover:text-amber-400 font-medium transition-colors"
            >
              Location
            </Link>
            <a
              href={`tel:${CALL_TO_ACTION_PHONE_NUMBER}`}
              className="bg-amber-700 dark:bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-800 dark:hover:bg-amber-700 font-medium transition-colors"
            >
              Call Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-amber-800 dark:text-amber-200 hover:text-amber-900 dark:hover:text-amber-400 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800 border-t dark:border-slate-700 transition-colors">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
            <Link
              href={locationHref}
              onClick={() => setMobileMenuOpen(false)}
              className="text-amber-800 dark:text-amber-200 hover:text-amber-900 dark:hover:text-amber-400 font-medium transition-colors py-2"
            >
              Location
            </Link>
            <a
              href={`tel:${CALL_TO_ACTION_PHONE_NUMBER}`}
              onClick={() => setMobileMenuOpen(false)}
              className="bg-amber-700 dark:bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-800 dark:hover:bg-amber-700 font-medium transition-colors w-fit"
            >
              Call Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
