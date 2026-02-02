import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "@/utils/auth";

export const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
