"use client";

import { SalesRecord } from "@/app/data/salesTypes";

interface SalesStatsProps {
  sales: SalesRecord[];
}

export default function SalesStats({ sales }: SalesStatsProps) {
  const totalSales = sales.reduce((sum, s) => sum + s.amount, 0);
  const totalProfit = sales.reduce((sum, s) => sum + s.profit, 0);
  const totalUnits = sales.reduce((sum, s) => sum + s.quantity, 0);
  const avgTransaction = sales.length > 0 ? totalSales / sales.length : 0;

  // Find best selling bread
  const breadCount: Record<string, number> = {};
  sales.forEach((s) => {
    breadCount[s.breadSize] = (breadCount[s.breadSize] || 0) + s.quantity;
  });
  const bestBread =
    Object.entries(breadCount).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A";

  // Find top debtor/customer
  const debtorCount: Record<string, number> = {};
  sales.forEach((s) => {
    if (s.debtor) {
      debtorCount[s.debtor] = (debtorCount[s.debtor] || 0) + s.amount;
    }
  });

  const stats = [
    {
      label: "Total Sales",
      value: `₦${totalSales.toLocaleString()}`,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Total Profit",
      value: `₦${Math.round(totalProfit).toLocaleString()}`,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Units Sold",
      value: totalUnits.toString(),
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Transactions",
      value: sales.length.toString(),
      color: "from-amber-500 to-amber-600",
    },
    {
      label: "Avg Transaction",
      value: `₦${Math.round(avgTransaction).toLocaleString()}`,
      color: "from-pink-500 to-pink-600",
    },
    {
      label: "Best Selling",
      value: bestBread,
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`bg-gradient-to-br ${stat.color} text-white p-6 rounded-xl shadow-lg`}
        >
          <p className="text-sm opacity-90 mb-2">{stat.label}</p>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
