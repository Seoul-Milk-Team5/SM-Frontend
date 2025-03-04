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

interface AuthModalProps {
  btnName: string;
  disable: boolean;
}

export function AuthModal({ btnName, disable }: AuthModalProps) {
  const { steps, setSteps } = useStep();
  const { files } = useFileContext();
  const { getUser } = useAuth();

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
    const response = await ocrPostRequest(token, files?.clientFiles ?? []);
    console.log(response);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-green-500 hover:bg-green-600 cursor-pointer disabled:bg-green-200 disabled:opacity-100 py-3.5 px-6 text-body-md-sb text-white"
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
              <OcrModalContent changeStep={handleChangeModalStep} />
            </div>
            <div className="w-full flex-shrink-0 h-full overflow-y-auto">
              <AuthModalContent changeStep={handleChangeModalStep} />
            </div>
            <div className="w-full flex-shrink-0 h-full overflow-y-auto">
              <HometaxModalContent changeStep={handleChangeModalStep} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
