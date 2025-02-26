import Navbar from "../../shared/ui/Navbar";

function SearchFilePage() {
  const navItems = [
    { path: "/", label: "파일 업로드" },
    { path: "/searchfile", label: "파일 조회"},
  ]
  return (
    <div>
      <Navbar items={navItems} />
      SearchFilePage
    </div>
  );
}

export default SearchFilePage;
