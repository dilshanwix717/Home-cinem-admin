import axios from "axios";
import { auth } from "../utils/fireBaseConfig";
import API_URL from "../utils/config";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Keep this for any non-token cookies you might need
});

// Add Firebase token to every request
api.interceptors.request.use(async (config) => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      // Get fresh token from Firebase
      const token = await currentUser.getIdToken(true);
      // console.log(token);
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error getting Firebase token:", error);
  }
  return config;
});

// Handle authentication errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If we get a 401 error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Check if we have a Firebase user
        const currentUser = auth.currentUser;
        if (currentUser) {
          // Force refresh the token
          const newToken = await currentUser.getIdToken(true);

          // Update the request header
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // Retry the original request with new token
          return api(originalRequest);
        } else {
          // No Firebase user, clear local storage and redirect to login
          localStorage.removeItem("user");
          window.location.href = "/login";
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // If token refresh fails, log out
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // For other errors, reject the promise
    return Promise.reject(error);
  }
);

// Optional: Add a function to manually get current Firebase token
export const getCurrentToken = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    return currentUser.getIdToken(true);
  }
  return null;
};
