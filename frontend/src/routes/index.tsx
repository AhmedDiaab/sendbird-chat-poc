import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "@/contexts/auth.context";
import LoginPage from "@/pages/LoginPage";
// import ChannelListPage from "@/pages/ChannelListPage";
// import ChannelPage from "@/pages/ChannelPage";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route
        path="/channels"
        element={user ? <ChannelListPage /> : <Navigate to="/login" />}
      /> */}
      {/* <Route
        path="/channels/:url"
        element={user ? <ChannelPage /> : <Navigate to="/login" />}
      /> */}
      <Route
        path="*"
        element={<Navigate to={user ? "/channels" : "/login"} />}
      />
    </Routes>
  );
}
