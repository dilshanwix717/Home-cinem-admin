import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const GENRE_OPTIONS = [
  "Action",
  "Drama",
  "Sci-fi",
  "Comedy",
  "Horror",
  "Fantasy",
  "Thriller",
  "Romance",
  "Documentary",
  "Crime",
  "Adventure",
  "Animation",
  "Historical",
] as const;

interface Movie {
  title: string;
  year: string;
  genres: string[];
  description: string;
  duration: string;
  videoLink: string;
  trailerLink: string;
  price: string;
  isUpcoming: boolean;
  portraitImage: File | null;
  landscapeImage: File | null;
}

interface MovieAddFormProps {
  movie: Movie;
  previews: {
    portraitImage: string;
    landscapeImage: string;
  };
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: unknown } }
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const MovieAddForm: React.FC<MovieAddFormProps> = ({
  movie,
  previews,
  onChange,
  onSubmit,
}) => {
  const genres = movie.genres || [];

  const handleIsUpcomingChange = (checked: boolean) => {
    onChange({
      target: {
        name: "isUpcoming",
        value: checked,
      },
    });
  };

  const handleGenreChange = (selectedGenre: string) => {
    const updatedGenres = genres.includes(selectedGenre)
      ? genres.filter((g) => g !== selectedGenre)
      : [...genres, selectedGenre];

    onChange({
      target: {
        name: "genres",
        value: updatedGenres,
      },
    });
  };

  const removeGenre = (genreToRemove: string) => {
    onChange({
      target: {
        name: "genres",
        value: genres.filter((genre) => genre !== genreToRemove),
      },
    });
  };

  return (
    <form onSubmit={onSubmit} className="px-16 pb-20">
      {/* Basic Information Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={movie.title}
              onChange={onChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              name="duration"
              value={movie.duration}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={movie.description}
              onChange={onChange}
              required
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Movie Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              name="year"
              type="number"
              value={movie.year}
              onChange={onChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={movie.price}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label>Genres</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {genre}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeGenre(genre)}
                  />
                </Badge>
              ))}
            </div>
            <Select onValueChange={handleGenreChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
                {GENRE_OPTIONS.map((genre) => (
                  <SelectItem
                    key={genre}
                    value={genre}
                    disabled={genres.includes(genre)}
                  >
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Media Links Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Media Links</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="videoLink">Video Link</Label>
            <Input
              id="videoLink"
              name="videoLink"
              type="url"
              value={movie.videoLink}
              onChange={onChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trailerLink">Trailer Link</Label>
            <Input
              id="trailerLink"
              name="trailerLink"
              type="url"
              value={movie.trailerLink}
              onChange={onChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Status Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Status</h3>
        <div className="flex space-x-8">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isUpcoming"
              name="isUpcoming"
              checked={movie.isUpcoming}
              onCheckedChange={handleIsUpcomingChange}
            />
            <Label htmlFor="isUpcoming">Is Upcoming</Label>
          </div>
        </div>
      </div>

      {/* Image Previews */}
      {/* Image Previews */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Portrait */}
        <div className="flex flex-col items-center space-y-4">
          <Label htmlFor="portraitImage" className="text-lg font-semibold">
            Portrait Image
          </Label>
          <label
            htmlFor="portraitImage"
            className="cursor-pointer bg-[#CA168C] text-white hover:bg-[#b0127c] px-6 py-2 rounded-md"
          >
            Select Portrait
            <Input
              id="portraitImage"
              name="portraitImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onChange}
            />
          </label>
          {previews.portraitImage ? (
            <img
              src={previews.portraitImage}
              alt="Portrait Preview"
              className="w-48 h-64 object-cover rounded-lg shadow-lg border-2 border-[#CA168C]"
            />
          ) : (
            <div className="w-48 h-64 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-[#CA168C]">
              <span className="text-sm text-gray-500">No Image Selected</span>
            </div>
          )}
        </div>
        {/* Landscape */}
        <div className="flex flex-col items-center space-y-4">
          <Label htmlFor="landscapeImage" className="text-lg font-semibold">
            Landscape Image
          </Label>
          <label
            htmlFor="landscapeImage"
            className="cursor-pointer bg-[#CA168C] text-white hover:bg-[#b0127c] px-6 py-2 rounded-md"
          >
            Select Landscape
            <Input
              id="landscapeImage"
              name="landscapeImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onChange}
            />
          </label>
          {previews.landscapeImage ? (
            <img
              src={previews.landscapeImage}
              alt="Landscape Preview"
              className="w-64 h-36 object-cover rounded-lg shadow-lg border-2 border-[#CA168C]"
            />
          ) : (
            <div className="w-64 h-36 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-[#CA168C]">
              <span className="text-sm text-gray-500">No Image Selected</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <Button type="submit">Add Movie</Button>
      </div>
    </form>
  );
};

export default MovieAddForm;
