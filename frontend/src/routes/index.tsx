import { Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import UserCatalogPage from "@/pages/UsersCatalog/UsersCatalogPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import ChannelGroupCatalogPage from "@/pages/ChannelGroupsCatalog/ChannelGroupsCatalogPage";
import ChannelGroupManageMembersPage from "@/pages/ChannelGroupsCatalog/ChannelGroupManageMembersPage";

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
        <Route path="channel-groups" element={<ChannelGroupCatalogPage />} />
        <Route
          path="/channel-groups/:url/members"
          element={<ChannelGroupManageMembersPage />}
        />
      </Route>
    </Routes>
  );
}
