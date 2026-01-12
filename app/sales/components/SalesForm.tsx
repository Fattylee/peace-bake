"use client";

import { useState } from "react";
import {
  BreadSize,
  CustomerType,
  BREAD_PRICES,
  CUSTOMER_TYPES,
  SalesRecord,
  calculateProfit,
  DEBTORS,
} from "@/app/data/salesTypes";
import SearchableDropdown from "./SearchableDropdown";
import {
  SelectField,
  NumberInput,
  ReadOnlyField,
  TextInput,
  SubmitButton,
  ErrorAlert,
} from "./FormComponents";

// ============================================================================
// Constants
// ============================================================================

const BREAD_SIZE_OPTIONS = [
  { value: "Jumbo", label: "Jumbo" },
  { value: "Family", label: "Family" },
  { value: "Family-Mini", label: "Family-Mini" },
  { value: "Solo", label: "Solo" },
];

const DISPATCHER_OPTIONS = [
  { value: "", label: "Select dispatcher..." },
  { value: "Olumide", label: "Olumide" },
  { value: "David", label: "David" },
  { value: "Ummu Abdillah", label: "Ummu Abdillah" },
];

// ============================================================================
// Types
// ============================================================================

interface SalesFormProps {
  onSaleAdded: (sale: SalesRecord) => void;
  authToken?: string;
  onShowToast?: (message: string, type: "success" | "error" | "info") => void;
}

interface FormState {
  breadSize: BreadSize;
  price: number;
  quantity: number;
  debtor: string;
  customerType: CustomerType;
  dispatcher: string;
  notes: string;
}

// ============================================================================
// Hooks
// ============================================================================

function useSalesForm(initialBreadSize: BreadSize = "Family") {
  const [formState, setFormState] = useState<FormState>({
    breadSize: initialBreadSize,
    price: BREAD_PRICES[initialBreadSize][0],
    quantity: 1,
    debtor: "Staff",
    customerType: "Consumer",
    dispatcher: "",
    notes: "",
  });

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleBreadSizeChange = (newSize: string) => {
    const size = newSize as BreadSize;
    setFormState((prev) => ({
      ...prev,
      breadSize: size,
      price: BREAD_PRICES[size][0],
    }));
  };

  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      quantity: 1,
      debtor: "",
      customerType: "",
      dispatcher: "",
      notes: "",
    }));
  };

  const amount = formState.price * formState.quantity;
  const profit = calculateProfit(
    formState.breadSize,
    formState.price,
    formState.quantity
  );

  return {
    formState,
    updateField,
    handleBreadSizeChange,
    resetForm,
    amount,
    profit,
  };
}

// ============================================================================
// API Functions
// ============================================================================

async function submitSale(
  formState: FormState,
  amount: number,
  profit: number,
  authToken?: string
): Promise<SalesRecord> {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];

  const response = await fetch("/api/sales", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      date,
      time,
      breadSize: formState.breadSize,
      price: formState.price,
      quantity: formState.quantity,
      amount,
      profit,
      debtor: formState.debtor,
      customerType: formState.customerType,
      dispatcher: formState.dispatcher || undefined,
      notes: formState.notes || undefined,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.error || `HTTP ${response.status}: Failed to save sale`
    );
  }

  return responseData;
}

// ============================================================================
// Component
// ============================================================================

export default function SalesForm({
  onSaleAdded,
  authToken,
  onShowToast,
}: SalesFormProps) {
  const {
    formState,
    updateField,
    handleBreadSizeChange,
    resetForm,
    amount,
    profit,
  } = useSalesForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = (): boolean => {
    if (!formState.debtor.trim()) {
      setError("Debtor/Customer Name is required");
      return false;
    }
    if (!formState.customerType?.trim()) {
      setError("Customer Type is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const newSale = await submitSale(formState, amount, profit, authToken);
      onSaleAdded(newSale);
      onShowToast?.(
        `Sale of ₦${amount.toLocaleString()} recorded successfully!`,
        "success"
      );
      resetForm();
      setError("");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save sale.";
      console.error("Error submitting sale:", errorMessage);
      setError(errorMessage);
      onShowToast?.(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const priceOptions = BREAD_PRICES[formState.breadSize].map((p) => ({
    value: p,
    label: `₦${p.toLocaleString()}`,
  }));

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-bold text-amber-900 dark:text-amber-400 mb-6">
        Add New Sale
      </h2>

      <ErrorAlert message={error} />

      {/* Bread Size & Price */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <SelectField
          label="Bread Size"
          value={formState.breadSize}
          onChange={handleBreadSizeChange}
          options={BREAD_SIZE_OPTIONS}
        />
        <SelectField
          label="Price (₦)"
          value={formState.price}
          onChange={(v) => updateField("price", Number(v))}
          options={priceOptions}
        />
        <NumberInput
          label="Quantity"
          value={formState.quantity}
          onChange={(v) => updateField("quantity", v)}
        />
        <ReadOnlyField
          label="Amount (₦)"
          value={`₦${amount.toLocaleString()}`}
        />
      </div>

      {/* Debtor & Customer Type */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <SearchableDropdown
          label="Debtor/Customer Name"
          value={formState.debtor}
          options={DEBTORS}
          placeholder="Search or select from list..."
          required
          hasError={!!error && !formState.debtor}
          onSelect={(v) => updateField("debtor", v)}
        />
        <SearchableDropdown
          label="Customer Type"
          value={formState.customerType}
          options={CUSTOMER_TYPES}
          placeholder="Search customer type..."
          required
          hasError={!!error && !formState.customerType}
          onSelect={(v) => updateField("customerType", v)}
        />
      </div>

      {/* Optional Fields */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <SelectField
          label="Dispatcher (Optional)"
          value={formState.dispatcher}
          onChange={(v) => updateField("dispatcher", v)}
          options={DISPATCHER_OPTIONS}
        />
        <TextInput
          label="Notes (Optional)"
          value={formState.notes}
          onChange={(v) => updateField("notes", v)}
          placeholder="e.g., Bulk order, special request"
        />
      </div>

      {/* Profit */}
      <div className="mb-6">
        <ReadOnlyField
          label="Profit (₦)"
          value={`₦${profit.toLocaleString()}`}
          variant="success"
        />
      </div>

      <SubmitButton loading={loading} label="Record Sale" />
    </form>
  );
}
