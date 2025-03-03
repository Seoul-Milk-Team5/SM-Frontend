import Navbar from "../../shared/ui/Navbar";

function WorkViewPage() {
  const navItems = [
    { path: "/dashboard/admin/workview", label: "업무 조회" },
    { path: "/dashboard/admin/adduser", label: "사용자 등록" },
  ];
  return (
    <div>
      <Navbar items={navItems} />
      WorkViewPage
    </div>
  );
}

export default WorkViewPage;
