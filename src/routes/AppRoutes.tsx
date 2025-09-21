import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Movies from "../pages/Movies";
import Users from "../pages/Users";
import Payments from "../pages/Payments";
import AddMovie from "../pages/AddMovie";
import Layout from "../components/Layout";
import PrivateRoute from "./PrivateRoute";
import ContactMessagesPage from "@/pages/ContactMessagesPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="movies" element={<Movies />} />
        <Route path="users" element={<Users />} />
        <Route path="payments" element={<Payments />} />
        <Route path="contacts" element={<ContactMessagesPage />} />
        <Route path="add-movie" element={<AddMovie />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
