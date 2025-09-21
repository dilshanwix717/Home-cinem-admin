import API_URL from "../utils/config";

import { getCurrentToken } from "../api/api";
import { User } from "@/types/UserTyps";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    // Fetch the current token dynamically
    const token = await getCurrentToken();
    if (!token) {
      throw new Error("User not authenticated");
    }
    const response = await fetch(`${API_URL}/admin/getAllUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const toggleUserStatus = async (userId: string): Promise<User> => {
  try {
    const token = await getCurrentToken();
    if (!token) {
      throw new Error("User not authenticated");
    }
    console.log(userId);
    const response = await fetch(`${API_URL}/users/${userId}/toggle-status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update user status");
    }

    return await response.json();
  } catch (error) {
    console.error("Error toggling user status:", error);
    throw error;
  }
};
