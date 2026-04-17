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
import ProfilePage from "../features/dashboard/pages/ProfilePage";
import TicketsPage from "../features/dashboard/pages/TicketsPage";
import CouponsPage from "../features/dashboard/pages/CouponsPage";
import SettingsPage from "../features/dashboard/pages/SettingsPage";

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
      { index: true, element: <DashboardHome /> },
      { path: "services", element: <ServicesPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "support", element: <TicketsPage /> },
      { path: "coupons", element: <CouponsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },

  /* ---------------- 404 ---------------- */

  {
    path: "*",
    element: <NotFound />,
  },
]);
