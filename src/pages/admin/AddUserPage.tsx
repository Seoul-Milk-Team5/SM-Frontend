import AddUserSection from "@/feature/adduser/ui/AddUserSection";
import Navbar from "../../shared/ui/Navbar";
import ChangeUserRole from "@/feature/adduser/ui/ChangeUserRole";

function AddUserPage() {
  const navItems = [
    { path: "/dashboard/admin/workview", label: "업무 조회" },
    { path: "/dashboard/admin/adduser", label: "사용자 등록" },
  ];
  return (
    <div>
      <Navbar items={navItems} />
      <AddUserSection />
      <ChangeUserRole />
    </div>
  );
}

export default AddUserPage;
