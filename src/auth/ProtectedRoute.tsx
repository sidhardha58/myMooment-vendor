import { Navigate } from "react-router-dom";
import { useAuth } from "./UseAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedStatuses?: string[];
}

const ProtectedRoute = ({ children, allowedStatuses }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  // Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // If route requires specific statuses
  if (allowedStatuses && !allowedStatuses.includes(user.status)) {
    // Redirect based on user status
    if (user.status === "not_started") {
      return <Navigate to="/onboarding" replace />;
    }

    if (user.status === "pending") {
      return <Navigate to="/submission-success" replace />;
    }

    if (user.status === "approved") {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
