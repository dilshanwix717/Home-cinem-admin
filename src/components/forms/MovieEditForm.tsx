import React, { useState, useEffect } from "react";
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

interface MovieEditFormProps {
  formData: FormData;
  onChange: (field: string, value: string | File | string[]) => void;
  onFileChange: (field: string, file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const MovieEditForm: React.FC<MovieEditFormProps> = ({
  formData,
  onChange,
  onFileChange,
  onSubmit,
  onCancel,
}) => {
  const [portraitPreview, setPortraitPreview] = useState<string | null>(null);
  const [landscapePreview, setLandscapePreview] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Initialize image previews and genres
  useEffect(() => {
    const portraitImage = formData.get("portraitImage");
    const landscapeImage = formData.get("landscapeImage");
    const genres = formData.get("genres");

    // Handle portrait image
    if (typeof portraitImage === "string") {
      try {
        const parsed = JSON.parse(portraitImage);
        if (parsed.url) setPortraitPreview(parsed.url);
      } catch {
        console.error("Failed to parse portraitImage JSON");
      }
    }

    // Handle landscape image
    if (typeof landscapeImage === "string") {
      try {
        const parsed = JSON.parse(landscapeImage);
        if (parsed.url) setLandscapePreview(parsed.url);
      } catch {
        console.error("Failed to parse landscapeImage JSON");
      }
    }

    // Handle genres
    if (typeof genres === "string") {
      try {
        // First try to parse as JSON in case it's stored that way
        const parsedGenres = JSON.parse(genres);
        setSelectedGenres(parsedGenres);
      } catch {
        // If not JSON, split the comma-separated string
        const genreArray = genres
          .split(",")
          .map((g) => g.trim())
          .filter(Boolean);
        setSelectedGenres(genreArray);
      }
    }
  }, [formData]);

  // Handle file change and update previews
  const handleFileChange = (field: string, file: File | null) => {
    onFileChange(field, file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      if (field === "portraitImage") setPortraitPreview(previewURL);
      if (field === "landscapeImage") setLandscapePreview(previewURL);
    } else {
      if (field === "portraitImage") setPortraitPreview(null);
      if (field === "landscapeImage") setLandscapePreview(null);
    }
  };

  // Handle genre selection
  const handleGenreChange = (selectedGenre: string) => {
    const updatedGenres = selectedGenres.includes(selectedGenre)
      ? selectedGenres.filter((g) => g !== selectedGenre)
      : [...selectedGenres, selectedGenre];

    setSelectedGenres(updatedGenres);
    onChange("genres", updatedGenres);
    console.log(updatedGenres);
  };

  // Handle genre removal
  const removeGenre = (genreToRemove: string) => {
    const updatedGenres = selectedGenres.filter(
      (genre) => genre !== genreToRemove
    );
    setSelectedGenres(updatedGenres);
    onChange("genres", updatedGenres);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Basic Information Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={(formData.get("title") as string) || ""}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="Movie title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={(formData.get("duration") as string) || ""}
              onChange={(e) => onChange("duration", e.target.value)}
              placeholder="2h 30m"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={(formData.get("description") as string) || ""}
              onChange={(e) => onChange("description", e.target.value)}
              className="min-h-[100px]"
              placeholder="Movie description..."
            />
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Movie Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              value={(formData.get("year") as string) || ""}
              onChange={(e) => onChange("year", e.target.value)}
              placeholder="2024"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={(formData.get("price") as string) || ""}
              onChange={(e) => onChange("price", e.target.value)}
              placeholder="9.99"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label>Genres</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedGenres.map((genre) => (
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
                    disabled={selectedGenres.includes(genre)}
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
      <div>
        <h3 className="text-lg font-semibold mb-4">Media Links</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="videoLink">Video Link</Label>
            <Input
              id="videoLink"
              value={(formData.get("videoLink") as string) || ""}
              onChange={(e) => onChange("videoLink", e.target.value)}
              placeholder="https://example.com/video"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trailerLink">Trailer Link</Label>
            <Input
              id="trailerLink"
              value={(formData.get("trailerLink") as string) || ""}
              onChange={(e) => onChange("trailerLink", e.target.value)}
              placeholder="https://example.com/trailer"
            />
          </div>
        </div>
      </div>

      {/* Status Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Status</h3>
        <div className="flex flex-row gap-14">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isUpcoming"
              checked={formData.get("isUpcoming") === "true"}
              onCheckedChange={(checked) =>
                onChange("isUpcoming", checked ? "true" : "false")
              }
            />
            <Label htmlFor="isUpcoming">Upcoming</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.get("isActive") === "true"}
              onCheckedChange={(checked) =>
                onChange("isActive", checked ? "true" : "false")
              }
            />
            <Label htmlFor="isActive">Active</Label>
          </div>
        </div>
      </div>

      {/* Image Upload Section with Previews */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Images</h3>
        <div className="grid grid-cols-2 gap-8">
          {/* Portrait Image */}
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
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleFileChange("portraitImage", e.target.files?.[0] || null)
                }
              />
            </label>
            {portraitPreview ? (
              <img
                src={portraitPreview}
                alt="Portrait Preview"
                className="w-48 h-64 object-cover rounded-lg shadow-lg border-2 border-[#CA168C]"
              />
            ) : (
              <div className="w-48 h-64 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-[#CA168C]">
                <span className="text-sm text-gray-500">No Image Selected</span>
              </div>
            )}
          </div>

          {/* Landscape Image */}
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
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleFileChange(
                    "landscapeImage",
                    e.target.files?.[0] || null
                  )
                }
              />
            </label>
            {landscapePreview ? (
              <img
                src={landscapePreview}
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
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="min-w-[100px]"
        >
          Cancel
        </Button>
        <Button type="submit" className="min-w-[100px]">
          Save Changes
        </Button>
      </div>
    </form>
  );
};
