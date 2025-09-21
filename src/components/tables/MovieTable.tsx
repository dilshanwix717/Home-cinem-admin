import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Power, ArrowUpDown, Check, X, Loader2 } from "lucide-react";
import { Movie } from "../../types/MovieTypes";

interface MovieTableProps {
  movies: Movie[];
  onEdit: (movie: Movie) => void;
  onToggleActive: (id: string) => void;
  onSort: (field: "title" | "year") => void;
}

export const MovieTable: React.FC<MovieTableProps> = ({
  movies,
  onEdit,
  onToggleActive,
  onSort,
}) => {
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  const handleToggleActive = async (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      await onToggleActive(id);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Paginate movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>MovieID</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("title")}
                className="flex items-center gap-1"
              >
                Title
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("year")}
                className="flex items-center gap-1"
              >
                Year
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Genres</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Upcoming</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentMovies.map((movie) => (
            <TableRow key={movie._id}>
              <TableCell>{movie.movieId}</TableCell>
              <TableCell className="font-medium">{movie.title}</TableCell>
              <TableCell>{movie.year}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {movie.genres.map((genre) => (
                    <span
                      key={`${movie._id}-${genre}`}
                      className="px-2 py-1 rounded bg-[#CA168C]/10 text-xs text-[#CA168C]"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>{formatPrice(movie.price)}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  {movie.isActive ? (
                    <Check className="text-green-600 h-5 w-5" />
                  ) : (
                    <X className="text-red-600 h-5 w-5" />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  {movie.isUpcoming ? (
                    <Check className="text-green-600 h-5 w-5" />
                  ) : (
                    <X className="text-red-600 h-5 w-5" />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(movie)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant={movie.isActive ? "destructive" : "default"}
                    size="sm"
                    onClick={() => handleToggleActive(movie.movieId)}
                    disabled={loadingStates[movie.movieId]}
                    className="w-32"
                  >
                    {loadingStates[movie.movieId] ? (
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <Power className="h-4 w-4 mr-1" />
                    )}
                    {movie.isActive ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => handlePageChange(page)}
                className="px-3 py-1"
              >
                {page}
              </Button>
            )
          )}
        </div>

        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </>
  );
};
