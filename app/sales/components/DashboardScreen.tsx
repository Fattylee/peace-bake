"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SalesForm from "./SalesForm";
import SalesStats from "./SalesStats";
import SalesHistory from "./SalesHistory";
import SalesCharts from "./SalesCharts";
import DashboardHeader from "./DashboardHeader";
import { SalesRecord, UserRole } from "@/app/data/salesTypes";

interface DashboardScreenProps {
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
  loading: boolean;
  sales: SalesRecord[];
  authToken: string;
  onSaleAdded: (sale: SalesRecord) => void;
  onShowToast: (message: string, type: "success" | "error" | "info") => void;
  onDeleteSale: (sale: SalesRecord) => void;
}

export default function DashboardScreen({
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
  loading,
  sales,
  authToken,
  onSaleAdded,
  onShowToast,
  onDeleteSale,
}: DashboardScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      <Header hideNavigation={true} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8">
        <DashboardHeader
          userRole={userRole}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          selectedDate={selectedDate}
          onSelectedDateChange={onSelectedDateChange}
          startDate={startDate}
          onStartDateChange={onStartDateChange}
          endDate={endDate}
          onEndDateChange={onEndDateChange}
          onLogout={onLogout}
        />

        {/* Content Section */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Loading sales data...
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Sales Form */}
            <SalesForm
              onSaleAdded={onSaleAdded}
              authToken={authToken}
              onShowToast={onShowToast}
            />

            {/* Sales Stats */}
            <SalesStats sales={sales} />

            {/* Sales Charts */}
            <SalesCharts sales={sales} />

            {/* Sales History */}
            <SalesHistory sales={sales} onDelete={onDeleteSale} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
