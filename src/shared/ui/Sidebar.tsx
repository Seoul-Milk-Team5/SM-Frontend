import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const isActive = (path: string | string[]) =>
    Array.isArray(path) ? path.includes(location.pathname) : location.pathname === path;

  return (
    <aside className="w-[200px] h-[100vh-20px] m-h-[100vh-20px] rounded-[10px] bg-[#FFF] text-gray-300 px-6 pb-6 pt-8 flex flex-col justify-between relative mt-[25px] mb-[25px]">
      <div>
        <img src="/logo/Logomark.svg" alt="brand logo" className="w-[158px]" />
        <nav className="mt-6">
          <ul className="space-y-3">
            <li>
              <Link
                to="/dashboard/file"
                className={cn(
                  "flex gap-2 -mx-6 px-6 h-[60px] items-center hover:bg-gray-0",
                  isActive(["/", "/searchfile"])
                    ? "text-green-500 font-normal bg-green-0 hover:bg-green-0"
                    : "text-gray-300"
                )}>
                {isActive(["/", "/searchfile"]) ? (
                  <img src="/icon/activeVerification.svg" alt="active verification" />
                ) : (
                  <img src="/icon/verification.svg" alt="verification" />
                )}
                세금계산서 검증
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/userpage"
                className={cn(
                  "flex gap-2 -mx-6 px-6 h-[60px] items-center rounded hover:bg-gray-0",
                  isActive(["/adminpage/workview", "/adminpage/adduser", "/userpage"])
                    ? "text-green-500 font-normal bg-green-0 hover:bg-green-0"
                    : "text-gray-300"
                )}>
                {isActive(["/adminpage/workview", "/adminpage/adduser", "userpage"]) ? (
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
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-col gap-2 relative">
        <div className="hover:bg-green-0 px-[13px]">
          <p className="text-gray-700">이름</p>
          <p className="text-gray-500">000000000000</p>
        </div>
        <div className="flex gap-3 border-t pt-4 text-body-md cursor-pointer">
          <img src="/icon/logout.svg" alt="logout" />
          로그아웃
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
