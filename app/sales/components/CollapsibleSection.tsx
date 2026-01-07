import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function CollapsibleSection({
  title,
  isOpen,
  onToggle,
  children,
}: CollapsibleSectionProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
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

      {isOpen && (
        <div className="border-t dark:border-slate-700 p-6">{children}</div>
      )}
    </div>
  );
}
