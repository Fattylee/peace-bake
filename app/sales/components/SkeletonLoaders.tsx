"use client";

/**
 * Skeleton loaders for sales dashboard content
 * Maintains layout dimensions during data loading
 */

export function SalesStatsLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-28 bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 animate-pulse"
        >
          <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-24 mb-2" />
          <div className="h-8 bg-gray-300 dark:bg-slate-700 rounded w-32" />
        </div>
      ))}
    </div>
  );
}

export function SalesChartsLoader() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-slate-700 rounded w-48 mb-6" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-300 dark:bg-slate-700 rounded" />
        ))}
      </div>
    </div>
  );
}

export function SalesHistoryLoader() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* Table header */}
      <div className="h-12 bg-gray-300 dark:bg-slate-700" />
      {/* Table rows */}
      <div className="space-y-px">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 dark:bg-slate-700" />
        ))}
      </div>
    </div>
  );
}
