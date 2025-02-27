import Navbar from "../../../shared/ui/Navbar";

function AddUserPage() {
  const navItems = [
    { path: "/adminpage/workview", label: "업무 조회" },
    { path: "/adminpage/adduser", label: "사용자 등록" },
  ]
  return (
    <div>
      <Navbar items={navItems}/>
      adduser page
    </div>
  )
}

export default AddUserPage;
