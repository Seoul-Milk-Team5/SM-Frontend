import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  disabled: boolean;
}

function PasswordChangeAlert({ disabled }: SuccessModalProps) {
  const navigate = useNavigate();

  const handleRoute = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/");
  };

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
          <img className="w-[50px] h-[50px]" src="/icon/check.svg" alt="비밀번호 변경 완료" />
          <AlertDialogTitle>변경 완료</AlertDialogTitle>
          <AlertDialogDescription className="text-[14px]">새 비밀번호로 로그인해 주세요.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction
          className="w-[175px] mt-5 bg-green-500  text-white hover:bg-green-600 hover:text-white py-2 rounded-[10px]"
          onClick={handleRoute}>
          확인
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PasswordChangeAlert;
