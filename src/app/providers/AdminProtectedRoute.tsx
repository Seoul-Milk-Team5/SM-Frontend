import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function AdminProtectedRoute() {
  const { userRole } = useAuth(); // user.role에서 역할 확인

  if (!userRole || userRole === "ROLE_NORMAL") {
    return <Navigate to="/dashboard/file" replace />; // 일반 사원은 대시보드로 이동
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
