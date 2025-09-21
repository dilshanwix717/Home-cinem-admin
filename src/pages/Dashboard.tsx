import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MovieTable } from "../components/tables/MovieTable";
import { EditMovieModal } from "../components/modals/MovieEditModal";
import { fetchMovies, toggleMovieStatus, updateMovie } from "../api/movies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import OverviewStats from "../components/OverviewStats"; // Custom component for displaying key stats
import { Movie } from "../types/MovieTypes";

const Dashboard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [sortField, setSortField] = useState<"title" | "year">("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const navigate = useNavigate(); // Hook to navigate to the Add Movie page

  useEffect(() => {
    fetchMoviesData();
  }, []);

  const fetchMoviesData = async () => {
    try {
      const data = await fetchMovies();
      setMovies(data);
    } catch (error) {
      toast.error("Failed to fetch movies");
      console.error(error);
    }
  };

  const handleEditMovie = async (formData: FormData) => {
    if (!editingMovie) return;
    try {
      const genres = formData.get("genres");
      if (typeof genres === "string") {
        formData.set(
          "genres",
          JSON.stringify(genres.split(",").map((g) => g.trim()))
        );
      }
      console.log(formData.get("genres"));
      await updateMovie(editingMovie.movieId, formData); // Ensure the backend can handle FormData
      toast.success("Movie updated successfully");
      fetchMoviesData();
    } catch (error) {
      toast.error("Failed to update movie");
      console.error(error);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      await toggleMovieStatus(id);
      toast.success("Movie status updated successfully");
      fetchMoviesData();
    } catch (error) {
      toast.error("Failed to update movie status");
      console.error(error);
    }
  };

  const allGenres = Array.from(
    new Set(movies.flatMap((movie) => movie.genres))
  ).sort();

  const filteredMovies = movies
    .filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGenre =
        selectedGenre === "all" || movie.genres.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      const compareValue =
        sortField === "title"
          ? a.title.localeCompare(b.title)
          : a.year - b.year;
      return sortOrder === "asc" ? compareValue : -compareValue;
    });

  const toggleSort = (field: "title" | "year") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#CA168C] mb-6">Dashboard</h1>

      {/* Overview Stats */}
      <OverviewStats />

      {/* Movies Management */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#CA168C]">
            Movies Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Add Movie Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => navigate("/add-movie")} // Navigate to Add Movie page
                className="px-6 py-2 bg-[#CA168C] text-white font-bold rounded-md shadow hover:bg-[#b5172d] transition-colors"
              >
                Add Movie
              </button>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#CA168C]" />
                <Input
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {allGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <MovieTable
              movies={filteredMovies}
              onEdit={setEditingMovie}
              onToggleActive={handleToggleActive}
              //sortField={sortField}
              //sortOrder={sortOrder}
              onSort={toggleSort}
            />
            <EditMovieModal
              movie={editingMovie}
              isOpen={!!editingMovie}
              onClose={() => setEditingMovie(null)}
              onSave={handleEditMovie}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
