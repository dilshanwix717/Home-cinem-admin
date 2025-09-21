import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchMovies } from "../api/movies"; // Assuming you have an API to fetch movies
import { Movie } from "../types/MovieTypes";

const OverviewStats: React.FC = () => {
  const [stats, setStats] = useState({
    totalMovies: 0,
    activeMovies: 0,
    inactiveMovies: 0,
    upcomingMovies: 0,
  });

  useEffect(() => {
    fetchMoviesData();
  }, []);

  const fetchMoviesData = async () => {
    try {
      const movies: Movie[] = await fetchMovies(); // Assuming fetchMovies fetches all movies
      setStats({
        totalMovies: movies.length,
        activeMovies: movies.filter((movie) => movie.isActive).length,
        inactiveMovies: movies.filter((movie) => !movie.isActive).length,
        upcomingMovies: movies.filter((movie) => movie.isUpcoming).length,
      });
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#CA168C]">
          Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center bg-[#f9f9f9] p-4 rounded-md shadow-sm">
            <h3 className="text-xl font-semibold">Total Movies</h3>
            <p className="text-2xl font-bold">{stats.totalMovies}</p>
          </div>
          <div className="flex flex-col items-center bg-[#f9f9f9] p-4 rounded-md shadow-sm">
            <h3 className="text-xl font-semibold">Active Movies</h3>
            <p className="text-2xl font-bold text-green-600">
              {stats.activeMovies}
            </p>
          </div>
          <div className="flex flex-col items-center bg-[#f9f9f9] p-4 rounded-md shadow-sm">
            <h3 className="text-xl font-semibold">Inactive Movies</h3>
            <p className="text-2xl font-bold text-red-600">
              {stats.inactiveMovies}
            </p>
          </div>
          <div className="flex flex-col items-center bg-[#f9f9f9] p-4 rounded-md shadow-sm">
            <h3 className="text-xl font-semibold">Upcoming Movies</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.upcomingMovies}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewStats;
