import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchUsers, toggleUserStatus } from "../api/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserTable } from "../components/tables/UsersTable";
import { User } from "@/types/UserTyps";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Track the search term
  const [sortField, setSortField] = useState<
    "name" | "email" | "contact" | "userId"
  >("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const data: User[] = await fetchUsers(); // Explicitly define the return type as User[]
      const formattedData = data.map((user) => ({
        ...user,
        purchasedMovies: user.purchasedMovies.map((movie) => ({
          movieId: movie.movieId,
          title: movie.title,
        })),
      }));
      //console.log(formattedData);
      setUsers(formattedData);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.log(error);
    }
  };
  const handleToggleActive = async (userId: string) => {
    try {
      await toggleUserStatus(userId);
      toast.success("User status updated successfully");
      fetchUsersData();
    } catch (error) {
      toast.error("Failed to update user status");
      console.error(error);
    }
  };

  const filteredUsers = users
    .filter(
      (user) =>
        (user.firstName &&
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.email &&
          user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.userId &&
          user.userId.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const getNumericPart = (userId: string) =>
        parseInt(userId.replace(/[^\d]/g, ""), 10); // Extract numeric part

      const compareValue =
        sortField === "name"
          ? (a.firstName + " " + a.lastName).localeCompare(
              b.firstName + " " + b.lastName
            )
          : sortField === "email"
          ? (a.email || "").localeCompare(b.email || "")
          : sortField === "userId"
          ? getNumericPart(a.userId) - getNumericPart(b.userId) // Compare numeric parts of userId
          : (a.contact || "").localeCompare(b.contact || "");

      return sortOrder === "asc" ? compareValue : -compareValue;
    });

  const toggleSort = (field: "name" | "email" | "contact" | "userId") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query); // Update search term on search change
  };

  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-[#CA168C]">
          Users Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <UserTable
            users={filteredUsers}
            onSort={toggleSort}
            sortField={sortField}
            sortOrder={sortOrder}
            onSearch={handleSearch}
            onToggleActive={handleToggleActive}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersPage;
