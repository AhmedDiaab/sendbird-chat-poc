import { Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import UserCatalogPage from "@/pages/UsersCatalog/UsersCatalogPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="users" element={<UserCatalogPage />} />
        {/* Add more nested protected routes here */}
      </Route>
    </Routes>
  );
}
