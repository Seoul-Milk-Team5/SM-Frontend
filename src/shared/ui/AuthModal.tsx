import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthModalContent from "./AuthModalContent";
import OcrModalContent from "@/feature/main/ui/OcrModalContent";
import HometaxModalContent from "@/feature/main/ui/HometaxModalContent";
import { useStep } from "@/app/providers/StepProvider";
import { useFileContext } from "@/app/providers/FileProvider";
import { ocrPostRequest } from "@/feature/main/service/OcrRequest";
import { useAuth } from "@/app/providers/AuthProvider";
import { OcrData } from "@/feature/main";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface AuthModalProps {
  btnName: string;
  disable: boolean;
}

export function AuthModal({ btnName, disable }: AuthModalProps) {
  const { steps, setSteps } = useStep();
  const { files } = useFileContext();
  const { getUser, logout } = useAuth();
  const navigate = useNavigate();

  const [loadingText, setLoadingComent] = useState("");
  const [ocrData, setOcrData] = useState<OcrData[]>();
  const [isOpen, setIsOpen] = useState(false);

  const maxWidthClass = {
    1: "sm:max-w-[450px] max-h-[320px]",
    2: "sm:max-w-[1025px] max-h-[100vh]",
    3: "sm:max-w-[450px] max-h-[320px]",
  }[steps];

  const handleChangeModalStep = (number: number) => {
    setSteps(number);
  };

  const handleOcrRequest = async () => {
    setIsOpen(true);
    setLoadingComent("파일에서 텍스트 추출 중입니다.");

    try {
      const token = getUser();
      const response = await ocrPostRequest(token, files as any);

      if (response.success) {
        console.log(response);
        const fileCount = (files?.clientFiles?.length ?? 0) + (files?.result?.length ?? 0);

        const filteredResults = response.result.filter(
          item => item.extractedData && Object.values(item.extractedData).some(value => value !== "")
        );

        if (!filteredResults) {
          setLoadingComent("텍스트 추출에 실패했습니다. 다시 시도해주세요.");
          setTimeout(() => {
            setIsOpen(false);
          }, 1500);
        }

        // fileCount 만큼 제한하여 저장
        const limitedResults = filteredResults.slice(0, fileCount);
        setOcrData(limitedResults);

        setLoadingComent("텍스트 추출이 완료되었습니다.");
        setTimeout(() => {
          setSteps(2);
        }, 1500);
      } else {
        setLoadingComent("텍스트 추출에 실패했습니다. 다시 시도해주세요.");
        setTimeout(() => {
          setIsOpen(false);
        }, 1500);
      }
    } catch (error: any) {
      setTimeout(() => {
        setIsOpen(false);
      }, 1500);

      if (error.message.includes("500")) {
        setLoadingComent("서버 오류가 발생했습니다.");
      } else if (error.message.includes("403")) {
        setLoadingComent("로그인이 만료되었습니다.");

        setTimeout(() => {
          alert("로그인 페이지로 이동합니다");
          logout();
          navigate("/");
        }, 2000);
      } else {
        setLoadingComent(error.message || "OCR 요청 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {/*모달 열림 상태 관리 */}
      <AlertDialogTrigger asChild>
        <Button
          className="bg-green-500 hover:bg-green-600 cursor-pointer disabled:bg-gray-100 disabled:opacity-100 py-3.5 px-6 text-body-md-sb text-white mb:hidden"
          disabled={disable}
          onClick={handleOcrRequest}>
          {btnName}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogTitle></AlertDialogTitle>
      <AlertDialogContent className={`${maxWidthClass} p-0 overflow-hidden flex flex-col`}>
        <div className="overflow-hidden h-full">
          <div
            className={`flex transition-transform duration-500 ease-in-out`}
            style={{ transform: `translateX(-${(steps - 1) * 100}%)` }}>
            <div className="w-full flex-shrink-0 h-full overflow-y-auto">
              <OcrModalContent loadingText={loadingText} />
            </div>
            <div className="w-full flex-shrink-0 h-full overflow-y-auto">
              <AuthModalContent changeStep={handleChangeModalStep} ocrData={ocrData} />
            </div>
            <div className="w-full flex-shrink-0 h-full overflow-y-auto">
              <HometaxModalContent />
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
