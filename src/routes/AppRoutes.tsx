import { createBrowserRouter } from "react-router";

import { Dashboard, Login, UserDetails, Users } from "../pages";
import { PageLayout } from "../components/layout";
import ProtectedRoute from "./ProtectedRoutes";
import NotFound from "../pages/NotFound/not-found";

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
            element: <Dashboard />,
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
