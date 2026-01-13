"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

/**
 * Loading skeleton that maintains same layout as DashboardScreen
 * Prevents CLS during auth check
 */
export default function DashboardLoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      <Header hideNavigation={true} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8">
        {/* Header skeleton */}
        <div className="mb-8 space-y-4">
          <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded-lg w-48 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Form skeleton */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md mb-8">
          <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded-lg w-32 mb-6 animate-pulse" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-32 animate-pulse" />
                <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
          <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded-lg w-32 mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
