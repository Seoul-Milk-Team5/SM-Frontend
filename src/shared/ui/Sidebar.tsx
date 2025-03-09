import { Link, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "./LogoutModal";
import { useAuth } from "@/app/providers/AuthProvider";


function Sidebar() {
  const location = useLocation();
  const { userRole } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path: string | string[]) =>
    Array.isArray(path) ? path.includes(location.pathname) : location.pathname === path;

  const handleLogout = () => {
    logout();
    console.log("사용자가 로그아웃되었습니다.");
    navigate("/"); 
    setIsLogoutModalOpen(false);
  };

  const taskManagementPath = userRole === "ROLE_ADMIN" ? "/dashboard/admin/workview" : "/dashboard/userpage";

  return (
    <aside className="w-[200px] h-[100vh-20px] m-h-[100vh-20px] rounded-[10px] bg-[#FFF] text-gray-300 px-6 pb-6 pt-8 flex flex-col justify-between relative mt-[25px] mb-[25px] mb:hidden">
      <div>
        <img src="/logo/Logomark.svg" alt="brand logo" className="w-[158px]" />
        <nav className="mt-6">
          <ul className="space-y-3">
            <li>
              <Link
                to="/dashboard/file"
                className={cn(
                  "flex gap-2 -mx-6 px-6 h-[60px] items-center hover:bg-gray-0",
                  isActive(["/dashboard/file", "/dashboard/searchfile"])
                    ? "text-green-500 font-normal bg-green-0 hover:bg-green-0"
                    : "text-gray-300"
                )}>
                {isActive(["/dashboard/file", "/dashboard/searchfile"]) ? (
                  <img src="/icon/activeVerification.svg" alt="active verification" />
                ) : (
                  <img src="/icon/verification.svg" alt="verification" />
                )}
                세금계산서 검증
              </Link>
            </li>
            <li>
              <Link
                to={taskManagementPath} // 동적 경로 적용
                className={cn(
                  "flex gap-2 -mx-6 px-6 h-[60px] items-center rounded hover:bg-gray-0",
                  isActive(["/dashboard/admin/workview", "/dashboard/admin/adduser", "/dashboard/userpage"])
                    ? "text-green-500 font-normal bg-green-0 hover:bg-green-0"
                    : "text-gray-300"
                )}
              >
                {isActive(["/dashboard/admin/workview", "/dashboard/admin/adduser", "/dashboard/userpage"]) ? (
                  <img src="/icon/activeMytask.svg" alt="active verification" />
                ) : (
                  <img src="/icon/mytask.svg" alt="mytask" />
                )}
                내 업무 관리
              </Link>
            </li>
            <li>
              <Link to="#" className={cn("flex gap-2 -mx-6 px-6 h-[60px] items-center rounded hover:bg-gray-0")}>
                <img src="/icon/notice.svg" alt="notice" />
                공지사항
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-col gap-2 relative">
        <div className="hover:bg-green-0 flex justify-between items-center">
          <div>
            <p className="text-body-md">이름</p>
            <p className="text-label-xs">0000000</p>
          </div>
          <img className="w-[24px]" src="/icon/gear.svg" alt="마이페이지" />
        </div>
        <div className="flex gap-3 border-t pt-4 text-body-md cursor-pointer" onClick={() => setIsLogoutModalOpen(true)}>
          <img src="/icon/logout.svg" alt="logout" />
          로그아웃
        </div>
      </div>

      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onConfirmLogout={handleLogout} />
    </aside>
  );
}

export default Sidebar;
