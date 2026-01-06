import { SalesRecord } from "@/app/data/salesTypes";
import * as fs from "fs";
import * as path from "path";

// In-memory storage as primary cache
let inMemorySales: SalesRecord[] = [];
let isInitialized = false;
let persistenceEnabled = false;

const getSalesFilePath = () => {
  return path.join(process.cwd(), "data", "sales.json");
};

const ensureDataDir = (): boolean => {
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    return true;
  } catch (error) {
    console.warn("Could not create data directory:", error);
    return false;
  }
};

/**
 * Initialize sales data from persistent storage
 * This should be called once when the server starts
 */
export const initializeSalesData = (): void => {
  if (isInitialized) return;

  const filePath = getSalesFilePath();
  try {
    // Check if filesystem is available
    if (ensureDataDir()) {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, "utf-8");
        inMemorySales = JSON.parse(data);
        persistenceEnabled = true;
        console.log(`Loaded ${inMemorySales.length} sales records from disk`);
      } else {
        persistenceEnabled = true;
        console.log("Sales data file will be created on first save");
      }
    } else {
      persistenceEnabled = false;
      console.warn("File system persistence disabled - using memory only");
    }
  } catch (error) {
    persistenceEnabled = false;
    console.error("Error initializing sales data:", error);
  }

  isInitialized = true;
};

/**
 * Load sales data from memory (already loaded at startup)
 */
export const loadSalesData = (): SalesRecord[] => {
  if (!isInitialized) {
    initializeSalesData();
  }
  return inMemorySales;
};

/**
 * Save sales data to both memory and disk
 * Data is guaranteed to be in memory immediately
 * Disk persistence is attempted but won't block if it fails
 */
export const saveSalesData = (data: SalesRecord[]): void => {
  // Always update in-memory copy immediately
  inMemorySales = JSON.parse(JSON.stringify(data));

  // Try to persist to disk
  if (persistenceEnabled) {
    try {
      const filePath = getSalesFilePath();
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.warn("Could not persist sales data to disk:", error);
      // Continue anyway - data is safe in memory
    }
  }
};

/**
 * Get current persistence status
 */
export const getPersistenceStatus = (): {
  enabled: boolean;
  initialized: boolean;
} => {
  return {
    enabled: persistenceEnabled,
    initialized: isInitialized,
  };
};
