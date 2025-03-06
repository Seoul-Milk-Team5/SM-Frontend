import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // 로그인되지 않은 사용자는 로그인 페이지에만 접근 가능하도록 예외 처리
  if (!isAuthenticated && location.pathname !== "/") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
