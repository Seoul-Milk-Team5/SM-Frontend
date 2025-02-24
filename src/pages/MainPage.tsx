import { DataTable } from "../../shared/ui/DataTable";
import Navbar from "../../shared/ui/Navbar";

function MainPage() {
  const navItems = [
    { path: "/", label: "파일 업로드" },
    { path: "/searchfile", label: "파일 조회"},
  ]

  return (
    <div>
      <Navbar items={navItems}/>
      <DataTable></DataTable>
    </div>
  );
}

export default MainPage;
