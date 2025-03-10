import { useStep } from "@/app/providers/StepProvider";
import MilkCartonAnimation from "@/shared/ui/MilkCartonAnimation";

function OcrModalContent({ loadingText }: { loadingText: string }) {
  const { steps } = useStep();

  return (
    <div className="flex flex-col items-center">
      <MilkCartonAnimation />
      {steps === 1 && <p className="text-title-lg text-gray-800">{loadingText}</p>}
    </div>
  );
}

export default OcrModalContent;
