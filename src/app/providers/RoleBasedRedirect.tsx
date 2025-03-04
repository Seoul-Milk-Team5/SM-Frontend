import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

type UserRole = "ROLE_ADMIN" | "ROLE_NORMAL";

// 실제로는 context나 전역 상태에서 가져와야 함
// const { userRole } = useAuth();
const userRole: UserRole = "ROLE_ADMIN";

function RoleBasedRedirect() {
  if (userRole === "ROLE_NORMAL") return <Navigate to="/userpage" replace />;
  if (userRole === "ROLE_ADMIN") return <Navigate to="/admin/workview" replace />;
  return <Navigate to="/login" replace />;
}

export default RoleBasedRedirect;
