// Sales data types and constants
export type BreadSize = "Jumbo" | "Family" | "Family-Mini" | "Solo";
export type CustomerType =
  | "Agent"
  | "Retailer"
  | "Staff"
  | "Consumer"
  | "Depo"
  | "Bakers Bread"
  | "Gift";

export interface SalesRecord {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM:SS
  breadSize: BreadSize;
  price: number;
  quantity: number;
  amount: number; // price * quantity
  profit: number; // calculated based on cost
  debtor?: string; // customer/debtor name
  customerType: CustomerType;
  dispatcher?: string;
  notes?: string;
  createdAt: string; // ISO timestamp
}

// Default pricing (in Naira)
export const BREAD_PRICES: Record<BreadSize, number[]> = {
  Jumbo: [1500, 1450, 1400, 1350],
  Family: [1000, 930, 900, 860],
  "Family-Mini": [800, 750, 700],
  Solo: [400, 370, 350, 340],
};

// Approximate cost of goods sold (for profit calculation)
export const BREAD_COSTS: Record<BreadSize, number> = {
  Jumbo: 1156, // ~77% cost
  Family: 686, // ~74% cost
  "Family-Mini": 468, // ~62% cost
  Solo: 218, // ~58% cost
};

export const CUSTOMER_TYPES: CustomerType[] = [
  "Agent",
  "Retailer",
  "Staff",
  "Consumer",
  "Depo",
  "Bakers Bread",
  "Gift",
];

// Helper to calculate profit
export const calculateProfit = (
  breadSize: BreadSize,
  amount: number
): number => {
  const cost = BREAD_COSTS[breadSize];
  const profit = amount - cost;
  return Math.round(profit * 100) / 100;
};
