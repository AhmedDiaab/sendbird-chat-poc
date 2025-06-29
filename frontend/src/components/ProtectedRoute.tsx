import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth.context";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" replace />;
  return children;
}
