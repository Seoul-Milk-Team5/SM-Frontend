import { useStep } from "@/app/providers/StepProvider";
import { DialogTitle } from "@/components/ui/dialog";
import MilkCartonAnimation from "@/shared/ui/MilkCartonAnimation";

function OcrModalContent({ loadingText }: { loadingText: string }) {
  const { steps } = useStep();

  return (
    <div className="flex flex-col gap-3 items-center">
      <DialogTitle></DialogTitle>
      <MilkCartonAnimation />
      {steps === 1 && <p className="text-title-lg text-gray-800">{loadingText}</p>}
    </div>
  );
}

export default OcrModalContent;
