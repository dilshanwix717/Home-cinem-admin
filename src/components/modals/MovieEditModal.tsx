import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MovieEditForm } from "../forms/MovieEditForm";
import { Movie } from "../../types/MovieTypes";

interface EditMovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (movieData: FormData) => Promise<void>;
}

export const EditMovieModal: React.FC<EditMovieModalProps> = ({
  movie,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<FormData>(new FormData());

  useEffect(() => {
    if (movie) {
      const data = new FormData();
      data.append("title", movie.title);
      data.append("year", movie.year.toString());
      data.append("genres", movie.genres.join(","));
      data.append("description", movie.description);
      data.append("duration", movie.duration);
      data.append("videoLink", movie.videoLink);
      data.append("trailerLink", movie.trailerLink);
      data.append("price", movie.price.toString());
      data.append("isUpcoming", movie.isUpcoming.toString());
      data.append("isActive", movie.isActive.toString());

      // Append image data if available
      if (movie.portraitImage?.url) {
        data.append(
          "portraitImage",
          JSON.stringify({
            url: movie.portraitImage.url,
            publicId: movie.portraitImage.publicId,
          })
        );
      }

      if (movie.landscapeImage?.url) {
        data.append(
          "landscapeImage",
          JSON.stringify({
            url: movie.landscapeImage.url,
            publicId: movie.landscapeImage.publicId,
          })
        );
      }

      setFormData(data);
    }
  }, [movie]);

  const handleFormDataChange = (
    field: string,
    value: string | string[] | File
  ) => {
    const newFormData = new FormData();

    // Copy all existing values from formData
    for (const [key, val] of Array.from(formData.entries())) {
      newFormData.append(key, val);
    }

    // Convert `string[]` to a comma-separated string before appending
    if (Array.isArray(value)) {
      newFormData.set(field, value.join(","));
    } else {
      newFormData.set(field, value);
    }

    setFormData(newFormData);
  };

  const handleFileChange = (field: string, file: File | null) => {
    if (file) {
      handleFormDataChange(field, file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Failed to save movie:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col bg-white">
        <DialogHeader>
          <DialogTitle>Edit Movie</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-1 py-2">
          <MovieEditForm
            formData={formData}
            onChange={handleFormDataChange}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
