import { Button } from "@/components/ui/button";
import Navbar from "../../../shared/ui/Navbar";
import { useFileContext } from "@/app/providers/FileProvider";
import { useEffect, useState } from "react";
import { AuthModal } from "@/shared/ui/AuthModal";
import { StepProvider } from "@/app/providers/StepProvider";
import useBrowserSize from "@/shared/hooks/useBrowserSize";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { saveFileGetRequest, saveFilePostRequest } from "../service";
import { useAuth } from "@/app/providers/AuthProvider";
import { useToast } from "@/app/providers/ToastProvider";

export function PageHeader() {
  const { files, setFiles } = useFileContext();
  const { getUser } = useAuth();
  const { addToast } = useToast();

  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

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
      ? "bg-green-500  cursor-pointer disabled:opacity-100 py-3.5 px-4 text-body-md-sb text-[#fff]"
      : "border-green-500 hover:text-green-600 cursor-pointer disabled:opacity-100 py-3.5 px-6 text-body-md-sb disabled:border-gray-100 disabled:text-gray-300 text-green-500 min-w-[100px]";

  const handleFileSaveRequest = async () => {
    const token = getUser();
    setLoading(true);
    const response = await saveFilePostRequest(token, files?.clientFiles ?? []);

    if (response.success) {
      const updatedData = await saveFileGetRequest(token);
      setFiles(prev => ({
        ...prev,
        result: updatedData.result.content,
        clientFiles: [],
      }));
      setLoading(false);
      addToast("임시 저장되었습니다.", "success");
    } else {
      addToast("임시 저장에 실패하였습니다.", "error");
    }
  };
  return (
    <div className="flex justify-between items-center mb:justify-between mb:gap-5">
      <div className="flex items-center gap-3">
        {windowSize.windowWidth < 850 && <SidebarTrigger className="mb:mb-5" />}
        <Navbar items={navItems} />
      </div>

      <div className="flex items-center gap-3.5 mb-10 mb:mb-5 mb:justify-end">
        <Button
          variant={windowSize.windowWidth < 850 ? "default" : "outline"}
          className={`${buttonClassName}`}
          disabled={disable}
          onClick={handleFileSaveRequest}>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-4 h-4 border-4 border-gray-100 border-t-green-300 rounded-full animate-spin"></div>
            </div>
          ) : windowSize.windowWidth < 850 ? (
            "저장하기"
          ) : (
            "임시 저장"
          )}
        </Button>
        <StepProvider>
          <AuthModal btnName="검사하기" disable={disable} />
        </StepProvider>
      </div>
    </div>
  );
}
