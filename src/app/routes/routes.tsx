import { Navigate, createBrowserRouter, Outlet } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import UserPage from "@/pages/UserPage";
import MyTaskPage from "@/pages/admin/MyTaskPage";
import WorkViewPage from "@/pages/admin/WorkViewPage";
import AddUserPage from "@/pages/admin/AddUserPage";
import ProtectedRoute from "../providers/ProtectedRoute";
import RoleBasedRedirect from "../providers/RoleBasedRedirect";

// 실제 로그인 api 연동 후 context로 역할 가져올 예정
const isAuthenticated = true;
const userRole : string = "manager";
//const userRole : string = "member";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/", // 메인 페이지 보호
    element: <ProtectedRoute isAuthenticated={isAuthenticated} />, // 로그인 여부 확인
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "mypage",
        element: <RoleBasedRedirect userRole={userRole} />
      },
      {
        path: "userpage",
        element: userRole === "member" ? <UserPage /> : <Navigate to="/" replace />,
      },
      {
        path: "adminpage",
        element: userRole === "manager" ? <Outlet /> : <Navigate to="/" replace />, 
        children: [
          { path: "mytask", element: <MyTaskPage /> },
          { path: "workview", element: <WorkViewPage /> },
          { path: "adduser", element: <AddUserPage />},
        ]
      }
    ],
  },
]);

export default router;
