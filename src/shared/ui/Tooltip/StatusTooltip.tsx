import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import StatusTooltipContent from "./StatusTooltipContent";

export default function StatusTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex items-center space-x-2">
          <img src="/icon/activeTooltip.svg" />
        </TooltipTrigger>
        <TooltipContent 
          side="top"
          align="start" 
          className="w-[430px] h-[260px] bg-[#FFF] shadow-md shadow-black/15 p-4 rounded-lg before:bg-[#FFF]"
        >
          <StatusTooltipContent />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
