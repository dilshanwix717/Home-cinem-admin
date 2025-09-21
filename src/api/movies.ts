import API_URL from "../utils/config";
import { getCurrentToken } from "../api/api";
import { Movie } from "../types/MovieTypes";

// interface Movie {
//   id: string;
//   title: string;
//   year: number;
//   genres: string[];
//   isActive: boolean;
//   price: number;
//   createdAt: string;
//   updatedAt: string;
// }

// Add a new movie
export const addMovie = async (formData: FormData): Promise<Movie> => {
  try {
    const token = await getCurrentToken();
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${API_URL}/movies`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to add movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

// Update an existing movie
export const updateMovie = async (
  id: string,
  formData: FormData
): Promise<Movie> => {
  try {
    const token = await getCurrentToken();
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${API_URL}/movies/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

// Fetch all movies
export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const token = await getCurrentToken();
    // if (!token) {
    //   throw new Error("User not authenticated");
    // }

    const response = await fetch(`${API_URL}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Toggle movie status
export const toggleMovieStatus = async (id: string): Promise<Movie> => {
  try {
    const token = await getCurrentToken();
    if (!token) {
      throw new Error("User not authenticated");
    }
    const response = await fetch(`${API_URL}/movies/${id}/toggle-status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update movie status");
    }
    return await response.json();
  } catch (error) {
    console.error("Error toggling movie status:", error);
    throw error;
  }
};
