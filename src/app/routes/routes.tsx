import { createBrowserRouter } from "react-router-dom";
import MainPage from "@/pages/MainPage";
import UserPage from "@/pages/UserPage";
import AddUserPage from "@/pages/admin/AddUserPage";
import ProtectedRoute from "../providers/ProtectedRoute";
import Layout from "../layouts/Layout";
import PasswordChangePage from "@/pages/PasswordChangePage";
import WorkViewPage from "@/pages/admin/WorkViewPage";
import SearchFilePage from "@/pages/SearchFilePage";
import FileLayout from "../layouts/FileLayout";
import LoginPage from "@/pages/LoginPage";
import MobileMainPage from "@/pages/MobileMainPage";
import AdminProtectedRoute from "../providers/AdminProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "passwordchange", element: <PasswordChangePage /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <FileLayout />,
        children: [
          { path: "file", element: <MainPage /> },
          { path: "searchfile", element: <SearchFilePage /> },
          { path: "mobile", element: <MobileMainPage /> },
        ],
      },

      {
        path: "admin",
        element: <AdminProtectedRoute />, // 관리자 권한 필요
        children: [
          { path: "workview", element: <WorkViewPage /> },
          { path: "adduser", element: <AddUserPage /> },
        ],
      },
      { path: "userpage", element: <UserPage /> },
    ],
  },
]);

export default router;
