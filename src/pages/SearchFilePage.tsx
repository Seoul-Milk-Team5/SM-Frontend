import DataTable from "@/feature/searchFile/ui/DataTable";
import Navbar from "../shared/ui/Navbar";

function SearchFilePage() {
  const navItems = [
    { path: "/", label: "세금계산서 업로드" },
    { path: "/searchfile", label: "검증 내역"},
  ]

  return (
    <div className="bg-[#FFF] rounded-[10px] ">
      <Navbar items={navItems} />
      <DataTable />
    </div>
  );
}

export default SearchFilePage;
