import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import Mypage from "@/pages/MyPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/", // 메인 페이지 보호
    element: "",
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "mypage/:userId",
        element: <Mypage />,
      },
    ],
  },
]);

export default router;
