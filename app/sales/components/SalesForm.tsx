"use client";

import { useState } from "react";
import {
  BreadSize,
  CustomerType,
  BREAD_PRICES,
  CUSTOMER_TYPES,
  SalesRecord,
  calculateProfit,
} from "@/app/data/salesTypes";

interface SalesFormProps {
  onSaleAdded: (sale: SalesRecord) => void;
}

export default function SalesForm({ onSaleAdded }: SalesFormProps) {
  const [breadSize, setBreadSize] = useState<BreadSize>("Family");
  const [price, setPrice] = useState(930);
  const [quantity, setQuantity] = useState(1);
  const [customerType, setCustomerType] = useState<CustomerType>("Consumer");
  const [debtor, setDebtor] = useState("");
  const [dispatcher, setDispatcher] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const amount = price * quantity;
  const profit = calculateProfit(breadSize, amount);

  const handleBreadSizeChange = (newSize: BreadSize) => {
    setBreadSize(newSize);
    const prices = BREAD_PRICES[newSize];
    setPrice(prices[0]); // Set to most common price
  };

  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const now = new Date();
      const date = now.toISOString().split("T")[0];
      const time = now.toTimeString().split(" ")[0];

      const response = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          time,
          breadSize,
          price,
          quantity,
          amount,
          profit,
          debtor: debtor || undefined,
          customerType,
          dispatcher: dispatcher || undefined,
          notes: notes || undefined,
        }),
      });

      if (!response.ok) throw new Error("Failed to save sale");

      const newSale = await response.json();
      onSaleAdded(newSale);

      // Reset form
      setQuantity(1);
      setDebtor("");
      setDispatcher("");
      setNotes("");
    } catch (error) {
      console.error("Error submitting sale:", error);
      alert("Failed to save sale");
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

        {/* Profit (Auto-calculated) */}
        <div>
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

        {/* Customer Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Customer Type
          </label>
          <select
            value={customerType}
            onChange={(e) => setCustomerType(e.target.value as CustomerType)}
            className="w-full border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
          >
            {CUSTOMER_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Optional Fields */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Debtor/Customer Name (Optional)
          </label>
          <input
            type="text"
            value={debtor}
            onChange={(e) => setDebtor(e.target.value)}
            placeholder="e.g., AP Shop, Mummy Ola"
            className="w-full border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Dispatcher (Optional)
          </label>
          <input
            type="text"
            value={dispatcher}
            onChange={(e) => setDispatcher(e.target.value)}
            placeholder="e.g., Olumide"
            className="w-full border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Notes (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g., Special order, bulk discount"
          rows={2}
          className="w-full border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
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
