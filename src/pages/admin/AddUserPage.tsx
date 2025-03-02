import Navbar from "../../shared/ui/Navbar";

function AddUserPage() {
  const navItems = [
    { path: "/dashboard/admin/workview", label: "업무 조회" },
    { path: "/dashboard/admin/adduser", label: "사용자 등록" },
  ];
  return (
    <div>
      <Navbar items={navItems} />
      adduser page
    </div>
  );
}

export default AddUserPage;
