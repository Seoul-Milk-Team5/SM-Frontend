import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  // 로그인되지 않은 사용자는 로그인 페이지에만 접근 가능하도록 예외 처리
  if (isAuthenticated) {
    return <Navigate to="/dashboard/file" replace />;
  } else {
    return <Outlet />;
  }
}

export default ProtectedRoute;
