import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");

    // Clear any additional application-specific storage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");

    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-full">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Movie Admin</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="block py-2 px-4 hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/add-movie"
                className="block py-2 px-4 hover:bg-gray-700"
              >
                Add Movie
              </Link>
            </li>
            <li>
              <Link to="/movies" className="block py-2 px-4 hover:bg-gray-700">
                Movies
              </Link>
            </li>
            <li>
              <Link to="/users" className="block py-2 px-4 hover:bg-gray-700">
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/payments"
                className="block py-2 px-4 hover:bg-gray-700"
              >
                Payments
              </Link>
            </li>
            <li>
              <Link
                to="/contacts"
                className="block py-2 px-4 hover:bg-gray-700"
              >
                Messages
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-0 w-64 p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
