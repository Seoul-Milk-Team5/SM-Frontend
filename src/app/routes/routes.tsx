import { createBrowserRouter, Outlet } from "react-router-dom";
import MainPage from "@/pages/MainPage";
import UserPage from "@/pages/UserPage";
import AddUserPage from "@/pages/admin/AddUserPage";
import ProtectedRoute from "../providers/ProtectedRoute";
import RoleBasedRedirect from "../providers/RoleBasedRedirect";
import Layout from "../layouts/Layout";
import PasswordChangePage from "@/pages/PasswordChangePage";
import WorkViewPage from "@/pages/admin/WorkViewPage";
import SearchFilePage from "@/pages/SearchFilePage";
import FileLayout from "../layouts/FileLayout";
import LoginPage from "@/pages/LoginPage";

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
        ],
      },

      {
        path: "admin",
        element: <Outlet />,
        children: [
          { path: "workview", element: <WorkViewPage /> },
          { path: "adduser", element: <AddUserPage /> },
        ],
      },
      { path: "userpage", element: <UserPage /> },
      { path: "mypage", element: <RoleBasedRedirect /> },
    ],
  },
]);

export default router;
