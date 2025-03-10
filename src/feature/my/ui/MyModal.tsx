import { useStep } from "@/app/providers/StepProvider";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PasswordCheckContent from "./PasswordCheckContent";
import UserContent from "./UserContent";

function myModal() {
  const { steps } = useStep();

  const maxWidthClass = {
    1: "sm:max-w-[750px] max-h-[420px]",
    2: "sm:max-w-[625px] max-h-[100vh]",
  }[steps];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="hover:bg-green-0 flex justify-between items-center cursor-pointer">
          <div>
            <p className="text-body-md">이름</p>
            <p className="text-label-xs">0000000</p>
          </div>
          <img className="w-[24px]" src="/icon/gear.svg" alt="마이페이지" />
        </div>
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent className={`${maxWidthClass} p-0 overflow-hidden flex flex-col`}>
        <div className="overflow-hidden h-full">
          <div
            className={`flex transition-transform duration-500 ease-in-out`}
            style={{ transform: `translateX(-${(steps - 1) * 100}%)` }}>
            <div className="w-full flex-shrink-0 h-full overflow-y-auto">
              <PasswordCheckContent />
            </div>
            <div className="w-full flex-shrink-0 h-full overflow-y-auto">
              <UserContent />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default myModal;
