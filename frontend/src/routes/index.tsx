import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import UserCatalogPage from "@/pages/UsersCatalog/UsersCatalogPage";
import ProtectedRoute from "@/components/ProtectedRoute";
// import ChannelListPage from "@/pages/ChannelListPage";
// import ChannelPage from "@/pages/ChannelPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UserCatalogPage />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/channels"
        element={user ? <ChannelListPage /> : <Navigate to="/login" />}
      /> */}
      {/* <Route
        path="/channels/:url"
        element={user ? <ChannelPage /> : <Navigate to="/login" />}
      /> */}
    </Routes>
  );
}
