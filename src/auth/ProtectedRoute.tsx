import { Navigate } from "react-router-dom";
import { useAuth } from "./UseAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedVendorStatuses?: string[];
}

const ProtectedRoute = ({
  children,
  allowedVendorStatuses,
}: ProtectedRouteProps) => {
  const { user, profile, isAuthenticated } = useAuth();

  console.log("ProtectedRoute Debug:", { user, profile, isAuthenticated });

  if (!isAuthenticated || !user || !profile) {
    return <Navigate to="/login" replace />;
  }

  const vendorStatus = profile.vendor_operational_status || "";

  console.log("ProtectedRoute Vendor Status:", vendorStatus);

  if (allowedVendorStatuses && !allowedVendorStatuses.includes(vendorStatus)) {
    switch (vendorStatus) {
      case "onboarding_incomplete":
        return <Navigate to="/onboarding" replace />;

      case "verification_pending":
        return <Navigate to="/submission-success" replace />;

      case "active":
      case "completed":
        return <Navigate to="/dashboard" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
