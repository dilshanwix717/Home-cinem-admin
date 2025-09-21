import { api } from "./api";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../utils/fireBaseConfig";
import { AxiosError } from "axios";

export const authService = {
  login: async (email: string, password: string) => {
    try {
      // Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseToken = await userCredential.user.getIdToken();
      console.log(firebaseToken);
      // Backend login with Firebase token
      const response = await api.post("/auth/login", {
        firebaseToken,
      });

      localStorage.setItem("user", JSON.stringify(response.data.result));
      // Store access token specifically
      localStorage.setItem("accessToken", firebaseToken);

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Login failed - Axios error", error.response?.data);
      } else {
        console.error("Login failed - Unknown error", error);
      }
      throw error;
    }
  },

  logout: async () => {
    try {
      // Firebase logout
      await signOut(auth);
    } finally {
      // Clear local storage
      localStorage.removeItem("user");
    }
  },

  // Get current Firebase token for API calls
  getCurrentToken: async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      return currentUser.getIdToken(true);
    }
    return null;
  },
};
