import Navbar from "../../shared/ui/Navbar";
import FileDndBox from "../../shared/ui/FileDndBox";

function MainPage() {
  const navItems = [
    { path: "/", label: "파일 업로드" },
    { path: "/searchfile", label: "파일 조회" },
  ];

  return (
    <main>
      <Navbar items={navItems} />
      <FileDndBox />
      <div className="w-full bg-gray-0 h-1.5"></div>
    </main>
  );
}

export default MainPage;
