import { createBrowserRouter, Outlet } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import UserPage from "@/pages/UserPage";
import AddUserPage from "@/pages/admin/AddUserPage";
import ProtectedRoute from "../providers/ProtectedRoute";
import RoleBasedRedirect from "../providers/RoleBasedRedirect";
import Layout from "../layouts/Layout";
import PasswordChangePage from "@/pages/PasswordChangePage";
import WorkViewPage from "@/pages/admin/WorkViewPage";
import SearchFilePage from "@/pages/SearchFilePage";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/passwordchange",
    element: <PasswordChangePage />,
  },
  {
    path: "/", // 메인 페이지 보호
    element: <ProtectedRoute />, // 로그인 여부 확인
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: "searchfile",
            element: <SearchFilePage />,
          },
          {
            path: "mypage",
            element: <RoleBasedRedirect />,
          },
          {
            path: "userpage",
            element: <UserPage />,
          },
          {
            path: "adminpage",
            element: <Outlet />,
            children: [
              { path: "workview", element: <WorkViewPage /> },
              { path: "adduser", element: <AddUserPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;