"use client";

import { useSyncExternalStore } from "react";
import Modal from "./components/Modal";
import ToastContainer from "./components/ToastContainer";
import LoginScreen from "./components/LoginScreen";
import DashboardScreen from "./components/DashboardScreen";
import DashboardLoadingScreen from "./components/DashboardLoadingScreen";
import { useSalesDashboard } from "./hooks/useSalesDashboard";

// ============================================================================
// Sales Dashboard Page
// ============================================================================

export default function SalesDashboard() {
  // Hydration-safe client detection
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const {
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
  } = useSalesDashboard();

  // Show loading screen while checking auth to prevent CLS
  if (!isMounted || !authInitialized) {
    return <DashboardLoadingScreen />;
  }

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

      {!authenticated ? (
        <LoginScreen onSubmit={handleLoginSubmit} isLoading={loading} />
      ) : (
        <DashboardScreen
          userRole={userRole}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          onLogout={handleLogout}
          loading={loading}
          sales={sales}
          authToken={authToken || ""}
          onSaleAdded={handleSaleAdded}
          onShowToast={showToast}
          onDeleteSale={handleDeleteSale}
        />
      )}
    </>
  );
}
