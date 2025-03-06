import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const { userRole } = useAuth();

function RoleBasedRedirect() {
  if (userRole === "ROLE_NORMAL") return <Navigate to="/userpage" replace />;
  if (userRole === "ROLE_ADMIN") return <Navigate to="/admin/workview" replace />;
  return <Navigate to="/login" replace />;
}

export default RoleBasedRedirect;
