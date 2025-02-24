import Sidebar from "../../../shared/ui/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex">
      {/* 왼쪽 사이드바 */}
      <Sidebar />
      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
