"use client";

import { useState, useEffect } from "react";
import { SalesRecord } from "@/app/data/salesTypes";
import SalesForm from "./components/SalesForm";
import SalesStats from "./components/SalesStats";
import SalesHistory from "./components/SalesHistory";
import SalesCharts from "./components/SalesCharts";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { LogOut } from "lucide-react";

export default function SalesDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [sales, setSales] = useState<SalesRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem("sales_auth");
    if (auth === "true") {
      setAuthenticated(true);
      fetchSales(selectedDate);
    }
  }, []);

  // Fetch sales for selected date
  useEffect(() => {
    if (authenticated) {
      fetchSales(selectedDate);
    }
  }, [selectedDate, authenticated]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (in production, use proper auth)
    if (password === "peace2024") {
      setAuthenticated(true);
      localStorage.setItem("sales_auth", "true");
      setPassword("");
      fetchSales(selectedDate);
    } else {
      alert("Incorrect password");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("sales_auth");
    setSales([]);
  };

  const fetchSales = async (date: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/sales?date=${date}`);
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaleAdded = (newSale: SalesRecord) => {
    setSales([newSale, ...sales]);
  };

  const handleDeleteSale = async (id: string) => {
    try {
      const response = await fetch(`/api/sales?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSales(sales.filter((s) => s.id !== id));
      }
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  };

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-400 mb-2 text-center">
              Sales Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Peace Bake Bakery
            </p>

            <form onSubmit={handlePasswordSubmit}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter dashboard password"
                className="w-full border-2 border-amber-300 dark:border-amber-600 rounded-lg px-4 py-3 mb-6 dark:bg-slate-700 dark:text-gray-100 focus:outline-none focus:border-amber-600"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition"
              >
                Access Dashboard
              </button>
            </form>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              Restricted access • Password required
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Dashboard screen
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-400">
              Sales Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Track daily sales and profits
            </p>
          </div>

          <div className="flex gap-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border dark:border-slate-600 rounded-lg px-4 py-2 dark:bg-slate-800 dark:text-gray-100"
            />
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Loading sales data...
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Form */}
            <SalesForm onSaleAdded={handleSaleAdded} />

            {/* Stats */}
            <SalesStats sales={sales} />

            {/* Charts */}
            <SalesCharts sales={sales} />

            {/* History */}
            <SalesHistory sales={sales} onDelete={handleDeleteSale} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
