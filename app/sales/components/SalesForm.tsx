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

interface SalesFormProps {
  onSaleAdded: (sale: SalesRecord) => void;
  authToken?: string;
}

export default function SalesForm({ onSaleAdded, authToken }: SalesFormProps) {
  const [breadSize, setBreadSize] = useState<BreadSize>("Family");
  const [price, setPrice] = useState(930);
  const [quantity, setQuantity] = useState(1);
  const [customerType, setCustomerType] = useState<CustomerType>("Consumer");
  const [customerTypeDropdownOpen, setCustomerTypeDropdownOpen] =
    useState(false);
  const [customerTypeSearchTerm, setCustomerTypeSearchTerm] = useState("");
  const [debtor, setDebtor] = useState("Staff");
  const [debtorDropdownOpen, setDebtorDropdownOpen] = useState(false);
  const [debtorSearchTerm, setDebtorSearchTerm] = useState("");
  const [dispatcher, setDispatcher] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const amount = price * quantity;
  const profit = calculateProfit(breadSize, amount);

  // Filter debtors based on search
  const filteredDebtors = DEBTORS.filter((d) =>
    d.toLowerCase().includes(debtorSearchTerm.toLowerCase())
  );

  // Filter customer types based on search
  const filteredCustomerTypes = CUSTOMER_TYPES.filter((ct) =>
    ct.toLowerCase().includes(customerTypeSearchTerm.toLowerCase())
  );

  const handleBreadSizeChange = (newSize: BreadSize) => {
    setBreadSize(newSize);
    const prices = BREAD_PRICES[newSize];
    setPrice(prices[0]); // Set to most common price
  };

  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice);
  };

  const handleDebtorSelect = (selectedDebtor: string) => {
    setDebtor(selectedDebtor);
    setDebtorDropdownOpen(false);
    setDebtorSearchTerm("");
  };

  const handleCustomerTypeSelect = (selectedType: CustomerType) => {
    setCustomerType(selectedType);
    setCustomerTypeDropdownOpen(false);
    setCustomerTypeSearchTerm("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate debtor is filled
    if (!debtor.trim()) {
      setError("Debtor/Customer Name is required");
      return;
    }

    // Validate customer type is filled
    if (!customerType || !customerType.trim()) {
      setError("Customer Type is required");
      return;
    }

    setLoading(true);

    try {
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
          breadSize,
          price,
          quantity,
          amount,
          profit,
          debtor,
          customerType,
          dispatcher: dispatcher || undefined,
          notes: notes || undefined,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.error || `HTTP ${response.status}: Failed to save sale`
        );
      }

      const newSale = responseData;
      onSaleAdded(newSale);

      // Reset form
      setQuantity(1);
      setDebtor("");
      setCustomerType("");
      setDebtorSearchTerm("");
      setDispatcher("");
      setNotes("");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to save sale. Please try again.";
      console.error("Error submitting sale:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-bold text-amber-900 dark:text-amber-400 mb-6">
        Add New Sale
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Bread Size Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bread Size
          </label>
          <select
            value={breadSize}
            onChange={(e) => handleBreadSizeChange(e.target.value as BreadSize)}
            className="w-full border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
          >
            <option value="Jumbo">Jumbo</option>
            <option value="Family">Family</option>
            <option value="Family-Mini">Family-Mini</option>
            <option value="Solo">Solo</option>
          </select>
        </div>

        {/* Price Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Price (₦)
          </label>
          <select
            value={price}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="w-full border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
          >
            {BREAD_PRICES[breadSize].map((p) => (
              <option key={p} value={p}>
                ₦{p.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
          />
        </div>

        {/* Amount (Auto-calculated) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount (₦)
          </label>
          <input
            type="text"
            value={`₦${amount.toLocaleString()}`}
            disabled
            className="w-full border dark:border-slate-600 rounded-lg px-3 py-2 bg-gray-100 dark:bg-slate-900 dark:text-gray-300"
          />
        </div>
      </div>

      {/* Debtor and Customer Type Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Debtor/Customer Name - REQUIRED with Autocomplete */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Debtor/Customer Name <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={debtor || debtorSearchTerm}
              onChange={(e) => {
                const value = e.target.value;
                if (debtor === value || !DEBTORS.includes(value)) {
                  setDebtorSearchTerm(value);
                  setDebtor("");
                } else {
                  setDebtor(value);
                  setDebtorSearchTerm("");
                }
                setDebtorDropdownOpen(true);
              }}
              onFocus={() => setDebtorDropdownOpen(true)}
              placeholder="Search or select from list..."
              className={`w-full border-2 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100 focus:outline-none ${
                error && !debtor
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 dark:border-slate-600 focus:border-amber-600"
              }`}
            />
            {debtorDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {filteredDebtors.length > 0 ? (
                  filteredDebtors.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => handleDebtorSelect(d)}
                      className="w-full text-left px-3 py-2 hover:bg-amber-100 dark:hover:bg-slate-600 transition text-gray-800 dark:text-gray-200"
                    >
                      {d}
                    </button>
                  ))
                ) : debtorSearchTerm ? (
                  <div className="px-3 py-2 text-gray-500 dark:text-gray-400">
                    No matches. Press Enter to add "{debtorSearchTerm}"
                  </div>
                ) : (
                  <div className="px-3 py-2 text-gray-500 dark:text-gray-400">
                    Type to search...
                  </div>
                )}
              </div>
            )}
          </div>
          {debtor && (
            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
              Selected: <strong>{debtor}</strong>
            </p>
          )}
        </div>

        {/* Customer Type - Searchable & REQUIRED */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Customer Type <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={customerType || customerTypeSearchTerm}
              onChange={(e) => {
                const value = e.target.value;
                if (customerType === value || !CUSTOMER_TYPES.includes(value)) {
                  setCustomerTypeSearchTerm(value);
                  setCustomerType("");
                } else {
                  setCustomerType(value as CustomerType);
                  setCustomerTypeSearchTerm("");
                }
                setCustomerTypeDropdownOpen(true);
              }}
              onFocus={() => setCustomerTypeDropdownOpen(true)}
              placeholder="Search customer type..."
              className="w-full border-2 border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100 focus:outline-none focus:border-amber-600"
            />
            {customerTypeDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {filteredCustomerTypes.length > 0 ? (
                  filteredCustomerTypes.map((ct) => (
                    <button
                      key={ct}
                      type="button"
                      onClick={() =>
                        handleCustomerTypeSelect(ct as CustomerType)
                      }
                      className="w-full text-left px-3 py-2 hover:bg-amber-100 dark:hover:bg-slate-600 transition text-gray-800 dark:text-gray-200 text-sm"
                    >
                      {ct}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">
                    No matches
                  </div>
                )}
              </div>
            )}
          </div>
          {customerType && (
            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
              Selected: <strong>{customerType}</strong>
            </p>
          )}
        </div>
      </div>

      {/* Optional Fields */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Dispatcher (Optional)
          </label>
          <select
            value={dispatcher}
            onChange={(e) => setDispatcher(e.target.value)}
            className="w-full border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
          >
            <option value="">Select dispatcher...</option>
            <option value="Olumide">Olumide</option>
            <option value="David">David</option>
            <option value="Ummu Abdillah">Ummu Abdillah</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Notes (Optional)
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Bulk order, special request"
            className="w-full border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Profit (Auto-calculated) */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Profit (₦)
        </label>
        <input
          type="text"
          value={`₦${profit.toLocaleString()}`}
          disabled
          className="w-full border dark:border-slate-600 rounded-lg px-3 py-2 bg-green-50 dark:bg-slate-900 dark:text-green-400 font-semibold"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-bold py-3 rounded-lg transition"
      >
        {loading ? "Saving..." : "Record Sale"}
      </button>
    </form>
  );
}
