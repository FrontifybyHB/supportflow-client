import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import { AppLayout } from "@/shared/components/layout/AppLayout";
import { ProtectedRoute } from "./guards";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import VerifyEmail from "@/features/auth/pages/VerifyEmail";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";
import ResetPassword from "@/features/auth/pages/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail/>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword/>,
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
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
