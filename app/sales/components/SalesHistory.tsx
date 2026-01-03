"use client";

import { SalesRecord } from "@/app/data/salesTypes";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface SalesHistoryProps {
  sales: SalesRecord[];
  onDelete: (id: string) => void;
}

export default function SalesHistory({ sales, onDelete }: SalesHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBreadSize, setFilterBreadSize] = useState<string>("all");
  const [filterCustomerType, setFilterCustomerType] = useState<string>("all");

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      !searchTerm || // If search is empty, match all
      sale.debtor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.dispatcher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.notes?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBread =
      filterBreadSize === "all" || sale.breadSize === filterBreadSize;
    const matchesCustomer =
      filterCustomerType === "all" || sale.customerType === filterCustomerType;

    return matchesSearch && matchesBread && matchesCustomer;
  });

  const breadSizes = Array.from(new Set(sales.map((s) => s.breadSize)));
  const customerTypes = Array.from(new Set(sales.map((s) => s.customerType)));

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-amber-900 dark:text-amber-400 mb-6">
        Sales History
      </h2>

      {/* Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search debtor, dispatcher, notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="col-span-full md:col-span-2 border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
        />

        <select
          value={filterBreadSize}
          onChange={(e) => setFilterBreadSize(e.target.value)}
          className="border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
        >
          <option value="all">All Sizes</option>
          {breadSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <select
          value={filterCustomerType}
          onChange={(e) => setFilterCustomerType(e.target.value)}
          className="border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
        >
          <option value="all">All Types</option>
          {customerTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 dark:border-slate-600">
              <th className="text-left py-3 px-4 font-bold dark:text-amber-400">
                Time
              </th>
              <th className="text-left py-3 px-4 font-bold dark:text-amber-400">
                Size
              </th>
              <th className="text-right py-3 px-4 font-bold dark:text-amber-400">
                Qty
              </th>
              <th className="text-right py-3 px-4 font-bold dark:text-amber-400">
                Amount
              </th>
              <th className="text-right py-3 px-4 font-bold dark:text-amber-400">
                Profit
              </th>
              <th className="text-left py-3 px-4 font-bold dark:text-amber-400">
                Customer
              </th>
              <th className="text-left py-3 px-4 font-bold dark:text-amber-400">
                Type
              </th>
              <th className="text-left py-3 px-4 font-bold dark:text-amber-400">
                Dispatcher
              </th>
              <th className="text-left py-3 px-4 font-bold dark:text-amber-400">
                Notes
              </th>
              <th className="text-center py-3 px-4 font-bold dark:text-amber-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.length > 0 ? (
              filteredSales.map((sale) => (
                <tr
                  key={sale.id}
                  className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                >
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {sale.time}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {sale.breadSize}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                    {sale.quantity}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900 dark:text-gray-100">
                    ₦{sale.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-green-600 dark:text-green-400">
                    ₦{sale.profit.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {sale.debtor || "-"}
                  </td>
                  <td className="py-3 px-4 text-xs bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-1 rounded w-fit">
                    {sale.customerType}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {sale.dispatcher || "-"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300 text-xs">
                    {sale.notes || "-"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() =>
                        confirm("Delete this sale?") && onDelete(sale.id)
                      }
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No sales records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg flex justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Records:{" "}
            <span className="font-bold">{filteredSales.length}</span>
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Amount:{" "}
            <span className="font-bold text-gray-900 dark:text-gray-100">
              ₦
              {filteredSales.reduce((s, a) => s + a.amount, 0).toLocaleString()}
            </span>
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Profit:{" "}
            <span className="font-bold text-green-600 dark:text-green-400">
              ₦
              {Math.round(
                filteredSales.reduce((s, a) => s + a.profit, 0)
              ).toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
