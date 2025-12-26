"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../providers";

export default function ThemeToggleClient() {
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    console.log("Toggle clicked, current theme:", theme);
    toggleTheme();
    console.log(
      "After toggle, html dark class:",
      document.documentElement.classList.contains("dark")
    );
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
