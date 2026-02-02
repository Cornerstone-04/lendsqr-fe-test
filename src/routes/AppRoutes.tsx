import { createBrowserRouter, Navigate } from "react-router";
import { Login, NotFound, UserDetails, Users } from "@/pages";
import { PageLayout } from "@/components/layout";
import { ProtectedRoute } from "./ProtectedRoutes";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    element: <ProtectedRoute />,
    errorElement: <NotFound />,
    children: [
      {
        element: <PageLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/users" replace />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "users/:id",
            element: <UserDetails />,
          },
        ],
      },
    ],
  },
]);
