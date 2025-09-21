import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search, Power, Loader2, Film } from "lucide-react";
import { Input } from "../ui/input";
import { User } from "@/types/UserTyps";

interface UserTableProps {
  users: User[];
  onSort: (field: "name" | "email" | "contact" | "userId") => void;
  sortField: "name" | "email" | "contact" | "userId";
  sortOrder: "asc" | "desc";
  onSearch: (query: string) => void;
  onToggleActive: (userId: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onSort,
  sortField,
  sortOrder,
  onSearch,
  onToggleActive,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleToggleActive = async (userId: string) => {
    setLoadingStates((prev) => ({ ...prev, [userId]: true }));
    try {
      await onToggleActive(userId);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [userId]: false }));
    }
  };

  // Paginate users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#CA168C]" />
          <Input
            placeholder="Search by User ID Name or Email"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>
      </div>

      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("userId")}
                className="flex items-center gap-1"
              >
                User ID
                {sortField === "userId" && (
                  <ArrowUpDown
                    className={`h-4 w-4 ${
                      sortOrder === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("name")}
                className="flex items-center gap-1"
              >
                Name
                {sortField === "name" && (
                  <ArrowUpDown
                    className={`h-4 w-4 ${
                      sortOrder === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("email")}
                className="flex items-center gap-1"
              >
                Email
                {sortField === "email" && (
                  <ArrowUpDown
                    className={`h-4 w-4 ${
                      sortOrder === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("contact")}
                className="flex items-center gap-1"
              >
                Contact Number
                {sortField === "contact" && (
                  <ArrowUpDown
                    className={`h-4 w-4 ${
                      sortOrder === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Button>
            </TableHead>
            <TableHead>Purchased Movies</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.contact}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Film className="h-4 w-4 mr-2" />
                      {user.purchasedMovies.length} Movies
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-white">
                    <div className="space-y-2">
                      <h4 className="font-medium">Purchased Movies</h4>
                      <div className="max-h-48 overflow-auto">
                        {user.purchasedMovies.map((movie, index) => (
                          <div
                            key={movie.movieId}
                            className="flex items-start space-x-2 py-2 border-b last:border-0"
                          >
                            <span className="font-medium text-[#CA168C] min-w-6">
                              {index + 1}.
                            </span>
                            <div className="flex-1">
                              <p className="font-medium">{movie.title}</p>
                              <p className="text-xs text-gray-500">
                                ID: {movie.movieId}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>
                <Button
                  variant={user.isActive ? "destructive" : "default"}
                  size="sm"
                  onClick={() => handleToggleActive(user.userId)}
                  disabled={loadingStates[user.userId]}
                  className="w-32"
                >
                  {loadingStates[user.userId] ? (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Power className="h-4 w-4 mr-1" />
                  )}
                  {user.isActive ? "Deactivate" : "Activate"}
                </Button>
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
    </div>
  );
};
