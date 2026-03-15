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
  const { user, isAuthenticated } = useAuth();

  console.log("Auth Debug:", { user, isAuthenticated });

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const vendorStatus = user.vendor_operational_status;

  if (allowedVendorStatuses && !allowedVendorStatuses.includes(vendorStatus)) {
    switch (vendorStatus) {
      case "onboarding_incomplete":
        return <Navigate to="/onboarding" replace />;

      case "verification_pending":
        return <Navigate to="/submission-success" replace />;

      case "active":
        return <Navigate to="/dashboard" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
