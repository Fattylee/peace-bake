/**
 * Authentication storage and management utilities
 */

import { UserRole } from "@/app/data/salesTypes";

export const STORAGE_KEYS = {
  AUTH: "sales_auth",
  TOKEN: "auth_token",
  ROLE: "user_role",
} as const;

export interface StoredAuth {
  token: string;
  role: UserRole;
}

/**
 * Saves authentication data to localStorage
 */
export const saveAuthToStorage = (token: string, role: UserRole): void => {
  localStorage.setItem(STORAGE_KEYS.AUTH, "true");
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.ROLE, role);
};

/**
 * Removes authentication data from localStorage
 */
export const clearAuthFromStorage = (): void => {
  localStorage.removeItem(STORAGE_KEYS.AUTH);
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.ROLE);
};

/**
 * Retrieves authentication data from localStorage
 */
export const loadAuthFromStorage = (): StoredAuth | null => {
  const auth = localStorage.getItem(STORAGE_KEYS.AUTH);
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const role = localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole | null;

  return auth === "true" && token && role ? { token, role } : null;
};
