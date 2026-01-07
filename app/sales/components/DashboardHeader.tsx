"use client";

import { UserRole } from "@/app/data/salesTypes";
import { LogOut } from "lucide-react";

interface DashboardHeaderProps {
  userRole: UserRole | null;
  viewMode: "today" | "range";
  onViewModeChange: (mode: "today" | "range") => void;
  selectedDate: string;
  onSelectedDateChange: (date: string) => void;
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;
  onLogout: () => void;
}

export default function DashboardHeader({
  userRole,
  viewMode,
  onViewModeChange,
  selectedDate,
  onSelectedDateChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-400">
          Sales Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Track daily sales and profits
          {userRole && (
            <span className="ml-2 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {userRole === "admin" ? "Admin" : "Sales Rep"}
            </span>
          )}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
        {/* View Mode Toggle */}
        <div className="flex gap-2 bg-gray-200 dark:bg-slate-700 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange("today")}
            className={`px-4 py-2 rounded font-medium transition ${
              viewMode === "today"
                ? "bg-amber-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => onViewModeChange("range")}
            className={`px-4 py-2 rounded font-medium transition ${
              viewMode === "range"
                ? "bg-amber-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600"
            }`}
          >
            Range
          </button>
        </div>

        {/* Date Selection */}
        {viewMode === "today" ? (
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onSelectedDateChange(e.target.value)}
            className="border dark:border-slate-600 rounded-lg px-4 py-2 dark:bg-slate-800 dark:text-gray-100"
          />
        ) : (
          <div className="flex gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-800 dark:text-gray-100"
            />
            <span className="text-gray-600 dark:text-gray-400 py-2">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-800 dark:text-gray-100"
            />
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition whitespace-nowrap"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
