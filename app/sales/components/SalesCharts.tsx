"use client";

import { SalesRecord } from "@/app/data/salesTypes";

interface SalesChartsProps {
  sales: SalesRecord[];
}

export default function SalesCharts({ sales }: SalesChartsProps) {
  // Sales by bread size
  const breadSalesData: Record<string, { qty: number; amount: number }> = {};
  sales.forEach((s) => {
    if (!breadSalesData[s.breadSize]) {
      breadSalesData[s.breadSize] = { qty: 0, amount: 0 };
    }
    breadSalesData[s.breadSize].qty += s.quantity;
    breadSalesData[s.breadSize].amount += s.amount;
  });

  // Sales by customer type
  const customerData: Record<string, number> = {};
  sales.forEach((s) => {
    customerData[s.customerType] =
      (customerData[s.customerType] || 0) + s.amount;
  });

  // Top debtors
  const debtorData: Record<string, number> = {};
  sales.forEach((s) => {
    if (s.debtor) {
      debtorData[s.debtor] = (debtorData[s.debtor] || 0) + s.amount;
    }
  });
  const topDebtors = Object.entries(debtorData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Sales by Bread Size */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-amber-900 dark:text-amber-400 mb-4">
          Sales by Bread Size
        </h3>
        <div className="space-y-3">
          {Object.entries(breadSalesData).map(([size, data]) => (
            <div key={size}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {size}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {data.qty} units • ₦{data.amount.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-amber-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      (data.amount /
                        Math.max(
                          ...Object.values(breadSalesData).map((d) => d.amount)
                        )) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sales by Customer Type */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-amber-900 dark:text-amber-400 mb-4">
          Sales by Customer Type
        </h3>
        <div className="space-y-3">
          {Object.entries(customerData)
            .sort(([, a], [, b]) => b - a)
            .map(([type, amount]) => (
              <div key={type}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {type}
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    ₦{amount.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        (amount / Math.max(...Object.values(customerData))) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Top Debtors */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md md:col-span-2">
        <h3 className="text-lg font-bold text-amber-900 dark:text-amber-400 mb-4">
          Top Customers by Sales Amount
        </h3>
        {topDebtors.length > 0 ? (
          <div className="space-y-3">
            {topDebtors.map(([debtor, amount], idx) => (
              <div key={debtor} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {debtor}
                  </span>
                </div>
                <span className="text-gray-900 dark:text-gray-100 font-bold">
                  ₦{amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No debtor data available
          </p>
        )}
      </div>
    </div>
  );
}
