import { SalesRecord } from "@/app/data/salesTypes";
import * as fs from "fs";
import * as path from "path";

// In-memory fallback storage
let inMemorySales: SalesRecord[] = [];
let loadedFromFile = false;

const getSalesFilePath = () => {
  return path.join(process.cwd(), "data", "sales.json");
};

const ensureDataDir = () => {
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  } catch (error) {
    console.warn("Could not create data directory:", error);
  }
};

export const loadSalesData = (): SalesRecord[] => {
  // If we've already loaded from file, use in-memory copy
  if (loadedFromFile) {
    return inMemorySales;
  }

  ensureDataDir();
  const filePath = getSalesFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      inMemorySales = JSON.parse(data);
      loadedFromFile = true;
      return inMemorySales;
    }
  } catch (error) {
    console.error("Error loading sales data from file:", error);
  }

  loadedFromFile = true;
  return inMemorySales;
};

export const saveSalesData = (data: SalesRecord[]) => {
  // Always update in-memory copy
  inMemorySales = JSON.parse(JSON.stringify(data));

  // Try to persist to file, but don't fail if unable (for serverless environments)
  try {
    ensureDataDir();
    const filePath = getSalesFilePath();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.warn("Could not persist sales data to file system:", error);
    console.warn(
      "Data will be stored in memory. Use a proper database for production."
    );
  }
};
