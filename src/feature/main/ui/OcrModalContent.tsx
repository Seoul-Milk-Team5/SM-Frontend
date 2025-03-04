import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import MilkCartonAnimation from "@/shared/ui/MilkCartonAnimation";

interface OcrModalContentProps {
  changeStep: (number: number) => void;
}

function OcrModalContent({ changeStep }: OcrModalContentProps) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <DialogTitle></DialogTitle>
      <MilkCartonAnimation />
      <Button
        className="bg-green-500 hover:bg-green-600 cursor-pointer disabled:bg-green-200 disabled:opacity-100 p-[22px] text-body-md-sb text-white"
        onClick={() => changeStep(2)}>
        검사하기
      </Button>
    </div>
  );
}

export default OcrModalContent;
