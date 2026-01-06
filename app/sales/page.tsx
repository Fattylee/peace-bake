"use client";

import { useState, useEffect } from "react";
import { LogOut, Eye, EyeOff } from "lucide-react";
import { SalesRecord, UserRole } from "@/app/data/salesTypes";
import SalesForm from "./components/SalesForm";
import SalesStats from "./components/SalesStats";
import SalesHistory from "./components/SalesHistory";
import SalesCharts from "./components/SalesCharts";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Modal from "./components/Modal";
import ToastContainer, { ToastMessage } from "./components/ToastContainer";

// ============================================================================
// Types & Constants
// ============================================================================

type ModalType = "confirm" | "success" | "error" | "info";
type ViewMode = "today" | "range";

const STORAGE_KEYS = {
  AUTH: "sales_auth",
  TOKEN: "auth_token",
  ROLE: "user_role",
} as const;

const DEMO_CREDENTIALS = [
  { role: "Sales Rep", username: "sales", password: "sales2024" },
  { role: "Admin", username: "admin", password: "peace2024" },
] as const;

const DEFAULT_MODAL_STATE: ModalState = {
  isOpen: false,
  type: "info",
  title: "",
  message: "",
  confirmText: "Confirm",
  cancelText: "Cancel",
  onConfirm: () => {},
  onCancel: () => {},
};

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// ============================================================================
// Main Component
// ============================================================================

