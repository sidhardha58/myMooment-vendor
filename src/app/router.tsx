import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import SubmissionSuccess from "../pages/SubmissionSuccess";

import ProtectedRoute from "../auth/ProtectedRoute";

import Onboarding from "../features/onboarding/OnboardingPage";

import DashboardLayout from "../features/dashboard/components/DashboardLayout";
import DashboardHome from "../features/dashboard/pages/DashboardHome";
// import BookingsPage from "../features/dashboard/pages/BookingsPage";
// import RevenuePage from "../features/dashboard/pages/RevenuePage";
// import ReportsPage from "../features/dashboard/pages/ReportsPage";
// import ServicesPage from "../features/dashboard/pages/ServicesPage";
// import DocumentsPage from "../features/dashboard/pages/DocumentsPage";
// import TicketsPage from "../features/dashboard/pages/TicketsPage";
// import CouponsPage from "../features/dashboard/pages/CouponsPage";
// import ProfilePage from "../features/dashboard/pages/ProfilePage";

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
      <ProtectedRoute allowedStatuses={["not_started"]}>
        <Onboarding />
      </ProtectedRoute>
    ),
  },

  {
    path: "/submission-success",
    element: (
      <ProtectedRoute allowedStatuses={["pending"]}>
        <SubmissionSuccess />
      </ProtectedRoute>
    ),
  },

  /* ---------------- Dashboard ---------------- */

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedStatuses={["approved"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      // {
      //   path: "bookings",
      //   element: <BookingsPage />,
      // },
      // {
      //   path: "revenue",
      //   element: <RevenuePage />,
      // },
      // {
      //   path: "reports",
      //   element: <ReportsPage />,
      // },
      // {
      //   path: "services",
      //   element: <ServicesPage />,
      // },
      // {
      //   path: "documents",
      //   element: <DocumentsPage />,
      // },
      // {
      //   path: "tickets",
      //   element: <TicketsPage />,
      // },
      // {
      //   path: "coupons",
      //   element: <CouponsPage />,
      // },
      // {
      //   path: "profile",
      //   element: <ProfilePage />,
      // },
    ],
  },

  /* ---------------- 404 ---------------- */

  {
    path: "*",
    element: <NotFound />,
  },
]);
