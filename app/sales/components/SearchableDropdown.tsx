"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from "react";

interface SearchableDropdownProps {
  label: string;
  value: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
  hasError?: boolean;
  onSelect: (value: string) => void;
}

export default function SearchableDropdown({
  label,
  value,
  options,
  placeholder = "Search or select...",
  required = false,
  hasError = false,
  onSelect,
}: SearchableDropdownProps) {
  // Hydration-safe client detection
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter options based on search
  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (selectedValue: string) => {
      onSelect(selectedValue);
      setIsOpen(false);
      setSearchTerm("");
      setHighlightedIndex(-1);
    },
    [onSelect]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (value === inputValue || !options.includes(inputValue)) {
      setSearchTerm(inputValue);
      onSelect("");
    } else {
      onSelect(inputValue);
      setSearchTerm("");
    }
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredOptions.length === 0) {
      if (e.key === "Enter") {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  if (!isMounted) {
    return (
      <div className="relative" ref={containerRef}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        <input
          type="text"
          value={value}
          disabled
          placeholder={placeholder}
          className="w-full border-2 border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
        />
      </div>
    );
  }

  const borderClass = hasError
    ? "border-red-500 focus:border-red-600"
    : "border-gray-300 dark:border-slate-600 focus:border-amber-600";

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value || searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full border-2 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100 focus:outline-none ${borderClass}`}
        />
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, index) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className={`w-full text-left px-3 py-2 transition text-gray-800 dark:text-gray-200 text-sm ${
                    index === highlightedIndex
                      ? "bg-amber-200 dark:bg-amber-600 font-semibold"
                      : "hover:bg-amber-100 dark:hover:bg-slate-600"
                  }`}
                >
                  {opt}
                </button>
              ))
            ) : searchTerm ? (
              <div className="px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">
                No matches. Press Enter to add &quot;{searchTerm}&quot;
              </div>
            ) : (
              <div className="px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">
                Type to search... (Use ↑↓ arrow keys to navigate)
              </div>
            )}
          </div>
        )}
      </div>
      {value && (
        <p className="mt-2 text-sm text-green-600 dark:text-green-400">
          Selected: <strong>{value}</strong>
        </p>
      )}
    </div>
  );
}
