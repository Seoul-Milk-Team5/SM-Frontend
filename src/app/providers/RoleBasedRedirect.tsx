import { Navigate } from "react-router-dom";

interface RoleBasedRedirectProps {
  userRole: string | null | undefined;
}

function RoleBasedRedirect({userRole}: RoleBasedRedirectProps) {
  if (userRole === "member") return <Navigate to="/userpage" replace />;
  if (userRole === "manager") return <Navigate to="/adminpage/mytask" replace />;
  return <Navigate to="/login" replace />;
};

export default RoleBasedRedirect;
