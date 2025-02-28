import Navbar from "../../shared/ui/Navbar";
import FileDndBox from "../../shared/ui/FileDndBox";

function MainPage() {
  const navItems = [
    { path: "/", label: "세금계산서 업로드" },
    { path: "/searchfile", label: "검증 내역"},
  ]

  return (
    <main>
      <Navbar items={navItems}/>
      <FileDndBox />
    </main>
  );
}

export default MainPage;
