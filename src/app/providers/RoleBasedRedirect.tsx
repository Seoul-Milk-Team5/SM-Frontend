import { Navigate } from "react-router-dom";

const userRole : string = "manager"; //context에서 불러오는 값
// const userRole : string = "member";

function RoleBasedRedirect() {
  if (userRole === "member") return <Navigate to="/userpage" replace />;
  if (userRole === "manager") return <Navigate to="/adminpage/workview" replace />;
  return <Navigate to="/login" replace />;
};

export default RoleBasedRedirect;
