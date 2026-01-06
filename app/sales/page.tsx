"use client";

import { useState, useEffect } from "react";
import { SalesRecord, UserRole } from "@/app/data/salesTypes";
import SalesForm from "./components/SalesForm";
import SalesStats from "./components/SalesStats";
import SalesHistory from "./components/SalesHistory";
import SalesCharts from "./components/SalesCharts";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { LogOut, Eye, EyeOff } from "lucide-react";

export default function SalesDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [sales, setSales] = useState<SalesRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [viewMode, setViewMode] = useState<"today" | "range">("today");

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem("sales_auth");
    const token = localStorage.getItem("auth_token");
    const role = localStorage.getItem("user_role") as UserRole | null;
    if (auth === "true" && token && role) {
      setAuthenticated(true);
      setAuthToken(token);
      setUserRole(role);
      if (viewMode === "today") {
        fetchSalesForDate(selectedDate, token);
      } else {
        fetchSalesRange(startDate, endDate, token);
      }
    }
  }, []);

  // Fetch sales based on view mode
  useEffect(() => {
    if (authenticated && authToken) {
      if (viewMode === "today") {
        fetchSalesForDate(selectedDate, authToken);
      } else {
        fetchSalesRange(startDate, endDate, authToken);
      }
    }
  }, [selectedDate, viewMode, startDate, endDate, authenticated, authToken]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Store token and auth info
      const token = data.token;
      setAuthToken(token);
      setAuthenticated(true);
      setUserRole(data.user.role);
      localStorage.setItem("sales_auth", "true");
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_role", data.user.role);
      setUsername("");
      setPassword("");

      // Fetch initial data
      if (viewMode === "today") {
        fetchSalesForDate(selectedDate, token);
      } else {
        fetchSalesRange(startDate, endDate, token);
      }
    } catch (error) {
      setLoginError("Connection error - please try again");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUserRole(null);
    setAuthToken(null);
    localStorage.removeItem("sales_auth");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    setSales([]);
  };

  const fetchSalesForDate = async (date: string, token?: string) => {
    const t = token || authToken;
    if (!t) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/sales?date=${date}`, {
        headers: {
          Authorization: `Bearer ${t}`,
        },
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSalesRange = async (
    start: string,
    end: string,
    token?: string
  ) => {
    const t = token || authToken;
    if (!t) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/sales?startDate=${start}&endDate=${end}`,
        {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        }
      );

      if (response.status === 401) {
        handleLogout();
        return;
      }

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
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
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
        <Header hideNavigation={true} />
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-400 mb-2 text-center">
              Sales Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Peace Bake Bakery
            </p>

            <form onSubmit={handleLoginSubmit}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full border-2 border-amber-300 dark:border-amber-600 rounded-lg px-4 py-3 mb-4 dark:bg-slate-700 dark:text-gray-100 focus:outline-none focus:border-amber-600"
                autoFocus
                disabled={loading}
              />

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative mb-6">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full border-2 border-amber-300 dark:border-amber-600 rounded-lg px-4 py-3 pr-12 dark:bg-slate-700 dark:text-gray-100 focus:outline-none focus:border-amber-600"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {loginError && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900 border-l-4 border-red-500 rounded">
                  <p className="text-sm text-red-700 dark:text-red-200">
                    {loginError}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-bold py-3 rounded-lg transition mb-4"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="mt-6 pt-4 border-t border-gray-300 dark:border-slate-600">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  <strong>Demo Credentials:</strong>
                </p>
                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                  <p>Sales Rep: sales / sales2024</p>
                  <p>Admin: admin / peace2024</p>
                </div>
              </div>
            </form>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              Restricted access • Username & password required
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
      <Header hideNavigation={true} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
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

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {/* View Mode Toggle */}
            <div className="flex gap-2 bg-gray-200 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode("today")}
                className={`px-4 py-2 rounded font-medium transition ${
                  viewMode === "today"
                    ? "bg-amber-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setViewMode("range")}
                className={`px-4 py-2 rounded font-medium transition ${
                  viewMode === "range"
                    ? "bg-amber-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600"
                }`}
              >
                Range
              </button>
            </div>

            {/* Date Inputs */}
            {viewMode === "today" ? (
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border dark:border-slate-600 rounded-lg px-4 py-2 dark:bg-slate-800 dark:text-gray-100"
              />
            ) : (
              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-800 dark:text-gray-100"
                />
                <span className="text-gray-600 dark:text-gray-400 py-2">
                  to
                </span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-800 dark:text-gray-100"
                />
              </div>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition whitespace-nowrap"
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
            <SalesForm
              onSaleAdded={handleSaleAdded}
              authToken={authToken || ""}
            />

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
