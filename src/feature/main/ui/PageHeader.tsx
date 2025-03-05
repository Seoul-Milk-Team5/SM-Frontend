import { Button } from "@/components/ui/button";
import Navbar from "../../../shared/ui/Navbar";
import { useFileContext } from "@/app/providers/FileProvider";
import { useEffect, useState } from "react";
import { AuthModal } from "@/shared/ui/AuthModal";
import { StepProvider } from "@/app/providers/StepProvider";
import useBrowserSize from "@/shared/hooks/useBrowserSize";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function PageHeader() {
  const { files } = useFileContext();
  const [disable, setDisable] = useState(true);
  const windowSize = useBrowserSize();

  useEffect(() => {
    if ((files && files?.clientFiles.length > 0) || (files && files?.result.length > 0)) {
      setDisable(false);
    }
  }, [files]);

  const navItems =
    windowSize.windowWidth < 850
      ? [{ path: "/dashboard/file", label: "세금계산서 업로드" }]
      : [
          { path: "/dashboard/file", label: "세금계산서 업로드" },
          { path: "/dashboard/searchfile", label: "검증 내역" },
        ];

  const buttonClassName =
    windowSize.windowWidth < 850
      ? "bg-green-500  cursor-pointer disabled:opacity-100 py-3.5 px-6 text-body-md-sb text-[#fff]"
      : "border-green-500 hover:text-green-600 cursor-pointer disabled:opacity-100 py-3.5 px-6 text-body-md-sb disabled:border-gray-100 disabled:text-gray-300 text-green-500";

  return (
    <div className="flex justify-between items-center mb:justify-start mb:gap-5">
      <SidebarTrigger className="mb:mb-5" />
      <Navbar items={navItems} />
      <div className="flex items-center gap-3.5 mb-10 mb:mb-5 mb:absolute mb:right-14">
        <Button
          variant={windowSize.windowWidth < 850 ? "default" : "outline"}
          className={`${buttonClassName}`}
          disabled={disable}>
          {windowSize.windowWidth < 850 ? "저장하기" : "임시 저장"}
        </Button>
        <StepProvider>
          <AuthModal btnName="검사하기" disable={disable} />
        </StepProvider>
      </div>
    </div>
  );
}
