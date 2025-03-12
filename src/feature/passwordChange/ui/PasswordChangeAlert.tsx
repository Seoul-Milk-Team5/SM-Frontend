import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  disabled: boolean;
  apiError: boolean;
}

function PasswordChangeAlert({ disabled, apiError }: SuccessModalProps) {
  const navigate = useNavigate();

  const handleRoute = () => {
    if (!apiError) {
      navigate("/");
    }
  };

  const ButtonClass = apiError ? "bg-red-300 hover:bg-red-400" : "bg-green-500 hover:bg-green-600";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="submit"
          className="w-[15%] bg-green-500 disabled:bg-gray-100 disabled:opacity-100 hover:bg-green-600 py-6 text-[17px] text-white cursor-pointer"
          disabled={disabled}>
          변경하기
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col justify-center items-center w-[400px]">
        <AlertDialogHeader className="flex flex-col justify-center items-center">
          {apiError ? (
            <img className="w-[50px] h-[50px]" src="/icon/error.svg" alt="비밀번호 변경 오류" />
          ) : (
            <img className="w-[50px] h-[50px]" src="/icon/check.svg" alt="비밀번호 변경 완료" />
          )}
          <AlertDialogTitle>{apiError ? "변경 실패" : "변경 완료"}</AlertDialogTitle>
          <AlertDialogDescription className="text-[14px]">
            {apiError ? "관리자에게 문의해주세요." : "새 비밀번호로 로그인해 주세요."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction
          className={`w-[175px] mt-5 text-white hover:text-white py-2 rounded-[10px] ${ButtonClass}`}
          onClick={handleRoute}>
          확인
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PasswordChangeAlert;
