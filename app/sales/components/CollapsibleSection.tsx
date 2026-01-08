import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isMobile?: boolean;
}

export default function CollapsibleSection({
  title,
  isOpen,
  onToggle,
  children,
  isMobile = false,
}: CollapsibleSectionProps) {
  // On desktop (not mobile), always show content expanded
  const shouldShowContent = !isMobile || isOpen;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
      {/* Header - show toggle button only on mobile */}
      {isMobile ? (
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-6 hover:bg-amber-50 dark:hover:bg-slate-700 transition"
          aria-expanded={isOpen}
        >
          <h2 className="text-xl font-bold text-amber-900 dark:text-amber-400">
            {title}
          </h2>
          <ChevronDown
            size={24}
            className={`text-amber-700 dark:text-amber-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : (
        <div className="p-6 bg-amber-50/50 dark:bg-slate-700/50">
          <h2 className="text-xl font-bold text-amber-900 dark:text-amber-400">
            {title}
          </h2>
        </div>
      )}

      {/* Content */}
      {shouldShowContent && (
        <div className="border-t dark:border-slate-700 p-6">{children}</div>
      )}
    </div>
  );
}
