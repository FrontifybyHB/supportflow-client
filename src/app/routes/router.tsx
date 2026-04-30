import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "@/features/auth/components/LoginPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { AppLayout } from "@/shared/components/layout/AppLayout";
import { ProtectedRoute } from "./guards";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
