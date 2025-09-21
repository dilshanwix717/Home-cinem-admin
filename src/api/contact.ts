import API_URL from "../utils/config";

import { getCurrentToken } from "../api/api";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

// Fetch contact messages
export const fetchContactMessages = async (): Promise<ContactMessage[]> => {
  try {
    const token = await getCurrentToken();
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${API_URL}/contact/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch contact messages");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    throw error;
  }
};
