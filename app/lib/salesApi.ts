/**
 * Sales API utilities for managing API calls
 */

const API_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  SALES: "/api/sales",
} as const;

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    role: "admin" | "sales_rep";
  };
}

export interface ApiError {
  error: string;
}

/**
 * Authenticates user and returns token
 */
export const loginUser = async (
  credentials: LoginPayload
): Promise<LoginResponse> => {
  const response = await fetch(API_ENDPOINTS.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Invalid username or password");
  }

  return data;
};

/**
 * Fetches sales for a specific date
 */
export const fetchSalesByDate = async (
  date: string,
  token: string
): Promise<unknown[]> => {
  const response = await fetch(`${API_ENDPOINTS.SALES}?date=${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch sales");
  }

  return response.json();
};

/**
 * Fetches sales for a date range
 */
export const fetchSalesByRange = async (
  startDate: string,
  endDate: string,
  token: string
): Promise<unknown[]> => {
  const response = await fetch(
    `${API_ENDPOINTS.SALES}?startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch sales");
  }

  return response.json();
};

/**
 * Deletes a sale record
 */
export const deleteSale = async (id: string, token: string): Promise<void> => {
  const response = await fetch(`${API_ENDPOINTS.SALES}?id=${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = (await response.json()) as ApiError;
    throw new Error(data.error || "Failed to delete sale");
  }
};
