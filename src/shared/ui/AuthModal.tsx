import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AuthModalContent from "./AuthModalContent";
import { DialogContent } from "@/components/ui/dialog";
import OcrModalContent from "@/feature/main/ui/OcrModalContent";
import HometaxModalContent from "@/feature/main/ui/HometaxModalContent";
import { useStep } from "@/app/providers/StepProvider";
import { useFileContext } from "@/app/providers/FileProvider";
import { ocrPostRequest } from "@/feature/main/service/OcrRequest";
import { useAuth } from "@/app/providers/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OcrData } from "@/feature/main";

interface AuthModalProps {
  btnName: string;
  disable: boolean;
}

export function AuthModal({ btnName, disable }: AuthModalProps) {
  const { steps, setSteps } = useStep();
  const { files } = useFileContext();
  const { getUser, logout } = useAuth();

  const [loadingText, setLoadingComent] = useState("");
  const [ocrData, setOcrData] = useState<OcrData[]>();
  const navigate = useNavigate();

  const maxWidthClass = {
    1: "sm:max-w-[450px] max-h-[40vh]",
    2: "sm:max-w-[1025px] max-h-[100vh]",
    3: "sm:max-w-[450px] max-h-[40vh]",
  }[steps];

  const handleChangeModalStep = (number: number) => {
    setSteps(number);
  };

  const handleOcrRequest = async () => {
    const token = getUser();
    setLoadingComent("파일에서 텍스트 추출 중입니다.");

    try {
      const response = await ocrPostRequest(token, files as any);
      const fileCount = (files?.clientFiles?.length ?? 0) + (files?.result?.length ?? 0);
      console.log(response.result);

      const limitedResults = response.result.slice(0, fileCount);
      setOcrData(limitedResults);

      if (response.success) {
        setLoadingComent("텍스트 추출이 완료되었습니다.");
        setTimeout(() => {
          setSteps(2);
        }, 1500);
      } else {
        // 요청은 성공했지만 결과가 실패일 경우
        setLoadingComent("텍스트 추출에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error: any) {
      if (error.message.includes("401")) {
        setLoadingComent("로그인이 만료되었습니다.");
        logout();
        navigate("/");
      } else if (error.message.includes("500")) {
        setLoadingComent("서버 오류가 발생했습니다.");
      } else if (error.message.includes("403")) {
        setLoadingComent("서버 오류가 발생했습니다.");
      } else {
        setLoadingComent(error.message || "OCR 요청 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-green-500 hover:bg-green-600 cursor-pointer disabled:bg-green-200 disabled:opacity-100 py-3.5 px-6 text-body-md-sb text-white mb:hidden"
          disabled={disable}
          onClick={handleOcrRequest}>
          {btnName}
        </Button>
      </DialogTrigger>
      <DialogContent className={`${maxWidthClass} p-0 overflow-hidden flex flex-col`}>
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
      </DialogContent>
    </Dialog>
  );
}