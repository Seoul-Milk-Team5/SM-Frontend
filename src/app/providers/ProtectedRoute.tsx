import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function ProtectedRoute() {
  const { getUser } = useAuth();

  if (getUser()) {
    return <Navigate to="/dashboard/file" replace />;
  } else {
    return <Outlet />;
  }
}

export default ProtectedRoute;
