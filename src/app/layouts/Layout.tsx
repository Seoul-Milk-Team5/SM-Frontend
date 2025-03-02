import Sidebar from "../../shared/ui/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center px-8">
      <div className="flex w-full max-w-[1280px] gap-4">
        {/* 왼쪽 사이드바 */}
        <Sidebar />
        {/* 메인 컨텐츠 (가운데 정렬, 너비 1064px 반영)*/}
        <main className="flex-1 max-w-[1064px] bg-[#FFF] p-6 rounded-[10px] shadow-md mt-[25px] mb-[25px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
