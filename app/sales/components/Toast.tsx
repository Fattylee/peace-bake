"use client";

import { useEffect } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({
  id,
  message,
  type = "info",
  duration = 4000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50 dark:bg-green-900",
          border: "border-l-4 border-green-500",
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          text: "text-green-700 dark:text-green-200",
        };
      case "error":
        return {
          bg: "bg-red-50 dark:bg-red-900",
          border: "border-l-4 border-red-500",
          icon: <AlertCircle className="w-5 h-5 text-red-600" />,
          text: "text-red-700 dark:text-red-200",
        };
      case "info":
        return {
          bg: "bg-blue-50 dark:bg-blue-900",
          border: "border-l-4 border-blue-500",
          icon: <Info className="w-5 h-5 text-blue-600" />,
          text: "text-blue-700 dark:text-blue-200",
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`${styles.bg} ${styles.border} ${styles.text} p-4 rounded-lg shadow-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto`}
    >
      {styles.icon}
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 hover:opacity-70 transition"
      >
        <X size={18} />
      </button>
    </div>
  );
}
