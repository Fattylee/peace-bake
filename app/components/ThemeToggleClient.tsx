"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../providers";

export default function ThemeToggleClient() {
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 hover:bg-amber-200 dark:hover:bg-amber-800 transition"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
