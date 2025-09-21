import API_URL from "../utils/config";

import { getCurrentToken } from "../api/api";

export const fetchPayments = async () => {
  try {
    // Fetch the current token dynamically
    const token = await getCurrentToken();
    if (!token) {
      throw new Error("User not authenticated");
    }
    const response = await fetch(`${API_URL}/payments`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch payments");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};
