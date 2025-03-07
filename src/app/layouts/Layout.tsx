import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "../../shared/ui/Sidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import SidebarSheet from "@/shared/ui/SidebarSheet";
import useBrowserSize from "@/shared/hooks/useBrowserSize";
import { useAuth } from "../providers/AuthProvider";

function Layout() {
  const windowSize = useBrowserSize();
  const { isAuthenticated } = useAuth();

  const location = useLocation();

  if (!isAuthenticated && location.pathname !== "/") {
    return <Navigate to={location.pathname} replace />;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center px-8 mb:bg-[#fff]">
      <SidebarProvider className="flex w-full max-w-[1280px] gap-4">
        {windowSize.windowWidth < 850 && <SidebarSheet />}
        {/* 왼쪽 사이드바 */}
        <Sidebar />
        {/* 메인 컨텐츠 (가운데 정렬, 너비 1064px 반영)*/}
        <main className="flex-1 max-w-[1064px] bg-[#FFF] px-6 pb-6 pt-7 rounded-[10px] shadow-md mt-[25px] mb-[25px] main-scrollable mb:shadow-none mb:px-0">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}

export default Layout;
