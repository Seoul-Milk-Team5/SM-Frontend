import { useStep } from "@/app/providers/StepProvider";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PasswordCheckContent from "./PasswordCheckContent";
import UserContent from "./UserContent";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { userInformationRequest } from "../service";

function myModal() {
  const { steps } = useStep();
  const { getUser, getUserData } = useAuth();
  const [isModalState, setIsModalState] = useState(false);
  const [userState, setUserState] = useState({
    userName: "",
    userId: "",
  });
  const userData = getUserData();

  useEffect(() => {
    if (userData.userId === "" || userData.userName === "") {
      const token = getUser();
      userInformationRequest(token).then(result =>
        setUserState(prev => ({ ...prev, userName: result.result.name, userId: result.result.employeeId }))
      );
    }
  }, []);

  const maxWidthClass = {
    1: "sm:max-w-[750px] max-h-[420px]",
    2: "sm:max-w-[625px] max-h-[100vh]",
  }[steps];

  return (
    <Dialog open={isModalState} onOpenChange={setIsModalState}>
      <DialogTrigger asChild>
        <div className="hover:bg-green-0 flex justify-between items-center cursor-pointer">
          <div>
            <p className="text-body-md">{userData.userName || userState.userName}</p>
            <p className="text-label-xs">{userData.userId || userState.userId}</p>
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
              <UserContent setIsModalState={setIsModalState} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default myModal;
