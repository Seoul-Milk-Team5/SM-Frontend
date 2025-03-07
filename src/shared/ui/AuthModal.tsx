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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OcrData } from "@/feature/main";

interface AuthModalProps {
  btnName: string;
  disable: boolean;
  step?: number; // ocr 추출 로딩을 건너뛰기 위해
  style?: string; // 버튼 스타일
  userInput?: OcrData[]; // editModal의 사용자 입력 값(taxInvoiceInfoList)
}

export function AuthModal({ btnName, disable, step, style, userInput}: AuthModalProps) {
  const { steps, setSteps } = useStep();
  const { files } = useFileContext();
  const { getUser, logout } = useAuth();

  const [currentStep, setCurrentStep] = useState(step ?? steps);
  useEffect(() => {
    if (step !== undefined) {
      setSteps(step);
      setCurrentStep(step);
    }
  }, [step, setSteps]);

  const [loadingText, setLoadingComent] = useState("");
  const [ocrData, setOcrData] = useState<OcrData[]>();
  const navigate = useNavigate();

  const maxWidthClass = {
    1: "sm:max-w-[450px] max-h-[40vh]",
    2: "sm:max-w-[1025px] max-h-[100vh]",
    3: "sm:max-w-[450px] max-h-[40vh]",
  }[currentStep];

  const handleChangeModalStep = (number: number) => {
    setSteps(number);
    setCurrentStep(number);
  };

  const handleOcrRequest = async () => {
    const token = getUser();
    setLoadingComent("파일에서 텍스트 추출 중입니다.");

    try {
      const response = await ocrPostRequest(token, files?.clientFiles ?? []);
      const fileCount = files?.clientFiles.length;
      console.log(response.result);

      const limitedResults = response.result.slice(0, fileCount);
      setOcrData(limitedResults);
      // console.log("ocr추출값", limitedResults);

      if (response.success) {
        setLoadingComent("텍스트 추출이 완료되었습니다.");
        setTimeout(() => {
          handleChangeModalStep(2);
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
          className={`bg-green-500 hover:bg-green-600 cursor-pointer disabled:bg-green-200 disabled:opacity-100 py-3.5 px-6 text-body-md-sb text-white mb:hidden ${style}`}
          disabled={disable}
          onClick={userInput ? undefined : handleOcrRequest}> {/* 여기 userInput 전달 할 때 비활성화 필요 */}
          {style && (
            <img src="/icon/step2.svg"/>
          )}
          {btnName}
        </Button>
      </DialogTrigger>
      <DialogContent className={`${maxWidthClass} p-0 overflow-hidden flex flex-col`}>
        <div className="overflow-hidden h-full">
          <div
            className={`flex transition-transform duration-500 ease-in-out`}
            style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}>
            <div className="w-full flex-shrink-0 h-full overflow-y-auto">
              <OcrModalContent loadingText={loadingText} />
            </div>
            <div className="w-full flex-shrink-0 h-full overflow-y-auto">
              <AuthModalContent changeStep={handleChangeModalStep} ocrData={userInput ?? ocrData} />
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
