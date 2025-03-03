import { Button } from "@/components/ui/button";
import Navbar from "../../../shared/ui/Navbar";

export function PageHeader() {
  const navItems = [
    { path: "/dashboard/file", label: "세금계산서 업로드" },
    { path: "/dashboard/searchfile", label: "검증 내역" },
  ];

  return (
    <div className="flex justify-between items-center">
      <Navbar items={navItems} />
      <div className="flex items-center gap-3.5 mb-10">
        <Button
          variant="outline"
          className="text-green-500 border-green-500 hover:text-green-600 cursor-pointer disabled:opacity-100 py-3.5 px-6 text-body-md-sb disabled:border-gray-100 disabled:text-gray-300"
          disabled={true}>
          임시 저장
        </Button>
        <Button
          className="bg-green-500 hover:bg-green-600 cursor-pointer disabled:bg-green-200 disabled:opacity-100 py-3.5 px-6 text-body-md-sb text-white"
          disabled={true}>
          검사하기
        </Button>
      </div>
    </div>
  );
}
