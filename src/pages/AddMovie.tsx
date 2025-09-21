import React, { useState } from "react";
import { toast } from "react-toastify";
import { addMovie } from "../api/movies";
import MovieAddForm from "../components/forms/MovieAddForm";

const AddMovie: React.FC = () => {
  const [movie, setMovie] = useState({
    title: "",
    year: "",
    genres: [] as string[],
    description: "",
    duration: "",
    videoLink: "",
    trailerLink: "",
    price: "",
    isUpcoming: false,
    portraitImage: null as File | null,
    landscapeImage: null as File | null,
  });

  const [previews, setPreviews] = useState({
    portraitImage: "",
    landscapeImage: "",
  });

  // Handle input changes
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: unknown } }
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | { name: string; value: unknown };

    if ("type" in target) {
      // Handle HTML input elements
      if (target.type === "file" && target instanceof HTMLInputElement) {
        const file = target.files?.[0];
        if (file) {
          setMovie((prev) => ({ ...prev, [target.name]: file }));
          const previewUrl = URL.createObjectURL(file);
          setPreviews((prev) => ({ ...prev, [target.name]: previewUrl }));
        }
      } else {
        const value =
          target.type === "checkbox"
            ? (target as HTMLInputElement).checked
            : target.value;

        setMovie((prev) => ({ ...prev, [target.name]: value }));
      }
    } else {
      // Handle custom events (like genre selection)
      setMovie((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append all text fields
      formData.append("title", movie.title);
      formData.append("year", movie.year);
      formData.append("genres", JSON.stringify(movie.genres));
      formData.append("description", movie.description);
      formData.append("duration", movie.duration);
      formData.append("videoLink", movie.videoLink);
      formData.append("trailerLink", movie.trailerLink);
      formData.append("price", movie.price);
      formData.append("isUpcoming", movie.isUpcoming ? "true" : "false");

      // Append images
      if (movie.portraitImage) {
        formData.append("portraitImage", movie.portraitImage);
      }
      if (movie.landscapeImage) {
        formData.append("landscapeImage", movie.landscapeImage);
      }

      await addMovie(formData);
      toast.success("Movie added successfully");

      // Clear form and previews
      setMovie({
        title: "",
        year: "",
        genres: [],
        description: "",
        duration: "",
        videoLink: "",
        trailerLink: "",
        price: "",
        isUpcoming: false,
        portraitImage: null,
        landscapeImage: null,
      });
      setPreviews({
        portraitImage: "",
        landscapeImage: "",
      });
    } catch (error) {
      toast.error("Failed to add movie");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Movie</h1>
      <MovieAddForm
        movie={movie}
        previews={previews}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddMovie;
