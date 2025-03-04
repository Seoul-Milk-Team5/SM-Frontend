import { Button } from "@/components/ui/button";
import Navbar from "../../../shared/ui/Navbar";
import { useFileContext } from "@/app/providers/FileProvider";
import { useEffect, useState } from "react";
import { AuthModal } from "@/shared/ui/AuthModal";
import { StepProvider } from "@/app/providers/StepProvider";

export function PageHeader() {
  const { files } = useFileContext();
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if ((files && files?.clientFiles.length > 0) || (files && files?.result.length > 0)) {
      setDisable(false);
    }
  }, [files]);

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
          className="border-green-500 hover:text-green-600 cursor-pointer disabled:opacity-100 py-3.5 px-6 text-body-md-sb disabled:border-gray-100 disabled:text-gray-300 text-green-500"
          disabled={disable}>
          임시 저장
        </Button>
        <StepProvider>
          <AuthModal btnName="검사하기" disable={disable} />
        </StepProvider>
      </div>
    </div>
  );
}
