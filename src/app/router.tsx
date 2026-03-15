import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import SubmissionSuccess from "../pages/SubmissionSuccess";

import ProtectedRoute from "../auth/ProtectedRoute";

import Onboarding from "../features/onboarding/OnboardingPage";

import DashboardLayout from "../features/dashboard/components/DashboardLayout";
import DashboardHome from "../features/dashboard/pages/DashboardHome";

import ServicesPage from "../features/dashboard/pages/ServicesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  /* ---------------- Onboarding ---------------- */

  {
    path: "/onboarding",
    element: (
      <ProtectedRoute allowedVendorStatuses={["onboarding_incomplete"]}>
        <Onboarding />
      </ProtectedRoute>
    ),
  },

  {
    path: "/submission-success",
    element: (
      <ProtectedRoute allowedVendorStatuses={["verification_pending"]}>
        <SubmissionSuccess />
      </ProtectedRoute>
    ),
  },

  /* ---------------- Dashboard ---------------- */

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedVendorStatuses={["active"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
    ],
  },

  {
    path: "/dashboard/services",
    element: (
      <ProtectedRoute allowedVendorStatuses={["active"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ServicesPage />,
      },
    ],
  },

  /* ---------------- 404 ---------------- */

  {
    path: "*",
    element: <NotFound />,
  },
]);