export default function SalesDashboard() {
  // Auth State
  const [authenticated, setAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  // Form State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // UI State
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("today");

  // Data State
  const [sales, setSales] = useState<SalesRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Notification State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [modal, setModal] = useState<ModalState>(DEFAULT_MODAL_STATE);

  // ========================================================================
  // Helpers - Notifications
  // ========================================================================

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showModal = (config: Partial<ModalState>) => {
    setModal((prev) => ({ ...prev, ...config, isOpen: true }));
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  // ========================================================================
  // Helpers - Local Storage
  // ========================================================================

  const saveAuthToStorage = (token: string, role: UserRole) => {
    localStorage.setItem(STORAGE_KEYS.AUTH, "true");
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  };

  const clearAuthFromStorage = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.ROLE);
  };

  const loadAuthFromStorage = () => {
    const auth = localStorage.getItem(STORAGE_KEYS.AUTH);
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const role = localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole | null;

    return auth === "true" && token && role ? { token, role } : null;
  };

  // ========================================================================
  // Helpers - API Calls
  // ========================================================================

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
      showToast("Failed to fetch sales data", "error");
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
      showToast("Failed to fetch sales data", "error");
    } finally {
      setLoading(false);
    }
  };

  // ========================================================================
  // Handlers - Authentication
  // ========================================================================

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        showToast(data.error || "Invalid username or password", "error");
        setLoading(false);
        return;
      }

      const { token, user } = data;
      saveAuthToStorage(token, user.role);

      setAuthToken(token);
      setAuthenticated(true);
      setUserRole(user.role);
      setUsername("");
      setPassword("");

      const roleLabel = user.role === "admin" ? "Admin" : "Sales Rep";
      showToast(`Welcome back, ${roleLabel}!`, "success");

      // Fetch initial data
      if (viewMode === "today") {
        fetchSalesForDate(selectedDate, token);
      } else {
        fetchSalesRange(startDate, endDate, token);
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("An error occurred during login. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    showModal({
      type: "confirm",
      title: "Logout",
      message: "Are you sure you want to logout?",
      confirmText: "Logout",
      cancelText: "Cancel",
      onConfirm: () => {
        clearAuthFromStorage();
        setAuthenticated(false);
        setUserRole(null);
        setAuthToken(null);
        setSales([]);
        closeModal();
        showToast("You have been successfully logged out.", "success");
      },
      onCancel: closeModal,
    });
  };

  // ========================================================================
  // Handlers - Sales
  // ========================================================================

  const handleSaleAdded = (newSale: SalesRecord) => {
    setSales([newSale, ...sales]);
  };

  const handleDeleteSale = async (sale: SalesRecord) => {
    const saleDate = new Date(sale.date).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const deleteMessage = `Delete sale record?\n\nDate: ${saleDate}\nCustomer: ${
      sale.debtor || "N/A"
    }\nProduct: ${
      sale.breadSize
    }\nAmount: ₦${sale.amount.toLocaleString()}\nQuantity: ${
      sale.quantity
    }\n\nThis action cannot be undone.`;

    showModal({
      type: "confirm",
      title: "Delete Sale",
      message: deleteMessage,
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        closeModal();
        try {
          const response = await fetch(`/api/sales?id=${sale.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          if (response.ok) {
            setSales(sales.filter((s) => s.id !== sale.id));
            showToast("Sale record has been deleted successfully.", "success");
          } else {
            const data = await response.json();
            showToast(`Failed to delete: ${data.error}`, "error");
          }
        } catch (error) {
          console.error("Error deleting sale:", error);
          showToast("Error deleting sale. Please try again.", "error");
        }
      },
      onCancel: closeModal,
    });
  };

  // ========================================================================
  // Effects
  // ========================================================================

  // Check authentication on mount
  useEffect(() => {
    const storedAuth = loadAuthFromStorage();
    if (storedAuth) {
      setAuthenticated(true);
      setAuthToken(storedAuth.token);
      setUserRole(storedAuth.role);

      if (viewMode === "today") {
        fetchSalesForDate(selectedDate, storedAuth.token);
      } else {
        fetchSalesRange(startDate, endDate, storedAuth.token);
      }
    }
  }, []);

  // Fetch sales based on view mode and date selection
  useEffect(() => {
    if (!authenticated || !authToken) return;

    if (viewMode === "today") {
      fetchSalesForDate(selectedDate, authToken);
    } else {
      fetchSalesRange(startDate, endDate, authToken);
    }
  }, [selectedDate, viewMode, startDate, endDate, authenticated, authToken]);

  // ========================================================================
  // Render - Login Screen
  // ========================================================================

  if (!authenticated) {
    return (
      <>
        <ToastContainer toasts={toasts} onClose={removeToast} />
        <Modal
          isOpen={modal.isOpen}
          type={modal.type}
          title={modal.title}
          message={modal.message}
          confirmText={modal.confirmText}
          cancelText={modal.cancelText}
          onConfirm={modal.onConfirm}
          onCancel={modal.onCancel}
        />
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
                {/* Username Input */}
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  autoFocus
                  disabled={loading}
                  className="w-full border-2 border-amber-300 dark:border-amber-600 rounded-lg px-4 py-3 mb-4 dark:bg-slate-700 dark:text-gray-100 focus:outline-none focus:border-amber-600"
                />

                {/* Password Input */}
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative mb-6">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    disabled={loading}
                    className="w-full border-2 border-amber-300 dark:border-amber-600 rounded-lg px-4 py-3 pr-12 dark:bg-slate-700 dark:text-gray-100 focus:outline-none focus:border-amber-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-bold py-3 rounded-lg transition mb-4"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                {/* Demo Credentials */}
                <div className="mt-6 pt-4 border-t border-gray-300 dark:border-slate-600">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-semibold">
                    Demo Credentials:
                  </p>
                  <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                    {DEMO_CREDENTIALS.map((cred) => (
                      <p key={cred.username}>
                        {cred.role}: {cred.username} / {cred.password}
                      </p>
                    ))}
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
      </>
    );
  }

  // ========================================================================
  // Render - Dashboard Screen
  // ========================================================================
  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <Modal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        confirmText={modal.confirmText}
        cancelText={modal.cancelText}
        onConfirm={modal.onConfirm}
        onCancel={modal.onCancel}
      />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
        <Header hideNavigation={true} />

        <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8">
          {/* Header Section */}
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

              {/* Date Selection */}
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

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition whitespace-nowrap"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

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
                onSaleAdded={handleSaleAdded}
                authToken={authToken || ""}
                onShowToast={showToast}
              />

              {/* Sales Stats */}
              <SalesStats sales={sales} />

              {/* Sales Charts */}
              <SalesCharts sales={sales} />

              {/* Sales History */}
              <SalesHistory sales={sales} onDelete={handleDeleteSale} />
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
