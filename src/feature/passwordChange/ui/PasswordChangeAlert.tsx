import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  disabled: boolean;
}

function PasswordChangeAlert({ disabled }: SuccessModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="submit"
          className="w-[15%] bg-green-500 disabled:bg-green-200 disabled:opacity-100 hover:bg-green-600 py-5.5 text-title-md text-white cursor-pointer"
          disabled={disabled}>
          변경하기
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col justify-center items-center w-[400px]">
        <AlertDialogHeader className="flex flex-col justify-center items-center">
          <img className="w-[50px] h-[50px]" src="/icon/check.svg" alt="비밀번호 변경 완료" />
          <AlertDialogTitle>변경 완료</AlertDialogTitle>
          <AlertDialogDescription>새 비밀번호로 로그인해 주세요</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel className="mt-5 bg-green-500  text-white hover:bg-green-600 hover:text-white">
          확인
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PasswordChangeAlert;
