import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = true; // 실제로는 context로 가져옴

function ProtectedRoute() {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
