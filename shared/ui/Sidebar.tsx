import { Link } from "react-router-dom";
import { cn } from "../../src/lib/utils";

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-200 text-gray-900 p-4 flex flex-col justify-between">
      <div>
        <img src="/logo/Logomark.svg" alt="brand logo" />

        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link to="/" className={cn("flex items-center p-2 rounded hover:bg-gray-300")}>
                ● 세금계산서 검증
              </Link>
            </li>
            <li>
              <Link to="/mypage" className={cn("flex items-center p-2 rounded hover:bg-gray-300")}>
                ● 내 업무 관리
              </Link>
            </li>
            <li>
              <Link to="/notice" className={cn("flex items-center p-2 rounded hover:bg-gray-300")}>
                ● 공지사항
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t pt-4 text-sm">
        <p className="text-gray-700">이름</p>
        <p className="text-gray-500">000000000000</p>
      </div>
    </aside>
  );
}

export default Sidebar;
