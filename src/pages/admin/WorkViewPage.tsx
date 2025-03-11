import AdminSearchbar from "@/feature/workview/ui/AdminSearchBar";
import Navbar from "../../shared/ui/Navbar";
import { UserSearchProvider } from "@/app/providers/UserSearchProvider";
import UserTable from "@/shared/ui/UserTable";


function WorkViewPage() {
  const navItems = [
    { path: "/dashboard/admin/workview", label: "업무 조회" },
    { path: "/dashboard/admin/adduser", label: "사용자 등록" },
  ];
  return (
    <UserSearchProvider>
      <div>
        <Navbar items={navItems} />
        <AdminSearchbar />
        <UserTable />
      </div>
    </UserSearchProvider>
  );
}

export default WorkViewPage;
