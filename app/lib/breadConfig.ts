/**
 * Bread production costs configuration
 * Loads from environment variables - errors if not found
 */

export type BreadSize = "Jumbo" | "Family" | "Family-Mini" | "Solo";

// Parse string as number, throw error if not valid
const parseEnvNumber = (value: string | undefined, name: string): number => {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Please set it in .env.local`
    );
  }

  const parsed = parseFloat(value);
  if (isNaN(parsed)) {
    throw new Error(
      `Invalid number for ${name}: "${value}". Please provide a valid number in .env.local`
    );
  }
  return parsed;
};

/**
 * Bread production costs (in Naira)
 * NEXT_PUBLIC_ variables must be accessed statically - not with dynamic keys
 */
export const BREAD_COSTS: Record<BreadSize, number> = {
  Jumbo: parseEnvNumber(
    process.env.NEXT_PUBLIC_BREAD_COST_JUMBO,
    "NEXT_PUBLIC_BREAD_COST_JUMBO"
  ),
  Family: parseEnvNumber(
    process.env.NEXT_PUBLIC_BREAD_COST_FAMILY,
    "NEXT_PUBLIC_BREAD_COST_FAMILY"
  ),
  "Family-Mini": parseEnvNumber(
    process.env.NEXT_PUBLIC_BREAD_COST_FAMILY_MINI,
    "NEXT_PUBLIC_BREAD_COST_FAMILY_MINI"
  ),
  Solo: parseEnvNumber(
    process.env.NEXT_PUBLIC_BREAD_COST_SOLO,
    "NEXT_PUBLIC_BREAD_COST_SOLO"
  ),
};
