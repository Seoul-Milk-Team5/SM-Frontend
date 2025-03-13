import { cn } from "../../lib/utils";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { userInformationRequest } from "@/feature/my";

function SidebarSheet() {
  const location = useLocation();

  const { getUser, getUserData, logout } = useAuth();
  const [userState, setUserState] = useState({
    userName: "",
    userId: "",
  });

  const userData = getUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.userId === "" || userData.userName === "") {
      const token = getUser();
      userInformationRequest(token).then(result =>
        setUserState(prev => ({ ...prev, userName: result.result.name, userId: result.result.employeeId }))
      );
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string | string[]) =>
    Array.isArray(path) ? path.includes(location.pathname) : location.pathname === path;
  return (
    <Sidebar className="mb:block w-[200px] h-[100vh-20px] m-h-[100vh-20px] rounded-[10px] bg-[#FFF] text-gray-300 px-6 pb-6 pt-8 flex flex-col justify-between relative mt-[25px] mb-[25px]">
      <div>
        <SidebarHeader className="w-full flex flex-row justify-between items-center mt-10 p-7">
          <img src="/logo/Logomark.svg" alt="brand logo" className="w-[190px]" />
          <SidebarTrigger className="w-[50px]" />
        </SidebarHeader>

        <SidebarContent className="mt-6 overflow-x-hidden p-7">
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
            {/* <li>
              <Link
                to="/dashboard/userpage"
                className={cn(
                  "flex gap-2 -mx-6 px-6 h-[60px] items-center rounded hover:bg-gray-0",
                  isActive(["/dashboard/admin/workview", "/dashboard/admin/adduser", "/dashboard/userpage"])
                    ? "text-green-500 font-normal bg-green-0 hover:bg-green-0"
                    : "text-gray-300"
                )}>
                {isActive(["/dashboard/admin/workview", "/dashboard/admin/adduser", "/dashboard/userpage"]) ? (
                  <img src="/icon/activeMytask.svg" alt="active verification" />
                ) : (
                  <img src="/icon/mytask.svg" alt="mytask" />
                )}
                내 업무 관리
              </Link>
            </li>
            <li>
              <Link to="/notice" className={cn("flex gap-2 -mx-6 px-6 h-[60px] items-center rounded hover:bg-gray-0")}>
                <img src="/icon/notice.svg" alt="notice" />
                공지사항
              </Link>
            </li> */}
          </ul>
        </SidebarContent>
      </div>
      <div className="flex flex-col gap-2 relative mb:absolute mb:bottom-0 mb:w-full mb:p-7">
        <div className="hover:bg-green-0 px-[13px] flex justify-between items-center">
          <div>
            <p className="text-body-md">{userData.userName || userState.userName}</p>
            <p className="text-label-xs">{userData.userId || userState.userId}</p>
          </div>
        </div>
        <div className="flex gap-3 border-t pt-4 text-body-md cursor-pointer" onClick={handleLogout}>
          <img src="/icon/logout.svg" alt="logout" />
          로그아웃
        </div>
      </div>
    </Sidebar>
  );
}

export default SidebarSheet;
