"use client";

import { useState, useEffect, useCallback } from "react";
import { SalesRecord, UserRole } from "@/app/data/salesTypes";
import { ToastMessage } from "../components/ToastContainer";
import {
  loginUser,
  fetchSalesByDate,
  fetchSalesByRange,
  deleteSale,
} from "@/app/lib/salesApi";
import {
  saveAuthToStorage,
  clearAuthFromStorage,
  loadAuthFromStorage,
} from "@/app/lib/salesAuth";

// ============================================================================
// Types
// ============================================================================

export type ViewMode = "today" | "range";
export type ModalType = "confirm" | "success" | "error" | "info";

export interface ModalState {
  isOpen: boolean;
  type: ModalType;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

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

// ============================================================================
// Hook
// ============================================================================

export function useSalesDashboard() {
  // ========================================================================
  // State
  // ========================================================================

  // Auth State
  const [authenticated, setAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);

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

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "info") => {
      const id = Date.now().toString();
      setToasts((prev) => [...prev, { id, message, type }]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showModal = useCallback((config: Partial<ModalState>) => {
    setModal((prev) => ({ ...prev, ...config, isOpen: true }));
  }, []);

  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // ========================================================================
  // Helpers - Auth
  // ========================================================================

  const clearAuth = useCallback(() => {
    clearAuthFromStorage();
    setAuthenticated(false);
    setUserRole(null);
    setAuthToken(null);
    setSales([]);
  }, []);

  // ========================================================================
  // Handlers - Data Fetching
  // ========================================================================

  const fetchSalesForDate = useCallback(
    async (date: string, token?: string) => {
      const t = token || authToken;
      if (!t) return;

      setLoading(true);
      try {
        const data = await fetchSalesByDate(date, t);
        setSales(data as SalesRecord[]);
      } catch (error) {
        if (error instanceof Error && error.message === "UNAUTHORIZED") {
          clearAuth();
          showToast("Session expired. Please log in again.", "error");
        } else {
          showToast("Failed to fetch sales data", "error");
        }
      } finally {
        setLoading(false);
      }
    },
    [authToken, clearAuth, showToast]
  );

  const fetchSalesForRange = useCallback(
    async (start: string, end: string, token?: string) => {
      const t = token || authToken;
      if (!t) return;

      setLoading(true);
      try {
        const data = await fetchSalesByRange(start, end, t);
        setSales(data as SalesRecord[]);
      } catch (error) {
        if (error instanceof Error && error.message === "UNAUTHORIZED") {
          clearAuth();
          showToast("Session expired. Please log in again.", "error");
        } else {
          showToast("Failed to fetch sales data", "error");
        }
      } finally {
        setLoading(false);
      }
    },
    [authToken, clearAuth, showToast]
  );

  // ========================================================================
  // Handlers - Authentication
  // ========================================================================

  const handleLogout = useCallback(() => {
    showModal({
      type: "confirm",
      title: "Logout",
      message: "Are you sure you want to logout?",
      confirmText: "Logout",
      cancelText: "Cancel",
      onConfirm: () => {
        clearAuth();
        closeModal();
        showToast("You have been successfully logged out.", "success");
      },
      onCancel: closeModal,
    });
  }, [clearAuth, closeModal, showModal, showToast]);

  const handleLoginSubmit = useCallback(
    async (username: string, password: string) => {
      setLoading(true);
      try {
        const data = await loginUser({ username, password });
        const { token, user } = data;

        saveAuthToStorage(token, user.role);
        setAuthToken(token);
        setAuthenticated(true);
        setUserRole(user.role);

        const roleLabel = user.role === "admin" ? "Admin" : "Sales Rep";
        showToast(`Welcome back, ${roleLabel}!`, "success");

        // Fetch initial data
        if (viewMode === "today") {
          await fetchSalesForDate(selectedDate, token);
        } else {
          await fetchSalesForRange(startDate, endDate, token);
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Login failed. Please try again.";
        showToast(message, "error");
      } finally {
        setLoading(false);
      }
    },
    [
      viewMode,
      selectedDate,
      startDate,
      endDate,
      showToast,
      fetchSalesForDate,
      fetchSalesForRange,
    ]
  );

  // ========================================================================
  // Handlers - Sales Data
  // ========================================================================

  const handleSaleAdded = useCallback((newSale: SalesRecord) => {
    setSales((prev) => [newSale, ...prev]);
  }, []);

  const handleDeleteSale = useCallback(
    async (sale: SalesRecord) => {
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
            await deleteSale(sale.id, authToken!);
            setSales((prev) => prev.filter((s) => s.id !== sale.id));
            showToast("Sale record has been deleted successfully.", "success");
          } catch (error) {
            const message =
              error instanceof Error ? error.message : "Error deleting sale";
            showToast(message, "error");
          }
        },
        onCancel: closeModal,
      });
    },
    [authToken, closeModal, showModal, showToast]
  );

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
    }
    // Mark auth as initialized regardless of whether user is logged in
    setAuthInitialized(true);
  }, []);

  // Fetch sales based on view mode and date selection
  useEffect(() => {
    if (!authenticated || !authToken) return;

    if (viewMode === "today") {
      fetchSalesForDate(selectedDate);
    } else {
      fetchSalesForRange(startDate, endDate);
    }
  }, [
    selectedDate,
    viewMode,
    startDate,
    endDate,
    authenticated,
    authToken,
    fetchSalesForDate,
    fetchSalesForRange,
  ]);

  // ========================================================================
  // Return
  // ========================================================================

  return {
    // Auth
    authenticated,
    authToken,
    userRole,
    authInitialized,

    // UI
    loading,
    viewMode,
    setViewMode,

    // Data
    sales,
    selectedDate,
    setSelectedDate,
    startDate,
    setStartDate,
    endDate,
    setEndDate,

    // Notifications
    toasts,
    removeToast,
    modal,
    showToast,

    // Handlers
    handleLoginSubmit,
    handleLogout,
    handleSaleAdded,
    handleDeleteSale,
  };
}
