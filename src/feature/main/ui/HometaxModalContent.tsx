import MilkCartonAnimation from "@/shared/ui/MilkCartonAnimation";
import { useEffect } from "react";

// interface HometaxModalContentProps {
//   changeStep: (number: number) => void;
// }

function HometaxModalContent() {
  useEffect(() => {});
  return (
    <div className="flex flex-col gap-4 items-center">
      <MilkCartonAnimation />
      <p className="text-[21px] font-bold">홈택스에서 세금계산서 진위여부를 검증하고 있어요.</p>
    </div>
  );
}

export default HometaxModalContent;
